const app = require('./app');
const connectDB = require('./config/db');

connectDB(); // Only call DB connection here if needed
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
