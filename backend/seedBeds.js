// Seed script to populate the database with beds
const mongoose = require('mongoose');
const Bed = require('./models/Bed');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bedmanager');
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const generateBeds = () => {
  const beds = [];
  
  // ICU beds (iA1-iA12, iB1-iB12)
  ['A', 'B'].forEach(row => {
    for (let i = 1; i <= 12; i++) {
      beds.push({
        bedId: `i${row}${i}`,
        ward: 'ICU',
        status: 'available',
        patientName: null,
        patientId: null
      });
    }
  });
  
  // FLOOR 1 - General Ward beds (A1-A21, B1-B21, C1-C21, D1-D21)
  ['A', 'B', 'C', 'D'].forEach(row => {
    for (let i = 1; i <= 21; i++) {
      beds.push({
        bedId: `${row}${i}`,
        ward: 'General',
        status: 'available',
        patientName: null,
        patientId: null
      });
    }
  });
  
  // FLOOR 2 - Emergency beds (E1-E21, F1-F21, G1-G21, H1-H21)
  ['E', 'F', 'G', 'H'].forEach(row => {
    for (let i = 1; i <= 21; i++) {
      beds.push({
        bedId: `${row}${i}`,
        ward: 'Emergency',
        status: 'available',
        patientName: null,
        patientId: null
      });
    }
  });
  
  return beds;
};

const seedBeds = async () => {
  try {
    await connectDB();
    
    // Clear existing beds
    await Bed.deleteMany({});
    console.log('🗑️  Cleared existing beds');
    
    // Generate and insert beds
    const beds = generateBeds();
    await Bed.insertMany(beds);
    
    console.log(`✅ Successfully seeded ${beds.length} beds`);
    console.log('Beds by ward:');
    console.log('  - ICU: 24 beds (iA1-iA12, iB1-iB12)');
    console.log('  - General (Floor 1): 84 beds (A1-A21, B1-B21, C1-C21, D1-D21)');
    console.log('  - Emergency (Floor 2): 84 beds (E1-E21, F1-F21, G1-G21, H1-H21)');
    console.log(`  - Total: ${beds.length} beds`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding beds:', error);
    process.exit(1);
  }
};

seedBeds();
