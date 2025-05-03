// const cloudinary = require("./utils/cloudinary.config");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // const orders = await prisma.order.findMany({
  //   where: {
  //     userId: 1,
  //   },
  //   include: {
  //     items: {
  //       include: {
  //         product: true,
  //       },
  //     },
  //   },
  // });
  const products = await prisma.product.findMany({});
  // console.log(orders);
  console.log(products);

  // ... you will write your Prisma Client queries here
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// const url = cloudinary.url(
//   "Simulator_Screenshot_-_iPhone_15_Pro_-_2025-03-30_at_10.25.42_tegklf",
//   {
//     transformation: [
//       {
//         fetch_format: "auto",
//       },
//       {
//         quality: "auto",
//       },
//       {
//         width: 1200,
//       },
//     ],
//   }
// );

// console.log(url);
