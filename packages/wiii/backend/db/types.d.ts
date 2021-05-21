interface UserProps {
  email: string;
  password: string;
}

export interface CreateUserProps extends UserProps {
  nickname: string;
}

export interface CheckUserProps extends UserProps {}
