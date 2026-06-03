# Bookstore

A simple online bookstore project with a static frontend and a Node.js + Express backend connected to a MySQL database.

## Project Overview

- Frontend: `Frontend/index.html`, `Frontend/script.js`, and `Frontend/styles.css`
- Backend: `Backend/server.js`, `Backend/db.js`
- Database schema: `Database/Books.sql`
- Features: list books, search books, add a book, delete a book

## Version History

- **v0.1**: Initial creation
- **v0.2.1**: Implemented backend best practices

## Features

- Fetch all books from the backend
- Search books by title or author
- Add new books with title, author, category, price, and image path
- Delete books by ID

## Tech Stack

- Node.js
- Express
- MySQL / MySQL2
- CORS
- Vanilla HTML, CSS, JavaScript

## Setup

1. Install backend dependencies:

```bash
cd Backend
npm install
```

2. Create a `.env` file inside `Backend` with your database connection values:

```bash
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
```

3. Import the database schema from `Database/Books.sql` into your MySQL server.

4. Start the backend server:

```bash
cd Backend
node server.js
```

The server listens on port `3000` by default.

## Running the App

- Open `Frontend/index.html` in your browser.
- The frontend uses `http://localhost:3000/books` to communicate with the backend.
- Use the search box to filter books.
- Add new books using the form provided.
- Delete books using the delete button on each card.

## Database

The backend uses MySQL and reads credentials from the `.env` file.

- `Backend/db.js` handles the database connection
- `Database/Books.sql` contains the book table schema and optional example data

## Notes

- The frontend expects the `image` field to reference a filename under the `Frontend/Images/` folder.
- The API endpoints are:
  - `GET /books`
  - `GET /books/search/:keyword`
  - `POST /books`
  - `DELETE /books/:id`

## Improvements

Future improvements could include:

- Add input validation on the backend and frontend
- Add edit/update book functionality
- Add user authentication
- Switch frontend to a SPA framework or build tool
