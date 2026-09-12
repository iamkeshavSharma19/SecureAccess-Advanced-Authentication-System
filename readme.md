# 🔐 SecureAccess — Advanced Authentication System

> A modern, secure and scalable authentication backend built with **Node.js, Express.js, MongoDB, JWT, bcrypt, Nodemailer, and session-based refresh token management.**

SecureAccess is an advanced authentication system designed to demonstrate how a modern backend can handle **user registration, email verification, password security, JWT authentication, refresh token rotation, session management, and multi-device logout**.

The project focuses on building a clean and modular authentication architecture that can serve as a strong foundation for modern web applications.

---

## ✨ Features

* 👤 **User Registration & Authentication**
* 🔐 **Secure Password Hashing with bcrypt**
* 📧 **Email Verification using OTP**
* 🔑 **JWT Access Token Authentication**
* 🔄 **Refresh Token Rotation**
* 🍪 **HTTP-only Refresh Token Cookies**
* 🧠 **Database-backed Session Management**
* 🛡️ **Hashed Refresh Token Storage**
* 🚪 **Single Device Logout**
* 🚪 **Logout from All Devices**
* 👤 **Authenticated User Profile**
* 📋 **User-Agent & IP-based Session Information**
* 🗄️ **MongoDB Database Integration**
* 📩 **Gmail OAuth2 Email Service**
* 🧩 **Modular Express.js Architecture**
* 🌱 **Environment-based Configuration**
* ⚡ **Async/Await based API Architecture**

---

# 🎯 Project Overview

SecureAccess goes beyond a traditional:

```text
Email + Password → JWT
```

authentication implementation.

It implements a complete authentication lifecycle:

```text
┌───────────────┐
│   Register    │
└───────┬───────┘
        │
        ▼
┌───────────────────┐
│ Generate OTP      │
│ & Send Email      │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│ Verify Email      │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│      Login        │
└────────┬──────────┘
         │
         ├──────────────────┐
         ▼                  ▼
┌────────────────┐   ┌────────────────┐
│ Access Token   │   │ Refresh Token  │
└───────┬────────┘   └───────┬────────┘
        │                    │
        │                    ▼
        │             ┌──────────────┐
        │             │   Session    │
        │             │   MongoDB    │
        │             └──────┬───────┘
        │                    │
        │                    ▼
        │             Refresh / Rotate
        │
        ▼
┌────────────────────┐
│ Protected APIs     │
└────────────────────┘
```

---

# 🏗️ Architecture

SecureAccess follows a modular backend architecture where authentication responsibilities are separated into controllers, routes, models, middleware, services, utilities, and configuration.

```text
                    ┌─────────────────┐
                    │     Client      │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   Express.js    │
                    │     Server      │
                    └────────┬────────┘
                             │
             ┌───────────────┼───────────────┐
             │               │               │
             ▼               ▼               ▼
        ┌─────────┐    ┌────────────┐   ┌──────────┐
        │ Routes  │    │ Middleware │   │ Services │
        └────┬────┘    └──────┬─────┘   └────┬─────┘
             │                │              │
             ▼                ▼              ▼
        ┌───────────┐   ┌────────────┐  ┌──────────┐
        │Controllers│   │ JWT Auth   │  │ Nodemailer│
        └─────┬─────┘   └────────────┘  └──────────┘
              │
              ▼
        ┌─────────────┐
        │   Models    │
        └──────┬──────┘
               │
               ▼
        ┌─────────────┐
        │   MongoDB   │
        └─────────────┘
```

---

# 🛠️ Tech Stack

| Technology        | Purpose                               |
| ----------------- | ------------------------------------- |
| **Node.js**       | JavaScript runtime                    |
| **Express.js**    | Backend web framework                 |
| **MongoDB**       | NoSQL database                        |
| **Mongoose**      | MongoDB ODM                           |
| **JWT**           | Access & refresh token authentication |
| **bcrypt**        | Password hashing                      |
| **Nodemailer**    | Email delivery                        |
| **Gmail OAuth2**  | Secure email authentication           |
| **validator**     | Input validation                      |
| **cookie-parser** | Cookie management                     |
| **dotenv**        | Environment variable management       |
| **Morgan**        | HTTP request logging                  |
| **Nodemon**       | Development server                    |

---

# 📂 Project Structure

```text
SecureAccess-Advanced-Authentication-System/
│
├── src/
│   │
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   └── auth.controller.js
│   │
│   ├── middlewares/
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   ├── session.model.js
│   │   └── otp.model.js
│   │
│   ├── routes/
│   │   └── auth.routes.js
│   │
│   ├── services/
│   │   └── email.service.js
│   │
│   ├── utils/
│   │   ├── utils.js
│   │   └── validations.js
│   │
│   └── app.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

# 👤 User Authentication

SecureAccess provides a complete user authentication workflow.

## Registration

Users register with:

* Username
* Email
* Password

The registration process performs:

```text
User Input
    ↓
Validate Data
    ↓
Check Existing User
    ↓
Hash Password
    ↓
Create User
    ↓
Generate OTP
    ↓
Hash OTP
    ↓
Store OTP
    ↓
Send Verification Email
```

---

# 🔐 Password Security

Passwords are never stored directly.

SecureAccess uses **bcrypt** with a strong hashing factor:

```js
const hashedPassword = await bcrypt.hash(password, 12);
```

During login, the password is securely compared with the stored hash.

```text
Plain Password
      │
      ▼
   bcrypt
      │
      ▼
Password Hash
      │
      ▼
    MongoDB
```

This provides secure credential storage while keeping authentication logic isolated from the rest of the application.

---

# 📧 Email OTP Verification

After registration, SecureAccess generates an OTP and sends it to the user's email address.

### Verification Flow

```text
Registration
     │
     ▼
Generate OTP
     │
     ▼
Hash OTP using SHA-256
     │
     ▼
Store OTP Hash
     │
     ▼
Send OTP Email
     │
     ▼
User enters OTP
     │
     ▼
Hash submitted OTP
     │
     ▼
Compare with database
     │
     ▼
Verify User
```

Only the hashed OTP is stored in the database.

After successful verification, the OTP records associated with the user are removed.

---

# 📩 Gmail OAuth2 Email Service

SecureAccess uses **Nodemailer + Gmail OAuth2** for email delivery.

The email service is responsible for:

* Establishing Gmail SMTP connection
* OAuth2 authentication
* Sending plain-text emails
* Sending HTML emails
* Delivering OTP verification emails

Configuration is handled through environment variables:

```env
GOOGLE_USER=your-email@gmail.com
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REFRESH_TOKEN=your-refresh-token
```

This keeps sensitive configuration outside the source code.

---

# 🔑 JWT Authentication

SecureAccess uses JSON Web Tokens for authentication.

Two token types are used:

### Access Token

The Access Token is used to access protected resources.

```text
Access Token
     │
     ▼
Authorization Header
     │
     ▼
Protected API
```

Example:

```http
Authorization: Bearer <access_token>
```

The Access Token currently contains:

```json
{
  "_id": "USER_ID",
  "sessionId": "SESSION_ID"
}
```

---

# 🔄 Refresh Token Architecture

The Refresh Token is used to obtain a new Access Token.

Unlike the Access Token, the Refresh Token is stored in an **HTTP-only cookie**.

```text
Login
  │
  ├───────────────┐
  ▼               ▼
Access Token   Refresh Token
                  │
                  ▼
           HTTP-only Cookie
                  │
                  ▼
              Session
                  │
                  ▼
               MongoDB
```

This creates a clean separation between short-lived API authentication and long-lived session authentication.

---

# 🧠 Session Management

Every successful login creates a session.

A session contains information such as:

```text
User ID
Refresh Token Hash
IP Address
User-Agent
Revoked Status
Created At
Updated At
```

Example:

```json
{
  "user": "USER_ID",
  "refreshTokenHash": "HASH_VALUE",
  "ip": "127.0.0.1",
  "userAgent": "Chrome",
  "revoked": false
}
```

This architecture enables independent session management for users.

---

# 🔐 Refresh Token Hashing

SecureAccess does not need to store the raw Refresh Token inside MongoDB.

Instead:

```text
Refresh Token
      │
      ▼
   SHA-256
      │
      ▼
Refresh Token Hash
      │
      ▼
   MongoDB
```

The hash is used to identify and validate the corresponding session.

This creates a clean separation between the token presented by the client and the value persisted in the database.

---

# 🔄 Refresh Token Rotation

SecureAccess implements Refresh Token Rotation.

When the refresh endpoint is called:

```text
Existing Refresh Token
          │
          ▼
     Verify JWT
          │
          ▼
      Hash Token
          │
          ▼
   Find Active Session
          │
          ▼
 Generate New Access Token
          │
          ▼
Generate New Refresh Token
          │
          ▼
   Hash New Token
          │
          ▼
 Update Session
          │
          ▼
Set New HTTP-only Cookie
```

This allows the authentication session to continuously evolve while maintaining server-side session control.

---

# 🚪 Logout

SecureAccess supports session-specific logout.

```text
Refresh Token
      │
      ▼
Generate Hash
      │
      ▼
Find Session
      │
      ▼
Mark Session Revoked
      │
      ▼
Clear Cookie
```

The session is marked:

```text
revoked = true
```

and the refresh-token cookie is cleared.

---

# 🚪 Logout From All Devices

SecureAccess also supports global session logout.

When a user chooses **Logout All**, all active sessions belonging to that user are revoked.

```text
                    User
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
    Session A    Session B    Session C
        │            │            │
        ▼            ▼            ▼
     Revoked      Revoked      Revoked
```

This provides centralized control over the user's active authentication sessions.

---

# 👤 User Profile

Authenticated users can retrieve their profile through the protected profile endpoint.

The request uses the Access Token:

```http
Authorization: Bearer <ACCESS_TOKEN>
```

The server:

```text
Receive Token
     ↓
Verify JWT
     ↓
Extract User ID
     ↓
Find User
     ↓
Return Profile
```

---

# 🛣️ API Endpoints

## Authentication Routes

| Method | Endpoint                  | Description              |
| ------ | ------------------------- | ------------------------ |
| `POST` | `/api/auth/register`      | Register a new user      |
| `GET`  | `/api/auth/verify-email`  | Verify email using OTP   |
| `POST` | `/api/auth/login`         | Authenticate user        |
| `GET`  | `/api/auth/refresh-token` | Refresh Access Token     |
| `GET`  | `/api/auth/get-me`        | Get authenticated user   |
| `GET`  | `/api/auth/logout`        | Logout current session   |
| `GET`  | `/api/auth/logout-all`    | Logout from all sessions |

---

# 📝 Register User

### Endpoint

```http
POST /api/auth/register
```

### Request Body

```json
{
  "username": "keshav",
  "email": "keshav@example.com",
  "password": "StrongPassword123!"
}
```

### Response

```json
{
  "message": "User Registered Successfully",
  "user": {},
  "verified": false
}
```

An OTP is generated and sent to the registered email address.

---

# 📧 Verify Email

### Endpoint

```http
GET /api/auth/verify-email
```

### Parameters

```text
email
otp
```

Example:

```text
/api/auth/verify-email?email=keshav@example.com&otp=482931
```

### Successful Response

```json
{
  "message": "Email verified successfully",
  "user": {}
}
```

---

# 🔑 Login

### Endpoint

```http
POST /api/auth/login
```

### Request Body

```json
{
  "email": "keshav@example.com",
  "password": "StrongPassword123!"
}
```

### Successful Response

```json
{
  "message": "Logged In Successfully",
  "user": {},
  "accessToken": "JWT_ACCESS_TOKEN"
}
```

A Refresh Token is automatically managed through an HTTP-only cookie.

---

# 🔄 Refresh Access Token

### Endpoint

```http
GET /api/auth/refresh-token
```

The server reads the Refresh Token from the HTTP-only cookie and generates:

* New Access Token
* New Refresh Token

### Response

```json
{
  "message": "Access Token refreshed Successfully",
  "accessToken": "NEW_ACCESS_TOKEN"
}
```

---

# 👤 Get User Profile

### Endpoint

```http
GET /api/auth/get-me
```

### Headers

```http
Authorization: Bearer <ACCESS_TOKEN>
```

### Response

```json
{
  "message": "User Fetched Successfully",
  "user": {}
}
```

---

# 🚪 Logout

### Endpoint

```http
GET /api/auth/logout
```

The current session is revoked and the Refresh Token cookie is cleared.

### Response

```json
{
  "message": "Logged out Successfully"
}
```

---

# 🚪 Logout All Devices

### Endpoint

```http
GET /api/auth/logout-all
```

All active sessions associated with the authenticated user are revoked.

### Response

```json
{
  "message": "Logged out from all devices Successfully"
}
```

---

# 🗄️ Database Design

SecureAccess uses MongoDB with Mongoose.

The authentication system is organized around three primary collections.

## Users

```text
users
 ├── username
 ├── email
 ├── password
 ├── verified
 ├── createdAt
 └── updatedAt
```

## Sessions

```text
sessions
 ├── user
 ├── refreshTokenHash
 ├── ip
 ├── userAgent
 ├── revoked
 ├── createdAt
 └── updatedAt
```

## OTP

```text
otps
 ├── email
 ├── user
 ├── otpHash
 ├── createdAt
 └── updatedAt
```

---

# 🔗 Data Relationships

```text
              ┌──────────────┐
              │     User     │
              └──────┬───────┘
                     │
            ┌────────┴────────┐
            │                 │
            ▼                 ▼
     ┌─────────────┐   ┌─────────────┐
     │   Session   │   │     OTP     │
     └─────────────┘   └─────────────┘
```

A single user can have multiple sessions, enabling multi-device authentication.

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/iamkeshavSharma19/SecureAccess-Advanced-Authentication-System.git
```

## 2. Navigate to the Project

```bash
cd SecureAccess-Advanced-Authentication-System
```

## 3. Install Dependencies

```bash
npm install
```

---

# 🔐 Environment Configuration

Create a `.env` file in the project root:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GOOGLE_USER=your_gmail_address
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
```

Keep environment variables private and never commit sensitive credentials to version control.

---

# ▶️ Running the Project

Start the development server using:

```bash
npm run dev
```

The server will run on:

```text
http://localhost:5000
```

or the port configured through the `PORT` environment variable.

---

# 🧪 Authentication Testing Workflow

A complete authentication flow can be tested using Postman, Thunder Client, Insomnia, or any API testing client.

### Step 1 — Register

```text
POST /api/auth/register
```

↓

### Step 2 — Receive OTP

Check the registered email.

↓

### Step 3 — Verify Email

```text
GET /api/auth/verify-email
```

↓

### Step 4 — Login

```text
POST /api/auth/login
```

↓

### Step 5 — Receive Access Token

Use the Access Token for protected APIs.

↓

### Step 6 — Access Profile

```text
GET /api/auth/get-me
```

↓

### Step 7 — Refresh Token

```text
GET /api/auth/refresh-token
```

↓

### Step 8 — Logout

```text
GET /api/auth/logout
```

---

# 🔐 Security Architecture

SecureAccess incorporates multiple layers of authentication security:

### Password Protection

```text
Password
   ↓
bcrypt
   ↓
Password Hash
```

### OTP Protection

```text
OTP
 ↓
SHA-256
 ↓
OTP Hash
```

### Refresh Token Protection

```text
Refresh Token
      ↓
   SHA-256
      ↓
Refresh Token Hash
      ↓
   MongoDB
```

### Cookie Protection

```text
Refresh Token
      ↓
HTTP-only Cookie
```

### Session Control

```text
Session
   ↓
revoked
   ├── false → Active
   └── true  → Revoked
```

Together, these components create a robust authentication lifecycle.

---

# 🧩 Core Modules

## `auth.controller.js`

Contains the main authentication business logic:

* Registration
* Login
* Email verification
* Token refresh
* Profile retrieval
* Logout
* Logout from all devices

## `auth.js`

Handles authentication-related middleware and protected routes.

## `user.model.js`

Defines the User schema and password-related functionality.

## `session.model.js`

Manages persistent authentication sessions.

## `otp.model.js`

Stores hashed email verification OTPs.

## `email.service.js`

Handles Gmail OAuth2 authentication and email delivery through Nodemailer.

## `validations.js`

Provides user registration validation.

## `utils.js`

Contains reusable authentication and OTP utilities.

---

# 🧠 Key Concepts Demonstrated

This project provides hands-on implementation of:

* Authentication
* Authorization fundamentals
* JWT
* Access Tokens
* Refresh Tokens
* Refresh Token Rotation
* HTTP-only Cookies
* Password Hashing
* OTP Verification
* SHA-256 Hashing
* Session Management
* Session Revocation
* Multi-device Authentication
* MongoDB Relationships
* Mongoose Models
* Express Middleware
* REST API Design
* OAuth2 Email Authentication
* Environment Variables
* Modular Backend Architecture

---

# 📈 Authentication Lifecycle

```text
                    ┌─────────────┐
                    │    USER     │
                    └──────┬──────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │    REGISTER     │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │   EMAIL OTP     │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ VERIFY EMAIL    │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │      LOGIN      │
                  └────────┬────────┘
                           │
                ┌──────────┴──────────┐
                │                     │
                ▼                     ▼
        ┌──────────────┐      ┌──────────────┐
        │Access Token  │      │Refresh Token │
        └──────┬───────┘      └──────┬───────┘
               │                     │
               ▼                     ▼
        ┌──────────────┐      ┌──────────────┐
        │Protected API │      │   Session    │
        └──────────────┘      └──────┬───────┘
                                     │
                                     ▼
                              Token Rotation
                                     │
                                     ▼
                              New Refresh Token
```

---

# 🌟 Why SecureAccess?

SecureAccess was built to explore authentication at a deeper level than a basic login system.

The project combines:

> **JWT + Refresh Tokens + Session Management + OTP Verification + Password Hashing + HTTP-only Cookies + OAuth2 Email**

into one cohesive backend architecture.

This makes the project a strong foundation for authentication in:

* SaaS applications
* Social platforms
* E-commerce applications
* Dashboards
* Developer platforms
* REST APIs
* Full-stack applications

---

# 🚀 Future Enhancements

SecureAccess is designed with an extensible architecture that can support additional authentication capabilities.

Planned enhancements include:

* 🔐 Password Reset & Recovery
* 📧 OTP Resend
* ⏱️ OTP Expiration
* 🛡️ Login Rate Limiting
* 🔄 Advanced Refresh Token Management
* 👥 Role-Based Access Control
* 📱 Active Session Dashboard
* 🔒 Two-Factor Authentication
* 🌐 Google & GitHub OAuth Login
* 📊 Authentication Audit Logs
* ⚡ Redis Integration
* 🧪 Automated Testing
* 📖 Swagger / OpenAPI Documentation
* 🐳 Docker Support
* 🚀 CI/CD Integration

---

# 📊 Project Highlights

| Area               | Implementation            |
| ------------------ | ------------------------- |
| Authentication     | JWT                       |
| Password Security  | bcrypt                    |
| Email Verification | OTP                       |
| Email Delivery     | Nodemailer + Gmail OAuth2 |
| Access Token       | JWT                       |
| Refresh Token      | JWT + HTTP-only Cookie    |
| Token Storage      | SHA-256 Hash              |
| Session Storage    | MongoDB                   |
| Session Control    | Revocation                |
| Token Lifecycle    | Refresh Token Rotation    |
| Database           | MongoDB                   |
| ODM                | Mongoose                  |
| API                | REST                      |
| Runtime            | Node.js                   |
| Framework          | Express.js                |

---

# 🎓 Learning Outcomes

Building SecureAccess provides practical experience with modern backend authentication concepts.

Through this project, the following concepts are implemented:

```text
Authentication
      ↓
Credential Security
      ↓
Email Verification
      ↓
Token Management
      ↓
Session Management
      ↓
Token Rotation
      ↓
Session Revocation
```

The project demonstrates how these individual concepts can work together as one complete authentication architecture.

---

# 👨‍💻 Author

## Keshav Sharma



Passionate about building modern web applications and exploring backend architecture, authentication systems, and full-stack development.

### GitHub

https://github.com/iamkeshavSharma19

### Repository

https://github.com/iamkeshavSharma19/SecureAccess-Advanced-Authentication-System

---

# ⭐ Support

If you find this project useful or interesting:

⭐ **Star the repository**

🍴 **Fork the project**

🐛 **Report issues**

💡 **Suggest improvements**

🤝 **Contribute**

---

# 📜 License

This project is licensed under the **ISC License**.

---

<p align="center">
  Built with ❤️ using Node.js, Express.js, MongoDB & JWT
</p>
