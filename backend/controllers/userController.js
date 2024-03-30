import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Requested from '../models/requestedUsers.js';

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error('All feilds are required');
    }

    // returns true if user exists else returns false
    const existingUser = await User.findOne({ $or: [{ name }, { email }] });

    if (existingUser) {
      throw new Error('User already exists with these credentials');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res
      .status(200)
      .send({ message: 'Account created Sucessfully', user: savedUser });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error('Both feilds are required');
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User doesnt exists');
    }

    // compare user password with password in db i.e user.password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Email or password is not matching');
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res
      .status(200)
      .send({ token, id: user._id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);

    const user = await User.findById(userId);

    if (!user) {
      throw new Error('No user found!!!');
    }

    // removing sensitive data from user object
    const { password, ...userData } = user.toObject();

    res.status(200).send({ user: userData });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const saveRequestedUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error('All feilds are required');
    }

    // returns true if user exists else returns false
    const existingUser = await Requested.findOne({
      $or: [{ name }, { email }],
    });

    if (existingUser) {
      throw new Error('User already exists with these credentials');
    }

    const newUser = new Requested({
      name,
      email,
      password,
    });

    const savedUser = await newUser.save();
    res.status(200).send({
      message: 'Request for registration sent sucessfully',
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export { createUser, loginUser, getUser, saveRequestedUser };
