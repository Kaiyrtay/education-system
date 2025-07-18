# Education System – Backend API

This is the backend REST API for managing users, students, teachers, subjects, and class schedules. It uses Django + Django REST Framework with JWT-based authentication.

---

## Authentication (JWT)

**Base URLs:**

| Method | Endpoint              | Description                      |
| ------ | --------------------- | -------------------------------- |
| POST   | `/api/token/`         | Obtain access and refresh tokens |
| POST   | `/api/token/refresh/` | Refresh access token             |

**Request body:**

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

---

## Users

**Base URL:** `/api/users/`

| Method | Endpoint | Description           |
| ------ | -------- | --------------------- |
| GET    | `/user/` | Retrieve current user |

---

## Students

**Base URL:** `/api/students/`

### Groups

| Method | Endpoint        | Description     |
| ------ | --------------- | --------------- |
| GET    | `/groups/`      | List all groups |
| POST   | `/groups/`      | Create group    |
| GET    | `/groups/<id>/` | Retrieve group  |
| PUT    | `/groups/<id>/` | Update group    |
| DELETE | `/groups/<id>/` | Delete group    |

### Students

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| GET    | `/students/`      | List all students |
| POST   | `/students/`      | Create student    |
| GET    | `/students/<id>/` | Retrieve student  |
| PUT    | `/students/<id>/` | Update student    |
| DELETE | `/students/<id>/` | Delete student    |

---

## Teachers

**Base URL:** `/api/teachers/`

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| GET    | `/teachers/`      | List all teachers |
| POST   | `/teachers/`      | Create teacher    |
| GET    | `/teachers/<id>/` | Retrieve teacher  |
| PUT    | `/teachers/<id>/` | Update teacher    |
| DELETE | `/teachers/<id>/` | Delete teacher    |

---

## Subjects

**Base URL:** `/api/subjects/`

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| GET    | `/subjects/`      | List all subjects |
| POST   | `/subjects/`      | Create subject    |
| GET    | `/subjects/<id>/` | Retrieve subject  |
| PUT    | `/subjects/<id>/` | Update subject    |
| DELETE | `/subjects/<id>/` | Delete subject    |

---

## Schedules

**Base URL:** `/api/schedules/`

| Method | Endpoint           | Description               |
| ------ | ------------------ | ------------------------- |
| GET    | `/schedules/`      | List all schedule entries |
| POST   | `/schedules/`      | Create schedule entry     |
| GET    | `/schedules/<id>/` | Retrieve schedule         |
| PUT    | `/schedules/<id>/` | Update schedule           |
| DELETE | `/schedules/<id>/` | Delete schedule           |

---

## Admin Panel

Accessible at `/admin/` with superuser credentials.

<hr>

# Education System – Frontend (Angular)

This is the **Angular v19** frontend for managing users, groups, subjects, students, teachers, and class schedules. It uses **Bootstrap 5** for styling, **standalone components**, and communicates with the Django REST API using **JWT authentication**.

---

## Authentication

| Route     | Description                                  |
| --------- | -------------------------------------------- |
| `/login`  | Login with username/password, obtain tokens. |
| `/logout` | Clear tokens and return to login.            |

**Behavior**

- Access and refresh tokens stored in `localStorage` (`access_token`, `refresh_token`).
- HTTP interceptor attaches `Authorization: Bearer <access_token>` to all API requests (except token endpoints).
- On `401` responses the interceptor attempts to refresh the access token via `/api/token/refresh/` and retries the failed request.
- Forced logout only occurs if refresh fails (expired/invalid) or user clicks Logout.

---

## Shared Layout

| Component / Service              | Purpose                                                                         |
| -------------------------------- | ------------------------------------------------------------------------------- |
| `NavbarComponent`                | Top navigation; role‑based links; Logout button; hidden when not authenticated. |
| `HeroComponent`                  | Landing header shown to unauthenticated visitors.                               |
| `FooterComponent`                | Global footer always shown.                                                     |
| `AuthService`                    | Login, logout, token storage, role load, refresh support.                       |
| `authInterceptor`                | Injects token; handles auto‑refresh on 401.                                     |
| `AuthGuard` (optional / planned) | Protects private routes; redirect to `/login` if unauthenticated.               |

---

## Roles & UI Links

Menu content changes after login based on the current user's role (stored in `current_role` in `localStorage` after calling `/api/users/user/`).

| Role    | Sample Links Shown (routes)                                              |
| ------- | ------------------------------------------------------------------------ |
| admin   | `/users`, `/teachers`, `/students`, `/groups`, `/subjects`, `/schedules` |
| teacher | `/user`, `/subjects`, `/groups`, `/students`, `/schedules`               |
| student | `/user`, `/groups`, `/subjects`, `/teachers`, `/schedules`               |

_Filtering of data by role is currently client‑side planned; all list pages hit full API endpoints._

---

## Users

| Route   | Component             | Description                            |
| ------- | --------------------- | -------------------------------------- |
| `/user` | `UserDetailComponent` | View current logged‑in user (profile). |

---

## Groups

| Route              | Component              | Description      |
| ------------------ | ---------------------- | ---------------- |
| `/groups`          | `GroupListComponent`   | List all groups. |
| `/groups/create`   | `GroupCreateComponent` | Create group.    |
| `/groups/:id`      | `GroupDetailComponent` | View group.      |
| `/groups/:id/edit` | `GroupEditComponent`   | Update group.    |
| delete action      | from list/detail/edit  | Delete group.    |

Backed by: `/api/students/groups/`

---

## Students

| Route                | Component                | Description        |
| -------------------- | ------------------------ | ------------------ |
| `/students`          | `StudentListComponent`   | List all students. |
| `/students/create`   | `StudentCreateComponent` | Create student.    |
| `/students/:id`      | `StudentDetailComponent` | View student.      |
| `/students/:id/edit` | `StudentEditComponent`   | Update student.    |
| delete action        | from list/detail/edit    | Delete student.    |

Backed by: `/api/students/students/`

---

## Teachers

| Route                | Component                | Description        |
| -------------------- | ------------------------ | ------------------ |
| `/teachers`          | `TeacherListComponent`   | List all teachers. |
| `/teachers/create`   | `TeacherCreateComponent` | Create teacher.    |
| `/teachers/:id`      | `TeacherDetailComponent` | View teacher.      |
| `/teachers/:id/edit` | `TeacherEditComponent`   | Update teacher.    |
| delete action        | from list/detail/edit    | Delete teacher.    |

Backed by: `/api/teachers/teachers/`

---

## Subjects

| Route                | Component                | Description        |
| -------------------- | ------------------------ | ------------------ |
| `/subjects`          | `SubjectListComponent`   | List all subjects. |
| `/subjects/create`   | `SubjectCreateComponent` | Create subject.    |
| `/subjects/:id`      | `SubjectDetailComponent` | View subject.      |
| `/subjects/:id/edit` | `SubjectEditComponent`   | Update subject.    |
| delete action        | from list/detail/edit    | Delete subject.    |

Backed by: `/api/subjects/subjects/`

---

## Schedules

| Route                 | Component                 | Description         |
| --------------------- | ------------------------- | ------------------- |
| `/schedules`          | `ScheduleListComponent`   | List all schedules. |
| `/schedules/create`   | `ScheduleCreateComponent` | Create schedule.    |
| `/schedules/:id`      | `ScheduleDetailComponent` | View schedule.      |
| `/schedules/:id/edit` | `ScheduleEditComponent`   | Update schedule.    |
| delete action         | from list/detail/edit     | Delete schedule.    |

Backed by: `/api/schedules/`

---

## Form Behavior (Create / Edit)

All create/edit components follow the same pattern:

- Template‑driven forms using `[(ngModel)]`.
- Required fields flagged via Angular validators.
- Bootstrap form classes (`is-invalid`, `.invalid-feedback`) used for inline errors.
- Delete button available on edit/detail (where applicable).
- Lists refresh in memory on successful delete (no full reload required).

**Schedules specific:**

- Select fields: group, subject, teacher, weekday.
- Time inputs: start_time, end_time.
- Local validation: start_time must be before end_time.
- Server validation: teacher double‑booking conflict message surfaced to user.

---

## Error Handling Pattern

- Lists defensively handle API responses that may return an array, single object, or null.
- API errors surfaced via alert or inline error message.
- Schedule forms parse DRF validation errors (field errors + non‑field errors).

---

## Storage Keys

| Key             | Purpose                             |
| --------------- | ----------------------------------- |
| `access_token`  | Current JWT access token.           |
| `refresh_token` | Refresh token for new access.       |
| `current_role`  | Role string: admin/teacher/student. |

---

## Minimal Folder Layout (reference)

```
src/app/
  auth/
    login/
    auth.service.ts
    auth.interceptor.ts
  shared/
    navbar/
    footer/
  users/
  groups/
  students/
  teachers/
  subjects/
  schedules/
  app.routes.ts
```

---

## Notes

- All components are standalone (no NgModules).
- Styling: Bootstrap 5 only; no custom theme required.
- Replace hard‑coded API URLs with environment vars later if needed.
- Role‑based filtering of data is not enforced client‑side yet; all endpoints return global data.

---
