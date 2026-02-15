// Result type for error handling
export type Result<T> = 
  | { ok: true; data: T }
  | { ok: false; error: ServiceError };

export type ServiceError = {
  code: string;
  message: string;
};
