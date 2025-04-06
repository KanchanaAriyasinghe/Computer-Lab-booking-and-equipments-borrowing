// const mongoose = require('mongoose');
// const EquipmentService = require('../../services/equipmentService');
// const Equipment = require('../../models/Equipment');
// const notificationService = require('../../services/notificationService');
// const connectDB = require('../../config/db'); // Import your db connection

// // Mock the notification service
// jest.mock('../../services/notificationService');

// describe('EquipmentService', () => {
//   // Increase timeout for all tests
//   jest.setTimeout(30000); // Increased to 30 seconds

//   beforeAll(async () => {
//     // Use your actual DB connection logic
//     await connectDB();
//   });

// //   beforeEach(async () => {
// //     // Clear the database before each test
// //     await Equipment.deleteMany({});
// //     jest.clearAllMocks();
// //   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//   });

//   describe('createEquipment', () => {
//     it('should create new equipment', async () => {
//       const equipmentData = {
//         item_num: 'EQ001',
//         name: 'Microscope',
//         quantity: 5,
//       };

//       const result = await EquipmentService.createEquipment(equipmentData);
//       expect(result).toHaveProperty('_id');
//       expect(result.item_num).toBe(equipmentData.item_num);
//       expect(result.name).toBe(equipmentData.name);
//       expect(result.quantity).toBe(equipmentData.quantity);
//     });

//     it('should throw error for duplicate item_num', async () => {
//       const equipmentData = {
//         item_num: 'EQ001',
//         name: 'Microscope',
//         quantity: 5,
//       };

//       await EquipmentService.createEquipment(equipmentData);
//       await expect(EquipmentService.createEquipment(equipmentData)).rejects.toThrow();
//     });
//   });

//   // ... rest of your test cases
// });