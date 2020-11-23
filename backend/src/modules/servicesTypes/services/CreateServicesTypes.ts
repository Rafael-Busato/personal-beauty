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

    console.log(specificSubService);
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
      sub_service: [],
    });

    return serviceType;
  }

  public async createSubServices({
    new_sub_service,
    id,
  }: IRequestSubService): Promise<ServicesTypes> {
    let findSubServices = await this.servicesTypesRepository.findById(id);

    const teste = [...findSubServices.sub_service, ...new_sub_service];

    findSubServices.sub_service = teste;

    await this.servicesTypesRepository.save(findSubServices);

    return true;
  }
}

export default CreateServiceType;
