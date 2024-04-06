const validators = {
  validateEmail: (email: string) => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  },
  validatePassword: (password: string): string => {
    const pw = password.trim();
    if (pw.length < 6) return 'Please enter at least 6 characters';
    if (!/[A-Z]/.test(pw))
      return 'Password should have at least one capital letter';
    if (!/[0-9]/.test(pw)) return 'Password should have at least one number';

    return '';
  },
};

export default validators;
