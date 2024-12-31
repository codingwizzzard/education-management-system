# Education Management System (EMS)

## Overview

The **Education Management System (EMS)** is a web-based platform that allows administrators, teachers, and students to manage courses, enrollments, assignments, quizzes, and grades. The system includes role-based dashboards and user authentication, ensuring that each role has access to specific functionalities. It is built using the MERN stack (MongoDB, Express, React, Node.js) with JWT-based authentication for role-based access.

## Features

- **Admin**:
  - Add, edit, delete courses.
  - View all courses, students, and teachers.
  - Manage enrollments for students.
  
- **Teacher**:
  - Edit courses they are assigned to.
  - View all enrolled students in their courses.
  - Grade students on assignments.
  
- **Student**:
  - View their enrolled courses.
  - Upload assignments and create quizzes.
  - View grades for completed courses.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS / Bootstrap for styling, Axios for API requests.
- **Backend**: Node.js, Express.js, Mongoose for MongoDB, JWT for authentication.
- **Database**: MongoDB.
- **Deployment**: Frontend on Vercel/Netlify, Backend on Heroku/Render.

## Folder Structure

```bash
.
├── backend
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── server.js
│   ├── .env
│   └── package.json
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── Login.js
│   │   ├── ProtectedRoute.js
│   ├── .env
│   ├── package.json
└── README.md


Setup
Prerequisites
Node.js (version 14 or above)
MongoDB
npm (or yarn)
Clone the Repository
bash
Copy code
git clone https://github.com/yourusername/ems-project.git
cd ems-project
Backend Setup
Navigate to the backend folder:

bash
Copy code
cd backend
Install dependencies:

bash
Copy code
npm install
Create a .env file in the backend directory with the following variables:

makefile
Copy code
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
PORT=5000
Start the backend server:

bash
Copy code
npm run server
The backend will run at https://education-managment.onrender.com.

Frontend Setup
Navigate to the frontend folder:

bash
Copy code
cd ../frontend
Install dependencies:

bash
Copy code
npm install
Create a .env file in the frontend directory with the following variables:

arduino
Copy code
REACT_APP_API_URL=https://education-managment.onrender.com
Start the frontend server:

bash
Copy code
npm start
The frontend will run at http://localhost:3000.

API Endpoints
Authentication
POST /api/auth/login: Logs in a user and returns a token and role.
POST /api/auth/register: Registers a new user (Admin, Teacher, Student).
Courses
POST /api/courses/create: Create a new course (Admin only).
PUT /api/courses/edit/:courseId: Edit a course (Admin and Teacher).
DELETE /api/courses/:courseId: Delete a course (Admin only).
GET /api/courses/view: View all courses (Admin, Teacher, Student).

Assignments & Quizzes
POST /api/assignments/upload/:courseId: Upload assignment (Students).
POST /api/quizzes/create/:courseId: Create a quiz (Students).

Grading
PUT /api/grades/:courseId: Grade a student (Teacher).
Role-Based Access

Admin
Can access all pages and perform all operations (Add, Edit, Delete Courses, View Enrollments, etc.).

Teacher
Can only edit courses they are assigned to.
Can view students in their courses and assign grades.
Student
Can upload assignments and create quizzes for courses they are enrolled in.
Can view their grades for completed courses.
Protected Routes
The app uses a ProtectedRoute component that checks if the user has the correct role before allowing access to specific routes.


This `README.md` provides a detailed overview of your project, setup instructions, API documentation, and role-based access. You can customize the content further as per your project needs. Let me know if you need any changes!
