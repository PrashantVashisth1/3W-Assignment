const User = require("../models/User");
const PointHistory = require("../models/PointHistory");

// Claim points for a user
const claimPoints = async (req, res) => {
  const { userId } = req.params;

  try {
    // Generate random points between 1 and 10
    const points = Math.floor(Math.random() * 10) + 1;

    // Find and update user's total points
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.totalPoints += points;
    await user.save();

    // Create point history entry
    const pointHistory = new PointHistory({
      userId,
      points,
    });
    await pointHistory.save();

    // Get updated rankings
    const users = await User.find().sort("-totalPoints");
    const updatedUsers = users.map((user, index) => {
      user.rank = index + 1;
      return user;
    });
    await Promise.all(updatedUsers.map((user) => user.save()));

    res.json({
      user,
      pointsAwarded: points,
      updatedRankings: updatedUsers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get point history for a user
const getPointHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const history = await PointHistory.find({ userId })
      .sort("-createdAt")
      .populate("userId", "name");
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  claimPoints,
  getPointHistory,
};
