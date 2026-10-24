import * as toursRepo from "../repositories/tours.inMemory.repository.js";
import { NotFoundError, ConflictError } from "../utils/customErrors.js";

export const getAllToursService = async (category) => {
  let tours = await toursRepo.findAllTours();
  if (category) {
    tours = tours.filter((t) => t.category.toLowerCase() === category.toLowerCase());
  }
  return tours;
};

export const getTourByIdService = async (id) => {
  const tour = await toursRepo.findTourById(id);
  if (!tour) {
    throw new NotFoundError(`El paquete turístico con ID '${id}' no existe.`);
  }
  return tour;
};

export const createTourService = async (payload, currentUser) => {
  const existing = await toursRepo.findTourByCode(payload.code);
  if (existing) {
    throw new ConflictError(`El código de expedición '${payload.code}' ya se encuentra registrado.`);
  }

  const newTour = {
    id: String(Date.now()),
    code: payload.code.trim().toUpperCase(),
    title: payload.title.trim(),
    destinationCountry: payload.destinationCountry.trim(),
    category: payload.category.trim(),
    durationDays: Number(payload.durationDays),
    priceUSD: Number(payload.priceUSD),
    maxCapacity: Number(payload.maxCapacity),
    isAvailable: true,
    createdById: currentUser.id
  };

  return await toursRepo.saveTour(newTour);
};

export const updateTourService = async (id, payload) => {
  const tour = await toursRepo.findTourById(id);
  if (!tour) {
    throw new NotFoundError(`No se puede actualizar. El paquete con ID '${id}' no existe.`);
  }

  const updatedTour = await toursRepo.updateTour(id, {
    priceUSD: payload.priceUSD !== undefined ? Number(payload.priceUSD) : tour.priceUSD,
    isAvailable: payload.isAvailable !== undefined ? Boolean(payload.isAvailable) : tour.isAvailable,
    durationDays: payload.durationDays !== undefined ? Number(payload.durationDays) : tour.durationDays
  });

  return updatedTour;
};

export const deleteTourService = async (id) => {
  const tour = await toursRepo.findTourById(id);
  if (!tour) {
    throw new NotFoundError(`No se puede eliminar. El paquete turístico con ID '${id}' no existe.`);
  }

  await toursRepo.deleteTour(id);
};