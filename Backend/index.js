const cloudinary = require("./utils/cloudinary.config");
// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// async function main() {
//   const orders = await prisma.order.findMany({
//     where: {
//       userId: 1,
//     },
//     include: {
//       items: {
//         include: {
//           product: true,
//         },
//       },
//     },
//   });
//   // console.log(orders);
//   console.log(orders);

// ... you will write your Prisma Client queries here
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

const url = cloudinary.url("login-image_c5hh56", {
  transformation: [
    {
      fetch_format: "auto",
    },
    {
      quality: "auto",
    },
    {
      width: 1200,
    },
  ],
});

console.log(url);
