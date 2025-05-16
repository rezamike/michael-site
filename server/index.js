const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/waitlist', (req, res) => {
  const { email } = req.body;
  console.log(`New waitlist signup: ${email}`);
  res.status(200).json({ message: 'Thanks for joining!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));