"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const historialclinicoControllers_1 = require("../controllers/historialclinicoControllers");
class HistorialClinicoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/mostrarTodoHistorial/', historialclinicoControllers_1.historialclinicoController.mostrarTodoHistorial);
        this.router.get('/listarunHistorial/:id', historialclinicoControllers_1.historialclinicoController.listarunHistorial);
        this.router.post('/crearHistorial/', historialclinicoControllers_1.historialclinicoController.crearHistorial);
        this.router.put('/actualizarHistorial/:id', historialclinicoControllers_1.historialclinicoController.actualizarHistorial);
        this.router.delete('/eliminarHistorial/:id', historialclinicoControllers_1.historialclinicoController.eliminarHistorial);
    }
}
const historialclinicoRoutes = new HistorialClinicoRoutes();
exports.default = historialclinicoRoutes.router;
