# Neon Blogging Platform Starter Kit

A simple blogging platform that allows users to create, edit, and delete blog posts. The platform features user authentication, Markdown support for writing posts, a commenting system for user engagement, and tagging and categorization of posts.

## Features

- **User Authentication**: Secure registration and login with JWT.
- **Markdown Support**: Write blog posts using Markdown.
- **Commenting System**: Engage users with comments on posts.
- **Tagging and Categorization**: Organize posts with tags.
- **RESTful API**: Easy integration with front-end applications.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Setup](#database-setup)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for Node.js.
- **PostgreSQL**: Relational database for data storage.
- **bcrypt**: Password hashing for user authentication.
- **jsonwebtoken**: Token-based authentication.
- **marked**: Markdown parser for rendering blog content.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/imabutahersiddik/blogging-platform.git
   cd blogging-platform
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:

   Create a `.env` file in the root directory and add your database URL and JWT secret:

   ```plaintext
   DATABASE_URL=your_neon_database_url
   JWT_SECRET=your_jwt_secret
   ```

4. **Create Database Tables**:

   Run the following SQL commands to set up the necessary tables in your PostgreSQL database:

   ```sql
   CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       username VARCHAR(50) NOT NULL,
       email VARCHAR(100) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL
   );

   CREATE TABLE posts (
       id SERIAL PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       content TEXT NOT NULL,
       author_id INT REFERENCES users(id),
       tags VARCHAR(255)
   );

   CREATE TABLE comments (
       id SERIAL PRIMARY KEY,
       post_id INT REFERENCES posts(id),
       content TEXT NOT NULL,
       author_id INT REFERENCES users(id)
   );

   CREATE TABLE tags (
       id SERIAL PRIMARY KEY,
       name VARCHAR(50) UNIQUE NOT NULL
   );

   CREATE TABLE post_tags (
       post_id INT REFERENCES posts(id),
       tag_id INT REFERENCES tags(id),
       PRIMARY KEY (post_id, tag_id)
   );
   ```

## Usage

1. **Start the Server**:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000` by default.

2. **API Testing**:

   You can test the API using tools like Postman or Insomnia. Below are the available endpoints.

## API Endpoints

### Authentication

- **POST /api/auth/register**
  - Register a new user.
  - Request Body: `{ "username": "user", "email": "user@example.com", "password": "yourpassword" }`

- **POST /api/auth/login**
  - Log in a user and receive a JWT token.
  - Request Body: `{ "email": "user@example.com", "password": "yourpassword" }`

### Blog Posts

- **POST /api/posts**
  - Create a new blog post (requires authentication).
  - Request Body: `{ "title": "Post Title", "content": "Post content in Markdown", "tags": ["tag1", "tag2"] }`

- **GET /api/posts**
  - Retrieve all blog posts.

- **PUT /api/posts/:id**
  - Update an existing blog post (requires authentication).
  - Request Body: `{ "title": "Updated Title", "content": "Updated content", "tags": ["tag1", "tag2"] }`

- **DELETE /api/posts/:id**
  - Delete a blog post (requires authentication).

### Comments

- **POST /api/comments**
  - Add a comment to a post (requires authentication).
  - Request Body: `{ "postId": 1, "content": "This is a comment." }`

- **GET /api/comments/:postId**
  - Retrieve comments for a specific post.

- **DELETE /api/comments/:id**
  - Delete a comment (requires authentication).

## Database Setup

Make sure to create the necessary tables in your PostgreSQL database as outlined in the **Database Setup** section above.

## Running Tests

Currently, there are no automated tests included in this project. You can manually test the API using Postman or Insomnia.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
