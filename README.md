# <h1 align="center">Members Only</h1 >
## <p align="center">[Live Demo:](https://members-only-production-7536.up.railway.app/)</p>
Message board that offers different levels of access based on user authentication. Non-members can view basic messages, while registered members gain the ability to view additional details, such as the author and timestamp, as well as post their own messages.

## Features
- **Guest Access**: Non-members can view a list of messages but cannot see full details or post.
- **Member Access**: Registered users can view detailed messages, including author and timestamp, and can post messages.
- **Admin Access**: Users with admin privileges can delete messages.
- **User Authentication**: Secure login and signup using PassportJS, with bcrypt for password hashing.

## Technologies Used
- **Backend**: [Express](https://expressjs.com/) (Node.js framework)
- **Frontend**: EJS (template engine), Tailwind (styling)
- **Authentication**: [PassportJS](http://www.passportjs.org/) for authentication and session management
- **Database**: PostgreSQL for storing user and message data [Supabase](https://www.supabase.com)
- **Security**: bcrypt for password hashing

## Purpose
It's a project from The Odin Project’s curriculum, designed to teach full-stack development with a specific focus on authentication and authorization.
[Link](https://www.theodinproject.com/lessons/node-path-nodejs-members-only)

## Challenges & Learning
- **PassportJS Integration**: Understanding how PassportJS handles session serialization/deserialization and how it provides `req.user` for use in middleware.
- **Middleware Customization**: Creating custom middleware to control access to specific routes based on user status.
- **Security**: Implementing secure password storage using bcrypt.
