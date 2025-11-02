# Login and CRUD Operations with Fetch API
## Overview

This project is a simple React application demonstrating:
- User authentication (mock login)
- CRUD operations using Fetch API
- State management with Redux Toolkit
- UI built with Material UI (MUI)
- Routing handled by React Router v6

All API calls interact with the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) , a fake REST API used for prototyping and testing.

## Features
### Login
- Username and password fields with validation
- Error shown for empty inputs
- Stores username in Redux and persists it in localStorage
- Navigates to the Posts page after successful login

### Posts Page
- Displays posts fetched from https://jsonplaceholder.typicode.com/posts
- Includes:
   - Header with logo, username, and logout button
   - Scrollable post list (with title, body, user ID)
   - Create, Edit, and Delete dialogs
   - Footer with contact and copyright info

### CRUD Operations

- Create (POST) – Adds a new post using fetch, updates Redux store instantly
- Read (GET) – Loads all posts from API on mount
- Update (PUT) – Edits post via API and updates Redux store
- Delete (DELETE) – Removes post after confirmation
- Toast notifications for success/error states

## Tech Stack
| **Category**        | **Tools / Libraries**                      |
|----------------------|---------------------------------------------|
| Frontend             | React, TypeScript                          |
| Build Tool           | Vite                                       |
| State Management     | Redux Toolkit                              |
| UI Components        | Material UI (MUI), MUI Lab                 |
| Routing              | React Router v6                            |
| API                  | JSONPlaceholder                            |
| Notifications        | react-toastify                             |
| Loader               | Custom HOC with MUI Skeleton               |

## Folder Structure
```
 src/
 ├── components/
 │   ├── Header/
 │   ├── Footer/
 │   ├── PostCard/
 │   ├── PostList/
 │   └── CreatePostDialog/
 ├── context/
 ├── hoc/
 ├── pages/
 ├── redux/
 ├── services/
 ├── styles/
 ├── App.tsx
 ├── main.tsx
 └── index.html
```
## How to Run
### Install dependencies
``` npm install ```

### Run the app
``` npm run dev ```

### Build for production
``` npm run build ```

## Redux Setup Summary

- **Store**: Configured using configureStore() from Redux Toolkit
- **Slice(slice.ts)**:
   - list – stores all posts
   - addPost, updatePost, deletePost, setPosts reducers
- RootState and AppDispatch exported for type safety
- **Provider** wraps app in main.tsx
