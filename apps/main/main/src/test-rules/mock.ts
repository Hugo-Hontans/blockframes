export const userMax = {
  uid: '1DI4000000000000000000000000',
  orgId: 'jnbH0000000000000000'
};

export const userMarie = {
  uid: '1M9D000000000000000000000000',
  orgId: 'jnbH0000000000000000'
};

export const userGilles = {
  uid: 'NGKw000000000000000000000000',
  orgId: 'e1VX0000000000000000'
};

export const userVincentBlockframesAdmin = {
  uid: 'MDnN000000000000000000000000',
  orgId: 'jnbH0000000000000000'
};

export const mockData = [
  {
    docPath: 'blockframesAdmin/MDnN000000000000000000000000',
    content: {
      exists: true,
    }
  },
  {
    docPath: 'users/MDnN000000000000000000000000',
    content: {
      phoneNumber: '',
      position: '',
      orgId: 'jnbH0000000000000000',
      email: 'vincent@cascade8.com',
      name: 'Vincent',
      surname: 'C',
      avatar: '1573117490159_Congrats.png',
      uid: 'MDnN0000000000000000000000000'
    }
  },
  {
    docPath: 'users/1DI4000000000000000000000000',
    content: {
      email: 'max@c8.com',
      surname: 'F',
      name: 'Max',
      avatar: '',
      uid: '1DI4000000000000000000000000',
      orgId: 'jnbH0000000000000000'
    }
  },
  {
    docPath: 'users/1M9D000000000000000000000000',
    content: {
      orgId: 'jnbH0000000000000000',
      email: 'marie@c8.com',
      surname: 'A',
      name: 'Marie',
      avatar: '',
      uid: '1M9D000000000000000000000000'
    }
  },
  {
    docPath: 'orgs/jnbH0000000000000000',
    content: {
      email: 'team@c8.com',
      fiscalNumber: '',
      name: 'C8',
      activity: 'Dapps Programming',
      id: 'jnbH0000000000000000',
      catalog: null,
      phoneNumber: '',
      members: [
        {
          phoneNumber: '',
          position: '',
          orgId: 'jnbH0000000000000000',
          email: 'vincent@c8.com',
          name: 'Vincent',
          surname: 'C',
          avatar: '1573117490159_Congrats.png',
          uid: 'MDnN0000000000000000000000000'
        },
        {
          avatar: '',
          uid: '1DI4000000000000000000000000',
          orgId: 'jnbH0000000000000000',
          email: 'max@c8.com',
          surname: 'F',
          name: 'Max'
        },
        {
          avatar: '',
          uid: '1M9D000000000000000000000000',
          orgId: 'jnbH0000000000000000',
          email: 'marie@c8.com',
          surname: 'A',
          name: 'Marie'
        }
      ],
      templateIds: [],
      officeAddress: '',
      updated: 1573116536848,
      wishlist: [],
      logo: 'logo/1573117231298_logoBF3.jpg',
      created: 1573116536848,
      address: '',
      userIds: ['1DI4000000000000000000000000', '1M9D000000000000000000000000'],
      status: 'accepted',
      movieIds: []
    }
  },
  {
    docPath: 'users/NGKw000000000000000000000000',
    content: {
      orgId: 'e1VX0000000000000000',
      email: 'gs@pc.com',
      surname: 'S',
      name: 'Gilles',
      avatar: '',
      uid: 'NGKw000000000000000000000000'
    }
  },
  {
    docPath: 'orgs/e1VX0000000000000000',
    content: {
      email: 'sales@pc.com',
      fiscalNumber: '',
      name: 'PC',
      activity: 'International Sales, Production',
      id: 'e1VX0000000000000000',
      catalog: null,
      phoneNumber: '',
      members: [
        {
          orgId: 'e1VX0000000000000000',
          email: 'gs@pc.com',
          surname: 'S',
          name: 'Gilles',
          avatar: '',
          uid: 'NGKw000000000000000000000000'
        }
      ],
      templateIds: [],
      officeAddress: '',
      updated: 1573138248021,
      wishlist: [],
      logo: '/assets/logo/organisation_avatar_250.svg',
      created: 1573138248021,
      address: '',
      userIds: ['NGKw000000000000000000000000'],
      status: 'accepted',
      movieIds: []
    }
  }
];