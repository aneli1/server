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
exports.pacientesController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos
class PacientesController {
    mostrarTodosPacientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const respuesta = await pool.query('SELECT id_pacientes,nombre,apellidos,fecha_nacimiento,id_consulta,id_usuario FROM pacientes  WHERE usuarios.id_usuario=pacientes.id_usuario');
            const respuesta = yield database_1.default.query('SELECT * FROM pacientes');
            res.json(respuesta);
        });
    }
    mostrarNombresPacientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const respuesta = await pool.query('SELECT id_pacientes,nombre,apellidos,fecha_nacimiento,id_consulta,id_usuario FROM pacientes  WHERE usuarios.id_usuario=pacientes.id_usuario');
            const respuesta = yield database_1.default.query('SELECT id_paciente,nombre,apellidos FROM pacientes');
            res.json(respuesta);
        });
    }
    obtenerPacientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM pacientes WHERE id_paciente = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Paciente no encontrado' });
        });
    }
    createPaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO pacientes set ?", [req.body]);
            res.json(resp);
        });
    }
    listaNombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            const respuesta = yield database_1.default.query('SELECT pacientes.id_paciente, pacientes.nombre, pacientes.apellidos, pacientes.fecha FROM pacientes WHERE LOWER(pacientes.nombre) LIKE LOWER(?)', [`%${name}%`]);
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
            res.status(404).json({ 'mensaje': 'No se encontraron pacientes con ese nombre' });
        });
    }
    actualizarPaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(id);
            const resp = yield database_1.default.query("UPDATE pacientes set ? WHERE id_paciente = ?", [req.body, id]);
            res.json(resp);
        });
    }
    eliminarPaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM pacientes WHERE id_paciente = ${id}`);
            res.json(resp);
        });
    }
    listarPaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`SELECT nombre, apellido(s), especialidad FROM  usuarios LEFT JOIN medicos on usuarios.id_rol = medicos.id_rol WHERE usuarios.id_rol = 2;`);
            res.json(resp);
        });
    }
    ValidarPaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const parametros = req.body;
            var consulta = `SELECT id_rol, correo FROM usuarios WHERE correo = '${parametros.correo}' AND contraseña = '${parametros.contraseña}'`;
            const resp = yield database_1.default.query(consulta);
            if (resp.length > 0)
                res.json(resp);
            else
                res.json({ "id_rol": "-1" });
        });
    }
}
exports.pacientesController = new PacientesController();
