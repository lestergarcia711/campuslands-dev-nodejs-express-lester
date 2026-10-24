const inMemoryTours = [
  {
    id: "1",
    code: "EXP-PERU-01",
    title: "Camino del Inca & Machu Picchu Místico",
    destinationCountry: "Perú",
    category: "Aventura",
    durationDays: 7,
    priceUSD: 1450.00,
    maxCapacity: 16,
    isAvailable: true,
    createdById: "USR-COORD-02"
  },
  {
    id: "2",
    code: "EXP-JAP-02",
    title: "Ruta de los Templos y Cerezos en Kioto",
    destinationCountry: "Japón",
    category: "Cultural",
    durationDays: 10,
    priceUSD: 2800.00,
    maxCapacity: 12,
    isAvailable: true,
    createdById: "USR-COORD-02"
  },
  {
    id: "3",
    code: "EXP-ISL-03",
    title: "Auroras Boreales y Glaciares Volcánicos",
    destinationCountry: "Islandia",
    category: "Ecoturismo",
    durationDays: 8,
    priceUSD: 2200.00,
    maxCapacity: 10,
    isAvailable: false,
    createdById: "USR-DIR-01"
  }
];

export const findAllTours = async () => [...inMemoryTours];

export const findTourById = async (id) => {
  const tour = inMemoryTours.find((t) => t.id === String(id));
  return tour ? { ...tour } : null;
};

export const findTourByCode = async (code) => {
  const tour = inMemoryTours.find(
    (t) => t.code.toLowerCase() === code.toLowerCase().trim()
  );
  return tour ? { ...tour } : null;
};

export const saveTour = async (tourData) => {
  const newTour = { ...tourData };
  inMemoryTours.push(newTour);
  return { ...newTour };
};

export const updateTour = async (id, updatedFields) => {
  const index = inMemoryTours.findIndex((t) => t.id === String(id));
  if (index === -1) return null;

  inMemoryTours[index] = {
    ...inMemoryTours[index],
    ...updatedFields,
    id: String(id)
  };

  return { ...inMemoryTours[index] };
};

export const deleteTour = async (id) => {
  const index = inMemoryTours.findIndex((t) => t.id === String(id));
  if (index === -1) return false;
  inMemoryTours.splice(index, 1);
  return true;
};