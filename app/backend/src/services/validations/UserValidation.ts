class UserValidation {
  public static validateEmail(email: string): boolean {
    const emailRegex = /\S+@\S+\.\S/;
    return emailRegex.test(email);
  }

  public static validatePassword(password: string): boolean {
    return password.length >= 6;
  }

  public static validateUser(email: string, password: string): boolean {
    return (
      this.validateEmail(email)
      && this.validatePassword(password)
    );
  }
}

export default UserValidation;
