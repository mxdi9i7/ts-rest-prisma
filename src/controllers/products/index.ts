import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
  const { title, price, quantity } = req.body;
  const product = await prisma.product.create({
    data: {
      title,
      price: Number(price),
      quantity: Number(quantity),
    },
  });
  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.body;
  const foundProduct = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
  });
  if (!foundProduct) {
    return res.json({
      message: 'Product does not exist',
    });
  }
  const productExistsInOrder = await prisma.order.findFirst({
    where: {
      products: {
        some: {
          id: Number(id),
        },
      },
    },
  });
  if (productExistsInOrder) {
    return res.json({
      message: 'Cannot delete product with existing order',
    });
  }
  const product = await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id, title, price, quantity } = req.body;
  const foundProduct = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
  });
  if (!foundProduct) {
    return res.json({
      message: 'Product does not exist',
    });
  }
  const product = await prisma.product.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      price: Number(price),
      quantity: Number(quantity),
    },
  });
  res.json(product);
};
