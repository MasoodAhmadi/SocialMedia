import i18next from 'i18next';

import { initReactI18next } from 'react-i18next';
import languageDedector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
i18next
  .use(initReactI18next)
  .use(languageDedector)
  .use(Backend)
  .init({
    debug: true,
    fallback: 'en',
    resources: {
      en: {
        translation: {
          learn: 'Cras justo odio',
          learn1: 'Dapibus ac facilisis in',
          learn2: 'Vestibulum at eros',
          Register: 'Register',
          description:
            'Some quick example text to build on the card title and make	up the bulk of the cards content.',
        },
      },
      dr: {
        translation: {
          learn: 'سلام خوب هستی همه خوب است',
          learn1: 'Dapibus acasdfasdfasd facilisis in',
          learn2: 'Vestibulum aasdfasdfasdt eros',
          Register: 'Registwfasdfasdfaser',

          description:
            'Some quick exampasdfale texasdfasdft to builfasdfasdfd on the card tiasdfasdfasdtle and make	up the bulk of the cards content.',
        },
      },
    },
  });
