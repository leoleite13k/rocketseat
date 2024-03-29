import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it(`should be able to update user's avatar`, async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.png'
    })

    expect(user.avatar).toBe('avatar.png');
  })

  it(`should not be able to update user's avatar`, async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

    await expect(updateUserAvatar.execute({
      user_id: 'non-existing-user',
      avatarFilename: 'avatar.png'
    })).rejects.toBeInstanceOf(AppError);
  })

  it(`should delete old avatar when updating new one`, async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.png'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.png'
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar.png');
    expect(user.avatar).toBe('avatar2.png');
  })
});
