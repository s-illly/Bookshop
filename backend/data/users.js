import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Gerry Liu',
    email: 'gliu@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Ray Liu',
    email: 'ray@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;