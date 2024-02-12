"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const horariomedicoControllers_1 = require("../controllers/horariomedicoControllers");
class RolesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/mostrarTodosHorario/', horariomedicoControllers_1.rolesController.mostrarTodosRoles);
        this.router.get('/obtenerHora/:id', horariomedicoControllers_1.rolesController.listOne);
        this.router.post('/crearHora/', horariomedicoControllers_1.rolesController.createRol);
        this.router.put('/actualizarHora/:id', horariomedicoControllers_1.rolesController.actualizarRol);
        this.router.delete('/eliminarHora/:id', horariomedicoControllers_1.rolesController.eliminarRol);
    }
}
const rolesRoutes = new RolesRoutes();
exports.default = rolesRoutes.router;
