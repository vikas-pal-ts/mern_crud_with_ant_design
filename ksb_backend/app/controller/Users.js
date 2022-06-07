const UserSchema = require("../model/schema/User.schema");

const getUsersList = async (req, res) => {
  const userList = await UserSchema.find();
  res.send({ data: userList, status: 1 });
};

const addUser = async (req, res) => {
  const { userName, email, phone } = req.body;
  if (userName && email && phone) {
    const updatedUser = await UserSchema.create({ userName, email, phone });
    res.status(201).send({ data: updatedUser, status: 1 });
  } else {
    res.status(400).send({ data: [], status: 0 });
  }
};

const updateUser = async (req, res) => {
  const { userName, email, phone, userId } = req.body;
  if (userName && email && phone && userId) {
    const insertedUser = await UserSchema.findByIdAndUpdate(
      userId,
      {
        userName,
        email,
        phone,
      },
      { new: true }
    );
    res.status(201).send({ data: insertedUser, status: 1 });
  } else {
    res
      .status(400)
      .send({ data: [], status: 0, message: "Some parameter is missing" });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.body;
  if (userId) {
    const deletedUser = await UserSchema.findByIdAndDelete(userId, {
      new: true,
    });
    res.status(201).send({ data: deletedUser, status: 1 });
  } else {
    res
      .status(400)
      .send({ data: [], status: 0, message: "Some parameter is missing" });
  }
};

module.exports = {
  getUsersList,
  addUser,
  updateUser,
  deleteUser,
};
