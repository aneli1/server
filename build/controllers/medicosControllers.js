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
exports.medicosController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos
class MedicosController {
    mostrarTodosMedicos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM medicos');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            // Me interesa obtener su nombre CHECAR
            const respuesta = yield database_1.default.query('SELECT medicos.id_medico, usuarios.nombre, usuarios.apellidos, medicos.cedula, medicos.especialidad FROM usuarios INNER JOIN medicos ON usuarios.id_usuario = medicos.id_usuario WHERE medicos.id_medico = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Medico no encontrado' });
        });
    }
    listaEspecialidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { specialty } = req.params;
            const respuesta = yield database_1.default.query('SELECT medicos.id_medico, usuarios.nombre, usuarios.apellidos, medicos.cedula, medicos.especialidad FROM usuarios INNER JOIN medicos ON usuarios.id_usuario = medicos.id_usuario WHERE LOWER(medicos.especialidad) = LOWER(?)', [specialty]);
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
            res.status(404).json({ 'mensaje': 'No se encontraron médicos con esa especialidad' });
        });
    }
    listaNombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            const respuesta = yield database_1.default.query('SELECT medicos.id_medico, usuarios.nombre, usuarios.apellidos, medicos.cedula, medicos.especialidad FROM medicos INNER JOIN usuarios ON medicos.id_usuario = usuarios.id_usuario WHERE LOWER(usuarios.nombre) LIKE LOWER(?)', [`%${name}%`]);
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
            res.status(404).json({ 'mensaje': 'No se encontraron médicos con ese nombre' });
        });
    }
    createMedico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO medicos set ?", [req.body]);
            //const respuesta2 = await pool.query('CREATE TRIGGER insertandoMedico AFTER UPDATE ON empleados FOR EACH ROW SET @sueldo = @sueldo + 50;', [specialty]);
            res.json(resp);
        });
    }
    actualizarMedico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(id);
            const resp = yield database_1.default.query("UPDATE medicos set ? WHERE id_medico = ?", [req.body, id]);
            res.json(resp);
        });
    }
    eliminarMedico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM medicos WHERE id_medico = ${id}`);
            res.json(resp);
        });
    }
    listarMedicoEspecialidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`SELECT nombre, apellido(s), especialidad FROM  usuarios LEFT JOIN medicos on usuarios.id_rol = medicos.id_rol WHERE usuarios.id_rol = 2;`);
            res.json(resp);
        });
    }
    ValidarMedico(req, res) {
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
exports.medicosController = new MedicosController();
