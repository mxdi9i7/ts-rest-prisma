import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

export const seeding = async (prisma: PrismaClient) => {
  console.log('Seeding start...');
  const dummyStudent = await prisma.student.create({
    data: {
      firstName: 'Kevin',
      lastName: 'Zhang',
      age: 10,
      grade: 'A',
    },
  });

  // Create a product for iPhone 14, priced at whatever you want and with how many ever quantity you want
  const dummyProduct = await prisma.product.create({
    data: {
      title: 'iPhone 14',
      price: 1999,
      quantity: 1000,
    },
  });

  const order = await prisma.order.create({
    data: {
      student: {
        connect: {
          id: dummyStudent.id,
        },
      },
      products: {
        connect: [
          {
            id: dummyProduct.id,
          },
        ],
      },
    },
  });
};
