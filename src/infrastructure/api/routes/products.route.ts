import { ProductCreateUseCase } from '@app/usecase/product/create/product.create.usecase';
import { ProductListUseCase } from '@app/usecase/product/list/product.list.usecase';
import express, { type Request, type Response } from 'express';
import { ProductRepository } from '@app/infrastructure/product/repository/sequelize/product.repository';

export const productsRoute = express.Router();

productsRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new ProductCreateUseCase(new ProductRepository());

  try {
    const input = {
      name: req.body.name,
      price: req.body.price,
    };

    const output = await usecase.execute(input);

    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productsRoute.get('/', async (req: Request, res: Response) => {
  const usecase = new ProductListUseCase(new ProductRepository());

  try {
    const output = await usecase.execute({});

    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
