export interface UserSession {
  id: string;
  email: string;
  role_id: string;
  role_type: string;
  permissions: string[];
  iat: number;
  exp: number;
}
