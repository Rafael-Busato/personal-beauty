import { Response, Request } from 'express';
import { container } from 'tsyringe';
import ListProviderServiceTypes from '@modules/servicesTypes/services/CreateServicesTypes';

export default class CreateServicesTypes {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { new_sub_service } = request.body;

    const ProviderServiceTypes = container.resolve(ListProviderServiceTypes);

    const serviceType = await ProviderServiceTypes.createSubServices({
      new_sub_service,
      id,
    });

    return response.json(serviceType);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const ProviderServiceTypes = container.resolve(ListProviderServiceTypes);

    const listServiceTypes = await ProviderServiceTypes.index();

    // listServiceTypes.forEach(service => {
    //   let parsed = JSON.parse(service.sub_service);

    //   return (service.sub_service = parsed);
    // });

    return response.json(listServiceTypes);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const ProviderServiceTypes = container.resolve(ListProviderServiceTypes);

    let specificSubService = await ProviderServiceTypes.show(id);

    return response.json(specificSubService);
  }
}
