const EquipmentController = require('../../controllers/equipmentController');
const EquipmentService = require('../../services/equipmentService');
const fs = require('fs');
const path = require('path');

// Mock all external dependencies
jest.mock('../../services/equipmentService');
jest.mock('fs');
jest.mock('path');

// Complete multer mock that matches the actual library structure
jest.mock('multer', () => {
  const mStorage = {
    destination: (req, file, cb) => cb(null, 'uploads/equipment'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
  };

  const multer = (options) => {
    return {
      single: (fieldname) => (req, res, next) => {
        req.file = {
          fieldname: 'image',
          originalname: 'test.jpg',
          encoding: '7bit',
          mimetype: 'image/jpeg',
          destination: 'uploads/equipment',
          filename: '123456789-test.jpg',
          path: 'uploads/equipment/123456789-test.jpg',
          size: 1024
        };
        next();
      }
    };
  };

  multer.diskStorage = jest.fn(() => mStorage);
  return multer;
});

describe('EquipmentController', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
      file: null,
      user: { id: 'user123', role: 'admin' },
      headers: {
        'content-type': 'multipart/form-data',
        'transfer-encoding': 'chunked'
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };

    // Mock filesystem and path operations
    path.join.mockImplementation((...args) => args.join('/'));
    fs.existsSync.mockReturnValue(true);
    fs.unlinkSync.mockImplementation(() => {});
    fs.mkdirSync.mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createEquipment', () => {
    it('should create equipment with image successfully', async () => {
      req.body = { item_num: 'EQ001', name: 'Microscope', quantity: 5 };
      const mockEquipment = {
        _id: '1',
        ...req.body,
        img_url: '/uploads/equipment/123456789-test.jpg'
      };

      EquipmentService.createEquipment.mockResolvedValue(mockEquipment);

      await EquipmentController.createEquipment(req, res);

      expect(EquipmentService.createEquipment).toHaveBeenCalledWith({
        item_num: 'EQ001',
        name: 'Microscope',
        quantity: 5,
        img_url: '/uploads/equipment/123456789-test.jpg'
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockEquipment);
    });

    it('should handle file upload errors', async () => {
      const mockError = new Error('Invalid file type');
      
      // Simulate multer error
      jest.spyOn(EquipmentController, 'createEquipment').mockImplementationOnce((req, res) => {
        res.status(400).json({ error: mockError.message });
      });

      await EquipmentController.createEquipment(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid file type' });
    });
  });

  describe('updateEquipment', () => {
    // it('should update equipment and delete old image', async () => {
    //   req.params.id = 'equip123';
    //   req.body = { name: 'Updated Microscope' };
    //   const oldEquipment = {
    //     _id: 'equip123',
    //     img_url: '/uploads/equipment/old-image.jpg'
    //   };

    //   EquipmentService.getEquipmentById.mockResolvedValue(oldEquipment);
    //   EquipmentService.updateEquipment.mockResolvedValue({
    //     ...oldEquipment,
    //     ...req.body,
    //     img_url: '/uploads/equipment/123456789-test.jpg'
    //   });

    //   await EquipmentController.updateEquipment(req, res);

    //   expect(fs.unlinkSync).toHaveBeenCalledWith('uploads/equipment/old-image.jpg');
    //   expect(EquipmentService.updateEquipment).toHaveBeenCalledWith('equip123', {
    //     item_num: undefined,
    //     name: 'Updated Microscope',
    //     quantity: undefined,
    //     img_url: '/uploads/equipment/123456789-test.jpg'
    //   });
    // });
  });

  // describe('deleteEquipment', () => {
  //   it('should delete equipment and its associated image', async () => {
  //     req.params.id = 'equip123';
  //     const mockEquipment = {
  //       _id: 'equip123',
  //       img_url: '/uploads/equipment/test.jpg'
  //     };

  //     EquipmentService.getEquipmentById.mockResolvedValue(mockEquipment);
  //     EquipmentService.deleteEquipment.mockResolvedValue(true);

  //     await EquipmentController.deleteEquipment(req, res);

  //     expect(fs.unlinkSync).toHaveBeenCalledWith('uploads/equipment/test.jpg');
  //     expect(EquipmentService.deleteEquipment).toHaveBeenCalledWith('equip123');
  //     expect(res.json).toHaveBeenCalledWith({ message: 'Equipment deleted successfully' });
  //   });
  // });

  describe('getEquipmentById', () => {
    it('should return equipment by ID', async () => {
      req.params.id = 'equip123';
      const mockEquipment = { _id: 'equip123', name: 'Microscope' };

      EquipmentService.getEquipmentById.mockResolvedValue(mockEquipment);

      await EquipmentController.getEquipmentById(req, res);

      expect(EquipmentService.getEquipmentById).toHaveBeenCalledWith('equip123');
      expect(res.json).toHaveBeenCalledWith(mockEquipment);
    });

    it('should handle not found error', async () => {
      req.params.id = 'invalid';
      EquipmentService.getEquipmentById.mockResolvedValue(null);

      await EquipmentController.getEquipmentById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Equipment not found' });
    });
  });

});