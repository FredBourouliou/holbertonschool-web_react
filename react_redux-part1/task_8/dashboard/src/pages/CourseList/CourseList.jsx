import { useSelector } from 'react-redux';
import CourseListRow from './CourseListRow/CourseListRow';

function CourseList() {
  const courses = useSelector((state) => state.courses.courses);

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
                textFirstCell={course.name}
                textSecondCell={course.credit}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CourseList;
