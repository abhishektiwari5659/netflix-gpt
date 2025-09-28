export const checkValid = (email, password) => {
  const errors = [];

  // Email validation
  const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  if (!validEmail) errors.push("Invalid Email address");

  // Password validations
  if (password.length < 8) errors.push("Password must be at least 8 characters long");
  if (!/[A-Z]/.test(password)) errors.push("Password must include at least one uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("Password must include at least one lowercase letter");
  if (!/[0-9]/.test(password)) errors.push("Password must include at least one number");
  if (!/[#?!@$%^&*-]/.test(password)) errors.push("Password must include at least one special character (#?!@$%^&*-)");

  if (errors.length === 0) return null;
  return errors; // return array of messages
};
