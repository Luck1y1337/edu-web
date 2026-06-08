export interface RegisterForm {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}
// /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
