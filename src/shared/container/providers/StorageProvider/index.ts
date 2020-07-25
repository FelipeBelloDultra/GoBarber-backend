import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';

import DiskStorageProvider from './implementations/DiskStorageProvider';

const provivers = {
  disk: DiskStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'MailTemplateProvider',
  provivers.disk,
);
