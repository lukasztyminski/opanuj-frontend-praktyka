import { useState } from 'react';
import type { ZodSchema } from 'zod';

type FormInputType = HTMLInputElement;

export const useForm = <T>(schema: ZodSchema, initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<FormInputType>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidation = () => {
    const result = schema.safeParse(formData);

    if (result.success) {
      setErrors([]);
      return Promise.resolve(result.data as T);
    }

    setErrors(result.error.errors.map((err) => err.message));
    return Promise.reject(result.error);
  };

  return { formData, handleChange, handleValidation, errors };
};
