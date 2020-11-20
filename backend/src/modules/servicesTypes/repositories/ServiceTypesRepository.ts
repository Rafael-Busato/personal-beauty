/* eslint-disable camelcase */
import { getRepository, Not, Repository } from 'typeorm';

import IServicesTypesRepository from '@modules/servicesTypes/repositories/IServicesTypesRepository';
import ICreateServicesTypesDTO from '@modules/servicesTypes/dtos/ICreateServicesTypesDTO';
import IUpdateSubServicesDTO from '@modules/servicesTypes/dtos/IUpdateSubServicesDTO';

import ServicesTypes from '../infra/typeorm/entities/ServicesTypes';

class ServiceTypeRepository implements IServicesTypesRepository {
  private ormRepository: Repository<ServicesTypes>;

  constructor() {
    this.ormRepository = getRepository(ServicesTypes);
  }

  public async findById(id: string): Promise<ServicesTypes | undefined> {
    const subServices = await this.ormRepository.findOne(id);

    return subServices;
  }

  public async index(): Promise<ServicesTypes | undefined> {
    const servicesTypes = await this.ormRepository.find();

    return servicesTypes;
  }

  public async show(id: string): Promise<ServicesTypes | undefined> {
    const specificSubService = await this.ormRepository.findOne({
      where: { id },
    });

    return specificSubService;
  }
  // public async findByEmail(email: string): Promise<User | undefined> {
  //   const user = await this.ormRepository.findOne({
  //     where: { email },
  //   });

  //   return user;
  // }

  // public async findAllProviders({
  //   except_user_id,
  // }: IFindAllProvidersDTO): Promise<User[]> {
  //   let users: User[];

  //   if (except_user_id) {
  //     users = await this.ormRepository.find({
  //       where: {
  //         id: Not(except_user_id),
  //       },
  //     });
  //   } else {
  //     users = await this.ormRepository.find();
  //   }

  //   return users;
  // }

  public async create(
    ServiceData: ICreateServicesTypesDTO,
  ): Promise<ServicesTypes> {
    const service = this.ormRepository.create(ServiceData);
    await this.ormRepository.save(service);

    return service;
  }

  public async update(
    SubServiceData: IUpdateSubServicesDTO,
  ): Promise<ServicesTypes | undefined> {
    const subService = this.ormRepository.update(SubServiceData);
    await this.ormRepository.save(subService);

    return subService;
  }

  public async save(user: ServicesTypes): Promise<ServicesTypes | undefined> {
    return this.ormRepository.save(user);
  }
}

export default ServiceTypeRepository;
