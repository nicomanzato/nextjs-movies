const defaultOptions = {
  headers: { 'Content-Type': 'application/json' },
};

export const http = {
  get: async <T>(url: string, options?: RequestInit): Promise<T> => {
    const response = await fetch(url, { ...defaultOptions, ...options });
    return response.json();
  },
};
