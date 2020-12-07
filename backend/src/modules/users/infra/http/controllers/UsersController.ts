import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    console.log(data);

    const createUser = container.resolve(CreateUserService);

    if (data.mobile === true) {
      console.log('ola', data);
      try {
        const user = await createUser.execute({
          name: data.name,
          city: data.city,
          email: data.email,
          password: data.password,
          bank: '',
          phone: '',
          occupation: data.occupation,
          zipCode: data.zipCode,
          neighborhood: '',
          state: '',
          address: '',
          number: '',
          agency: '',
          account: '',
          document: '',
          fullname: '',
          service_type: [],
          sub_service: [],
          price: '',
        });
      } catch (err) {
        console.log('here', err);
      }

      console.log('chegou aqui');
      return response.json(user);
    }
    let trueKeys, trueKeySubServices;

    if (!!data.serviceType) {
      trueKeys = Object.keys(data.serviceType).filter(
        key => data.serviceType[key],
      );
    } else {
      trueKeys = [];
    }

    console.log('PAROU AQUI');

    if (!!data.subService) {
      trueKeySubServices = Object.keys(data.subService).map((item, key) => {
        return {
          service: item,
          price: data.price[item],
        };
      });
    } else {
      trueKeySubServices = [];
    }

    console.log('here');
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
      service_type: trueKeys,
      sub_service: trueKeySubServices,
      price: data.price || '',
    });

    delete user.password;

    return response.json(user);
  }
}
