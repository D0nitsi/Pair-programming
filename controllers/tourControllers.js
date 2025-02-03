const Tour = require("../models/tourModel");

// GET /tours
const getAllTours = (req, res) => {
  const tours = Tour.getAll();
  res.json(tours);
};

// POST /tours
const createTour = (req, res) => {
  console.log(req.body);
  const newTour = Tour.addOne({ ...req.body }); // Spread the req.body object
  console.log(newTour);
  if (newTour) {
    res.json(newTour);
  } else {
    // Handle error (e.g., failed to create tour)
    res.status(500).json({ message: "Failed to create tour" });
  }
};

// GET /tours/:tourId
const getTourById = (req, res) => {
  const tourId = req.params.tourId;
  const tour = Tour.findById(tourId);
  if (tour) {
    res.json(tour);
  } else {
    res.status(404).json({ message: "Tour not found" });
  }
};

// PUT /tours/:tourId
const updateTour = (req, res) => {
  const tourId = req.params.tourId;
  const updatedTour = Tour.updateOneById(tourId, { ...req.body });

  if (updatedTour) {
    res.json(updatedTour);
  } else {
    res.status(404).json({ message: "Tour not found" });
  }
};

// DELETE /tours/:tourId
const deleteTour = (req, res) => {
  const tourId = req.params.tourId;
  const isDeleted = Tour.deleteOneById(tourId);

  if (isDeleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Tour not found" });
  }
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
