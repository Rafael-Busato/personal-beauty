/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';
import { uuid } from 'uuidv4';

import AppError from '@shared/errors/AppError';

import IServicesTypesRepository from '@modules/servicesTypes/repositories/IServicesTypesRepository';
import ServicesTypes from '../infra/typeorm/entities/ServicesTypes';
import serviceTypeRouter from '../infra/http/routes/serviceType.routes';
import { string } from '@hapi/joi';

interface IRequest {
  service_type: string;
}

interface IRequestSubService {
  new_sub_service: string;
  id: string;
}

@injectable()
class CreateServiceType {
  constructor(
    @inject('ServicesTypesRepository')
    private servicesTypesRepository: IServicesTypesRepository,
  ) {}

  public async index(): Promise<ServicesTypes> {
    const listServiceTypes = await this.servicesTypesRepository.index();
    return listServiceTypes;
  }

  public async show(id: string): Promise<ServicesTypes> {
    const specificSubService = await this.servicesTypesRepository.show(id);
    return specificSubService;
  }

  public async execute({ service_type }: IRequest): Promise<ServicesTypes> {
    // const findServicesTypes = await this.servicesTypesRepository.findByDate(
    //   service_type,
    // );

    // if (findServicesTypes) {
    //   throw new AppError('This service type is already exists');
    // }

    const serviceType = await this.servicesTypesRepository.create({
      service_type,
      active: true,
      sub_service: [
        {
          id: uuid(),
          sub_services: '',
          active: false,
          created_at: new Date(),
          update_at: new Date(),
        },
      ],
    });

    return serviceType;
  }

  public async createSubServices({
    new_sub_service,

    id,
  }: IRequestSubService): Promise<ServicesTypes> {
    let findSubServices = await this.servicesTypesRepository.findById(id);

    let subServiceParsed = JSON.parse(findSubServices.sub_service);

    subServiceParsed.sub_services = new_sub_service;
    findSubServices.sub_service = [JSON.stringify(subServiceParsed)];

    await this.servicesTypesRepository.save(findSubServices);

    return findSubServices;
  }
}

export default CreateServiceType;
