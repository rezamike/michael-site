const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

const app = express();
app.use(cors());
app.use(express.json());

const WaitlistEntry = mongoose.model('WaitlistEntry', new mongoose.Schema({
  email: { type: String, required: true, unique: true }
}));

app.post('/api/waitlist', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    const entry = new WaitlistEntry({ email });
    await entry.save();
    console.log(`Saved to waitlist: ${email}`);
    res.status(200).json({ message: 'Thanks for joining!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving email.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));