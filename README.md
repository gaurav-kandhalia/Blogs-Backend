Blogs Backend API

A simple blogging platform backend built with Node.js, Express.js, MongoDB, and Zod for request validations.
This API allows users to create, view, update, and delete blog posts.

🔗 Project Links

GitHub Repository: https://github.com/gaurav-kandhalia/Blogs-Backend.git

Deployed Backend URL: https://blogs-backend-fcev.onrender.com


📂 Folder Structure
src/
├── controllers/
│   └── blogs.controllers.js
├── db/
│   └── db.js
├── models/
│   └── blogPost.model.js
├── routes/
│   └── blogPost.routes.js
├── utils/
│   ├── apiError.js
│   ├── apiResponse.js
│   └── asyncHandler.js
├── validations/
│   └── post.validations.js
├── app.js
└── index.js
.env
.gitignore
README.md

⚙️ Installation

Clone the repository

git clone https://github.com/gaurav-kandhalia/Blogs-Backend.git


Navigate to project folder

cd Backend


Install dependencies

npm install


Setup environment variables
Create a .env file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string


Run the project

npm run dev

🚀 API Endpoints

Base URL:

https://blogs-backend-fcev.onrender.com/api/v1/blogs

Method	Endpoint	Description
POST	/createPost	Create a new blog post
GET	/getAllPosts	Get all blog posts
GET	/getPost	Get a single blog post by ID
POST	/updatePost	Update an existing blog post
DELETE	/deletePost	Delete a blog post by ID


Example Request & Response
Create Post

Request:

POST /api/v1/blogs/createPost
Content-Type: application/json

{
  "title": "My First Blog",
  "content": "This is the content of my first blog post.",
  "author": "Gaurav Kandhalia"
}


Response:

{
  "status": 201,
  "message": "Blog post created successfully",
  "data": {
    "_id": "64f8cfa3f98c2b7e8d123456",
    "title": "My First Blog",
    "content": "This is the content of my first blog post.",
    "author": "Gaurav Kandhalia",
    "createdAt": "2025-09-25T08:30:00.000Z",
    "updatedAt": "2025-09-25T08:30:00.000Z"
  }
}

Validation

All endpoints that create or update posts use Zod for validation to ensure correct data structure and integrity.
Example validation rules:

title: string, minimum length of 3 characters

content: string, minimum length of 10 characters

author: optional, defaults to "Anonymous" if not provided

🛠 Technologies Used

Node.js

Express.js

MongoDB

Mongoose

Zod (Schema Validation)

dotenv

asyncHandler

cors

📌 Notes

Ensure your MongoDB URI is correct in .env.

Use Postman or similar tools to test endpoints.

This backend is deployed on Render and accessible publicly.