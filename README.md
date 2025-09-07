Full-Stack Login/Logout Application
This is a full-stack web application that demonstrates a complete user authentication flow, including registration, login, and a protected dashboard page. The project is built with a separate frontend and backend to showcase a modern development architecture.

Technologies Used:
1. Frontend: React
2. Backend: Node.js, Express.js
3. Database: SQLite3
4. Authentication: bcrypt for secure password hashing and express-session for managing user sessions.
5. Communication: axios for making API calls between the frontend and backend.

Key Features:
1. User Registration: Allows new users to create an account with a unique email and password.
2. User Login: Authenticates a user and establishes a secure, protected session.
3. Session-Based Authentication: Manages user state on the server side to protect routes.
4. Protected Dashboard: A private page that is only accessible to logged-in users.
5. User Logout: Safely ends the user's session and redirects them to the login page.

How to Run the Application Locally:
1. Follow these steps to get the project up and running on your local machine.

Prerequisites:
Node.js (version 14 or higher)
npm (comes with Node.js)

Step 1: Clone the Repository
Clone this repository to your local machine using the following command:

git clone [https://github.com/kjaswanth404/my-auth-project.git](https://github.com/kjaswanth404/my-auth-project.git)
cd my-auth-project

Step 2: Set up the Backend
Navigate to the backend directory, install the necessary dependencies, and start the server.

cd backend
npm install
node server.js

The server will start on http://localhost:5000. Leave this terminal window open.

Step 3: Set up the Frontend
Open a new terminal window, go to the frontend directory, install the dependencies, and start the React application.

cd ../frontend
npm install
npm start

The application will automatically open in your web browser at http://localhost:3000.

Step 4: Using the Application
With both the frontend and backend running, you can now interact with the application in your browser:

Register a new account.

Log in with your new credentials.

Access the protected dashboard.

Log out to end your session.
