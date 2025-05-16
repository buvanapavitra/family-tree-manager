# Family Tree Management App

This is a full-stack web application for managing a family tree. Users can add, view, update, and delete family members, and view the hierarchy in a nested accordion format.

## Features

- Add new family members
- Assign parent-child relationships
- View family hierarchy in an expandable accordion UI
- Edit and delete members
- Responsive and user-friendly interface

## Tech Stack

- Frontend: React (Vite), Redux Toolkit, Redux-Saga, Material UI
- Backend: Node.js, Express
- Database: MySQL

## Setup Instructions

### Backend

1. Navigate to the backend directory:
   cd backend

2. Install dependencies:
   npm install

3. Configure your MySQL database in `db.js`.

4. Create the following table:

CREATE DATABASE IF NOT EXISTS family_tree;

USE family_tree;

CREATE TABLE members (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255),
age INT,
parent_id INT,
FOREIGN KEY (parent_id) REFERENCES members(id) ON DELETE CASCADE
);


5. Start the backend server:
   npm run dev

### Frontend

1. Navigate to the frontend directory:
   cd frontend
2. Install dependencies:
   npm install
3. Start the frontend server:
   npm run dev
   The app will be available at `http://localhost:5173`.

## Folder Structure

frontend/
src/
components/
redux/
App.jsx
backend/
routes/
controllers/
config/

## License

This project is licensed under the MIT License.
