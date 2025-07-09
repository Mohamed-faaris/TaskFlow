# ✨ TaskFlow - Collaborative Task Management Board

**TaskFlow** is a cutting-edge, real-time collaborative Kanban-style task management application that revolutionizes team productivity. Built with the modern MERN stack and powered by Socket.IO for seamless real-time collaboration.


![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-orange)

## 📋 Project Overview

TaskFlow transforms how teams collaborate on projects by providing an intelligent, real-time task management platform. Unlike traditional task boards, TaskFlow features smart automation that automatically distributes workload, sophisticated conflict resolution to prevent data loss, and real-time synchronization that keeps every team member instantly updated.

### 🎯 Vision & Mission

TaskFlow is designed to eliminate the chaos of traditional task management. Our mission is to provide teams with an intelligent, intuitive, and beautiful platform that automatically optimizes workflow distribution while maintaining the highest standards of data integrity and user experience.

**Core Values:**

- 🚀 **Effortless Collaboration**: Real-time sync across all team members
- 🧠 **Intelligent Automation**: Smart task assignment based on workload analysis
- 🛡️ **Data Integrity**: Advanced conflict resolution to prevent data loss
- ✨ **Beautiful UX**: Modern, responsive design that works everywhere
- 🔒 **Security First**: JWT authentication and secure data handling

### 🌟 What Makes TaskFlow Different

- **Smart Assignment**: Automatically distributes tasks to balance team workload
- **Real-time Collaboration**: See changes instantly as teammates work
- **Conflict Resolution**: Never lose work when multiple people edit simultaneously
- **Activity Tracking**: Complete audit trail of all team actions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## 🛠️ Tech Stack

### Backend Architecture

- **Node.js & Express.js**: Server runtime and web framework
- **MongoDB & Mongoose**: NoSQL database with object modeling
- **Socket.IO**: Real-time bidirectional event-based communication
- **JWT (jsonwebtoken)**: Secure authentication tokens
- **bcryptjs**: Password hashing and encryption
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Frontend Technologies

- **React 19**: Modern UI library with hooks and context
- **Vite**: Fast build tool and development server
- **@hello-pangea/dnd**: Drag-and-drop functionality for Kanban boards
- **Socket.IO Client**: Real-time client-side communication
- **Axios**: HTTP client for API requests
- **React Router DOM**: Client-side routing
- **Lucide React**: Modern icon library
- **Custom CSS**: Hand-crafted responsive styling (no UI frameworks)

### Development Tools

- **ESLint**: Code linting and quality assurance
- **Nodemon**: Auto-restart development server
- **Concurrently**: Run multiple npm scripts simultaneously

## 🚀 Setup and Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Installation guide](https://docs.mongodb.com/manual/installation/)
- **Git** - [Download here](https://git-scm.com/downloads)
- **npm** or **yarn** (comes with Node.js)

### 📁 Project Structure

```
TaskFlow/
├── client/          # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── assets/       # Static assets
│   │   └── main.jsx      # Application entry point
│   ├── public/          # Public assets
│   └── package.json     # Frontend dependencies
├── server/          # Node.js backend application
│   ├── config/          # Database configuration
│   ├── middleware/      # Custom middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   └── index.js         # Server entry point
├── package.json     # Root package.json
└── README.md        # This file
```

### 🔧 Installation Steps

#### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/your-username/taskflow.git
cd taskflow

# Or download and extract ZIP file
```

#### 2. Backend Setup

```bash
# Navigate to the project root
cd taskflow

# Install root dependencies (includes concurrently for running both servers)
npm install

# Navigate to server directory
cd server

# Install server dependencies
npm install
```

#### 3. Environment Configuration

Create a `.env` file in the `server` directory:

```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/taskflow
# For MongoDB Atlas: MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Server Configuration
PORT=5000
NODE_ENV=development

# Optional: Enable debug logging
DEBUG=taskflow:*
```

**Important Security Notes:**

- Replace `your_super_secret_jwt_key_here_make_it_long_and_random` with a strong, random string
- Never commit your `.env` file to version control
- Use different secrets for development and production

#### 4. Database Setup

**Option A: Local MongoDB**

```bash
# Start MongoDB service (varies by OS)
# Windows: net start mongodb
# macOS: brew services start mongodb/brew/mongodb-community
# Linux: sudo systemctl start mongod

# The application will automatically create the database and collections
```

**Option B: MongoDB Atlas (Cloud)**

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Replace `MONGO_URI` in your `.env` file

#### 5. Frontend Setup

```bash
# Open a new terminal and navigate to client directory
cd client

# Install frontend dependencies
npm install
```

#### 6. Running the Application

**Option A: Run Both Frontend and Backend Simultaneously (Recommended)**

```bash
# From the project root directory
npm run dev

# This will start:
# - Backend server on http://localhost:5000
# - Frontend development server on http://localhost:5173
```

**Option B: Run Frontend and Backend Separately**

```bash
# Terminal 1: Start the backend server
cd server
npm start
# Backend will run on http://localhost:5000

# Terminal 2: Start the frontend development server
cd client
npm run dev
# Frontend will run on http://localhost:5173
```

### 🌐 Accessing the Application

- **Frontend**: Open your browser and navigate to `http://localhost:5173`
- **Backend API**: Available at `http://localhost:5000`
- **API Documentation**: Visit `http://localhost:5000/api` for available endpoints

### 🔍 Verifying Installation

1. Open `http://localhost:5173` in your browser
2. You should see the TaskFlow login/register page
3. Create a new account or login
4. You should be redirected to the Kanban board
5. Try creating a task and moving it between columns

## ✨ Features List and Usage Guide

### 🔐 Authentication System

**Features:**

- Secure user registration and login
- JWT token-based authentication
- Password encryption with bcrypt
- Automatic token refresh
- Protected routes

**Usage:**

1. **Registration**: Click "Register" and provide username, email, and password (minimum 6 characters)
2. **Login**: Use your credentials to access the dashboard
3. **Auto-login**: Your session persists across browser sessions
4. **Logout**: Click the logout button to securely end your session

### 📋 Kanban Board Management

**Features:**

- Three-column layout: Todo, In Progress, Done
- Drag-and-drop task movement
- Real-time updates across all users
- Smooth animations and visual feedback
- Mobile-responsive design

**Usage:**

1. **View Tasks**: All tasks are displayed in their respective columns
2. **Move Tasks**: Drag any task card to a different column
3. **Real-time Updates**: See changes made by teammates instantly
4. **Visual Feedback**: Cards animate during movement with flip effects

### ➕ Task Management

**Features:**

- Create tasks with title, description, and priority
- Edit task details inline
- Delete tasks with confirmation
- Task assignment to team members
- Priority levels (High, Medium, Low)

**Usage:**

1. **Create Task**: Click "Add Task" button and fill in details
2. **Edit Task**: Click on any task card to modify details
3. **Delete Task**: Use the delete button with confirmation dialog
4. **Assign Task**: Use dropdown to assign tasks to team members

### 🤖 Smart Assignment System

**Features:**

- Automatic workload balancing
- One-click task distribution
- Real-time workload analysis
- Fair assignment algorithm
- Instant team notifications

**Usage:**

1. **Smart Assign**: Click the "Smart Assign" button on any unassigned task
2. **Automatic Selection**: System chooses the team member with the lightest workload
3. **Instant Update**: Assignment appears immediately on all team members' boards
4. **Activity Log**: Assignment action is recorded for transparency

### ⚡ Conflict Resolution

**Features:**

- Version tracking for all tasks
- Conflict detection on simultaneous edits
- User-friendly resolution interface
- Multiple resolution options
- Complete audit trail

**Usage:**

1. **Conflict Detection**: System automatically detects when conflicts occur
2. **Notification**: Clear alert shows what changed and who made the change
3. **Resolution Options**: Choose to merge changes, overwrite, or refresh
4. **Decision Control**: You always have final say on how conflicts are resolved

### 📊 Activity Logging

**Features:**

- Real-time activity feed
- Complete action history
- User attribution for all changes
- Timestamp tracking
- Collapsible drawer interface

**Usage:**

1. **View Activity**: Click the activity log drawer at the bottom of the screen
2. **Real-time Updates**: See new activities appear instantly
3. **History**: Scroll through past actions and changes
4. **Details**: Each entry shows user, action, task, and timestamp

### 📱 Responsive Design

**Features:**

- Mobile-first responsive layout
- Touch-friendly interactions
- Adaptive navigation
- Optimized performance
- Cross-browser compatibility

**Usage:**

- **Desktop**: Full feature set with drag-and-drop
- **Tablet**: Optimized layout with touch interactions
- **Mobile**: Vertical layout with simplified navigation
- **All Devices**: Consistent experience across platforms

## 🧠 Smart Assign Logic Explanation

### Problem Statement

Traditional task management relies on manual assignment, which often leads to:

- Uneven workload distribution
- Team members becoming overwhelmed while others are underutilized
- Manual tracking of who has capacity for new work
- Delayed project completion due to bottlenecks

### Solution Architecture

TaskFlow's Smart Assign feature solves this through intelligent automation:

#### 1. **Real-time Workload Analysis**

```
For each team member:
- Count active tasks (Todo + In Progress columns)
- Calculate current workload score
- Rank team members by availability
```

#### 2. **Intelligent Assignment Algorithm**

```
Algorithm Steps:
1. Gather all registered users
2. Filter to active team members
3. Count active tasks per user
4. Identify user with minimum active tasks
5. Assign new task to least busy user
6. Broadcast update to all connected clients
```

#### 3. **Real-World Example**

**Team Setup:**

- Alice: 3 active tasks (2 Todo, 1 In Progress)
- Bob: 1 active task (1 In Progress)
- Charlie: 5 active tasks (4 Todo, 1 In Progress)

**Smart Assign Process:**

1. New task "Fix authentication bug" needs assignment
2. System calculates: Alice=3, Bob=1, Charlie=5
3. Bob has the lowest count (1), so he gets the new task
4. All team members see the assignment instantly
5. Activity log records "Task auto-assigned to Bob"

#### 4. **Benefits**

- **Automatic Load Balancing**: Prevents team member burnout
- **Improved Efficiency**: Tasks go to available team members immediately
- **Transparency**: All assignments are logged and visible
- **Real-time Updates**: No delays in task distribution

## 🛡️ Conflict Resolution System Explanation

### The Challenge

In collaborative environments, conflicts occur when:

- Multiple users edit the same task simultaneously
- Network delays cause updates to arrive out of order
- Users work with outdated information
- Simultaneous changes could overwrite important work

### Technical Implementation

#### 1. **Version Tracking System**

```javascript
// Each task has a version number
const task = {
  _id: "task123",
  title: "Design homepage",
  status: "todo",
  version: 3, // Increments with each change
  updatedAt: "2025-01-09T10:30:00Z",
};
```

#### 2. **Conflict Detection Process**

```javascript
// When user attempts an update
const updateAttempt = {
  taskId: "task123",
  changes: { status: "in-progress" },
  clientVersion: 3, // Version user currently sees
};

// Server-side validation
if (updateAttempt.clientVersion !== currentTask.version) {
  // Conflict detected!
  return conflictResolution(updateAttempt, currentTask);
}
```

#### 3. **Resolution Workflow**

```
Conflict Detected →
├── Show both versions to user
├── Highlight differences
├── Provide resolution options:
│   ├── Override (use my changes)
│   ├── Merge (combine both changes)
│   └── Refresh (see latest version)
└── Log resolution for audit trail
```

### Real-World Conflict Scenarios

#### **Scenario 1: Status Change Conflict**

**Setup:**

- Task: "User testing feedback" (Version 2)
- Alice and Bob both viewing the task

**Conflict:**

1. Alice moves task to "In Progress" (Version 3)
2. Bob (still seeing Version 2) moves task to "Done"
3. System detects Bob's version (2) ≠ current version (3)

**Resolution:**

- Bob sees: "Alice recently moved this task to 'In Progress'"
- Bob chooses: Keep Alice's change or override with "Done"
- Decision is logged and broadcast to team

#### **Scenario 2: Content Edit Conflict**

**Setup:**

- Task: "API documentation" (Version 1)
- Sarah and Mike both add notes

**Conflict:**

1. Sarah adds "Include authentication examples" (Version 2)
2. Mike adds "Add rate limiting section" (Version 1 → conflict)

**Resolution:**

- Mike sees both additions
- Options: Merge both notes, keep only his, or refresh
- Combined result: Both requirements included

#### **Scenario 3: Assignment Conflict**

**Setup:**

- Unassigned task: "Database optimization"
- Tom and Lisa both claim it

**Conflict:**

1. Tom assigns to himself (Version 2)
2. Lisa tries to assign to herself (Version 1 → conflict)

**Resolution:**

- Lisa sees Tom already claimed it
- Options: Leave with Tom, reassign to herself, or discuss
- Clear ownership established

### System Benefits

#### **Data Integrity**

- No work is ever lost without user consent
- All changes are tracked and reversible
- Complete audit trail for accountability

#### **User Control**

- Users always see what changed before deciding
- Multiple resolution options available
- Clear information about who made changes

#### **Team Coordination**

- Conflicts become collaboration opportunities
- Transparent decision-making process
- Real-time communication about changes

### Best Practices for Teams

#### **Minimize Conflicts:**

- Refresh your view regularly
- Check activity log before major changes
- Communicate about work in progress
- Make frequent, smaller updates

#### **Handle Conflicts Effectively:**

- Read conflict notifications carefully
- Consider teammate's perspective
- Choose merge when possible
- Communicate with team when uncertain

This robust conflict resolution system ensures TaskFlow remains reliable and trustworthy for mission-critical team collaboration.

## 🚀 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth` - Get current user

### Tasks

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Smart Assignment

- `POST /api/smart-assign/:taskId` - Auto-assign task to least busy user

### Activity Log

- `GET /api/actions` - Get recent activity log

## 🧪 Testing

### Running Tests

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test

# Run all tests
npm run test:all
```

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Task creation, editing, deletion
- [ ] Drag-and-drop functionality
- [ ] Real-time updates across multiple browsers
- [ ] Smart assignment feature
- [ ] Conflict resolution
- [ ] Mobile responsiveness

## 🚀 Deployment

### Environment Setup

Create production `.env`:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow-prod
JWT_SECRET=your_production_jwt_secret_very_long_and_secure
NODE_ENV=production
PORT=5000
```

### Build and Deploy

```bash
# Build frontend for production
cd client
npm run build

# Start production server
cd ../server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Ensure mobile responsiveness

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues

- **MongoDB Connection**: Ensure MongoDB is running and connection string is correct
- **Port Conflicts**: Change ports in configuration if 5000/5173 are in use
- **Real-time Issues**: Check firewall settings for WebSocket connections

### Getting Help

- Create an issue on GitHub for bugs
- Check existing issues for solutions
- Contact the development team for support

### System Requirements

- **Minimum**: Node.js 16+, 4GB RAM, MongoDB 4.4+
- **Recommended**: Node.js 18+, 8GB RAM, MongoDB 5.0+

---

**Built with ❤️ by the TaskFlow Team**

_Making collaboration effortless, one task at a time._
