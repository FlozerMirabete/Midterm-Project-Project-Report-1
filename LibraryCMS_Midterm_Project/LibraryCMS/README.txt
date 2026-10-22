# Library Management System

## About the Project

This project is our group's Library module for the College Management System. It is designed to help library staff manage book records, borrowing information, lost or damaged books, penalties, and student clearance.

The project includes a web interface and a backend API. The API handles requests from the interface and uses sample data for testing. We also prepared integration endpoints for the Registrar and Finance modules, but these are still using mock responses until the groups agree on the actual API requirements.

## Main Features

- View and search book records.
- Manage borrowing information.
- Report lost or damaged books.
- View penalties and their payment status.
- Check whether a student is cleared or still has unresolved issues.

## Technologies Used

- HTML, CSS, and JavaScript for the web interface.
- Node.js and Express for the backend API.
- OpenAPI and Swagger UI for API documentation.
- In-memory sample data for the midterm prototype.

## Project Limitations

This version is intended for the midterm demonstration. The data resets when the server restarts because it is stored in memory. The project does not yet use a persistent database, and the Registrar and Finance integrations are not connected to live systems.