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
