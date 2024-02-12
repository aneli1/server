"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pacientesControllers_1 = require("../controllers/pacientesControllers");
class UsuariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/mostrarTodosPacientes/', pacientesControllers_1.pacientesController.mostrarTodosPacientes);
        this.router.get('/obtenerPaciente/:id', pacientesControllers_1.pacientesController.obtenerPacientes);
        this.router.get('/listaNombre/:name', pacientesControllers_1.pacientesController.listaNombre);
        this.router.post('/crearPaciente/', pacientesControllers_1.pacientesController.createPaciente);
        this.router.put('/actualizarPaciente/:id', pacientesControllers_1.pacientesController.actualizarPaciente);
        this.router.delete('/eliminarPaciente/:id', pacientesControllers_1.pacientesController.eliminarPaciente);
        this.router.get('/listarPaciente/:id', pacientesControllers_1.pacientesController.listarPaciente);
        this.router.post('/ValidarPaciente/', pacientesControllers_1.pacientesController.ValidarPaciente);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;
