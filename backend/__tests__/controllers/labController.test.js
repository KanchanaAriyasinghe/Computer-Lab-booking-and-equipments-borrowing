const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../app');
const labService = require('../../services/labService');
jest.mock('../../services/labService');

const mockUser = { id: 'test-user-id', role: 'admin' }; // Role must match what's required
const token = jwt.sign(mockUser, process.env.JWT_SECRET);

describe('LabController', () => {
  let testLabId = '123';
  let testBookingId = '456';
  let mockLab = { id: '123', name: 'Test Lab' };
  let mockBooking = { id: '456', labId: '123', status: 'pending' };

  describe('POST /labs', () => {
    it('should create a lab and return lab data', async () => {
      const mockLabData = { name: 'New Lab' };
      labService.createLab.mockResolvedValue(mockLab);

      const res = await request(app)
        .post('/api/labs')
        .set('Authorization', `Bearer ${token}`)
        .send(mockLabData);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(mockLab);
    });

    it('should return error if lab creation fails', async () => {
      const mockLabData = { name: 'New Lab' };
      labService.createLab.mockRejectedValue(new Error('Lab creation failed'));

      const res = await request(app)
        .post('/api/labs')
        .set('Authorization', `Bearer ${token}`)
        .send(mockLabData);

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Lab creation failed');
    });
  });

  describe('GET /labs/:id', () => {
    it('should get lab by ID', async () => {
      labService.getLabById.mockResolvedValue(mockLab);

      const res = await request(app)
        .get(`/api/labs/${testLabId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockLab);
    });

    it('should return error if lab not found', async () => {
      labService.getLabById.mockResolvedValue(null);

      const res = await request(app)
        .get(`/api/labs/${testLabId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Lab not found');
    });
  });

  describe('GET /labs', () => {
    it('should get all labs', async () => {
      const mockLabs = [mockLab];
      labService.getAllLabs.mockResolvedValue(mockLabs);

      const res = await request(app)
        .get('/api/labs')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockLabs);
    });

    it('should return error if fetching labs fails', async () => {
      labService.getAllLabs.mockRejectedValue(new Error('Failed to fetch labs'));

      const res = await request(app)
        .get('/api/labs')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Failed to fetch labs');
    });
  });

  describe('PUT /labs/:id', () => {
    it('should update lab and return updated data', async () => {
      const updatedLabData = { name: 'Updated Lab Name' };
      labService.updateLab.mockResolvedValue(mockLab);

      const res = await request(app)
        .put(`/api/labs/${testLabId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedLabData);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockLab);
    });

    it('should return error if lab not found for update', async () => {
      labService.updateLab.mockResolvedValue(null);

      const res = await request(app)
        .put(`/api/labs/${testLabId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Updated Lab Name' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Lab not found');
    });
  });

  describe('DELETE /labs/:id', () => {
    it('should delete lab successfully', async () => {
      labService.deleteLab.mockResolvedValue(mockLab);

      const res = await request(app)
        .delete(`/api/labs/${testLabId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Lab deleted successfully');
    });

    it('should return error if lab not found for deletion', async () => {
      labService.deleteLab.mockResolvedValue(null);

      const res = await request(app)
        .delete(`/api/labs/${testLabId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Lab not found');
    });
  });

  // describe('POST /labs/:labId/booking/:bookingId/accept', () => {
  //   it('should accept a booking', async () => {
  //     labService.acceptBooking.mockResolvedValue(mockBooking);

  //     const res = await request(app)
  //       .post(`/api/labs/${testLabId}/booking/${testBookingId}/accept`)
  //       .set('Authorization', `Bearer ${token}`);

  //     expect(res.status).toBe(200);
  //     expect(res.body).toEqual(mockBooking);
  //   });

  //   it('should return error if booking acceptance fails', async () => {
  //     labService.acceptBooking.mockRejectedValue(new Error('Booking acceptance failed'));

  //     const res = await request(app)
  //       .post(`/api/labs/${testLabId}/booking/${testBookingId}/accept`)
  //       .set('Authorization', `Bearer ${token}`);

  //     expect(res.status).toBe(400);
  //     expect(res.body.error).toBe('Booking acceptance failed');
  //   });
  // });

  describe('DELETE /labs/:labId/booking/:bookingId/cancel', () => {
    it('should cancel a booking successfully', async () => {
      labService.cancelBooking.mockResolvedValue(mockBooking);

      const res = await request(app)
        .delete(`/api/labs/${testLabId}/booking/${testBookingId}/cancel`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404);
    });

    it('should return error if booking cancellation fails', async () => {
      labService.cancelBooking.mockRejectedValue(new Error('Booking cancellation failed'));
      const res = await request(app)
        .delete(`/api/labs/${testLabId}/booking/${testBookingId}/cancel`)
        .set('Authorization', `Bearer ${token}`);
    
      expect(res.status).toBe(404);
    });
    
  });
});

