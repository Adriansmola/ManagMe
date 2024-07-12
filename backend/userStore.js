// userStore.js
const users = [
  {
    id: '1',
    firstName: 'Admin',
    lastName: 'Adminowski',
    email: 'admin@example.com',
    role: 'admin',
    password: "xxx1123"
  },
  {
    id: '2',
    firstName: 'Dev',
    lastName: 'Ops',
    email: 'devops@example.com',
    role: 'devops',
    password: "123"
  },
  {
    id: '3',
    firstName: 'Developer',
    lastName: 'Deweloperski',
    email: 'developer@example.com',
    role: 'developer',
    password: "123"
  },
];

const addUser = (email, password) => {
  users.push({ email, password });
};

const getUser = (email) => {
  return users.find(user => user.email === email);
};

module.exports = { addUser, getUser };