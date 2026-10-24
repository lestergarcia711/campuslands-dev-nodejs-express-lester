const VALID_CATEGORIES = ["Aventura", "Cultural", "Ecoturismo", "Gastronómico", "Playa & Relax"];

export const createTourValidator = (req) => {
  const errors = [];
  const { code, title, destinationCountry, category, durationDays, priceUSD, maxCapacity } = req.body;

  if (!req.body || Object.keys(req.body).length === 0) {
    return [{ field: "body", message: "El cuerpo de la petición no puede estar vacío." }];
  }

  if (!code || typeof code !== "string" || code.trim().length < 3) {
    errors.push({ field: "code", message: "El código de expedición es obligatorio (mínimo 3 caracteres)." });
  }

  if (!title || typeof title !== "string" || title.trim().length < 4) {
    errors.push({ field: "title", message: "El título de la expedición debe tener al menos 4 caracteres." });
  }

  if (!destinationCountry || typeof destinationCountry !== "string" || destinationCountry.trim().length < 2) {
    errors.push({ field: "destinationCountry", message: "El país de destino es obligatorio." });
  }

  if (!category || !VALID_CATEGORIES.includes(category.trim())) {
    errors.push({ field: "category", message: `Categoría inválida. Permitidas: ${VALID_CATEGORIES.join(", ")}.` });
  }

  const days = Number(durationDays);
  if (durationDays === undefined || isNaN(days) || days < 1 || days > 90) {
    errors.push({ field: "durationDays", message: "La duración debe ser entre 1 y 90 días." });
  }

  const price = Number(priceUSD);
  if (priceUSD === undefined || isNaN(price) || price <= 0) {
    errors.push({ field: "priceUSD", message: "El precio en USD debe ser un número positivo mayor a 0." });
  }

  const capacity = Number(maxCapacity);
  if (maxCapacity === undefined || isNaN(capacity) || capacity < 1) {
    errors.push({ field: "maxCapacity", message: "La capacidad máxima debe ser de al menos 1 viajero." });
  }

  return errors;
};