import CourseListRow from './CourseListRow';
import './CourseList.css';

function CourseList({ courses = [] }) {
  return (
    <div className="App-body">
      <table id="CourseList">
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
