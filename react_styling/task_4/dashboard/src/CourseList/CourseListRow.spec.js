import { render, screen } from '@testing-library/react';
import CourseListRow from './CourseListRow';

test('when isHeader is true and textSecondCell is null, renders one th with colspan=2', () => {
  render(
    <table>
      <thead>
        <CourseListRow isHeader={true} textFirstCell="Available courses" />
      </thead>
    </table>
  );
  const th = screen.getByRole('columnheader', { name: /available courses/i });
  expect(th).toHaveAttribute('colspan', '2');
});

test('when isHeader is true and textSecondCell is not null, renders two th cells', () => {
  render(
    <table>
      <thead>
        <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
      </thead>
    </table>
  );
  const headers = screen.getAllByRole('columnheader');
  expect(headers).toHaveLength(2);
});

test('when isHeader is false, renders two td elements within a tr', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={false} textFirstCell="ES6" textSecondCell="60" />
      </tbody>
    </table>
  );
  const cells = screen.getAllByRole('cell');
  expect(cells).toHaveLength(2);
  expect(cells[0]).toHaveTextContent('ES6');
  expect(cells[1]).toHaveTextContent('60');
});
