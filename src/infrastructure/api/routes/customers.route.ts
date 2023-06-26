import { CustomerCreateUseCase } from '@app/usecase/customer/create/customer.create.usecase';
import { CustomerListUseCase } from '@app/usecase/customer/list/customer.list.usecase';
import express, { type Request, type Response } from 'express';
import { CustomerPresenter } from '@app/infrastructure/api/presenters/customer.presenter';
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

customersRoute.get('/', async (req: Request, res: Response) => {
  const usecase = new CustomerListUseCase(new CustomerRepository());
  const output = await usecase.execute({});

  res.format({
    json: async () => res.send(output),
    xml: async () => res.send(CustomerPresenter.toXml(output)),
  });
});
