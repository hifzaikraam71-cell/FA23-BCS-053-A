export const validatePassword = (password: string) => {
  const minLength = 8;
  const maxLength = 16;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const errors: string[] = [];

  if (password.length < minLength || password.length > maxLength) {
    errors.push(`Password must be between ${minLength} and ${maxLength} characters.`);
  }
  if (!hasUpperCase) errors.push("Must contain at least one uppercase letter.");
  if (!hasLowerCase) errors.push("Must contain at least one lowercase letter.");
  if (!hasNumber) errors.push("Must contain at least one number.");
  if (!hasSpecialChar) errors.push("Must contain at least one special character.");

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
