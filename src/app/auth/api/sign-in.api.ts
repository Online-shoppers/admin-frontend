import repository from 'api/repository';

interface SignInForm {
  email: string;
  password: string;
}

interface Tokens {
  access_token: string;
  refresh_token: string;
}

export const signIn = (form: SignInForm) => {
  return repository.post<Tokens>('/api/auth/sign-in', form);
};
