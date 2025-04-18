export type UserRole = 'doctor' | 'admin' | 'patient';

export interface User {
  id?: number;
  user_id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  created_at?: Date;
  updated_at?: Date;
}
