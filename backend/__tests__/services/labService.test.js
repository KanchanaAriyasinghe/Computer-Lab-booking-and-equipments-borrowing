const LabService = require('../../services/labService');
const Lab = require('../../models/Lab');
const notificationService = require('../../services/notificationService');

// Mock the models and services
jest.mock('../../models/Lab');
jest.mock('../../services/notificationService');

describe('LabService', () => {
  const mockLabId = '507f1f77bcf86cd799439011';
  const mockBookingId = '507f1f77bcf86cd799439012';
  const mockUserId = '507f1f77bcf86cd799439013';
  const mockTOId = '507f1f77bcf86cd799439014';

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('Lab CRUD Operations', () => {
    test('should create a new lab', async () => {
      const labData = {
        lab_name: 'Computer Lab 1',
        lab_type: 'Computer',
        max_capacity: 30,
        allocated_TO: mockTOId,
      };

      const mockLab = { ...labData, _id: mockLabId };
      Lab.create.mockResolvedValue(mockLab);

      const result = await LabService.createLab(labData);
      
      expect(Lab.create).toHaveBeenCalledWith(labData);
      expect(result).toEqual(mockLab);
    });

    test('should get a lab by ID', async () => {
      const mockLab = {
        _id: mockLabId,
        lab_name: 'Physics Lab',
        lab_type: 'Science',
        max_capacity: 20,
        allocated_TO: mockTOId,
      };

      Lab.findById.mockImplementation(() => ({
        populate: jest.fn().mockImplementation(() => ({
          populate: jest.fn().mockResolvedValue(mockLab)
        }))
      }));

      const result = await LabService.getLabById(mockLabId);
      
      expect(Lab.findById).toHaveBeenCalledWith(mockLabId);
      expect(result).toEqual(mockLab);
    });

    test('should get all labs', async () => {
      const mockLabs = [
        {
          _id: mockLabId,
          lab_name: 'Lab 1',
          lab_type: 'Type A',
          max_capacity: 10,
          allocated_TO: mockTOId,
        },
        {
          _id: '507f1f77bcf86cd799439015',
          lab_name: 'Lab 2',
          lab_type: 'Type B',
          max_capacity: 20,
          allocated_TO: mockTOId,
        },
      ];

      Lab.find.mockImplementation(() => ({
        populate: jest.fn().mockImplementation(() => ({
          populate: jest.fn().mockResolvedValue(mockLabs)
        }))
      }));

      const result = await LabService.getAllLabs();
      
      expect(Lab.find).toHaveBeenCalled();
      expect(result).toEqual(mockLabs);
    });

    test('should update a lab', async () => {
      const updatedData = { lab_name: 'Updated Lab Name' };
      const mockUpdatedLab = {
        _id: mockLabId,
        lab_name: 'Updated Lab Name',
        lab_type: 'Science',
        max_capacity: 20,
        allocated_TO: mockTOId,
      };

      Lab.findByIdAndUpdate.mockResolvedValue(mockUpdatedLab);

      const result = await LabService.updateLab(mockLabId, updatedData);
      
      expect(Lab.findByIdAndUpdate).toHaveBeenCalledWith(
        mockLabId,
        updatedData,
        { new: true }
      );
      expect(result).toEqual(mockUpdatedLab);
    });

    test('should delete a lab', async () => {
      const mockDeletedLab = {
        _id: mockLabId,
        lab_name: 'Lab to Delete',
        lab_type: 'Type',
        max_capacity: 10,
        allocated_TO: mockTOId,
      };

      Lab.findByIdAndDelete.mockResolvedValue(mockDeletedLab);

      const result = await LabService.deleteLab(mockLabId);
      
      expect(Lab.findByIdAndDelete).toHaveBeenCalledWith(mockLabId);
      expect(result).toEqual(mockDeletedLab);
    });
  });

  describe('Booking Operations', () => {
    let mockLabWithBookings;

    beforeEach(() => {
      mockLabWithBookings = {
        _id: mockLabId,
        lab_name: 'Booking Test Lab',
        bookings: [
          {
            _id: mockBookingId,
            bookBy: mockUserId,
            bookForDept: 'CS',
            bookForBatch: '2023',
            bookForCourse: 'CS101',
            reason: 'Practical Session',
            date: new Date('2025-04-10'),
            duration: { from: '09:00', to: '10:00' },
            status: 'pending'
          }
        ],
        save: jest.fn().mockImplementation(function() {
          return Promise.resolve(this);
        })
      };
    });

    test('should create a booking', async () => {
      const newBookingData = {
        bookForDept: 'Math',
        bookForBatch: '2023',
        bookForCourse: 'MATH101',
        reason: 'Math Lab',
        date: new Date('2025-04-11'),
        duration: { from: '11:00', to: '12:00' },
      };

      Lab.findById.mockResolvedValue(mockLabWithBookings);

      const result = await LabService.createBooking(
        mockLabId,
        newBookingData,
        mockUserId
      );

      expect(Lab.findById).toHaveBeenCalledWith(mockLabId);
      expect(mockLabWithBookings.bookings).toHaveLength(2);
      expect(mockLabWithBookings.save).toHaveBeenCalled();
      expect(notificationService.notifyLabBookingCreated).toHaveBeenCalled();
    });

    test('should reject overlapping bookings', async () => {
      const overlappingBookingData = {
        bookForDept: 'CS',
        bookForBatch: '2023',
        bookForCourse: 'CS101',
        reason: 'Overlapping Session',
        date: new Date('2025-04-10'), // Same date
        duration: { from: '09:30', to: '10:30' }, // Overlapping time
      };

      Lab.findById.mockResolvedValue(mockLabWithBookings);

      await expect(
        LabService.createBooking(
          mockLabId,
          overlappingBookingData,
          mockUserId
        )
      ).rejects.toThrow('Time slot already booked');
    });

    test('should get a booking by ID', async () => {
      Lab.findById.mockImplementation(() => ({
        populate: jest.fn().mockResolvedValue(mockLabWithBookings)
      }));

      const result = await LabService.getBooking(mockLabId, mockBookingId);
      
      expect(Lab.findById).toHaveBeenCalledWith(mockLabId);
      expect(result).toEqual(mockLabWithBookings.bookings[0]);
    });

    test('should update booking status', async () => {
      Lab.findById.mockResolvedValue(mockLabWithBookings);

      const result = await LabService.updateBookingStatus(
        mockLabId,
        mockBookingId,
        'accepted'
      );

      expect(Lab.findById).toHaveBeenCalledWith(mockLabId);
      expect(mockLabWithBookings.bookings[0].status).toBe('accepted');
      expect(mockLabWithBookings.save).toHaveBeenCalled();
      expect(notificationService.notifyLabBookingStatus).toHaveBeenCalled();
    });

    test('should reject invalid booking status', async () => {
      await expect(
        LabService.updateBookingStatus(
          mockLabId,
          mockBookingId,
          'invalid-status'
        )
      ).rejects.toThrow('Invalid status value');
    });

    test('should cancel a booking', async () => {
      Lab.findById.mockResolvedValue(mockLabWithBookings);

      const result = await LabService.cancelBooking(mockLabId, mockBookingId);
      
      expect(Lab.findById).toHaveBeenCalledWith(mockLabId);
      expect(mockLabWithBookings.bookings).toHaveLength(0);
      expect(mockLabWithBookings.save).toHaveBeenCalled();
    });
  });
});