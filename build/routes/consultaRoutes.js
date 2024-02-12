"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const consultaControllers_1 = require("../controllers/consultaControllers");
class ConsultaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/mostrarTodasConsultas/', consultaControllers_1.consultaController.mostrarTodasConsultas);
        this.router.get('/listarunaConsulta/:id', consultaControllers_1.consultaController.listarunaConsulta);
        this.router.post('/crearConsulta/', consultaControllers_1.consultaController.crearConsulta);
        this.router.put('/actualizarConsulta/:id', consultaControllers_1.consultaController.actualizarConsulta);
        this.router.delete('/eliminarConsulta/:id', consultaControllers_1.consultaController.eliminarConsulta);
    }
}
const consultaRoutes = new ConsultaRoutes();
exports.default = consultaRoutes.router;
