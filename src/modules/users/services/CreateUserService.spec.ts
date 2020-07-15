import AppError from '@shared/errors/AppError';
import FakerUsersRepository from '../repositories/fakes/FakerUsersRepository';
import FakeHasHhProvider from '../providers/HashProvider/fakes/FakeHasHhProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakerUsersRepository();
    const fakeHasHhProvider = new FakeHasHhProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHasHhProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@hotmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakerUsersRepository();
    const fakeHasHhProvider = new FakeHasHhProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHasHhProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@hotmail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
