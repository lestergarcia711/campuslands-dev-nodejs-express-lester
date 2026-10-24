export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(errors = []) {
    super("Inconsistencias en los parámetros del paquete turístico.", 400);
    this.errors = errors;
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Solicitud inválida para la agencia de viajes.") {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Autenticación requerida. Token no suministrado o inválido.") {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Acceso denegado: no posees el permiso atómico requerido.") {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "El paquete o destino turístico solicitado no existe.") {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Ya existe un paquete turístico registrado con ese código de expedición.") {
    super(message, 409);
  }
}