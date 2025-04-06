const request = require('supertest');
const app = require('../../app'); // adjust path if needed
const authService = require('../../services/authService');

jest.mock('../../services/authService');

describe('AuthController', () => {
  const mockToken = 'mockToken123';
  const mockId = '6611234567abcdef12345678';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register/lecturer', () => {
    it('should register a lecturer and return token', async () => {
      authService.registerLecturer.mockResolvedValue(mockToken);

      const res = await request(app)
        .post('/api/auth/register/lecturer')
        .send({ name: 'Lecturer', email: 'lect@example.com', password: 'pass' });

      expect(res.status).toBe(201);
      expect(res.body.token).toBe(mockToken);
    });
  });

  describe('POST /api/auth/register/student', () => {
    it('should register a student and return token', async () => {
      authService.registerStudent.mockResolvedValue(mockToken);

      const res = await request(app)
        .post('/api/auth/register/student')
        .send({ name: 'Student', email: 'stud@example.com', password: 'pass' });

      expect(res.status).toBe(201);
      expect(res.body.token).toBe(mockToken);
    });

    it('should return 400 if student registration fails', async () => {
      authService.registerStudent.mockRejectedValue(new Error('Registration failed'));

      const res = await request(app)
        .post('/api/auth/register/student')
        .send({ name: 'Student', email: 'stud@example.com', password: 'pass' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Registration failed');
    });
  });

  describe('POST /api/auth/register/admin', () => {
    it('should register an admin and return token', async () => {
      authService.registerAdmin.mockResolvedValue(mockToken);

      const res = await request(app)
        .post('/api/auth/register/admin')
        .send({ name: 'Admin', email: 'admin@example.com', password: 'pass' });

      expect(res.status).toBe(201);
      expect(res.body.token).toBe(mockToken);
    });

    it('should return 400 if admin registration fails', async () => {
      authService.registerAdmin.mockRejectedValue(new Error('Registration failed'));

      const res = await request(app)
        .post('/api/auth/register/admin')
        .send({ name: 'Admin', email: 'admin@example.com', password: 'pass' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Registration failed');
    });
  });

  describe('GET /api/auth/admin/:id', () => {
    it('should return admin by ID', async () => {
      const mockAdmin = { id: mockId, name: 'Admin1' };
      authService.getAdminById.mockResolvedValue(mockAdmin);

      const res = await request(app).get(`/api/auth/admin/${mockId}`);

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Admin1');
    });

    it('should return 404 if admin not found', async () => {
      authService.getAdminById.mockResolvedValue(null);

      const res = await request(app).get(`/api/auth/admin/${mockId}`);

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Admin not found');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login user and return token', async () => {
      authService.login.mockResolvedValue(mockToken);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'user@example.com', password: 'pass' });

      expect(res.status).toBe(200);
      expect(res.body.token).toBe(mockToken);
    });

    it('should return 401 if login fails', async () => {
      authService.login.mockRejectedValue(new Error('Invalid credentials'));

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'fail@example.com', password: 'wrong' });

      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Invalid credentials');
    });
  });

  describe('GET /api/auth/lecturer/:id', () => {
    it('should return lecturer by ID', async () => {
      const mockLecturer = { id: mockId, name: 'Lecturer1' };
      authService.getLecturerById.mockResolvedValue(mockLecturer);

      const res = await request(app).get(`/api/auth/lecturer/${mockId}`);

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Lecturer1');
    });

    it('should return 404 if lecturer not found', async () => {
      authService.getLecturerById.mockResolvedValue(null);

      const res = await request(app).get(`/api/auth/lecturer/${mockId}`);

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Lecturer not found');
    });
  });
});
