"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rolesControllers_1 = require("../controllers/rolesControllers");
class RolesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/mostrarTodosRoles/', rolesControllers_1.rolesController.mostrarTodosRoles);
        this.router.get('/obtenerRol/:id', rolesControllers_1.rolesController.listOne);
        this.router.get('/ListaUsuariosRol/:name', rolesControllers_1.rolesController.ListaUsuariosRol);
        this.router.post('/crearRol/', rolesControllers_1.rolesController.createRol);
        this.router.put('/actualizarRol/:id', rolesControllers_1.rolesController.actualizarRol);
        this.router.delete('/eliminarRol/:id', rolesControllers_1.rolesController.eliminarRol);
    }
}
const rolesRoutes = new RolesRoutes();
exports.default = rolesRoutes.router;
