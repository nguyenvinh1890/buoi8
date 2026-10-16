/**
 * Validation utilities for form fields
 */

export const validateName = (name) => {
  if (!name || !name.trim()) {
    return 'Họ và tên không được để trống';
  }
  if (name.trim().length < 2) {
    return 'Họ và tên phải có ít nhất 2 ký tự';
  }
  // Allow Unicode letters (Vietnamese accents) and spaces
  const nameRegex = /^[a-zA-ZÀ-ỹ\s'-]+$/;
  if (!nameRegex.test(name.trim())) {
    return 'Họ và tên chỉ được chứa chữ cái và khoảng trắng';
  }
  return '';
};

export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return 'Email không được để trống';
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email.trim())) {
    return 'Email không đúng định dạng (ví dụ: ten@domain.com)';
  }
  return '';
};

export const validatePassword = (password) => {
  if (!password) {
    return 'Mật khẩu không được để trống';
  }
  if (password.length < 8) {
    return 'Mật khẩu phải có ít nhất 8 ký tự';
  }
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  if (!hasLetter || !hasNumber) {
    return 'Mật khẩu cần chứa ít nhất 1 chữ cái và 1 số';
  }
  return '';
};

/**
 * Calculates password strength score (0 to 4)
 * @param {string} password 
 * @returns {{ score: number, label: string, color: string, percent: number }}
 */
export const getPasswordStrength = (password) => {
  if (!password) {
    return { score: 0, label: 'Chưa nhập', color: '#475569', percent: 0 };
  }

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  // Cap at 4
  const normalizedScore = Math.min(score, 4);

  const levels = [
    { score: 0, label: 'Rất yếu', color: '#ef4444', percent: 15 },
    { score: 1, label: 'Yếu', color: '#f97316', percent: 35 },
    { score: 2, label: 'Trung bình', color: '#eab308', percent: 60 },
    { score: 3, label: 'Tốt', color: '#3b82f6', percent: 85 },
    { score: 4, label: 'Rất mạnh', color: '#10b981', percent: 100 }
  ];

  return levels[normalizedScore];
};
