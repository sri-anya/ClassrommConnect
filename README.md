<!-- Project Idea: Preschool Management System
Overview
Create a web application that serves as a management system for a preschool. The application will help manage students, teachers, classes, and activities, providing an easy way for staff and parents to interact.

Models
Student

Fields: id, name, age, parent_contact, enrollment_date
Relationships: Many-to-many with Class
Teacher

Fields: id, name, subject, contact_info
Relationships: Many-to-many with Class
Class

Fields: id, name, schedule, room_number
Relationships: Many-to-many with Student and Teacher
Activity

Fields: id, name, description, date, class_id
Relationships: One-to-many with Class
Many-to-Many Relationship
Class can have many Students and many Teachers. This is where you would create join tables (e.g., class_student and class_teacher).
CRUD Functionality
Implement full CRUD operations for the Student model:
Create: Add a new student
Read: View all students or a single student’s details
Update: Edit a student’s information
Delete: Remove a student from the system
Client-Side Routes (using React Router)
/students - List all students
/students/:id - View a specific student’s details
/add-student - Form to add a new student
/classes - List all classes
/activities - View and manage activities
Validations and Error Handling
Implement form validations for the Student model (e.g., required fields, age range).
Handle errors gracefully on both client and server sides (e.g., student not found, invalid input).
Something New
Parent Portal: Implement a feature that allows parents to log in and view their child's progress, upcoming activities, and messages from teachers. This could include a dashboard with personalized information.
State Management
Use useContext or Redux to manage global state, especially for user authentication and data fetching (e.g., maintaining student data across components). -->

# Classroom Connect

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white)
![Flask-SQLAlchemy](https://img.shields.io/badge/Flask--SQLAlchemy-4B8BBE?style=flat&logo=flask&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)

## Overview

Classroom Connect is a web application designed as a management system for a preschool. It provides a platform for managing students, teachers, classes, and activities, facilitating easy interactions between staff and parents.

## Models

### Student
- **Fields**: 
  - `id`
  - `name`
  - `age`
  - `parent_contact`
  - `enrollment_date`
- **Relationships**: Many-to-many with Class

### Teacher
- **Fields**:
  - `id`
  - `name`
  - `subject`
  - `contact_info`
- **Relationships**: Many-to-many with Class

### Class
- **Fields**:
  - `id`
  - `name`
  - `schedule`
  - `room_number`
- **Relationships**: Many-to-many with Student and Teacher

### Activity
- **Fields**:
  - `id`
  - `name`
  - `description`
  - `date`
  - `class_id`
- **Relationships**: One-to-many with Class

## CRUD Functionality

Implement full CRUD operations for the Student model:
- **Create**: Add a new student
- **Read**: View all students or a single student’s details
- **Update**: Edit a student’s information
- **Delete**: Remove a student from the system

## Client-Side Routes (using React Router)

- `/students` - List all students
- `/students/:id` - View a specific student’s details
- `/add-student` - Form to add a new student
- `/classes` - List all classes
- `/activities` - View and manage activities

## Validations and Error Handling

- Implement form validations for the Student model (e.g., required fields, age range).
- Handle errors gracefully on both client and server sides (e.g., student not found, invalid input).

## Something New

### Parent Portal
Implement a feature that allows parents to log in and view their child's progress, upcoming activities, and messages from teachers. This could include a dashboard with personalized information.

## State Management

Use `useContext` or `Redux` to manage global state, especially for user authentication and data fetching (e.g., maintaining student data across components).

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/classroom-connect.git
   cd classroom-connect
