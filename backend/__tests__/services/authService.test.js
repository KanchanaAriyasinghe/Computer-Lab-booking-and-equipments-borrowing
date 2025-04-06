// authService.test.js
const AuthService = require('../../services/authService');
const User = require('../../models/User');
const Lecturer = require('../../models/Lecturer');
const Admin = require('../../models/Admin');
const Student = require('../../models/Student');
const TO = require('../../models/TO');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Mock the required modules
jest.mock('../../models/User');
jest.mock('../../models/Lecturer');
jest.mock('../../models/Admin');
jest.mock('../../models/Student');
jest.mock('../../models/TO');
jest.mock('jsonwebtoken');
jest.mock('bcryptjs');

describe('AuthService', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';
  });

  describe('registerLecturer', () => {
    it('should register a new lecturer successfully', async () => {
      // Mock data
      const lecturerData = {
        email: 'lecturer@test.com',
        password: 'password123',
        lec_id: 'LEC001',
        name: 'Test Lecturer',
        department: 'Computer Science',
        courses: ['CS101', 'CS202']
      };

      // Mock Lecturer.create response
      const mockLecturerProfile = { _id: 'lecturer-profile-id', ...lecturerData };
      Lecturer.create.mockResolvedValue(mockLecturerProfile);

      // Mock token generation
      const mockToken = 'mock-jwt-token';
      jwt.sign.mockReturnValue(mockToken);

      // Mock User.findOne to return null (user doesn't exist)
      User.findOne.mockResolvedValue(null);

      // Better User mock implementation
      const mockUser = {
        _id: 'mock-user-id',
        email: lecturerData.email,
        role: 'lecturer',
        profile: 'lecturer-profile-id',
        save: jest.fn().mockResolvedValue(true)
      };
      
      User.mockImplementation(() => mockUser);

      // Call the method
      const result = await AuthService.registerLecturer(lecturerData);

      // Assertions
      expect(Lecturer.create).toHaveBeenCalledWith({
        lec_id: lecturerData.lec_id,
        name: lecturerData.name,
        email: lecturerData.email,
        department: lecturerData.department,
        courses: lecturerData.courses
      });
      
      expect(User.findOne).toHaveBeenCalledWith({ email: lecturerData.email });
      expect(mockUser.save).toHaveBeenCalled();
      
      // Use more specific expectations for jwt.sign
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: mockUser._id,
          role: mockUser.role,
          profile: mockUser.profile
        },
        'test-secret',
        { expiresIn: '1h' }
      );
      
      expect(result).toBe(mockToken);
    });

    it('should throw an error if lecturer already exists', async () => {
      // Mock data
      const lecturerData = {
        email: 'existing@test.com',
        password: 'password123',
        lec_id: 'LEC001',
        name: 'Existing Lecturer',
        department: 'Computer Science',
        courses: ['CS101']
      };

      // Mock User.findOne to return an existing user
      User.findOne.mockResolvedValue({ email: lecturerData.email });

      // Expect the method to throw an error
      await expect(AuthService.registerLecturer(lecturerData)).rejects.toThrow('User already exists');
      expect(Lecturer.create).toHaveBeenCalled();
      expect(User.findOne).toHaveBeenCalledWith({ email: lecturerData.email });
    });
  });

  describe('registerAdmin', () => {
    it('should register a new admin successfully', async () => {
      // Mock data
      const adminData = {
        email: 'admin@test.com',
        password: 'password123',
        admin_id: 'ADM001',
        name: 'Test Admin'
      };

      // Mock Admin.create response
      const mockAdminProfile = { _id: 'admin-profile-id', ...adminData };
      Admin.create.mockResolvedValue(mockAdminProfile);

      // Mock token generation
      const mockToken = 'mock-jwt-token';
      jwt.sign.mockReturnValue(mockToken);

      // Mock User.findOne to return null (user doesn't exist)
      User.findOne.mockResolvedValue(null);

      // Better User mock implementation
      const mockUser = {
        _id: 'mock-user-id',
        email: adminData.email,
        role: 'admin',
        profile: 'admin-profile-id',
        save: jest.fn().mockResolvedValue(true)
      };
      
      User.mockImplementation(() => mockUser);

      // Call the method
      const result = await AuthService.registerAdmin(adminData);

      // Assertions
      expect(Admin.create).toHaveBeenCalledWith({
        admin_id: adminData.admin_id,
        name: adminData.name,
        email: adminData.email
      });
      
      expect(User.findOne).toHaveBeenCalledWith({ email: adminData.email });
      expect(mockUser.save).toHaveBeenCalled();
      
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: mockUser._id,
          role: mockUser.role,
          profile: mockUser.profile
        },
        'test-secret',
        { expiresIn: '1h' }
      );
      
      expect(result).toBe(mockToken);
    });
  });

  describe('registerStudent', () => {
    it('should register a new student successfully', async () => {
      // Mock data
      const studentData = {
        email: 'student@test.com',
        password: 'password123',
        reg_num: 'S001',
        name: 'Test Student',
        department: 'Computer Science',
        semester: 3,
        batch: '2023'
      };

      // Mock Student.create response
      const mockStudentProfile = { _id: 'student-profile-id', ...studentData };
      Student.create.mockResolvedValue(mockStudentProfile);

      // Mock token generation
      const mockToken = 'mock-jwt-token';
      jwt.sign.mockReturnValue(mockToken);

      // Mock User.findOne to return null (user doesn't exist)
      User.findOne.mockResolvedValue(null);

      // Better User mock implementation
      const mockUser = {
        _id: 'mock-user-id',
        email: studentData.email,
        role: 'student',
        profile: 'student-profile-id',
        save: jest.fn().mockResolvedValue(true)
      };
      
      User.mockImplementation(() => mockUser);

      // Call the method
      const result = await AuthService.registerStudent(studentData);

      // Assertions
      expect(Student.create).toHaveBeenCalledWith({
        reg_num: studentData.reg_num,
        name: studentData.name,
        email: studentData.email,
        department: studentData.department,
        semester: studentData.semester,
        batch: studentData.batch
      });
      
      expect(User.findOne).toHaveBeenCalledWith({ email: studentData.email });
      expect(mockUser.save).toHaveBeenCalled();
      
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: mockUser._id,
          role: mockUser.role,
          profile: mockUser.profile
        },
        'test-secret',
        { expiresIn: '1h' }
      );
      
      expect(result).toBe(mockToken);
    });
  });

  describe('registerTO', () => {
    it('should register a new TO successfully', async () => {
      // Mock data
      const toData = {
        email: 'to@test.com',
        password: 'password123',
        NIC: 'TO123456',
        name: 'Test TO'
      };

      // Mock TO.create response
      const mockTOProfile = { _id: 'to-profile-id', ...toData };
      TO.create.mockResolvedValue(mockTOProfile);

      // Mock token generation
      const mockToken = 'mock-jwt-token';
      jwt.sign.mockReturnValue(mockToken);

      // Mock User.findOne to return null (user doesn't exist)
      User.findOne.mockResolvedValue(null);

      // Better User mock implementation
      const mockUser = {
        _id: 'mock-user-id',
        email: toData.email,
        role: 'to',
        profile: 'to-profile-id',
        save: jest.fn().mockResolvedValue(true)
      };
      
      User.mockImplementation(() => mockUser);

      // Call the method
      const result = await AuthService.registerTO(toData);

      // Assertions
      expect(TO.create).toHaveBeenCalledWith({
        NIC: toData.NIC,
        name: toData.name,
        email: toData.email
      });
      
      expect(User.findOne).toHaveBeenCalledWith({ email: toData.email });
      expect(mockUser.save).toHaveBeenCalled();
      
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: mockUser._id,
          role: mockUser.role,
          profile: mockUser.profile
        },
        'test-secret',
        { expiresIn: '1h' }
      );
      
      expect(result).toBe(mockToken);
    });
  });

  describe('login', () => {
    it('should login a user successfully', async () => {
      // Mock data
      const loginData = {
        email: 'user@test.com',
        password: 'password123'
      };

      // Mock user
      const mockUser = {
        _id: 'user-id',
        email: loginData.email,
        password: 'hashed-password',
        role: 'student',
        profile: 'profile-id'
      };

      // Mock User.findOne
      User.findOne.mockResolvedValue(mockUser);

      // Mock bcrypt.compare
      bcrypt.compare.mockResolvedValue(true);

      // Mock token generation
      const mockToken = 'mock-jwt-token';
      jwt.sign.mockReturnValue(mockToken);

      // Call the method
      const result = await AuthService.login(loginData.email, loginData.password);

      // Assertions
      expect(User.findOne).toHaveBeenCalledWith({ email: loginData.email });
      expect(bcrypt.compare).toHaveBeenCalledWith(loginData.password, mockUser.password);
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: mockUser._id,
          role: mockUser.role,
          profile: mockUser.profile
        },
        'test-secret',
        { expiresIn: '1h' }
      );
      expect(result).toBe(mockToken);
    });

    it('should throw an error if user does not exist', async () => {
      // Mock data
      const loginData = {
        email: 'nonexistent@test.com',
        password: 'password123'
      };

      // Mock User.findOne to return null
      User.findOne.mockResolvedValue(null);

      // Expect the method to throw an error
      await expect(AuthService.login(loginData.email, loginData.password)).rejects.toThrow('Invalid credentials');
      expect(User.findOne).toHaveBeenCalledWith({ email: loginData.email });
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    it('should throw an error if password is incorrect', async () => {
      // Mock data
      const loginData = {
        email: 'user@test.com',
        password: 'wrong-password'
      };

      // Mock user
      const mockUser = {
        _id: 'user-id',
        email: loginData.email,
        password: 'hashed-password',
        role: 'student',
        profile: 'profile-id'
      };

      // Mock User.findOne
      User.findOne.mockResolvedValue(mockUser);

      // Mock bcrypt.compare to return false (password doesn't match)
      bcrypt.compare.mockResolvedValue(false);

      // Expect the method to throw an error
      await expect(AuthService.login(loginData.email, loginData.password)).rejects.toThrow('Invalid credentials');
      expect(User.findOne).toHaveBeenCalledWith({ email: loginData.email });
      expect(bcrypt.compare).toHaveBeenCalledWith(loginData.password, mockUser.password);
      expect(jwt.sign).not.toHaveBeenCalled();
    });
  });

  describe('getById methods', () => {
    it('should get admin by ID', async () => {
      const adminId = 'admin-id';
      const mockAdmin = { _id: adminId, name: 'Admin User' };
      
      Admin.findById.mockResolvedValue(mockAdmin);
      
      const result = await AuthService.getAdminById(adminId);
      
      expect(Admin.findById).toHaveBeenCalledWith(adminId);
      expect(result).toEqual(mockAdmin);
    });

    it('should get lecturer by ID', async () => {
      const lecturerId = 'lecturer-id';
      const mockLecturer = { _id: lecturerId, name: 'Lecturer User' };
      
      Lecturer.findById.mockResolvedValue(mockLecturer);
      
      const result = await AuthService.getLecturerById(lecturerId);
      
      expect(Lecturer.findById).toHaveBeenCalledWith(lecturerId);
      expect(result).toEqual(mockLecturer);
    });

    it('should get student by ID', async () => {
      const studentId = 'student-id';
      const mockStudent = { _id: studentId, name: 'Student User' };
      
      Student.findById.mockResolvedValue(mockStudent);
      
      const result = await AuthService.getStudentById(studentId);
      
      expect(Student.findById).toHaveBeenCalledWith(studentId);
      expect(result).toEqual(mockStudent);
    });

    it('should get TO by ID', async () => {
      const toId = 'to-id';
      const mockTO = { _id: toId, name: 'TO User' };
      
      TO.findById.mockResolvedValue(mockTO);
      
      const result = await AuthService.getToById(toId);
      
      expect(TO.findById).toHaveBeenCalledWith(toId);
      expect(result).toEqual(mockTO);
    });
  });

  describe('generateToken', () => {
    it('should generate a JWT token with correct payload', () => {
      // Mock user
      const mockUser = {
        _id: 'user-id',
        role: 'student',
        profile: 'profile-id'
      };

      // Mock token
      const mockToken = 'mock-jwt-token';
      jwt.sign.mockReturnValue(mockToken);

      // Call the method
      const result = AuthService.generateToken(mockUser);

      // Assertions
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: mockUser._id,
          role: mockUser.role,
          profile: mockUser.profile
        },
        'test-secret',
        { expiresIn: '1h' }
      );
      expect(result).toBe(mockToken);
    });
  });
});