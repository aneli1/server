"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medicosControllers_1 = require("../controllers/medicosControllers");
class UsuariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/mostrarTodosMedicos/', medicosControllers_1.medicosController.mostrarTodosMedicos);
        this.router.get('/obtenerMedico/:id', medicosControllers_1.medicosController.listOne);
        this.router.get('/listaEspecialidad/:specialty', medicosControllers_1.medicosController.listaEspecialidad);
        this.router.get('/listaNombre/:name', medicosControllers_1.medicosController.listaNombre);
        this.router.post('/crearMedico/', medicosControllers_1.medicosController.createMedico);
        this.router.put('/actualizarMedico/:id', medicosControllers_1.medicosController.actualizarMedico);
        this.router.delete('/eliminarMedico/:id', medicosControllers_1.medicosController.eliminarMedico);
        this.router.get('/listarMedicoEspecialidad/:id', medicosControllers_1.medicosController.listarMedicoEspecialidad);
        this.router.post('/ValidarMedico/', medicosControllers_1.medicosController.ValidarMedico);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;
