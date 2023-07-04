const form = document.getElementById("form");
const tableBody = document.querySelector("tbody");
const searchBox = document.getElementById("search-box");

let idCounter = 1;
let currentEditId = null;

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.querySelector('#name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const gpa = document.getElementById('gpa').value;
    const degree = document.getElementById('degree').value;

    if (currentEditId) {
        // If currentEditId is present, update the row
        const rowToUpdate = document.getElementById(`row-${currentEditId}`);
        rowToUpdate.innerHTML = `<td>${currentEditId}</td><td>${name}</td><td>${email}</td><td>${age}</td><td>${gpa}</td><td>${degree}<img src="edit.png" class="edit-icon" data-id="${currentEditId}" alt="Edit"><img src="delete.png" class="delete-icon" data-id="${currentEditId}" alt="Delete"></td>`;

        // Reset the form and currentEditId
        form.reset();
        currentEditId = null;
        document.getElementById("submit-btn").value = "Add Student";
    } else {
        // Create a new table row
        const newRow = document.createElement("tr");
        newRow.id = `row-${idCounter}`;

        const rowData = [idCounter, name, email, age, gpa, degree];

        rowData.forEach(function(value, index) {
        const cell = document.createElement("td");
        cell.textContent = value;
        newRow.appendChild(cell);
        });

        // Add edit and delete icons to the degree cell
        const degreeCell = document.createElement("td");
        // degreeCell.textContent = degree;

        const editIcon = document.createElement("img");
        editIcon.src = "edit.png";
        editIcon.className = "edit-icon";
        editIcon.dataset.id = idCounter;
        editIcon.alt = "Edit";

        const deleteIcon = document.createElement("img");
        deleteIcon.src = "delete.png";
        deleteIcon.className = "delete-icon";
        deleteIcon.dataset.id = idCounter;
        deleteIcon.alt = "Delete";

        degreeCell.appendChild(editIcon);
        degreeCell.appendChild(deleteIcon);

        newRow.appendChild(degreeCell);

        // Append the new row to the table body
        tableBody.appendChild(newRow);

        // Increment the ID counter
        idCounter++;

        // Reset the form inputs
        form.reset();
    }
    });

    // Edit and Delete event delegation
    tableBody.addEventListener('click', function(event) {
    const target = event.target;

    if (target.classList.contains('edit-icon')) {
        // Get the row ID
        const id = target.dataset.id;

        // Get the row data
        const row = document.getElementById(`row-${id}`);
        const cells = row.getElementsByTagName('td');

        // Set the form values for editing
        document.querySelector('#name').value = cells[1].textContent;
        document.getElementById('email').value = cells[2].textContent;
        document.getElementById('age').value = cells[3].textContent;
        document.getElementById('gpa').value = cells[4].textContent;
        document.getElementById('degree').value = cells[5].textContent;

        // Set the submit button placeholder to Edit Student
        document.getElementById("submit-btn").value = "Edit Student";

        // Set the currentEditId
        currentEditId = id;
    } else if (target.classList.contains('delete-icon')) {
        // Get the row ID
        const id = target.dataset.id;

        // Get the row and remove it from the table body
        const row = document.getElementById(`row-${id}`);
        row.remove();
    }
    });

    // Search functionality
    searchBox.addEventListener('input', function() {
    const searchValue = searchBox.value.toLowerCase();
    const rows = tableBody.getElementsByTagName('tr');

    Array.from(rows).forEach(function(row) {
        const cells = row.getElementsByTagName('td');
        let isRowVisible = false;

        Array.from(cells).forEach(function(cell) {
        if (cell.textContent.toLowerCase().includes(searchValue)) {
            isRowVisible = true;
        }
        });

        if (isRowVisible) {
        row.style.display = "";
        } else {
        row.style.display = "none";
        }
    });
});
