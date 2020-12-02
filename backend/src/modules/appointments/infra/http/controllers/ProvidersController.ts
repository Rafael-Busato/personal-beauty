/* eslint-disable camelcase */
import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { classToClass } from 'class-transformer';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({ user_id });

    return response.json(classToClass(providers));
  }

  public async getFilterProviders(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { service_type, city } = request.params;
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({ user_id });

    const filterd = providers.filter(item => {
      let fill = [];
      if (service_type && city) {
        item.service_type != service_type && item.city == city;

        fill.push(item);
      }
    });
    
    return response.json(classToClass(providers));
  }
}
