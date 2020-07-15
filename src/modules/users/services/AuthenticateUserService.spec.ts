import AppError from '@shared/errors/AppError';

import FakerUsersRepository from '../repositories/fakes/FakerUsersRepository';
import FakerHashProvider from '../providers/HashProvider/fakes/FakeHasHhProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakerUsersRepository();
    const fakerHashProvider = new FakerHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakerHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakerHashProvider,
    );

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
    const fakeUsersRepository = new FakerUsersRepository();
    const fakerHashProvider = new FakerHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakerHashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'johndoe@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakerUsersRepository();
    const fakerHashProvider = new FakerHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakerHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakerHashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@hotmail.com',
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        email: 'johndoe@hotmail.com',
        password: 'wron-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
