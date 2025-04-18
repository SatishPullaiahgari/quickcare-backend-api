export const generateId = (prefix: string, num: number): string => {
    return `${prefix}${String(num).padStart(6, '0')}`;
  };
  