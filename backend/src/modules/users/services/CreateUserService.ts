import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  city: string;
  email: string;
  password: string;
  bank: string;
  phone: string;
  occupation: string;
  zipCode: string;
  neighborhood: string;
  state: string;
  address: string;
  number: string;
  agency: string;
  account: string;
  document: string;
  fullname: string;
  service_type: object;
  sub_service: object;
  price: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    city,
    email,
    password,
    bank,
    phone,
    occupation,
    zipCode,
    neighborhood,
    state,
    address,
    number,
    agency,
    account,
    document,
    fullname,
    service_type,
    sub_service,
    price,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      bank,
      phone,
      occupation,
      zipCode,
      neighborhood,
      state,
      address,
      number,
      agency,
      account,
      document,
      fullname,
      service_type,
      sub_service,
      price,

      city: city.toLowerCase(),
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
