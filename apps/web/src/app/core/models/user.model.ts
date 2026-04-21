export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'PRACTITIONER';
  enabled: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}

