/* eslint-disable camelcase */
import ServicesTypes from '../infra/typeorm/entities/ServicesTypes';

import ICreateServicesTypesDTO from '../dtos/ICreateServicesTypesDTO';
import IUpdateSubServicesTypesDTO from '../dtos/IUpdateSubServicesDTO';
// import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
// import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';

export default interface IServicesTypesRepository {
  create(data: ICreateServicesTypesDTO): Promise<ServicesTypes>;
  save(data: ServicesTypes): Promise<ServicesTypes>;
  update(data: IUpdateSubServicesTypesDTO): Promise<ServicesTypes>;
  findById(id: string): Promise<ServicesTypes>;
  index(): Promise<ServicesTypes>;
  show(id: string): Promise<IUpdateSubServicesTypesDTO>;

  // findByDate(provider_type: string): Promise<ServicesTypes | undefined>;
  // findAllInMonthFromProvider(
  //   data: IFindAllInMonthFromProviderDTO,
  // ): Promise<Appointment[]>;
  // findAllInDayFromProvider(
  //   data: IFindAllInDayFromProviderDTO,
  // ): Promise<Appointment[]>;
}
