import { getCurrentYear, getFooterCopy, getLatestNotification } from './utils';

test('getCurrentYear returns the current year', () => {
  expect(getCurrentYear()).toBe(new Date().getFullYear());
});

test('getFooterCopy returns the correct string when argument is true', () => {
  expect(getFooterCopy(true)).toBe('Holberton School');
});

test('getFooterCopy returns the correct string when argument is false', () => {
  expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
});

test('getLatestNotification returns the correct string', () => {
  expect(getLatestNotification()).toBe(
    '<strong>Urgent requirement</strong> - complete by EOD'
  );
});
