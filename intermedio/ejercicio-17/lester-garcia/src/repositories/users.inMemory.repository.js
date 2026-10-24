const inMemoryUsers = [
  {
    id: "USR-DIR-01",
    name: "Valentina Soler",
    email: "directora@wanderlust.travel",
    password: "director_travel_2026",
    role: "Director_Agencia"
  },
  {
    id: "USR-COORD-02",
    name: "Rodrigo Paz",
    email: "coordinador@wanderlust.travel",
    password: "routes_coordinator_pass",
    role: "Coordinador_Rutas"
  },
  {
    id: "USR-AGENT-03",
    name: "Sofia Navarro",
    email: "ventas@wanderlust.travel",
    password: "sales_agent_pass_2026",
    role: "Agente_Ventas"
  },
  {
    id: "USR-VIAJERO-04",
    name: "Lucas Benítez",
    email: "lucas@globetrotter.com",
    password: "traveler_wanderer_pass",
    role: "Viajero"
  }
];

export const findUserByEmail = async (email) => {
  const user = inMemoryUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase().trim()
  );
  return user ? { ...user } : null;
};

export const findUserById = async (id) => {
  const user = inMemoryUsers.find((u) => u.id === String(id));
  return user ? { ...user } : null;
};