export function printResult(passed) {
  if (passed) {
    process.stdout.write('OK');
  } else {
    process.stdout.write('NOK');
  }
}

export function formatOutput(result) {
  return result ? 'OK' : 'NOK';
}

export default { printResult, formatOutput };
