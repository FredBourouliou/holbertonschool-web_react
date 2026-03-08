import { execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

export function runJestChecker(specFile, cwd) {
  const dir = cwd || dirname(fileURLToPath(import.meta.url));
  const specPath = typeof specFile === 'string' ? resolve(dir, specFile) : specFile;
  try {
    execSync(`npx jest --no-coverage --no-verbose "${specPath}"`, {
      cwd: dir,
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 25000,
    });
    console.log('OK');
  } catch {
    console.log('NOK');
  }
}

export function runLintChecker(options) {
  try {
    const script = typeof options === 'string' ? options : 'lint_bash.sh';
    execSync(`bash ${script}`, {
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 25000,
    });
    console.log('OK');
  } catch {
    console.log('NOK');
  }
}
