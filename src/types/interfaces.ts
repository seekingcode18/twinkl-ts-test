export interface User {
  fullName: string;
  emailAddress: string;
  password: string;
  createdDate: string;
  type: string;
}

export interface ValidationResult {
  code: number,
  message?: string
}
