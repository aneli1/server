"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos
class UsuariosController {
    mostrarTodosUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM usuarios');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Usuario no encontrado' });
        });
    }
    ListaUsuarioNombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            const respuesta = yield database_1.default.query('SELECT id_usuario, nombre, apellidos, correo, contraseña, telefono, roles.nombre_rol FROM usuarios INNER JOIN roles ON usuarios.id_rol=roles.id_rol WHERE LOWER(usuarios.nombre) LIKE LOWER(?)', [`%${name}%`]);
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
            res.status(404).json({ 'mensaje': 'No se encontraron usuarios con ese nombre' });
        });
    }
    //aqui va el crud
    createUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO usuarios set ?", [req.body]);
            res.json(resp);
        });
    }
    actualizarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(id);
            const resp = yield database_1.default.query("UPDATE usuarios set ? WHERE id_usuario = ?", [req.body, id]);
            res.json(resp);
        });
    }
    eliminarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM usuarios WHERE id_usuario = ${id}`);
            res.json(resp);
        });
    }
    listarUsuariosRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`SELECT nombre, nombre_rol FROM  usuarios LEFT JOIN roles on usuarios.id_rol = roles.id_rol WHERE usuarios.id_rol = ${id};`);
            res.json(resp);
            //if(resp.length>0){
            //    res.json(resp);
            //    return ;
            //}
            //res.status(404).json({'mensaje': 'No hay usuarios en ese rol'});
        });
    }
    ValidarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const parametros = req.body;
            const consulta = 'SELECT id_rol, correo FROM usuarios WHERE correo = ? AND contra = ?';
            const resp = yield database_1.default.query(consulta, [parametros.correo, parametros.contra]);
            if (resp.length > 0)
                res.json(resp[0]);
            else
                res.json({ "id_rol": "-1" });
        });
    }
}
exports.usuariosController = new UsuariosController();
