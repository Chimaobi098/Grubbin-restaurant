const { PrismaClient } = require("@prisma/client");
const { createOrder } = require("../controllers/api");
const { connect } = require("../routes/api");

const prisma = new PrismaClient();

module.exports = {
  findItem: async function (id) {
    const item = await prisma.product.findUnique({
      where: {
        id: parseInt(id, 10), // Convert id to an integer
      },
    });
    return item;
  },

  allItems: async function name() {
    const items = await prisma.product.findMany();
    return items;
  },

  findUser: async function (email) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  },
  findUserById: async function (id) {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      omit: {
        password: true,
      },
    });

    return user;
  },
  createUser: async function (
    email,
    password,
    firstname,
    lastname,
    phonenumber,
    address,
    city,
    state
  ) {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        phone: phonenumber,
        address: address,
        city: city,
        state: state,
      },
    });

    return user;
  },

  createOrder: async function (userId, totalAmount, status, items) {
    const order = await prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        totalAmount: totalAmount,
        status: status,
        items: {
          create: items.map((item) => ({
            product: { connect: { id: item.id } },
            quantity: item.quantity,
          })),
        },
      },
    });
    return order;
  },

  findOrders: async function (id) {
    const orders = await prisma.order.findMany({
      where: {
        userId: id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    const flattenedOrders = orders.map((order) => ({
      ...order,
      items: order.items.map((item) => {
        // Merge product fields into the item and remove the nested product
        const { product, ...itemProps } = item;
        return {
          ...itemProps,
          // spread product properties directly (e.g., id, name, description, etc.)
          ...product,
        };
      }),
    }));

    return flattenedOrders;
  },
};
