import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({
      name: data.name,
      city: data.city,
      email: data.email,
      password: data.password,
      bank: data.bank,
      phone: data.phone,
      occupation: data.occupation,
      zipCode: data.zipCode,
      neighborhood: data.neighborhood,
      state: data.state,
      address: data.address,
      number: data.number,
      agency: data.agency,
      account: data.account,
      document: data.document,
      fullname: data.fullname,
      service_type: [data.serviceType],
      sub_service: [data.subService],
      price: '3333',
    });

    delete user.password;

    return response.json(true);
  }
}
