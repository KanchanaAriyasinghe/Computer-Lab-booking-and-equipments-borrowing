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

# 📌 Backend Integration Testing

## 🔐 AuthService (Completed ✅)
| Test Case | Status | Description |
|-----------|--------|-------------|
| `registerLecturer()` | ✅ | Should register lecturer and create associated user |
| `registerLecturer()` | ✅ | Should reject duplicate email registration |
| `registerAdmin()` | ✅ | Should register admin and create associated user |
| `registerStudent()` | ✅ | Should register student and create associated user |
| `registerTO()` | ✅ | Should register TO and create associated user |
| `login()` | ✅ | Should authenticate user with valid credentials |
| `login()` | ✅ | Should reject invalid credentials |
| `getLecturerById()` | ✅ | Should retrieve lecturer profile by ID |
| `getStudentById()` | ✅ | Should retrieve student profile by ID |
| `getToById()` | ✅ | Should retrieve TO profile by ID |
| `getAdminById()` | ✅ | Should retrieve admin profile by ID |
| `generateToken()` | ✅ | Should generate JWT with correct payload |

## 🏫 LabService (Completed ✅)
| Test Case | Status | Description |
|-----------|--------|-------------|
| `createLab()` | ✅ | Should create new lab with valid data |
| `getLabById()` | ✅ | Should retrieve lab with populated TO and bookings |
| `updateLab()` | ✅ | Should update lab information |
| `deleteLab()` | ✅ | Should delete lab record |
| `createBooking()` | ✅ | Should create new booking with valid time slot |
| `createBooking()` | ✅ | Should reject overlapping bookings |
| `updateBookingStatus()` | ✅ | Should update booking status (pending→accepted/rejected) |
| `updateBookingStatus()` | ✅ | Should reject invalid status updates |
| `cancelBooking()` | ✅ | Should remove booking from lab |
| `getBooking()` | ✅ | Should retrieve booking with populated user data |

## 🧪 EquipmentService (Partial Completion ⚠️)
| Test Case | Status | Description |
|-----------|--------|-------------|
| `createEquipment()` | ✅ | Should create new equipment record |
| `createEquipment()` | ✅ | Should reject duplicate item numbers |
| `borrowEquipment()` | ⬜ | Should create borrow request with available quantity |
| `updateBorrowStatus()` | ⬜ | Should update borrow status |
| `returnEquipment()` | ⬜ | Should mark equipment as returned |

## 👨‍🏫 LecturerService (Not Started ❌)
| Test Case | Status | Description |
|-----------|--------|-------------|
| `getAllLecturers()` | ❌ | Should retrieve all lecturers |
| `getLecturerById()` | ❌ | Should retrieve lecturer by ID |
| `updateLecturer()` | ❌ | Should update lecturer profile |
| `deleteLecturer()` | ❌ | Should delete lecturer record |

## 🎓 StudentService (Not Started ❌)
| Test Case | Status | Description |
|-----------|--------|-------------|
| `getAllStudents()` | ❌ | Should retrieve all students |
| `getStudentById()` | ❌ | Should retrieve student by ID |
| `updateStudent()` | ❌ | Should update student profile |
| `deleteStudent()` | ❌ | Should delete student record |

## 🔧 ToService (Not Started ❌)
| Test Case | Status | Description |
|-----------|--------|-------------|
| `getAllTOs()` | ❌ | Should retrieve all technical officers |
| `getTOById()` | ❌ | Should retrieve TO by ID |
| `updateTO()` | ❌ | Should update TO profile |
| `deleteTO()` | ❌ | Should delete TO record |

## 🔔 NotificationService (Partial Completion ⚠️)
| Test Case | Status | Description |
|-----------|--------|-------------|
| Notification triggers | ✅ | Lab booking creates TO notifications |
| Status updates | ✅ | Booking status changes notify requester |
| Equipment notifications | ⬜ | Borrow requests should trigger alerts |

## 🔄 Service Integrations (Partial Completion ⚠️)
| Test Case | Status | Description |
|-----------|--------|-------------|
| Lab + Notification | ✅ | Booking creation triggers TO notification |
| Equipment + Notification | ⬜ | Borrow request should trigger TO notification |
| Auth + Profile Services | ✅ | User registration creates correct profile type |

## Test Coverage Summary
- ✅ Completed: 22 tests
- ⚠️ Partial: 3 tests
- ❌ Not Started: 12 tests
- Total Coverage: ~65% of core functionality

## Next Steps
1. Complete EquipmentService tests
2. Implement Lecturer/Student/TO service tests
3. Add integration tests for notification workflows
4. Expand error case testing
