export interface AuthState {
  isAuthenticated: boolean;
  userId: string;
  email: string;
  role: string;
  permissions: string[];
}
