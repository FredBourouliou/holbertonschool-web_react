import { render, screen } from '@testing-library/react';
import CourseList from './CourseList';

test('renders 5 rows when receiving an array of courses', () => {
  const courses = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 },
  ];
  render(<CourseList courses={courses} />);
  const rows = screen.getAllByRole('row');
  expect(rows).toHaveLength(5);
});

test('renders 1 row with "No course available yet" when receiving an empty array', () => {
  render(<CourseList courses={[]} />);
  expect(screen.getByText(/no course available yet/i)).toBeInTheDocument();
});
