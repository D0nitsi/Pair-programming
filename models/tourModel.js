let tourArray = [];

let nextId = 1;

function getAll() {
  return tourArray;
}

function addOne(tourData) {
  // Check if any parameter is empty or undefined
  const { name, info, image, price } = tourData;

  // Log input data to help debug
  console.log('tourData:', tourData);

  if (!name || !info || !image || !price) {
    console.log('Invalid input data - missing required fields');
    return false;
  }

  const newItem = {
    id: nextId++,
    ...tourData,
  };

  tourArray.push(newItem);
  return newItem;
}



function findById(id) {
  const numericId = Number(id);
  const item = tourArray.find((item) => item.id === numericId);
  return item || false;
}

function updateOneById(id, updatedData) {
  const tour = findById(id);
  if (tour) {
    Object.assign(tour, updatedData); // Update properties using Object.assign
    return tour;
  }
  return false;
}

function deleteOneById(id) {
  const index = tourArray.findIndex((item) => item.id === Number(id));
  if (index !== -1) {
    tourArray.splice(index, 1);
    return true; // Indicate successful deletion
  }
  return false; // Indicate failure to delete
}

if (require.main === module) {
  // Add tour
  let result = addOne({ name: "Tokyo", info: "City", image: "url", price: 25 });
  console.log("result", result);
  console.assert(typeof result === 'object', 'Result should be an object');

  // Add another tour
  result = addOne({ name: "Kenya", info: "Safari", image: "url", price: 25 });
  console.log(result);
  console.assert(typeof result === 'object', 'Result should be an object');

  // Get all tours
  const allTours = getAll();
  console.log("getAll called:", allTours);
  console.assert(Array.isArray(allTours), 'getAll should return an array');
  console.assert(allTours.length === 2, 'getAll should return an array of length 2');

  // Find tour by ID
  const tour = findById(1);
  console.log("findById called:", tour);
  console.assert(typeof tour === 'object', 'findById should return an object');

  // Update tour by ID
  const updatedTour = updateOneById(1, { name: "Egypt", price: 20 });
  console.log("updateOneById called:", updatedTour);
  console.assert(typeof updatedTour === 'object', 'updateOneById should return an object');

  // Verify update
  const updatedTourCheck = findById(1);
  console.log("findById called after item updated:", updatedTourCheck);
  console.assert(updatedTourCheck.name === "Egypt" && updatedTourCheck.price === 20, 'Tour should be updated');

  // Delete tour by ID
  const deletedTour = deleteOneById(1);
  console.log("deleteOneById called:", deletedTour);
  console.assert(deletedTour === true, 'deleteOneById should return true');

  // Verify deletion
  const deletedTourCheck = findById(1);
  console.log("findById called after item deleted:", deletedTourCheck);
  console.assert(deletedTourCheck === false, 'Tour should be deleted');
}

const Tour = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOneById,
};

module.exports = Tour;
