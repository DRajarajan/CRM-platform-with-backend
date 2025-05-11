import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/google', async (req, res) => {
  try {
    const { googleId, email, name, picture } = req.body;

    let user = await User.findOne({ googleId });

    if (!user) {
      user = await User.create({
        googleId,
        email,
        name,
        picture,
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ message: 'Authentication failed' });
  }
});

export default router;