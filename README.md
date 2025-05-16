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

## Screenshot

![WhatsApp Image 2025-05-16 at 13 45 30_4506fc1e](https://github.com/user-attachments/assets/6c3d7cd3-a20d-4ce5-8283-dc168bd00c3c)

**Add**

<img width="392" alt="image" src="https://github.com/user-attachments/assets/160a10d5-c752-438a-baca-e33c1afbe7cc" />


**Edit**

<img width="461" alt="image" src="https://github.com/user-attachments/assets/25e98fca-0e99-4b97-b42d-5ced68a34164" />

**Delete**

![image](https://github.com/user-attachments/assets/a2eb6cb0-eacf-4e61-b4be-3bb0ed3246d4)



