import { BaseEntity } from './base.model';

export interface Establishment extends BaseEntity {
  name: string;
  code: string;
  address: string;
  city: string;
  country: string;
  phone?: string;
  email?: string;
  active: boolean;
}
