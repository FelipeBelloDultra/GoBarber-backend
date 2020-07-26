import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProdiver/fakes/FakeCacheProvider';
import FakerUsersRepository from '../repositories/fakes/FakerUsersRepository';
import FakeHasHhProvider from '../providers/HashProvider/fakes/FakeHasHhProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakerUsersRepository;
let fakeHasHhProvider: FakeHasHhProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakerUsersRepository();
    fakeHasHhProvider = new FakeHasHhProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHasHhProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@hotmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@hotmail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
