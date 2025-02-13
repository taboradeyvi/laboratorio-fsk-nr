export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  role: 'admin' | 'user';
}
