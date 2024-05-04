const studentTable = document.getElementById('student-data');
const searchInput = document.getElementById('search');

// Function to fetch JSON data from the URL
function fetchData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch JSON');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
}

// Function to render the table with student data
function renderTable(data) {
    // Clear existing content of the studentTable
    studentTable.innerHTML = '';

    // Iterate over each student in the data array
    data.forEach(student => {
        // Create a table row for each student
        const tableRow = document.createElement('tr');

        // Create a table cell for the student's image
        const imageCell = document.createElement('td');
        const image = document.createElement('img');
        image.src = student.img_src; // Use the 'img_src' property from the data
        imageCell.appendChild(image); // Append the image to the cell

        // Create a table cell for the student's full name
        const nameCell = document.createElement('td');
        nameCell.textContent = `${student.first_name} ${student.last_name}`; // Concatenate first and last name

        // Create a table cell for the student's email
        const emailCell = document.createElement('td');
        emailCell.textContent = student.email; // Use the 'email' property from the data
        const marks = document.createElement('td');
        marks.textContent = student.marks;

        const passing = document.createElement('td');
        passing.textContent = student.passing;

        const gender = document.createElement('td');
        gender.textContent = student.gender;
        
        const standard = document.createElement('td');
        standard.textContent = student.class;

        

        // Append the cells to the table row
        tableRow.appendChild(imageCell);
        tableRow.appendChild(nameCell);
        tableRow.appendChild(emailCell);
        tableRow.appendChild(marks);
        tableRow.appendChild(passing);
        tableRow.appendChild(gender);
        tableRow.appendChild(standard);

        // Append the table row to the studentTable
        studentTable.appendChild(tableRow);
    });
}

// Fetch data from the URL and render the table
fetchData('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
    .then(studentData => {
        // Call the renderTable function with the fetched data
        renderTable(studentData);
    });



// Function to sort students by name in ascending order
function sortByNameAsc(data) {
    return data.slice().sort((a, b) => a.first_name.localeCompare(b.first_name));
}

// Function to sort students by name in descending order
function sortByNameDesc(data) {
    return data.slice().sort((a, b) => b.first_name.localeCompare(a.first_name));
}

// Function to sort students by marks in ascending order
function sortByMarksAsc(data) {
    return data.slice().sort((a, b) => a.marks - b.marks);
}

// Function to filter passing students
function filterPassingStudents(data) {
    return data.filter(student => student.passing === true);
}

// Function to sort students by class
function sortByClass(data) {
    return data.slice().sort((a, b) => a.class - b.class);
}

// Function to separate students by gender
function separateByGender(data) {
    return data.slice().sort((a, b) => a.gender.localeCompare(b.gender))
}

// Function to handle button click events
function handleButtonClick(event) {
    // const buttonId = event.target.id;
    const buttonId = event.target.closest('button').id;
    console.log("button id", buttonId)
    fetchData('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
        .then(studentData => {
            let newData = [];
            switch (buttonId) {
                case 'sort-name-asc':
                    newData = sortByNameAsc(studentData);
                    break;
                case 'sort-name-desc':
                    newData = sortByNameDesc(studentData);
                    break;
                case 'sort-marks-asc':
                    newData = sortByMarksAsc(studentData);
                    break;
                case 'sort-passing':
                    newData = filterPassingStudents(studentData);
                    break;
                case 'sort-class':
                    newData = sortByClass(studentData);
                    break;
                case 'sort-gender':
                    newData = separateByGender(studentData);
                    break;
                default:
                    newData = studentData;
            }
            renderTable(newData);
        });
}

document.querySelector('.button-container').addEventListener('click', function(event) {
    if (event.target.closest('button')) {
        handleButtonClick(event);
    }
});

// Add click event listeners to each button
// document.getElementById('sort-name-asc').addEventListener('click', handleButtonClick);
// document.getElementById('sort-name-desc').addEventListener('click', handleButtonClick);
// document.getElementById('sort-marks-asc').addEventListener('click', handleButtonClick);
// document.getElementById('sort-passing').addEventListener('click', handleButtonClick);
// document.getElementById('sort-class').addEventListener('click', handleButtonClick);
// document.getElementById('sort-gender').addEventListener('click', handleButtonClick);



// Function to handle input in the search box
function handleSearchInput(event) {
    const searchQuery = event.target.value.toLowerCase();
    fetchData('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
        .then(studentData => {
            let newData = studentData.filter(student => {
                const firstName = student.first_name.toLowerCase();
                const lastName = student.last_name.toLowerCase();
                const email = student.email.toLowerCase();
                // Check if either first name or last name matches the search query
                const nameMatch = firstName.startsWith(searchQuery) || lastName.startsWith(searchQuery);
                // Check if email matches the search query
                const emailMatch = email.startsWith(searchQuery);
                return nameMatch || emailMatch;
            });
            renderTable(newData);
        });
}

// Add input event listener to the search box
searchInput.addEventListener('input', handleSearchInput);
