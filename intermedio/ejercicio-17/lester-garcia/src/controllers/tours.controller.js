import * as toursService from "../services/tours.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getToursController = asyncHandler(async (req, res) => {
  const tours = await toursService.getAllToursService(req.query.category);
  return res.status(200).json({
    status: "success",
    requestId: req.id,
    total: tours.length,
    data: tours
  });
});

export const getTourByIdController = asyncHandler(async (req, res) => {
  const tour = await toursService.getTourByIdService(req.params.id);
  return res.status(200).json({
    status: "success",
    requestId: req.id,
    data: tour
  });
});

export const createTourController = asyncHandler(async (req, res) => {
  const newTour = await toursService.createTourService(req.body, req.user);
  return res.status(201).json({
    status: "success",
    requestId: req.id,
    data: newTour
  });
});

export const updateTourController = asyncHandler(async (req, res) => {
  const updated = await toursService.updateTourService(req.params.id, req.body);
  return res.status(200).json({
    status: "success",
    requestId: req.id,
    data: updated
  });
});

export const deleteTourController = asyncHandler(async (req, res) => {
  await toursService.deleteTourService(req.params.id);
  return res.status(204).send();
});