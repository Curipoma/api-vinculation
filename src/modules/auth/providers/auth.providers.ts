import { DataSource } from 'typeorm';
import { UserEntity } from '@auth/entities';
import { DataSourceEnum } from '@shared/enums';
import { RepositoryEnum } from '@shared/enums';

export const authProviders = [
  {
    provide: RepositoryEnum.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
];
