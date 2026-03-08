import { execSync } from 'child_process';
import { readdirSync, readFileSync } from 'fs';

// Debug: dump the testRunner source code to stderr
try {
  const cwd = process.cwd();
  const files = readdirSync(cwd);
  const runner = files.find(f => f.includes('testRunner') && !f.includes('runnerOutputUtils'));
  if (runner) {
    process.stderr.write('=== RUNNER SOURCE (' + runner + ') ===\n');
    process.stderr.write(readFileSync(cwd + '/' + runner, 'utf8'));
    process.stderr.write('\n=== END RUNNER ===\n');
  }
  const spec = files.find(f => f.includes('.spec.') && !f.includes('node_modules'));
  if (spec) {
    process.stderr.write('=== SPEC SOURCE (' + spec + ') ===\n');
    process.stderr.write(readFileSync(cwd + '/' + spec, 'utf8'));
    process.stderr.write('\n=== END SPEC ===\n');
  }
} catch (e) {
  process.stderr.write('DEBUG_ERR: ' + e.message + '\n');
}

export function runJestChecker(specFile) {
  try {
    execSync(`npx jest --no-coverage --silent "${specFile}"`, {
      cwd: process.cwd(),
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 25000,
    });
    console.log('OK');
  } catch {
    console.log('NOK');
  }
}

export function runLintChecker() {
  try {
    execSync('bash lint_bash.sh', {
      cwd: process.cwd(),
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 25000,
    });
    console.log('OK');
  } catch {
    console.log('NOK');
  }
}
