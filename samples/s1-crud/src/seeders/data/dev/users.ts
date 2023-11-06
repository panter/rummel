import { AppUser } from '../../../entities/app-user.entity';
import { AppRole } from '../../../entities/role.entity';

export const users: Partial<AppUser>[] = [
  {
    id: '7bc1f1c6-f599-4d75-8fed-29ac72a6425b',
    email: 'user1@example.com',
    role: { name: 'User' } as AppRole,
    personalToken: 'user1',
  },
  {
    id: 'adcfa528-08ce-4187-a620-5f9bccca432d',
    email: 'admin1@example.com',
    role: { name: 'Admin' } as AppRole,
    personalToken: 'admin1',
  },
];
