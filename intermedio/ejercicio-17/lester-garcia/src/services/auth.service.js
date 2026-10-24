import jwt from "jsonwebtoken";
import * as usersRepo from "../repositories/users.inMemory.repository.js";
import { ROLE_PERMISSIONS_MAP } from "../config/permissions.config.js";
import { UnauthorizedError } from "../utils/customErrors.js";

export const loginService = async ({ email, password }) => {
  const user = await usersRepo.findUserByEmail(email);

  if (!user || user.password !== password) {
    throw new UnauthorizedError("Credenciales inválidas. Correo o contraseña incorrectos.");
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };

  const secret = process.env.JWT_SECRET || "fallback_default_secret_jwt_2026";
  const expiresIn = process.env.JWT_EXPIRES_IN || "2h";

  const token = jwt.sign(payload, secret, { expiresIn });

  return {
    user: {
      ...payload,
      effectivePermissions: ROLE_PERMISSIONS_MAP[user.role] || []
    },
    token,
    tokenType: "Bearer",
    expiresIn
  };
};

export const getProfileService = async (userId) => {
  const user = await usersRepo.findUserById(userId);
  if (!user) {
    throw new UnauthorizedError("El usuario de la sesión turística ya no existe.");
  }

  const { password, ...safeUser } = user;
  return {
    ...safeUser,
    effectivePermissions: ROLE_PERMISSIONS_MAP[user.role] || []
  };
};