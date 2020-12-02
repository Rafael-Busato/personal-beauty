/* eslint-disable camelcase */
import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { classToClass } from 'class-transformer';
import ListProviderServiceTypes from '@modules/servicesTypes/services/CreateServicesTypes';

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
    const user_id = request.user.id;
    const { service_type, city } = request.query;
    console.log(city === undefined);
    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({ user_id });
    let fill = [];

    if (service_type !== undefined && city !== undefined) {
      providers.forEach(service => {
        service.city === city && fill.push(service);

        service.service_type.filter(item => {
          if (item === service_type) {
            fill.push(service);
          }
        });
      });
    } else if (service_type && city == undefined) {
      providers.forEach(service => {
        service.service_type.filter(item => {
          if (item === service_type) {
            fill.push(service);
          }
        });
      });
    } else if (city && !service_type) {
      providers.forEach(service => {
        service.city === city && fill.push(service);
      });
    } else {
      fill.push({ error: 'Selecione um filtro' });
    }
    return response.json(classToClass(fill));
  }
}
