export const userMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  // senha: secret_admin
};

export const VALID_EMAIL = userMock.email;
export const VALID_PASSWORD = 'secret_admin';
export const INVALID_EMAIL = 'email';
export const INVALID_PASSWORD = 'in';

export const FIELDS_ERROR = 'All fields must be filled';
export const EMAIL_PASSWORD_ERROR = 'Incorrect email or password';
