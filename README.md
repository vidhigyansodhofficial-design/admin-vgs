# Vidhi Gyan - Admin Panel

Welcome to the Admin Panel for **Vidhi Gyan**. This application provides a secure, dynamic, and real-time dashboard for managing the e-learning platform's users, courses, analytics, and security.

This documentation serves as a guide to the components, project structure, and technical stack used in the admin panel.

---

## 🚀 Tech Stack & Design System

- **Core Framework:** React 18, Vite, TypeScript
- **Routing:** React Router v6 (`react-router-dom`)
- **Backend & Database:** Supabase (PostgreSQL, Realtime Subscriptions, Auth via Custom Table)
- **Styling & UI:** Tailwind CSS, Glassmorphism aesthetics ("Antigravity" theme), `shadcn/ui` components
- **Icons:** Lucide React
- **Data Visualization:** Recharts (Area, Pie, Bar charts)
- **Animations:** Framer Motion (`motion/react`) for drag-and-drop lists and page transitions
- **Notifications:** Sonner (Toast notifications)

---

## 📁 Project Structure

The project follows a standard scalable React structure:

```text
admin-vgs/
├── .env                    # Supabase credentials (URL, Anon Key)
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Shadcn base components (Button, Card, Input, Dialog, etc.)
│   │   └── AdminLayout.tsx # Persistent sidebar, header, and user session display
│   ├── lib/
│   │   ├── supabase.ts     # Supabase client initialization
│   │   └── utils.ts        # Helper functions (e.g., Tailwind class merging `cn`)
│   ├── pages/              # Main Route Views (Details below)
│   ├── App.tsx             # Application routing & ProtectedRoute wrapper
│   ├── index.css           # Global CSS, Tailwind directives, and Glassmorphism variables
│   └── main.tsx            # React DOM entry point
└── package.json
```

---

## 🧩 Key Components & Pages

### 1. Authentication & Layout
* **`Login.tsx`**: Secure entry point. Verifies the input email against the `public.admin_users` Supabase table. Upon successful authentication, it stores an `adminSession` in local storage and redirects the user.
* **`App.tsx (ProtectedRoute)`**: Acts as a middleware wrapper. If a user attempts to access any `/admin/*` route without a valid session, they are bounced back to `/login`.
* **`AdminLayout.tsx`**: The persistent shell around the dashboard. It dynamically renders the logged-in administrator's name and role, provides responsive navigation (desktop sidebar / mobile hamburger menu), and handles secure logout.

### 2. Core Dashboard Pages
* **`Dashboard.tsx`**: The control center. Features real-time listeners (`supabase.channel`) mapping live changes in the database to the UI. Displays Total Learners, Active Courses, Estimated Revenue, recent security logs, and dynamically tracks the most popular courses.
* **`Analytics.tsx`**: Deep-dive metrics. visualizes student engagement intensity, drop-off rates, and global course completion percentages using `Recharts`. Also features real-time data binding.

### 3. Resource Management
* **`Users.tsx`**: A live directory of all registered platform learners, fetching directly from the `public.users` table. Includes real-time database subscriptions to instantly show new signups.
* **`Courses.tsx`**: The master catalog manager. Implements full CRUD (Create, Read, Update, Delete) operations for the `public.courses` table via intuitive modal dialogs.
* **`CourseDetails.tsx`**: The curriculum matrix. Clicking into a specific course reveals this page. It handles:
  * Editing main course metadata (Title, Price, Category).
  * Adding and configuring video/document lessons stored in the `public.course_syllabus` table.
  * Drag-and-drop sequence reordering (using `motion/react`) which automatically updates the `order_index` in the database.

---

## 🗄️ Database Schema & Integration

The application relies heavily on **Supabase** for its backend state. Key tables utilized include:
- `admin_users`: Authorized administrative personnel.
- `users`: End-user/learner accounts.
- `courses`: Master record for available educational modules.
- `course_syllabus`: The lesson structure and curriculum content for each course.
- `user_course_enrollments`: Tracks student purchases and completion progress for Analytics.

**Note:** The application uses Supabase's `on('postgres_changes')` API extensively to ensure the UI is immediately reflective of the true database state without requiring manual browser refreshes.

---

## 🔒 Security Notes
1. **Row Level Security (RLS)**: Must be configured properly in Supabase. By default, `admin_users` should allow `SELECT` queries for the login mechanism to work, while other tables can have strict policies based on the application's architecture.
2. **Session Storage**: Admin sessions are currently mapped in `localStorage`. For production scaling, consider bridging this with Supabase Auth (JWTs).
