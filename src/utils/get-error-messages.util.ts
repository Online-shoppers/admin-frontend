import { isAxiosError } from 'axios';

// eslint-disable-next-line
export const getErrorMessages = (error: any): string[] | null | undefined => {
  if (!isAxiosError(error)) {
    const message = error.message;
    return message && typeof message === 'string' ? [message] : null;
  }

  const errors = error.response?.data.errors;
  if (
    errors &&
    Array.isArray(errors) &&
    errors.length > 0 &&
    errors.every(e => typeof e === 'string')
  ) {
    return errors;
  }

  if (error.response) {
    const message = error.response.data?.message;
    return typeof message === 'string' ? [message] : null;
  }

  return null;
};
