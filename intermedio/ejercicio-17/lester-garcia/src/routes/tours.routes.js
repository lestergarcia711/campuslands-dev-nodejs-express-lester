import { Router } from "express";
import {
  getToursController,
  getTourByIdController,
  createTourController,
  updateTourController,
  deleteTourController
} from "../controllers/tours.controller.js";
import { verifyJwt } from "../middlewares/authJwt.middleware.js";
import { requirePermission } from "../middlewares/permissions.middleware.js";
import { PERMISSIONS } from "../config/permissions.config.js";
import { validate } from "../middlewares/validators/validate.middleware.js";
import { createTourValidator } from "../middlewares/validators/tour.validator.js";

const router = Router();

// Todas las operaciones de catálogo turístico pasan por verificación JWT
router.use(verifyJwt);

// 1. Lectura: Requiere permiso 'tours:read'
router.get(
  "/",
  requirePermission(PERMISSIONS.TOURS_READ),
  getToursController
);

router.get(
  "/:id",
  requirePermission(PERMISSIONS.TOURS_READ),
  getTourByIdController
);

// 2. Creación: Requiere permiso 'tours:create'
router.post(
  "/",
  requirePermission(PERMISSIONS.TOURS_CREATE),
  validate(createTourValidator),
  createTourController
);

// 3. Modificación: Requiere permiso 'tours:update'
router.patch(
  "/:id",
  requirePermission(PERMISSIONS.TOURS_UPDATE),
  updateTourController
);

// 4. Eliminación: Requiere permiso 'tours:delete'
router.delete(
  "/:id",
  requirePermission(PERMISSIONS.TOURS_DELETE),
  deleteTourController
);

export default router;