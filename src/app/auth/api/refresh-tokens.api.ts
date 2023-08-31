import repository from 'api/repository';

interface Tokens {
  access_token: string;
  refresh_token: string;
}

export const refreshTokens = (tokens: Tokens) => {
  return repository.post<Tokens>('/api/auth/refresh', tokens);
};
