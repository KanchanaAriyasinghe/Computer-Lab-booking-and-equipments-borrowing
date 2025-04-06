// __tests__/controllers/notificationController.test.js
const NotificationController = require('../../controllers/notificationController');
const notificationService = require('../../services/notificationService');

jest.mock('../../services/notificationService');

describe('NotificationController', () => {
  let mockRequest, mockResponse;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockRequest = {
      params: {},
      body: {},
      user: {
        id: '507f1f77bcf86cd799439011' // Matches your controller's expected user.id
      }
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('getNotifications', () => {
    it('should return user notifications', async () => {
      const mockNotifications = [
        {
          _id: '507f1f77bcf86cd799439021',
          title: 'New Lab Booking',
          msg: 'You have a new lab booking request',
          date: new Date(),
          to: [{
            user: { _id: '507f1f77bcf86cd799439011', email: 'user@example.com', role: 'student' },
            seen: false
          }]
        }
      ];

      notificationService.getUserNotifications.mockResolvedValue(mockNotifications);

      await NotificationController.getNotifications(mockRequest, mockResponse);

      expect(notificationService.getUserNotifications).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
      expect(mockResponse.json).toHaveBeenCalledWith(mockNotifications);
    });

    it('should handle errors with status 400', async () => {
      const errorMessage = 'Failed to fetch notifications';
      notificationService.getUserNotifications.mockRejectedValue(new Error(errorMessage));

      await NotificationController.getNotifications(mockRequest, mockResponse);

      expect(notificationService.getUserNotifications).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('markAsSeen', () => {
    it('should mark notification as seen and return updated notification', async () => {
      const mockNotification = {
        _id: '507f1f77bcf86cd799439021',
        title: 'New Lab Booking',
        msg: 'You have a new lab booking request',
        date: new Date(),
        to: [{
          user: '507f1f77bcf86cd799439011',
          seen: true
        }]
      };

      mockRequest.params.id = '507f1f77bcf86cd799439021';
      notificationService.markAsSeen.mockResolvedValue(mockNotification);

      await NotificationController.markAsSeen(mockRequest, mockResponse);

      expect(notificationService.markAsSeen).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439021',
        '507f1f77bcf86cd799439011'
      );
      expect(mockResponse.json).toHaveBeenCalledWith(mockNotification);
    });

    it('should return 400 if notification not found', async () => {
      const errorMessage = 'Notification not found';
      mockRequest.params.id = '507f1f77bcf86cd799439099';
      notificationService.markAsSeen.mockRejectedValue(new Error(errorMessage));

      await NotificationController.markAsSeen(mockRequest, mockResponse);

      expect(notificationService.markAsSeen).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439099',
        '507f1f77bcf86cd799439011'
      );
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });

    it('should return 400 if user not in recipients', async () => {
      const errorMessage = 'User not found in notification recipients';
      mockRequest.params.id = '507f1f77bcf86cd799439021';
      notificationService.markAsSeen.mockRejectedValue(new Error(errorMessage));

      await NotificationController.markAsSeen(mockRequest, mockResponse);

      expect(notificationService.markAsSeen).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439021',
        '507f1f77bcf86cd799439011'
      );
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});