import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IMailProvider from './models/IMailProvider';

import EtherealMainProvider from './implementations/EtherealMainProvider';
import SESMailProvider from './implementations/SESMailProvider';

const provivers = {
  ethereal: container.resolve(EtherealMainProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  provivers[mailConfig.driver],
);
