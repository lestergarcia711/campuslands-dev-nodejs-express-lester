import { ForbiddenError, UnauthorizedError } from "../utils/customErrors.js";
import { ROLE_PERMISSIONS_MAP } from "../config/permissions.config.js";

export const requirePermission = (...requiredPermissions) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new UnauthorizedError("Usuario no autenticado antes de comprobar permisos."));
    }

    // Resolver los permisos asignados al rol del usuario
    const userRole = req.user.role;
    const userPermissions = ROLE_PERMISSIONS_MAP[userRole] || [];

    // Verificar si el usuario posee TODOS los permisos requeridos en este endpoint
    const missingPermissions = requiredPermissions.filter(
      (perm) => !userPermissions.includes(perm)
    );

    if (missingPermissions.length > 0) {
      return next(
        new ForbiddenError(
          `Acceso denegado. Permisos faltantes: [${missingPermissions.join(", ")}]. Tu rol (${userRole}) no dispone de esta capacidad.`
        )
      );
    }

    // Inyectar la lista resuelta de permisos en el request para consumo en servicios si se requiere
    req.user.permissions = userPermissions;

    next();
  };
};