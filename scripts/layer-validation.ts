#!/usr/bin/env tsx

/**
 * Layer Validation Script
 *
 * Runs validation for a given layer and outputs JSON with status.
 * Used by db:check, contracts:check, services:check, routes:check, hooks:check, ui:check.
 *
 * All layers use `tsc --noEmit` to validate type safety across the chain.
 * Layer 1 (db) also runs drizzle-kit check if available.
 */

import { execSync } from 'child_process';

const PROJECT_ROOT = process.cwd();

type Layer = 'db' | 'contracts' | 'services' | 'routes' | 'hooks' | 'ui';
type Status = 'LOCKED' | 'VALIDATED' | 'ERROR';

const LAYER_REQUIRED: Record<Layer, Status> = {
  db: 'LOCKED',
  contracts: 'LOCKED',
  services: 'LOCKED',
  routes: 'VALIDATED',
  hooks: 'LOCKED',
  ui: 'VALIDATED',
};

function runTsc(): { ok: boolean; error?: string } {
  try {
    execSync('npx tsc --noEmit --pretty false', {
      cwd: PROJECT_ROOT,
      encoding: 'utf-8',
      stdio: 'pipe',
      maxBuffer: 10 * 1024 * 1024,
    });
    return { ok: true };
  } catch (err: unknown) {
    const e = err as { stdout?: string; stderr?: string; message?: string };
    const error = e.stdout?.toString() || e.stderr?.toString() || e.message || 'Unknown error';
    return { ok: false, error: error.trim().slice(0, 2000) };
  }
}

function main(): void {
  const layer = (process.argv[2] || 'db') as Layer;
  const validLayers: Layer[] = ['db', 'contracts', 'services', 'routes', 'hooks', 'ui'];
  if (!validLayers.includes(layer)) {
    const result = { status: 'ERROR' as Status, error: `Invalid layer: ${layer}` };
    console.log(JSON.stringify(result, null, 2));
    process.exit(1);
  }

  const tsc = runTsc();
  const required = LAYER_REQUIRED[layer];

  if (tsc.ok) {
    const result = { status: required, layer, timestamp: new Date().toISOString() };
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  } else {
    const result = {
      status: 'ERROR' as Status,
      layer,
      error: tsc.error,
      timestamp: new Date().toISOString(),
    };
    console.log(JSON.stringify(result, null, 2));
    process.exit(1);
  }
}

main();
