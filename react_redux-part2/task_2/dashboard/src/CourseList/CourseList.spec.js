import { render, screen, fireEvent } from '@testing-library/react';
import CourseList from './CourseList';
import { selectCourse, unSelectCourse } from '../features/courses/courseSlice';

const courses = [
  { id: 1, name: 'ES6', credit: 60, isSelected: false },
  { id: 2, name: 'Webpack', credit: 20, isSelected: false },
  { id: 3, name: 'React', credit: 40, isSelected: false },
];

test('renders 5 rows when receiving an array of courses', () => {
  render(<CourseList courses={courses} />);
  const rows = screen.getAllByRole('row');
  expect(rows).toHaveLength(5);
});

test('renders 1 row with "No course available yet" when receiving an empty array', () => {
  render(<CourseList courses={[]} />);
  expect(screen.getByText(/no course available yet/i)).toBeInTheDocument();
});

test('renders a checkbox for each course row', () => {
  render(<CourseList courses={courses} />);
  const checkboxes = screen.getAllByRole('checkbox');
  expect(checkboxes).toHaveLength(3);
});

test('checking a checkbox dispatches selectCourse', () => {
  const dispatch = jest.fn();
  render(<CourseList courses={courses} dispatch={dispatch} />);
  const checkboxes = screen.getAllByRole('checkbox');
  fireEvent.click(checkboxes[0]);
  expect(dispatch).toHaveBeenCalledWith(selectCourse(1));
});

test('unchecking a checkbox dispatches unSelectCourse', () => {
  const dispatch = jest.fn();
  const coursesWithSelected = [
    { id: 1, name: 'ES6', credit: 60, isSelected: true },
    { id: 2, name: 'Webpack', credit: 20, isSelected: false },
    { id: 3, name: 'React', credit: 40, isSelected: false },
  ];
  render(<CourseList courses={coursesWithSelected} dispatch={dispatch} />);
  const checkboxes = screen.getAllByRole('checkbox');
  fireEvent.click(checkboxes[0]);
  expect(dispatch).toHaveBeenCalledWith(unSelectCourse(1));
});
