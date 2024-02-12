"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const horariomedicoControllers_1 = require("../controllers/horariomedicoControllers");
class horarioMedicoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/mostrarTodosHorario/', horariomedicoControllers_1.horariomedicoController.mostrarTodasHoras);
        this.router.get('/obtenerHora/:id', horariomedicoControllers_1.horariomedicoController.listarHora);
        this.router.post('/crearHora/', horariomedicoControllers_1.horariomedicoController.crearHora);
        this.router.put('/actualizarHora/:id', horariomedicoControllers_1.horariomedicoController.actualizarHora);
        this.router.delete('/eliminarHora/:id', horariomedicoControllers_1.horariomedicoController.eliminarHora);
    }
}
const horariomedicoRoutes = new horarioMedicoRoutes();
exports.default = horariomedicoRoutes.router;
