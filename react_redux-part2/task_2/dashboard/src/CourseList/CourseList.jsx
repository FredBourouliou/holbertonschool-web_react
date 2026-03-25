import { useCallback } from 'react';
import CourseListRow from './CourseListRow';
import { selectCourse, unSelectCourse } from '../features/courses/courseSlice';

function CourseList({ courses = [], dispatch }) {
  const onChangeRow = useCallback(
    (id, checked) => {
      if (dispatch) {
        dispatch(checked ? selectCourse(id) : unSelectCourse(id));
      }
    },
    [dispatch]
  );

  return (
    <div className="courses" style={{ margin: '8rem auto', width: '80%' }}>
      <table id="CourseList" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #6b7280' }}>
        <thead>
          <CourseListRow isHeader={true} textFirstCell="Available courses" />
          <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <CourseListRow isHeader={true} textFirstCell="No course available yet" />
          ) : (
            courses.map((course) => (
              <CourseListRow
                key={course.id}
                id={course.id}
                textFirstCell={course.name}
                textSecondCell={course.credit}
                isSelected={course.isSelected}
                onChangeRow={onChangeRow}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CourseList;
