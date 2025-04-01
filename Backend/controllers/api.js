require("dotenv").config();
const db = require("../db/queries");
// const cloudinary = require("../utils/cloudinary.config");

exports.specificItem = async (req, res) => {
  //   const itemId = parseInt(req.params.menuid); // Convert to integer

  const item = await db.findItem(req.params.menuid);
  res.json(item);
};

exports.getAllItems = async (req, res) => {
  const items = await db.allItems();
  res.json(items);
};

exports.findOrders = async (req, res) => {
  try {
    const orders = await db.findOrders(req.user.id);
    res.json(orders);
  } catch (error) {
    console.error(error);
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { totalAmount, status, items } = req.body;
    const order = await db.createOrder(req.user.id, totalAmount, status, items);

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

exports.populateProfile = async (req, res) => {
  try {
    const user = await db.findUserById(req.user.id);
    res.json(user);
  } catch (error) {
    console.error(error);
  }
};
