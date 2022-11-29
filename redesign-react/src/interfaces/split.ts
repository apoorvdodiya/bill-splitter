import { IUser } from "./user";

export interface ISplit {
  id?: number;
  title?: string;
  description?: string;
  settled?: boolean;
  splitters?: ISplitter[];
  createdBy?: IUser;
  createdById?: number;
  updatedAt?: string;
  type?: string;
  totalAmount?: number;
  collapsed?: boolean;
}

export interface ISplitter {
  id?: number;
  amount?: number;
  groupId?: number;
  paidAmount?: number;
  ration?: number;
  splitId?: number;
  user?: IUser;
  userId?: number;
} 