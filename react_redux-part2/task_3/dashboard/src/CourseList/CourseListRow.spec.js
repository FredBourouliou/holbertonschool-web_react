import { render, screen, fireEvent } from '@testing-library/react';
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
        <CourseListRow isHeader={false} textFirstCell="ES6" textSecondCell="60" id={1} onChangeRow={() => {}} />
      </tbody>
    </table>
  );
  const cells = screen.getAllByRole('cell');
  expect(cells).toHaveLength(2);
  expect(cells[0]).toHaveTextContent('ES6');
  expect(cells[1]).toHaveTextContent('60');
});

test('renders a checkbox for non-header rows', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={false} textFirstCell="ES6" textSecondCell="60" id={1} onChangeRow={() => {}} />
      </tbody>
    </table>
  );
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toBeChecked();
});

test('checkbox is checked when isSelected is true', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={false} textFirstCell="ES6" textSecondCell="60" id={1} isSelected={true} onChangeRow={() => {}} />
      </tbody>
    </table>
  );
  expect(screen.getByRole('checkbox')).toBeChecked();
});

test('clicking the checkbox calls onChangeRow with id and checked state', () => {
  const onChangeRow = jest.fn();
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={false} textFirstCell="ES6" textSecondCell="60" id={1} onChangeRow={onChangeRow} />
      </tbody>
    </table>
  );
  fireEvent.click(screen.getByRole('checkbox'));
  expect(onChangeRow).toHaveBeenCalledWith(1, true);
});

test('unchecking a checked checkbox calls onChangeRow with false', () => {
  const onChangeRow = jest.fn();
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={false} textFirstCell="ES6" textSecondCell="60" id={1} isSelected={true} onChangeRow={onChangeRow} />
      </tbody>
    </table>
  );
  fireEvent.click(screen.getByRole('checkbox'));
  expect(onChangeRow).toHaveBeenCalledWith(1, false);
});
