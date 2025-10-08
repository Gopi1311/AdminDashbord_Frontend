export const customerValidation = {
  firstName: {
    required: "First name is required",
    minLength: {
      value: 2,
      message: "First name must be at least 2 characters",
    },
  },
  lastName: {
    required: "Last name is required",
    minLength: { value: 2, message: "Last name must be at least 2 characters" },
  },
  phone: {
    required: "Phone number is required",
    pattern: {
      value: /^\+?[\d\s-()]+$/,
      message: "Please enter a valid phone number",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Please enter a valid email address",
    },
  },
  streetAddress: {
    required: "Street address is required",
    minLength: { value: 5, message: "Address must be at least 5 characters" },
  },
  city: {
    required: "City is required",
    minLength: { value: 2, message: "City must be at least 2 characters" },
  },
  state: {
    required: "State is required",
    minLength: { value: 2, message: "State must be at least 2 characters" },
  },
  pincode: {
    required: "Pincode is required",
    pattern: {
      value: /^\d{6}$/,
      message: "Pincode must be exactly 6 digits",
    },
  },
  country: {
    required: "Country is required",
  },
  password: {
    required: "Password is required",
    minLength: { value: 6, message: "Password must be at least 6 characters" },
  },
  confirmPassword: (password) => ({
    required: "Please confirm your password",
    validate: (value) => value === password || "Passwords do not match",
  }),
  role: {
    required: "Please select a role",
  },
};
