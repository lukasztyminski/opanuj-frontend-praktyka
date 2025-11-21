export function formValidator(
  firstName: string,
  lastName: string,
  age: number
) {
  const errors: string[] = [];

  if (typeof age !== 'number' || Number.isNaN(age)) {
    throw new TypeError('Age must be a number');
  }

  const firstNameLength = firstName.trim().length;
  const lastNameLength = lastName.trim().length;

  if (firstNameLength < 1) {
    errors.push('First name is required');
  }

  if (lastNameLength < 1) {
    errors.push('Last name is required');
  }

  if (age < 0) {
    errors.push('Age must be a positive number');
  }

  return errors;
}
