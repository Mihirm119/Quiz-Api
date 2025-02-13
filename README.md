# Quiz API

A RESTful API for creating, managing, and taking quizzes using **Node.js**, **Express**, and **MongoDB**.

## Features
- User authentication with JWT
- CRUD operations for quizzes, categories, and users
- Quiz result tracking
- File uploads using Multer
- MongoDB database integration with Mongoose
- Logging with Morgan

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Other Dependencies:** bcrypt, multer, cookie-parser, morgan, nodemon

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/quiz-api.git
   cd quiz-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (`.env` file):
   ```
   MONGO_URI=mongodb://localhost:27017/Quiz_API
   PORT=5000
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Authentication
| Method | Endpoint        | Description     |
|--------|---------------|----------------|
| POST   | `/auth/signup` | Register a user |
| POST   | `/auth/login`  | User login     |

### Admin & User Management
| Method | Endpoint         | Description          |
|--------|----------------|----------------------|
| GET    | `/admin/read`   | Get all users (Admin) |
| PATCH  | `/admin/update/:id` | Update a user (Admin) |
| DELETE | `/admin/delete/:id` | Delete a user (Admin) |
| POST   | `/admin/register` | Register a new user |
| POST   | `/admin/login`  | User login          |

### Category Management
| Method | Endpoint         | Description         |
|--------|----------------|---------------------|
| GET    | `/category/`    | Get all categories |
| POST   | `/category/`    | Create a category  |
| PATCH  | `/category/:id` | Update a category  |
| DELETE | `/category/:id` | Delete a category  |

### Quiz Management
| Method | Endpoint             | Description              |
|--------|---------------------|--------------------------|
| POST   | `/quiz/create`       | Create a new quiz       |
| POST   | `/quiz/addquestion/:id` | Add a question to a quiz |
| GET    | `/quiz/read`         | Get all quizzes         |
| DELETE | `/quiz/deletequestion/:id` | Delete a question from a quiz |
| DELETE | `/quiz/deletequiz/:id` | Delete a quiz           |
| PATCH  | `/quiz/updatequiz/:id` | Update a quiz          |
| GET    | `/quiz/playquiz/:id` | Play a quiz             |
| POST   | `/quiz/submitquiz/:id` | Submit quiz answers    |

### Usage Example (Postman or Curl)
```sh
curl -X POST "http://localhost:5000/quiz/create" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{"title": "JavaScript Basics", "description": "Test your JS skills!"}'
```

