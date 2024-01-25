import { AppUser } from '../../entities/app-user.entity';

export const roles = [
  {
    name: 'Admin',
    permissions: [
      {
        action: 'manage',
        subject: 'all',
      },
    ],
  },
  {
    name: 'User',
    isDefault: true,
    permissions: [
      {
        action: 'read',
        subject: AppUser.name,
        condition: {
          id: '${id}',
        },
      },
    ],
  },
];
