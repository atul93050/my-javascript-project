# Task Manager Browser Extension

## Overview
The **Task Manager Browser Extension** is a simple task-tracking tool that allows users to create, manage, and track their tasks within the browser. It features a drag-and-drop interface and stores tasks using the **Chrome Storage API**, ensuring persistence across browser sessions.

## Features
- ✅ **Task Creation:** Users can add tasks via an input field.
- ✅ **Drag-and-Drop Management:** Tasks can be moved between *Pending, Working,* and *Completed* sections.
- ✅ **Task Deletion:** Users can remove tasks when they are no longer needed.
- ✅ **Task Statistics:** Displays total tasks, pending, working, and completed task counts.
- ✅ **Persistent Storage:** Saves tasks using the Chrome Storage API.
- ✅ **One-Click Installation:** Install the extension from the browser toolbar.
- ✅ **Responsive UI:** Works across different screen sizes.

## Installation Guide
### Step 1: Enable Developer Mode
1. Open Google Chrome.
2. Go to **chrome://extensions/**.
3. Enable **Developer mode** (toggle switch at the top-right corner).

### Step 2: Load Unpacked Extension
1. Click on **Load Unpacked**.
2. Select the folder containing the extension files.
3. The Task Manager extension should now appear in the extensions list.

## File Structure
```
Task-Manager-Extension/
│── manifest.json       # Chrome Extension configuration
│── index.html          # Main popup UI
│── styles.css          # Styles for the extension
│── script.js           # Main logic for task management
│── storage.js          # Task persistence using Chrome Storage API
│── install.js          # Handles extension installation prompts
│── icon.png            # Extension icon
```

## Screenshots
### 1. Task Manager UI
![Task Manager UI](screenshots/ui.png)

### 2. Drag-and-Drop Feature
![Drag-and-Drop](screenshots/drag-drop.png)

### 3. Chrome Extension Installation Guide
![Installation Guide](screenshots/install-guide.png)

## Usage
1. Click on the extension icon in the Chrome toolbar.
2. Add a new task using the input field.
3. Drag tasks between **Pending, Working, and Completed** sections.
4. Delete tasks when completed.

## Future Enhancements
- 🔹 **User Authentication (Login/Signup)**
- 🔹 **Task Due Dates & Reminders**
- 🔹 **Dark Mode Support**
- 🔹 **Task Filtering & Search**
- 🔹 **Sync Tasks Across Devices with Google Login**

## License
This project is open-source and available under the **MIT License**.

---

📌 *For any issues or feature requests, feel free to contribute or open an issue on GitHub!* 🚀
