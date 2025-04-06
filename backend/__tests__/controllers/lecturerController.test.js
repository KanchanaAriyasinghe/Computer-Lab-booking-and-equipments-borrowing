// __tests__/controllers/lecturerController.test.js
const LecturerController = require('../../controllers/lecturerController');
const lecturerService = require('../../services/lecturerService');

// Mock the lecturerService
jest.mock('../../services/lecturerService');

describe('LecturerController', () => {
  let mockRequest, mockResponse;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Setup mock request and response
    mockRequest = {
      params: {},
      body: {}
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('getAllLecturers', () => {
    it('should return all lecturers with status 200', async () => {
      const mockLecturers = [
        { 
          _id: '507f1f77bcf86cd799439011',
          lec_id: 'L001', 
          name: 'John Doe', 
          email: 'john@example.com',
          department: 'Computer Science',
          courses: ['CS101', 'CS102']
        },
        { 
          _id: '507f1f77bcf86cd799439012',
          lec_id: 'L002', 
          name: 'Jane Smith', 
          email: 'jane@example.com',
          department: 'Electrical Engineering',
          courses: ['EE201']
        }
      ];
      
      lecturerService.getAllLecturers.mockResolvedValue(mockLecturers);

      await LecturerController.getAllLecturers(mockRequest, mockResponse);

      expect(lecturerService.getAllLecturers).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockLecturers);
    });

    it('should handle errors with status 500', async () => {
      const errorMessage = 'Database connection failed';
      lecturerService.getAllLecturers.mockRejectedValue(new Error(errorMessage));

      await LecturerController.getAllLecturers(mockRequest, mockResponse);

      expect(lecturerService.getAllLecturers).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('getLecturerById', () => {
    it('should return a lecturer with status 200 when found', async () => {
      const mockLecturer = { 
        _id: '507f1f77bcf86cd799439011',
        lec_id: 'L001', 
        name: 'John Doe', 
        email: 'john@example.com',
        department: 'Computer Science',
        courses: ['CS101']
      };
      mockRequest.params.id = '507f1f77bcf86cd799439011';
      
      lecturerService.getLecturerById.mockResolvedValue(mockLecturer);

      await LecturerController.getLecturerById(mockRequest, mockResponse);

      expect(lecturerService.getLecturerById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockLecturer);
    });

    it('should return status 404 when lecturer not found', async () => {
      const errorMessage = 'Lecturer not found';
      mockRequest.params.id = '507f1f77bcf86cd799439099';
      
      lecturerService.getLecturerById.mockRejectedValue(new Error(errorMessage));

      await LecturerController.getLecturerById(mockRequest, mockResponse);

      expect(lecturerService.getLecturerById).toHaveBeenCalledWith('507f1f77bcf86cd799439099');
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('updateLecturer', () => {
    it('should update and return the lecturer with status 200', async () => {
      const mockUpdatedLecturer = { 
        _id: '507f1f77bcf86cd799439011',
        lec_id: 'L001', 
        name: 'John Updated', 
        email: 'john.updated@example.com',
        department: 'Computer Science',
        courses: ['CS101', 'CS201']
      };
      mockRequest.params.id = '507f1f77bcf86cd799439011';
      mockRequest.body = {
        name: 'John Updated',
        email: 'john.updated@example.com',
        courses: ['CS101', 'CS201']
      };
      
      lecturerService.updateLecturer.mockResolvedValue(mockUpdatedLecturer);

      await LecturerController.updateLecturer(mockRequest, mockResponse);

      expect(lecturerService.updateLecturer).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        mockRequest.body
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedLecturer);
    });

    it('should return status 400 when email is already in use', async () => {
      const errorMessage = 'Email is already in use by another lecturer';
      mockRequest.params.id = '507f1f77bcf86cd799439011';
      mockRequest.body = { email: 'existing@example.com' };
      
      lecturerService.updateLecturer.mockRejectedValue(new Error(errorMessage));

      await LecturerController.updateLecturer(mockRequest, mockResponse);

      expect(lecturerService.updateLecturer).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        mockRequest.body
      );
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });

    it('should return status 400 when lecturer ID is already in use', async () => {
      const errorMessage = 'Lecturer ID is already in use by another lecturer';
      mockRequest.params.id = '507f1f77bcf86cd799439011';
      mockRequest.body = { lec_id: 'L999' };
      
      lecturerService.updateLecturer.mockRejectedValue(new Error(errorMessage));

      await LecturerController.updateLecturer(mockRequest, mockResponse);

      expect(lecturerService.updateLecturer).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        mockRequest.body
      );
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('deleteLecturer', () => {
    it('should delete the lecturer and return success with status 200', async () => {
      const mockDeletedLecturer = { 
        _id: '507f1f77bcf86cd799439011',
        lec_id: 'L001', 
        name: 'John Doe',
        email: 'john@example.com',
        department: 'Computer Science'
      };
      mockRequest.params.id = '507f1f77bcf86cd799439011';
      
      lecturerService.deleteLecturer.mockResolvedValue(mockDeletedLecturer);

      await LecturerController.deleteLecturer(mockRequest, mockResponse);

      expect(lecturerService.deleteLecturer).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Lecturer deleted successfully',
        deletedLecturer: mockDeletedLecturer
      });
    });

    it('should return status 404 when lecturer to delete is not found', async () => {
      const errorMessage = 'Lecturer not found';
      mockRequest.params.id = '507f1f77bcf86cd799439099';
      
      lecturerService.deleteLecturer.mockRejectedValue(new Error(errorMessage));

      await LecturerController.deleteLecturer(mockRequest, mockResponse);

      expect(lecturerService.deleteLecturer).toHaveBeenCalledWith('507f1f77bcf86cd799439099');
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});