/**
 * Email validation utility
 * @param {string} email - Email to validate
 * @returns {boolean} - True if email is valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Name validation utility
 * @param {string} name - Name to validate
 * @returns {boolean} - True if name is valid (2+ characters)
 */
export const validateName = (name) => {
  return name && name.trim().length >= 2;
};

/**
 * Message validation utility
 * @param {string} message - Message to validate
 * @returns {boolean} - True if message is valid (10+ characters)
 */
export const validateMessage = (message) => {
  return message && message.trim().length >= 10;
};

/**
 * Form validation utility
 * @param {Object} formData - Form data to validate
 * @returns {Object} - Validation results with errors object
 */
export const validateContactForm = (formData) => {
  const errors = {};
  
  if (!validateName(formData.name)) {
    errors.name = 'Please enter a valid name (at least 2 characters)';
  }
  
  if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!validateMessage(formData.message)) {
    errors.message = 'Please enter a message (at least 10 characters)';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};