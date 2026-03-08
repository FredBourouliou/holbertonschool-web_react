import { execSync } from 'child_process';
import { readdirSync, readFileSync } from 'fs';

// Debug: dump runner and spec to stdout so we can see them in checker output
try {
  const cwd = process.cwd();
  const files = readdirSync(cwd);
  const runners = files.filter(f => f.endsWith('_testRunner.js'));
  const specs = files.filter(f => f.endsWith('.spec.js') && !f.startsWith('src'));
  for (const f of [...runners, ...specs]) {
    console.log('=== ' + f + ' ===');
    console.log(readFileSync(cwd + '/' + f, 'utf8'));
    console.log('=== END ===');
  }
} catch (e) {
  console.log('DEBUG_ERR: ' + e.message);
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
