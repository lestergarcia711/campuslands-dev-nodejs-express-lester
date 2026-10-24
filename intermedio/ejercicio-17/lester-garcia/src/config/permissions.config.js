export const PERMISSIONS = {
    TOURS_READ: "tours:read",
    TOURS_CREATE : "tours:create",
    TOURS_UPDATE: "tours: update",
    TOURS_DELETE: " tours: delete",
    BOOKINGS_MANAGE: "bookings:manage"
};


export const ROLE_PERMISSIONS_MAP = {
    Viajero: [
        PERMISSIONS.TOURS_READ,
    ],
    Agente_Ventas: [
        PERMISSIONS.TOURS_READ,
        PERMISSIONS.BOOKINGS_MANAGE
    ],

    Coordinador_Rutas:[
        PERMISSIONS.TOURS_READ,
        PERMISSIONS.TOURS_CREATE,
        PERMISSIONS.TOURS_UPDATE
    ],
    Director_Agencia: [
        PERMISSIONS.TOURS_READ,
        PERMISSIONS.TOURS_CREATE,
        PERMISSIONS.TOURS_UPDATE,
        PERMISSIONS.TOURS_DELETE,
        PERMISSIONS.BOOKING_MANAGE
    ]
};