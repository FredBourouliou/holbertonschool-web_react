import { execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

export function runJestChecker(specFile, cwd) {
  const dir = cwd || dirname(fileURLToPath(import.meta.url));
  const specPath = resolve(dir, specFile);
  try {
    execSync(`npx jest --no-coverage --no-verbose "${specPath}"`, {
      cwd: dir,
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 25000,
    });
    process.stdout.write('OK');
  } catch {
    process.stdout.write('NOK');
  }
}
