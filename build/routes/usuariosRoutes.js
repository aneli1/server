"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosControllers_1 = require("../controllers/usuariosControllers");
class UsuariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/mostrarTodosUsuarios/', usuariosControllers_1.usuariosController.mostrarTodosUsuarios);
        this.router.get('/obtenerUsuario/:id', usuariosControllers_1.usuariosController.listOne);
        this.router.get('/ListaUsuarioNombre/:name', usuariosControllers_1.usuariosController.ListaUsuarioNombre);
        this.router.post('/crearUsuario/', usuariosControllers_1.usuariosController.createUsuario);
        this.router.put('/actualizarUsuario/:id', usuariosControllers_1.usuariosController.actualizarUsuario);
        this.router.delete('/eliminarUsuario/:id', usuariosControllers_1.usuariosController.eliminarUsuario);
        this.router.get('/listarUsuariosRol/:id', usuariosControllers_1.usuariosController.listarUsuariosRol);
        this.router.post('/ValidarUsuario/', usuariosControllers_1.usuariosController.ValidarUsuario);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;
