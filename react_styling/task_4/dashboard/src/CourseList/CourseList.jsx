import CourseListRow from './CourseListRow';

function CourseList({ courses = [] }) {
  return (
    <div className="App-body w-4/5 mx-auto max-[912px]:w-full">
      <table id="CourseList" className="w-full">
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
