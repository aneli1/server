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
exports.rolesController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos
class RolesController {
    mostrarTodosRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM roles');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM roles WHERE id_rol = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Rol no encontrado' });
        });
    }
    ListaUsuariosRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            const respuesta = yield database_1.default.query('SELECT id_usuario, nombre, apellidos, correo, contraseña, telefono, roles.nombre_rol FROM usuarios INNER JOIN roles ON usuarios.id_rol=roles.id_rol WHERE LOWER(roles.nombre_rol) LIKE LOWER(?)', [`${name}`]);
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
            res.status(404).json({ 'mensaje': 'No se encontraron usuarios con ese rol. El rol no existe' });
        });
    }
    createRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body)
            const resp = yield database_1.default.query("INSERT INTO roles set ?", [req.body]);
            res.json(resp);
            //res.json(null);
        });
    }
    actualizarRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //console.log(req.params);
            console.log(id);
            const resp = yield database_1.default.query("UPDATE roles set ? WHERE id_rol = ?", [req.body, id]);
            res.json(resp);
            //res.json(null);
        });
    }
    eliminarRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM roles WHERE id_rol = ${id}`);
            res.json(resp);
        });
    }
}
exports.rolesController = new RolesController();
