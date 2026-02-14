import CourseListRow from './CourseListRow';

function CourseList({ courses = [] }) {
  return (
    <div className="courses mx-auto my-32 w-4/5">
      <table id="CourseList" className="w-full border-collapse border border-gray-500">
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
