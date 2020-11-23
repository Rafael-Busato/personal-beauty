import { Response, Request } from 'express';
import { container } from 'tsyringe';
import ListProviderServiceTypes from '@modules/servicesTypes/services/CreateServicesTypes';

export default class CreateServicesTypes {
  public async create(request: Request, response: Response): Promise<Response> {
    const { service_type } = request.body;

    const ProviderServiceTypes = container.resolve(ListProviderServiceTypes);

    const serviceType = await ProviderServiceTypes.execute({
      service_type,
    });

    return response.json(serviceType);
  }

  public async active(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { active } = request.body;

    const ProviderServiceTypes = container.resolve(ListProviderServiceTypes);
    const service = await ProviderServiceTypes.ActiveOrDesactivate(id, active);

    return response.json(service);
  }
}
