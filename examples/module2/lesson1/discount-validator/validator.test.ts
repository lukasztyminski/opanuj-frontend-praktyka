import { describe, expect, test } from 'vitest';
import { formValidator } from './validator';

describe('Form validation', () => {
  test('should pass validation for valid input', () => {
    const errors = formValidator('John', 'Doe', 30);
    expect(errors).toHaveLength(0);
  });

  test('should return an error if first name is missing', () => {
    const errors = formValidator('', 'Doe', 30);
    expect(errors).toContain('First name is required');
  });

  test('should return an error if last name is missing', () => {
    const errors = formValidator('John', '', 30);
    expect(errors).toContain('Last name is required');
  });

  test('should return an error if age is negative', () => {
    const errors = formValidator('John', 'Doe', -1);
    expect(errors).toContain('Age must be a positive number');
  });

  test('should throw TypeError if age is not a number', () => {
    const invalidAge = 'NaN' as unknown as number;
    const errors = () => formValidator('John', 'Doe', invalidAge);
    expect(errors).toThrowError('Age must be a number');
  });

  test('should return errors if names contain only whitespace', () => {
    const errors = formValidator('   ', '  ', 25);
    expect(errors).toContain('First name is required');
    expect(errors).toContain('Last name is required');
  });
});
