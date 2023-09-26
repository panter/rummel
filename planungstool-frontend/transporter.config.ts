import { Config } from '@panter/transporter';

const config: Config = {
  airtable: {
    baseId: 'appBqp0CvdxBxBsoL',
    tableId: 'tblssHPv83FxvBVi8',
    keyColumName: 'Name',
    delimiter: '.',
  },
  langs: ['DE', 'EN'],
  sections: [
    {
      transPath: './public/locales',
      translationName: 'common',
      airtable: {
        tableId: 'tblssHPv83FxvBVi8',
        keyColumName: 'Name',
        delimiter: '.',
      },
    },
    // {
    //   transPath: './public/locales',
    //   translationName: 'admin',
    //   airtable: {
    //     tableId: '<ID_HASH>',
    //     keyColumName: 'Name',
    //     delimiter: '.',
    //   },
    // },
  ],
};

export default config;
