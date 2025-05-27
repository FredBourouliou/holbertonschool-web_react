interface Student {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
}

const student1: Student = {
  firstName: "John",
  lastName: "Doe",
  age: 20,
  location: "New York"
};

const student2: Student = {
  firstName: "Jane",
  lastName: "Smith",
  age: 22,
  location: "Los Angeles"
};

const studentsList: Student[] = [student1, student2];

// Create table and render students
const body = document.body;
const table = document.createElement('table');
const tableHead = document.createElement('thead');
const tableBody = document.createElement('tbody');

// Create header row
const headerRow = document.createElement('tr');
const headerFirstName = document.createElement('th');
const headerLocation = document.createElement('th');

headerFirstName.textContent = 'First Name';
headerLocation.textContent = 'Location';

headerRow.appendChild(headerFirstName);
headerRow.appendChild(headerLocation);
tableHead.appendChild(headerRow);

// Create data rows
studentsList.forEach((student) => {
  const row = document.createElement('tr');
  const firstNameCell = document.createElement('td');
  const locationCell = document.createElement('td');

  firstNameCell.textContent = student.firstName;
  locationCell.textContent = student.location;

  row.appendChild(firstNameCell);
  row.appendChild(locationCell);
  tableBody.appendChild(row);
});

table.appendChild(tableHead);
table.appendChild(tableBody);
body.appendChild(table); 