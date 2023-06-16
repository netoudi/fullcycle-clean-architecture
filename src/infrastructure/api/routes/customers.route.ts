import { CustomerCreateUseCase } from '@app/usecase/customer/create/customer.create.usecase';
import express, { type Request, type Response } from 'express';
import { CustomerRepository } from '@app/infrastructure/customer/repository/sequelize/customer.repository';

export const customersRoute = express.Router();

customersRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CustomerCreateUseCase(new CustomerRepository());

  try {
    const input = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        zipcode: req.body.address.zipcode,
        city: req.body.address.city,
      },
    };

    const output = await usecase.execute(input);

    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
