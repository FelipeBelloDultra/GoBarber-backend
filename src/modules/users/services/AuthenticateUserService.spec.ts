import AppError from '@shared/errors/AppError';

import FakerUsersRepository from '../repositories/fakes/FakerUsersRepository';
import FakerHashProvider from '../providers/HashProvider/fakes/FakeHasHhProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakerUsersRepository;
let fakerHashProvider: FakerHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakerUsersRepository();
    fakerHashProvider = new FakerHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakerHashProvider);

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakerHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@hotmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@hotmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@hotmail.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'johndoe@hotmail.com',
        password: 'wron-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
