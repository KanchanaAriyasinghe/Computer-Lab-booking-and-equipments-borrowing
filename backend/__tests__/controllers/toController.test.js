// __tests__/controllers/toController.test.js
const ToController = require('../../controllers/toController');
const toService = require('../../services/toService');

jest.mock('../../services/toService');

describe('ToController', () => {
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

  describe('getAllTOs', () => {
    it('should return all technical officers with status 200', async () => {
      const mockTOs = [
        {
          _id: '507f1f77bcf86cd799439011',
          NIC: '123456789V',
          name: 'John Doe',
          email: 'john@example.com'
        },
        {
          _id: '507f1f77bcf86cd799439012',
          NIC: '987654321V',
          name: 'Jane Smith',
          email: 'jane@example.com'
        }
      ];
      
      toService.getAllTOs.mockResolvedValue(mockTOs);

      await ToController.getAllTOs(mockRequest, mockResponse);

      expect(toService.getAllTOs).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockTOs);
    });

    it('should handle errors with status 500', async () => {
      const errorMessage = 'Error fetching technical officers: Database error';
      toService.getAllTOs.mockRejectedValue(new Error(errorMessage));

      await ToController.getAllTOs(mockRequest, mockResponse);

      expect(toService.getAllTOs).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('getTOById', () => {
    it('should return a technical officer with status 200 when found', async () => {
      const mockTO = { 
        _id: '507f1f77bcf86cd799439011',
        NIC: '123456789V',
        name: 'John Doe',
        email: 'john@example.com'
      };
      mockRequest.params.id = '507f1f77bcf86cd799439011';
      
      toService.getTOById.mockResolvedValue(mockTO);

      await ToController.getTOById(mockRequest, mockResponse);

      expect(toService.getTOById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockTO);
    });

    it('should return status 404 when technical officer not found', async () => {
      const errorMessage = 'Error fetching technical officer: Technical officer not found';
      mockRequest.params.id = '507f1f77bcf86cd799439099';
      
      toService.getTOById.mockRejectedValue(new Error(errorMessage));

      await ToController.getTOById(mockRequest, mockResponse);

      expect(toService.getTOById).toHaveBeenCalledWith('507f1f77bcf86cd799439099');
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('updateTO', () => {
    it('should update and return the technical officer with status 200', async () => {
      const mockUpdatedTO = { 
        _id: '507f1f77bcf86cd799439011',
        NIC: '123456789V',
        name: 'John Updated',
        email: 'john.updated@example.com'
      };
      mockRequest.params.id = '507f1f77bcf86cd799439011';
      mockRequest.body = {
        name: 'John Updated',
        email: 'john.updated@example.com'
      };
      
      toService.updateTO.mockResolvedValue(mockUpdatedTO);

      await ToController.updateTO(mockRequest, mockResponse);

      expect(toService.updateTO).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        mockRequest.body
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedTO);
    });

    it('should return status 400 when email is already in use', async () => {
      const errorMessage = 'Error updating technical officer: Email is already in use by another technical officer';
      mockRequest.params.id = '507f1f77bcf86cd799439011';
      mockRequest.body = { email: 'existing@example.com' };
      
      toService.updateTO.mockRejectedValue(new Error(errorMessage));

      await ToController.updateTO(mockRequest, mockResponse);

      expect(toService.updateTO).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        mockRequest.body
      );
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });

    it('should return status 400 when NIC is already in use', async () => {
      const errorMessage = 'Error updating technical officer: NIC is already in use by another technical officer';
      mockRequest.params.id = '507f1f77bcf86cd799439011';
      mockRequest.body = { NIC: '999999999V' };
      
      toService.updateTO.mockRejectedValue(new Error(errorMessage));

      await ToController.updateTO(mockRequest, mockResponse);

      expect(toService.updateTO).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        mockRequest.body
      );
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('deleteTO', () => {
    it('should delete the technical officer and return success with status 200', async () => {
      const mockDeletedTO = { 
        _id: '507f1f77bcf86cd799439011',
        NIC: '123456789V',
        name: 'John Doe',
        email: 'john@example.com'
      };
      mockRequest.params.id = '507f1f77bcf86cd799439011';
      
      toService.deleteTO.mockResolvedValue(mockDeletedTO);

      await ToController.deleteTO(mockRequest, mockResponse);

      expect(toService.deleteTO).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Technical officer deleted successfully',
        deletedTO: mockDeletedTO
      });
    });

    it('should return status 404 when technical officer to delete is not found', async () => {
      const errorMessage = 'Error deleting technical officer: Technical officer not found';
      mockRequest.params.id = '507f1f77bcf86cd799439099';
      
      toService.deleteTO.mockRejectedValue(new Error(errorMessage));

      await ToController.deleteTO(mockRequest, mockResponse);

      expect(toService.deleteTO).toHaveBeenCalledWith('507f1f77bcf86cd799439099');
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});