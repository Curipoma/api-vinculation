import { ConfigType } from '@nestjs/config';
import { config } from '@config';
import { getRepository } from 'typeorm';
import { UserEntity } from '@auth/entities';

export const setDefaultUser = async (
  configService: ConfigType<typeof config>,
) => {
  const userRepository = getRepository<UserEntity>(UserEntity);

  const defaultUser = await userRepository
    .createQueryBuilder()
    .where('username = :username', {
      username: configService.defaultUser.username,
    })
    .getOne();
  if (!defaultUser) {
    const adminUser = userRepository.create({
      username: configService.defaultUser.username,
      password: configService.defaultUser.password,
      roles: ['ADMIN'],
    });
    return await userRepository.save(adminUser);
  }
};
