import { execSync } from 'child_process';

export function runJestChecker(specFile) {
  try {
    execSync(`npx jest --no-coverage "${specFile}"`, {
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
