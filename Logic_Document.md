## Smart Assign Logic

The "Smart Assign" feature is designed to automatically delegate a task to the user who currently has the lightest workload. This helps to ensure an even distribution of tasks among all team members.

Here's a step-by-step breakdown of how it works:

1.  **Initiation**: The process begins when a user clicks the "Smart Assign" button on a specific task card.

2.  **Data Collection**: The system gathers two key pieces of information:
    *   A complete list of all registered users.
    *   A list of all tasks that are currently considered "active" (i.e., not in the "Done" column).

3.  **Workload Calculation**: For each user, the system counts how many of the active tasks are assigned to them. This count represents their current workload.

4.  **Identifying the Least Busy User**: The users are then ranked based on their task count, from lowest to highest. The user at the top of this list is identified as the "least busy."

5.  **Task Assignment**: The task that the "Smart Assign" button was clicked on is then assigned to this least busy user.

6.  **Real-time Update**: The change in assignment is saved to the database, and a real-time notification is sent to all connected users, ensuring everyone's board reflects the new assignment instantly.

## Conflict Handling Logic

Conflict handling is crucial in a collaborative environment to prevent users from accidentally overwriting each other's work. This system addresses this by tracking task versions.

Here’s the process:

1.  **Versioning**: Every task in the database has a version number. This number starts at 1 and increments every time the task is successfully updated.

2.  **Update Attempt**: When a user tries to update a task (e.g., by dragging it to a new column), the application sends the updated task information along with the version number it currently has on the user's screen to the server.

3.  **Server-Side Verification**: The server receives the update request and compares the version number from the user with the version number of the task stored in the database.

4.  **Conflict Detection**: A conflict is detected if the version numbers do not match. This indicates that another user has updated the task since the first user loaded the data.

5.  **Conflict Notification**: If there's a conflict, the server rejects the update and sends a "conflict" error back to the user, along with the latest version of the task from the database.

6.  **User Resolution**: The user's interface will then display a notification about the conflict, showing both their attempted changes and the current version of the task. The user is then given the option to either:
    *   **Overwrite**: Discard the other user's changes and apply their own.
    *   **Merge/Refresh**: Discard their own changes and refresh their view to see the most up-to-date version of the task.

### Example Scenario:

*   **User A** and **User B** both have the same task, "Design Homepage," on their screen. The task is at **Version 1**.
*   **User A** drags the task from "Todo" to "In Progress." The application sends the update to the server with `version: 1`.
*   The server checks the database, sees the task is also at `version: 1`, accepts the change, updates the task's status, and increments its version to **2**.
*   A moment later, **User B** (who still sees the task at Version 1) drags the same task to the "Done" column. The application sends an update request with `version: 1`.
*   The server receives this request, but sees that the task in the database is now at **Version 2**. Since `1 !== 2`, a conflict is detected.
*   The server sends a conflict error to **User B**, who is then prompted to resolve it.
