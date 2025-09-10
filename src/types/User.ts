
export type User = {
  name: string;
  email: string;
  password: string;
  refresh_tokens?: string[];
  credits: number
};
