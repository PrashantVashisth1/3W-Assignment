const User = require("../models/User");

// Get all users with rankings
const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort("-totalPoints");

    // Update ranks
    const updatedUsers = users.map((user, index) => {
      user.rank = index + 1;
      return user;
    });

    await Promise.all(updatedUsers.map((user) => user.save()));

    res.json(updatedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { name } = req.body;
  console.log(req.body)

  try {
    const user = new User({ name });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get initial users if none exist
const initializeUsers = async () => {
  try {
    const count = await User.countDocuments();
    if (count === 0) {
      const initialUsers = [
        "Rahul",
        "Kamal",
        "Sanak",
        "Amit",
        "Priya",
        "Raj",
        "Neha",
        "Vikram",
        "Deepa",
        "Sunil",
      ];

      await Promise.all(
        initialUsers.map((name) => {
          const user = new User({ name });
          return user.save();
        })
      );
    }
  } catch (error) {
    console.error("Error initializing users:", error);
  }
};

// Call this function when the server starts
initializeUsers();

module.exports = {
  getUsers,
  createUser,
};
