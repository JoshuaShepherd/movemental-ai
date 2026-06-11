#!/usr/bin/env tsx

/**
 * Pre-Build Validation Script
 *
 * This script runs essential validation checks before attempting a build.
 * It focuses on TypeScript type checking which is critical for builds.
 *
 * Layer validation is skipped by default for faster builds. To enable it:
 * - Set RUN_LAYER_VALIDATION=true environment variable
 * - Or run `pnpm build:check` manually for full validation
 *
 * Comprehensive validation (all three tiers) can be enabled:
 * - Set RUN_COMPREHENSIVE_VALIDATION=true environment variable
 * - This runs layer validation, build validation, and full project validation
 * - Categorizes errors by location and priority
 *
 * This script:
 * - Runs TypeScript type checking (always) - validates build-blocking type errors
 * - Optionally runs layer validations (if RUN_LAYER_VALIDATION=true)
 * - Optionally runs comprehensive validation (if RUN_COMPREHENSIVE_VALIDATION=true)
 * - Reports all issues before attempting full build
 *
 * Note: Next.js doesn't support --dry-run for build validation. TypeScript checking
 * with tsconfig.build.json already validates build-blocking type issues. The actual
 * build process will catch Next.js-specific issues (server/client boundaries, module
 * resolution, etc.) which is why we run this validation before build attempts.
 *
 * When SKIP_PREBUILD=true or VERCEL=1, this script exits immediately without running
 * checks to save memory and time on Vercel. Run pnpm build:check in CI before deploy.
 */

import { execSync } from "child_process";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

interface ValidationStep {
  name: string;
  command: string;
  critical: boolean;
  description: string;
}

interface ValidationResult {
  step: string;
  passed: boolean;
  output?: string;
  error?: string;
  duration: number;
}

interface PreBuildReport {
  timestamp: string;
  overallStatus: "PASSED" | "FAILED";
  results: ValidationResult[];
  summary: {
    total: number;
    passed: number;
    failed: number;
    criticalFailures: number;
  };
  recommendations: string[];
}

class PreBuildValidator {
  private projectRoot: string;
  private results: ValidationResult[] = [];
  private criticalFailures: string[] = [];

  constructor() {
    this.projectRoot = process.cwd();
  }

  private truncateError(error: string, maxLength: number = 5000): string {
    if (error.length <= maxLength) {
      return error;
    }
    return (
      error.substring(0, maxLength) +
      `\n\n... (truncated, ${error.length - maxLength} more characters) ...`
    );
  }

  private async runCommand(
    command: string,
    description: string,
    options?: { env?: NodeJS.ProcessEnv },
  ): Promise<{ success: boolean; output: string; error?: string }> {
    try {
      const startTime = Date.now();
      const output = execSync(command, {
        cwd: this.projectRoot,
        encoding: "utf-8",
        stdio: "pipe",
        maxBuffer: 10 * 1024 * 1024, // 10MB buffer
        env: { ...process.env, ...options?.env },
      });
      const duration = Date.now() - startTime;
      return { success: true, output: output.trim() };
    } catch (error: unknown) {
      const err = error as {
        stdout?: { toString: () => string };
        stderr?: { toString: () => string };
        message?: string;
      };
      const errorOutput =
        err.stdout?.toString() || err.stderr?.toString() || err.message || "Unknown error";
      // Save full error output to reports/tsc.txt for TypeScript errors
      if (command.includes("tsc")) {
        const reportDir = join(this.projectRoot, "reports");
        if (!existsSync(reportDir)) {
          mkdirSync(reportDir, { recursive: true });
        }
        writeFileSync(join(reportDir, "tsc.txt"), errorOutput);
      }
      // Truncate error output to prevent huge JSON files
      const truncatedError = this.truncateError(errorOutput.trim());
      return { success: false, output: "", error: truncatedError };
    }
  }

  private async validateLayer(
    step: string,
    command: string,
    description: string,
    critical: boolean = true,
  ): Promise<boolean> {
    console.log(`\n🔍 ${description}...`);
    const startTime = Date.now();

    // Give tsc more heap to avoid SIGABRT/OOM on large codebases (see _docs/type/README.md)
    const runOptions =
      step === "typescript-check"
        ? { env: { ...process.env, NODE_OPTIONS: "--max-old-space-size=8192" } }
        : undefined;
    const result = await this.runCommand(command, description, runOptions);
    const duration = Date.now() - startTime;

    const validationResult: ValidationResult = {
      step,
      passed: result.success,
      output: result.success ? result.output : undefined,
      error: result.error ? this.truncateError(result.error) : undefined,
      duration,
    };

    this.results.push(validationResult);

    if (result.success) {
      console.log(`✅ ${description} - PASSED (${duration}ms)`);
      return true;
    } else {
      console.error(`❌ ${description} - FAILED (${duration}ms)`);
      if (critical) {
        this.criticalFailures.push(step);
      }
      if (result.error) {
        // For TypeScript errors, show more context and point to reports/tsc.txt
        if (step === "typescript-check") {
          console.error(
            `\n   TypeScript compilation failed. Full error output saved to: reports/tsc.txt`,
          );
          console.error(`   First 500 characters of error:\n`);
          const errorLines = result.error.split("\n").slice(0, 20); // Show first 20 lines
          errorLines.forEach((line) => console.error(`   ${line}`));
          if (result.error.split("\n").length > 20) {
            console.error(
              `   ... (see reports/tsc.txt for full ${result.error.split("\n").length} lines) ...`,
            );
          }
        } else {
          console.error(`   Error: ${result.error.substring(0, 200)}...`);
        }
      }
      return false;
    }
  }

  async validateAll(): Promise<PreBuildReport> {
    console.log("🚀 Starting Pre-Build Validation...\n");
    console.log("=".repeat(60));

    // Check if comprehensive validation should run (opt-in via environment variable)
    const shouldRunComprehensive = process.env.RUN_COMPREHENSIVE_VALIDATION === "true";
    const shouldRunLayerValidation =
      process.env.RUN_LAYER_VALIDATION === "true" || shouldRunComprehensive;

    const validationSteps: ValidationStep[] = [];

    // Comprehensive validation runs all three tiers and categorizes errors
    if (shouldRunComprehensive) {
      validationSteps.push({
        name: "comprehensive-validation",
        command: "pnpm validate:comprehensive",
        critical: false, // Non-critical - provides detailed analysis
        description: "Comprehensive Validation (All 3 Tiers + Error Categorization)",
      });
    }

    // Layer validation is skipped by default for faster builds
    // Users can enable it with RUN_LAYER_VALIDATION=true or run pnpm build:check manually
    if (shouldRunLayerValidation && !shouldRunComprehensive) {
      validationSteps.push({
        name: "layer-validation",
        command: "pnpm validate:all",
        critical: true,
        description: "Layer Validation (All 6 Layers)",
      });
      validationSteps.push({
        name: "research-tree-check",
        command: "pnpm research:tree-check",
        critical: false,
        description: "Tenant research tree canonical paths (15 slugs)",
      });
    } else if (!shouldRunComprehensive) {
      console.log("⏭️  Skipping layer validation (use RUN_LAYER_VALIDATION=true to enable)\n");
      console.log("💡 Run `pnpm build:check` manually for full validation when needed\n");
      console.log("💡 Run `RUN_COMPREHENSIVE_VALIDATION=true pnpm build:check` for comprehensive validation\n");
    }

    // Always run TypeScript checks - this is what we need for builds
    // CRITICAL: Must use tsconfig.build.json to exclude test files from build validation
    // Test files have type errors that should not block production builds
    const tsconfigBuildPath = join(this.projectRoot, "tsconfig.build.json");

    if (!existsSync(tsconfigBuildPath)) {
      console.error(`\n❌ CRITICAL ERROR: tsconfig.build.json not found at ${tsconfigBuildPath}`);
      console.error(`   This file is REQUIRED to exclude test files from build validation.`);
      console.error(`   Without it, test file type errors will block production builds.`);
      console.error(`   Please ensure tsconfig.build.json exists in the project root.\n`);
      console.error(`   Current working directory: ${this.projectRoot}\n`);
      process.exit(1);
    }

    console.log(`📝 Using TypeScript config: tsconfig.build.json (test files excluded)`);

    validationSteps.push({
      name: "typescript-check",
      command: `pnpm exec tsc -p tsconfig.build.json --noEmit --pretty false`,
      critical: true,
      description: `TypeScript Type Checking (using tsconfig.build.json, test files excluded)`,
    });

    validationSteps.push({
      name: "redirects-check",
      command: "pnpm redirects:check",
      critical: true,
      description: "Next.js redirect destinations resolve to live routes",
    });

    validationSteps.push({
      name: "program-stitch-fixtures",
      command: "pnpm program:fixtures:check",
      critical: true,
      description: "Stitch program fixtures + manifest alignment",
    });

    // Note: Next.js doesn't support --dry-run for build validation.
    // TypeScript checking with tsconfig.build.json already validates build-blocking issues.
    // The actual build will catch Next.js-specific issues (server/client boundaries, etc.)
    // which is why we run this validation before build attempts.

    // Run all validations
    for (const step of validationSteps) {
      const passed = await this.validateLayer(
        step.name,
        step.command,
        step.description,
        step.critical,
      );

      // Stop on critical failures if configured
      if (!passed && step.critical && process.env.STOP_ON_FIRST_ERROR !== "false") {
        console.log(`\n⚠️  Stopping validation due to critical failure: ${step.name}`);
        break;
      }
    }

    // Generate report
    const passed = this.results.filter((r) => r.passed).length;
    const failed = this.results.filter((r) => !r.passed).length;
    const criticalFailed = this.criticalFailures.length;

    const report: PreBuildReport = {
      timestamp: new Date().toISOString(),
      overallStatus: criticalFailed === 0 ? "PASSED" : "FAILED",
      results: this.results,
      summary: {
        total: this.results.length,
        passed,
        failed,
        criticalFailures: criticalFailed,
      },
      recommendations: this.generateRecommendations(),
    };

    // Save report
    const reportPath = join(this.projectRoot, "reports", "pre-build-validation.json");
    const reportDir = join(this.projectRoot, "reports");
    if (!existsSync(reportDir)) {
      mkdirSync(reportDir, { recursive: true });
    }
    writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Print summary
    this.printSummary(report);

    return report;
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];

    const comprehensiveValidation = this.results.find((r) => r.step === "comprehensive-validation");
    if (comprehensiveValidation && comprehensiveValidation.passed) {
      recommendations.push(
        "✅ Comprehensive validation complete! Check reports/comprehensive-validation.json for detailed error breakdown.",
      );
      recommendations.push("💡 Run `pnpm categorize-errors` to see prioritized fix list.");
    }

    const layerValidation = this.results.find((r) => r.step === "layer-validation");
    if (layerValidation && !layerValidation.passed) {
      recommendations.push(
        "Fix layer validation errors. Run individual layer checks: pnpm db:check, pnpm contracts:check, etc.",
      );
    }

    const typecheck = this.results.find((r) => r.step === "typescript-check");
    if (typecheck && !typecheck.passed) {
      recommendations.push("Fix TypeScript errors. Check reports/tsc.txt for detailed error messages.");
      recommendations.push("Run: pnpm typecheck to see all type errors.");
      recommendations.push(
        "Run: pnpm categorize-errors to see errors categorized by priority and location.",
      );
    }

    if (this.criticalFailures.length > 0) {
      recommendations.push("Address all critical failures before attempting build.");
      recommendations.push(
        "Use: pnpm build:check to run full validation (including layer checks) without building.",
      );
      recommendations.push(
        "Use: RUN_COMPREHENSIVE_VALIDATION=true pnpm build:check for comprehensive error analysis.",
      );
    }

    if (recommendations.length === 0) {
      recommendations.push("All validations passed! You can proceed with: pnpm build");
      recommendations.push("💡 Tip: Run `pnpm build:check` for comprehensive layer validation when needed.");
      recommendations.push(
        "💡 Tip: Run `RUN_COMPREHENSIVE_VALIDATION=true pnpm build:check` for full error categorization.",
      );
    }

    return recommendations;
  }

  private printSummary(report: PreBuildReport): void {
    console.log("\n" + "=".repeat(60));
    console.log("📊 Pre-Build Validation Summary");
    console.log("=".repeat(60));
    console.log(`Status: ${report.overallStatus === "PASSED" ? "✅ PASSED" : "❌ FAILED"}`);
    console.log(`Total Checks: ${report.summary.total}`);
    console.log(`Passed: ${report.summary.passed}`);
    console.log(`Failed: ${report.summary.failed}`);
    console.log(`Critical Failures: ${report.summary.criticalFailures}`);

    if (report.recommendations.length > 0) {
      console.log("\n💡 Recommendations:");
      report.recommendations.forEach((rec, i) => {
        console.log(`   ${i + 1}. ${rec}`);
      });
    }

    console.log(`\n📄 Full report saved to: reports/pre-build-validation.json`);
    console.log("=".repeat(60) + "\n");
  }
}

// Main execution
async function main() {
  // Skip full validation on Vercel / when SKIP_PREBUILD is set to save memory and build time.
  // Type checking is disabled in Next.js for these builds; run pnpm build:check in CI before deploy.
  if (process.env.SKIP_PREBUILD === "true" || process.env.VERCEL === "1") {
    console.log("⏭️  Skipping pre-build validation (SKIP_PREBUILD or VERCEL set)");
    process.exit(0);
  }

  const validator = new PreBuildValidator();
  const report = await validator.validateAll();

  // Exit with appropriate code
  process.exit(report.overallStatus === "PASSED" ? 0 : 1);
}

main().catch((error) => {
  console.error("💥 Fatal error during pre-build validation:", error);
  process.exit(1);
});
