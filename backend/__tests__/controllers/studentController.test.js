// __tests__/controllers/studentController.test.js
const StudentController = require('../../controllers/studentController');
const studentService = require('../../services/studentService');

jest.mock('../../services/studentService');

describe('StudentController', () => {
  let mockRequest, mockResponse;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockRequest = {
      params: {},
      body: {}
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('getAllStudents', () => {
    it('should return all students with status 200', async () => {
      const mockStudents = [
        {
          _id: '507f1f77bcf86cd799439011',
          reg_num: 'S001',
          name: 'John Doe',
          email: 'john@example.com',
          department: 'Computer Science',
          semester: 6,
          batch: '2021',
          reg_date: new Date()
        }
      ];
      
      studentService.getAllStudents.mockResolvedValue(mockStudents);

      await StudentController.getAllStudents(mockRequest, mockResponse);

      expect(studentService.getAllStudents).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockStudents);
    });

    it('should handle errors with status 500', async () => {
      const errorMessage = 'Error fetching students: Database connection failed';
      studentService.getAllStudents.mockRejectedValue(new Error(errorMessage));

      await StudentController.getAllStudents(mockRequest, mockResponse);

      expect(studentService.getAllStudents).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('getStudentById', () => {
    it('should return a student with status 200 when found', async () => {
      const mockStudent = { 
        _id: '507f1f77bcf86cd799439011',
        reg_num: 'S001',
        name: 'John Doe',
        email: 'john@example.com',
        department: 'Computer Science',
        semester: 6,
        batch: '2021',
        reg_date: new Date()
      };
      mockRequest.params.id = '507f1f77bcf86cd799439011';
      
      studentService.getStudentById.mockResolvedValue(mockStudent);

      await StudentController.getStudentById(mockRequest, mockResponse);

      expect(studentService.getStudentById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockStudent);
    });

    it('should return status 404 when student not found', async () => {
      const errorMessage = 'Error fetching student: Student not found';
      mockRequest.params.id = '507f1f77bcf86cd799439099';
      
      studentService.getStudentById.mockRejectedValue(new Error(errorMessage));

      await StudentController.getStudentById(mockRequest, mockResponse);

      expect(studentService.getStudentById).toHaveBeenCalledWith('507f1f77bcf86cd799439099');
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('updateStudent', () => {
    it('should update and return the student with status 200', async () => {
      const mockUpdatedStudent = { 
        _id: '507f1f77bcf86cd799439011',
        reg_num: 'S001',
        name: 'John Updated',
        email: 'john.updated@example.com',
        department: 'Computer Science',
        semester: 6,
        batch: '2021',
        reg_date: new Date()
      };
      mockRequest.params.id = '507f1f77bcf86cd799439011';
      mockRequest.body = {
        name: 'John Updated',
        email: 'john.updated@example.com'
      };
      
      studentService.updateStudent.mockResolvedValue(mockUpdatedStudent);

      await StudentController.updateStudent(mockRequest, mockResponse);

      expect(studentService.updateStudent).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        mockRequest.body
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedStudent);
    });

    it('should return status 400 when email is already in use', async () => {
      const errorMessage = 'Error updating student: Email is already in use by another student';
      mockRequest.params.id = '507f1f77bcf86cd799439011';
      mockRequest.body = { email: 'existing@example.com' };
      
      studentService.updateStudent.mockRejectedValue(new Error(errorMessage));

      await StudentController.updateStudent(mockRequest, mockResponse);

      expect(studentService.updateStudent).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        mockRequest.body
      );
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });

    it('should return status 400 when registration number is already in use', async () => {
      const errorMessage = 'Error updating student: Registration number is already in use by another student';
      mockRequest.params.id = '507f1f77bcf86cd799439011';
      mockRequest.body = { reg_num: 'S999' };
      
      studentService.updateStudent.mockRejectedValue(new Error(errorMessage));

      await StudentController.updateStudent(mockRequest, mockResponse);

      expect(studentService.updateStudent).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        mockRequest.body
      );
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('deleteStudent', () => {
    it('should delete the student and return success with status 200', async () => {
      const mockDeletedStudent = { 
        _id: '507f1f77bcf86cd799439011',
        reg_num: 'S001',
        name: 'John Doe',
        email: 'john@example.com',
        department: 'Computer Science'
      };
      mockRequest.params.id = '507f1f77bcf86cd799439011';
      
      studentService.deleteStudent.mockResolvedValue(mockDeletedStudent);

      await StudentController.deleteStudent(mockRequest, mockResponse);

      expect(studentService.deleteStudent).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Student deleted successfully',
        deletedStudent: mockDeletedStudent
      });
    });

    it('should return status 404 when student to delete is not found', async () => {
      const errorMessage = 'Error deleting student: Student not found';
      mockRequest.params.id = '507f1f77bcf86cd799439099';
      
      studentService.deleteStudent.mockRejectedValue(new Error(errorMessage));

      await StudentController.deleteStudent(mockRequest, mockResponse);

      expect(studentService.deleteStudent).toHaveBeenCalledWith('507f1f77bcf86cd799439099');
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});