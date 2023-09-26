const users: UserRaw[] = [
  {
    email: 'sca@panter.ch',
    userAuthority: {
      role: 'user',
    },
  },
  {
    email: 'cro@panter.ch',
    userAuthority: {
      role: 'user',
    },
  },
  {
    email: 'nkr@panter.ch',
    userAuthority: {
      role: 'user',
    },
  },
  {
    email: 'tkn@panter.ch',
    userAuthority: {
      role: 'user',
    },
  },
  {
    email: 'dcz@panter.ch',
    userAuthority: {
      role: 'user',
    },
  },
  {
    email: 'bbl@panter.ch',
    userAuthority: {
      role: 'user',
    },
  },
  {
    email: 'l.meier@zirkular.net',
    userAuthority: {
      role: 'user',
    },
  },
  {
    email: 'r.brandmayer@zirkular.net',
    userAuthority: {
      role: 'user',
    },
  },
  {
    email: 'c.rueegg@zirkular.net',
    userAuthority: {
      role: 'user',
    },
  },
  {
    email: 'p.hentschel@zirkular.net',
    userAuthority: {
      role: 'user',
    },
  },
  {
    email: 'd.vittani@zirkular.net',
    userAuthority: {
      role: 'user',
    },
  },
  {
    email: 'a.oefner@zirkular.net',
    userAuthority: {
      role: 'user',
    },
  },
];

export default users;

export interface UserRaw {
  email: string;
  userAuthority: {
    role: string;
  };
}
