# ✨ TaskFlow - Collaborative Task Management Board

**TaskFlow** is a cutting-edge, real-time collaborative Kanban-style task management application that revolutionizes team productivity. Built with the modern MERN stack (MongoDB, Express.js, React, Node.js) and powered by Socket.IO for seamless real-time collaboration.

## 🎯 Vision & Mission

TaskFlow is designed to eliminate the chaos of traditional task management. Our mission is to provide teams with an intelligent, intuitive, and beautiful platform that automatically optimizes workflow distribution while maintaining the highest standards of data integrity and user experience.

**Key Principles:**
- 🚀 **Effortless Collaboration**: Real-time sync across all team members
- 🧠 **Intelligent Automation**: Smart task assignment based on workload analysis  
- 🛡️ **Data Integrity**: Advanced conflict resolution to prevent data loss
- ✨ **Beautiful UX**: Modern, responsive design that works everywhere

## Tech Stack

### Backend

- Node.js & Express.js
- MongoDB with Mongoose
- Socket.IO for real-time updates
- JWT for authentication
- bcryptjs for password hashing

### Frontend

- React (Vite)
- react-beautiful-dnd for drag-and-drop
- Socket.IO Client
- Axios for API requests
- Custom CSS (no UI frameworks)

## Features

✨ **TaskFlow Pro** is packed with powerful features designed for modern teams:

- **🔐 User Authentication**

  - Secure signup/login with JWT tokens
  - Password hashing with bcrypt for maximum security

- **📋 Real-time Kanban Board**

  - Beautiful three-column layout: Todo, In Progress, Done
  - Smooth drag-and-drop task management
  - Instant real-time updates across all connected users
  - Custom card flip animation during drag operations

- **🤖 Smart Task Assignment**

  - "Smart Assign" button automatically distributes tasks to the least busy team member
  - Intelligent workload analysis and distribution
  - Real-time assignment updates across all users

- **⚡ Advanced Conflict Resolution**

  - Sophisticated version tracking for all tasks
  - Detects simultaneous edits by different users
  - User-friendly conflict resolution interface
  - Prevents accidental data loss with smart merging options

- **📊 Activity Logging**
  - Real-time activity feed
  - Tracks all task-related actions
  - Shows who did what and when
  - Last 20 actions always visible

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Git

### Backend Setup

1. Clone the TaskFlow Pro repository:

   ```bash
   git clone [repository-url]
   cd Todo-assinment
   ```

2. Install server dependencies:

   ```bash
   cd server
   npm install
   ```

3. Create a `.env` file in the server directory with:

   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Open a new terminal and navigate to the client directory:

   ```bash
   cd ../client
   ```

2. Install client dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The TaskFlow Pro application will be available at `http://localhost:5173`

## Implementation Details

### Smart Assign Logic

The Smart Assign feature works by:

1. Calculating the current workload of each user
2. Finding users with active tasks (status != 'Done')
3. Identifying the user with the lowest number of active tasks
4. Automatically assigning the task to that user
5. Updating all connected clients in real-time

```javascript
// Simplified Smart Assign Logic
const userTaskCounts = users.map((user) => ({
  user,
  taskCount: tasks.filter(
    (task) => task.assignedTo?.equals(user._id) && task.status !== "Done"
  ).length,
}));
const leastBusyUser = userTaskCounts.sort(
  (a, b) => a.taskCount - b.taskCount
)[0];
```

### Conflict Resolution System

The conflict handling system uses:

1. Version tracking for each task
2. Optimistic UI updates
3. Server-side version verification
4. Conflict detection and resolution UI

When a conflict is detected:

1. Both versions are displayed to the user
2. Users can choose to:
   - Merge changes (combining both versions)
   - Overwrite (selecting one version)
3. The chosen resolution is broadcast to all users

```javascript
// Simplified Conflict Detection
if (task.version !== receivedVersion) {
  return {
    conflict: true,
    serverVersion: task,
    clientVersion: receivedTask,
  };
}
```

## Usage Guide

1. **Authentication**

   - Register with email and password
   - Login to access the Kanban board

2. **Task Management**

   - Create tasks with title, description, and priority
   - Drag tasks between columns
   - Use "Smart Assign" for automatic task assignment

3. **Collaboration**

   - All changes sync in real-time
   - Activity log shows recent actions
   - Resolve conflicts when they occur

4. **Mobile Usage**
   - Responsive design works on all devices
   - Vertical layout on smaller screens
   - Touch-friendly interactions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this project for learning and development.
