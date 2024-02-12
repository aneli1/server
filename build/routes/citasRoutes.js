"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const citasControllers_1 = require("../controllers/citasControllers");
class CitasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/mostrarTodasCitas/', citasControllers_1.citasController.mostrarTodasCitas);
        this.router.get('/listarunaCita/:id', citasControllers_1.citasController.listarunaCita);
        this.router.post('/crearCita/', citasControllers_1.citasController.crearCita);
        this.router.put('/actualizarCita/:id', citasControllers_1.citasController.actualizarCita);
        this.router.delete('/eliminarCita/:id', citasControllers_1.citasController.eliminarCita);
    }
}
const citasRoutes = new CitasRoutes();
exports.default = citasRoutes.router;
