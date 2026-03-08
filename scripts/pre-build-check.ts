#!/usr/bin/env tsx

/**
 * Pre-Build Validation Script
 *
 * Runs essential validation checks before attempting a build. Use before deploy
 * (e.g. in CI or locally) to ensure the project is safe to build on Vercel.
 *
 * - TypeScript type checking (always) — validates build-blocking type errors
 * - Writes report to reports/pre-build-validation.json
 * - On TypeScript failure, full output is saved to reports/tsc.txt
 *
 * When SKIP_PREBUILD=true or VERCEL=1, exits immediately without running
 * checks (Vercel runs the real build; run build:check in CI before deploy).
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

interface ValidationResult {
  step: string;
  passed: boolean;
  output?: string;
  error?: string;
  duration: number;
}

interface PreBuildReport {
  timestamp: string;
  overallStatus: 'PASSED' | 'FAILED';
  results: ValidationResult[];
  summary: {
    total: number;
    passed: number;
    failed: number;
    criticalFailures: number;
  };
  recommendations: string[];
}

const PROJECT_ROOT = process.cwd();
const REPORT_DIR = join(PROJECT_ROOT, 'reports');
const MAX_ERROR_LENGTH = 5000;

function truncateError(error: string, maxLength: number = MAX_ERROR_LENGTH): string {
  if (error.length <= maxLength) return error;
  return error.substring(0, maxLength) + `\n\n... (truncated, ${error.length - maxLength} more characters) ...`;
}

function ensureReportDir(): void {
  if (!existsSync(REPORT_DIR)) {
    mkdirSync(REPORT_DIR, { recursive: true });
  }
}

function runStep(
  step: string,
  command: string,
  description: string
): ValidationResult {
  const start = Date.now();
  try {
    execSync(command, {
      cwd: PROJECT_ROOT,
      encoding: 'utf-8',
      stdio: 'pipe',
      maxBuffer: 10 * 1024 * 1024,
    });
    const duration = Date.now() - start;
    console.log(`✅ ${description} - PASSED (${duration}ms)`);
    return { step, passed: true, duration };
  } catch (err: unknown) {
    const e = err as { stdout?: string; stderr?: string; message?: string };
    const errorOutput = e.stdout?.toString() || e.stderr?.toString() || e.message || 'Unknown error';
    const duration = Date.now() - start;

    if (step === 'typescript-check') {
      ensureReportDir();
      writeFileSync(join(REPORT_DIR, 'tsc.txt'), errorOutput);
    }

    console.error(`❌ ${description} - FAILED (${duration}ms)`);
    if (step === 'typescript-check') {
      console.error(`\n   Full output saved to: reports/tsc.txt`);
      const lines = errorOutput.split('\n').slice(0, 20);
      lines.forEach((line) => console.error(`   ${line}`));
      if (errorOutput.split('\n').length > 20) {
        console.error(`   ... (see reports/tsc.txt for full output)`);
      }
    } else {
      console.error(`   ${truncateError(errorOutput.trim(), 300)}`);
    }

    return {
      step,
      passed: false,
      error: truncateError(errorOutput.trim()),
      duration,
    };
  }
}

function generateRecommendations(results: ValidationResult[], criticalFailures: number): string[] {
  const recs: string[] = [];
  const typecheck = results.find((r) => r.step === 'typescript-check');

  if (typecheck && !typecheck.passed) {
    recs.push('Fix TypeScript errors. See reports/tsc.txt for full output.');
    recs.push('Run: npm run typecheck (or pnpm typecheck) to see errors.');
  }

  if (criticalFailures > 0) {
    recs.push('Address all critical failures before attempting build.');
    recs.push('Run: npm run build:check (or pnpm build:check) before deploying.');
  }

  if (recs.length === 0) {
    recs.push('All validations passed. You can proceed with: npm run build');
    recs.push('Report saved to reports/pre-build-validation.json for CI/deploy confidence.');
  }

  return recs;
}

function main(): void {
  if (process.env.SKIP_PREBUILD === 'true' || process.env.VERCEL === '1') {
    console.log('⏭️  Skipping pre-build validation (SKIP_PREBUILD or VERCEL set)');
    process.exit(0);
  }

  console.log('🚀 Pre-Build Validation\n');
  console.log('='.repeat(60));

  const results: ValidationResult[] = [];

  // TypeScript check (same as CLAUDE.md: npx tsc --noEmit)
  console.log('\n🔍 TypeScript type check...');
  results.push(
    runStep(
      'typescript-check',
      'npx tsc --noEmit --pretty false',
      'TypeScript type checking'
    )
  );

  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;
  const criticalFailures = results.filter((r) => !r.passed).length;

  const report: PreBuildReport = {
    timestamp: new Date().toISOString(),
    overallStatus: criticalFailures === 0 ? 'PASSED' : 'FAILED',
    results,
    summary: { total: results.length, passed, failed, criticalFailures },
    recommendations: generateRecommendations(results, criticalFailures),
  };

  ensureReportDir();
  writeFileSync(
    join(REPORT_DIR, 'pre-build-validation.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('\n' + '='.repeat(60));
  console.log('📊 Pre-Build Validation Summary');
  console.log('='.repeat(60));
  console.log(`Status: ${report.overallStatus === 'PASSED' ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Total: ${report.summary.total}  Passed: ${report.summary.passed}  Failed: ${report.summary.failed}`);
  console.log('\n💡 Recommendations:');
  report.recommendations.forEach((r, i) => console.log(`   ${i + 1}. ${r}`));
  console.log(`\n📄 Report: reports/pre-build-validation.json`);
  console.log('='.repeat(60) + '\n');

  process.exit(report.overallStatus === 'PASSED' ? 0 : 1);
}

main();
