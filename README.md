# Testing Branch Readme

# Test Cases Documentation

## 📌 Backend unit testing

### 🔐 Registration
| Test Case | Status | Description |
|-----------|--------|-------------|
| `POST /api/auth/register/lecturer` | ✅ | Should register lecturer and return token (201) |
| `POST /api/auth/register/student` | ✅ | Should register student and return token (201) |
| `POST /api/auth/register/student` | ✅ | Should return 400 if registration fails |
| `POST /api/auth/register/admin` | ✅ | Should register admin and return token (201) |
| `POST /api/auth/register/admin` | ✅ | Should return 400 if registration fails |

### 👥 User Retrieval
| Test Case | Status | Description |
|-----------|--------|-------------|
| `GET /api/auth/admin/:id` | ✅ | Should return admin by ID (200) |
| `GET /api/auth/admin/:id` | ✅ | Should return 404 if not found |
| `GET /api/auth/lecturer/:id` | ✅ | Should return lecturer by ID (200) |
| `GET /api/auth/lecturer/:id` | ✅ | Should return 404 if not found |

### 🔑 Authentication
| Test Case | Status | Description |
|-----------|--------|-------------|
| `POST /api/auth/login` | ✅ | Should login user and return token (200) |
| `POST /api/auth/login` | ✅ | Should return 401 if login fails |

## 🖥️ EquipmentController Tests

### 🧰 Equipment Management
| Test Case | Status | Description |
|-----------|--------|-------------|
| `POST /api/equipment` | ✅ | Should create equipment with image (201) |
| `POST /api/equipment` | ✅ | Should handle file upload errors (400) |
| `PUT /api/equipment/:id` | ✅ | Should update equipment and delete old image (200) |
| `DELETE /api/equipment/:id` | ✅ | Should delete equipment and image (200) |
| `GET /api/equipment/:id` | ✅ | Should return equipment by ID (200) |
| `GET /api/equipment/:id` | ✅ | Should handle not found (404) |

### 🔄 Borrowing System
| Test Case | Status | Description |
|-----------|--------|-------------|
| `POST /api/equipment/:id/borrow` | ✅ | Should create borrowing record (201) |
| `PUT /api/equipment/:id/borrowings/:id/status` | ✅ | Should update borrowing status (200) |
| `PUT /api/equipment/:id/borrowings/:id/return` | ✅ | Should return equipment (200) |

## 🧪 LabController Tests

### 🏗️ Lab Management
| Test Case | Status | Description |
|-----------|--------|-------------|
| `POST /api/labs` | ✅ | Should create lab (201) |
| `POST /api/labs` | ✅ | Should handle creation failure (400) |
| `GET /api/labs/:id` | ✅ | Should get lab by ID (200) |
| `GET /api/labs/:id` | ✅ | Should handle not found (404) |
| `GET /api/labs` | ✅ | Should get all labs (200) |
| `PUT /api/labs/:id` | ✅ | Should update lab (200) |
| `DELETE /api/labs/:id` | ✅ | Should delete lab (200) |

### 📅 Booking Management
| Test Case | Status | Description |
|-----------|--------|-------------|
| `POST /api/labs/:id/booking/:id/accept` | ✅ | Should accept booking (200) |
| `DELETE /api/labs/:id/booking/:id/cancel` | ✅ | Should cancel booking (200) |

## 👨‍🏫 LecturerController Tests

| Test Case | Status | Description |
|-----------|--------|-------------|
| `GET /api/lecturers` | ✅ | Should return all lecturers (200) |
| `GET /api/lecturers/:id` | ✅ | Should return lecturer by ID (200) |
| `PUT /api/lecturers/:id` | ✅ | Should update lecturer (200) |
| `DELETE /api/lecturers/:id` | ✅ | Should delete lecturer (200) |

## 📢 NotificationController Tests

| Test Case | Status | Description |
|-----------|--------|-------------|
| `GET /api/notifications` | ✅ | Should return user notifications |
| `PUT /api/notifications/:id/mark-seen` | ✅ | Should mark as seen |

## 🎓 StudentController Tests

| Test Case | Status | Description |
|-----------|--------|-------------|
| `GET /api/students` | ✅ | Should return all students (200) |
| `GET /api/students/:id` | ✅ | Should return student by ID (200) |
| `PUT /api/students/:id` | ✅ | Should update student (200) |
| `DELETE /api/students/:id` | ✅ | Should delete student (200) |

## 🔧 TOController Tests

| Test Case | Status | Description |
|-----------|--------|-------------|
| `GET /api/tos` | ✅ | Should return all TOs (200) |
| `GET /api/tos/:id` | ✅ | Should return TO by ID (200) |
| `PUT /api/tos/:id` | ✅ | Should update TO (200) |
| `DELETE /api/tos/:id` | ✅ | Should delete TO (200) |

## 📊 Test Coverage

- **Total Test Suites**: 7
- **Total Tests**: 70+ (including positive/negative cases)
- **Coverage**: All major controller methods with error handling

## 🚀 How to Run Tests

```bash
npm test

![Image](images/image.png)
