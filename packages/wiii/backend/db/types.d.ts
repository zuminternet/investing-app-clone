import { ObjectID } from 'typeorm';

interface UserProps {
  email: string;
  password: string;
}

export interface CreateUserProps extends UserProps {
  nickname: string;
}

export interface CheckUserProps extends UserProps {
  token: string;
}

export interface ReplyProps {
  id?: ObjectID;
  userId: number;
  docId: string;
  content: string;
}

export interface CreateReplyProps extends Omit<ReplyProps, 'userId'> {
  email: string;
}
