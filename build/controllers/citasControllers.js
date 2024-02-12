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
exports.citasController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos
class CitasController {
    mostrarTodasCitas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM citas');
            res.json(respuesta);
        });
    }
    mostrarCitasNombres(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT c.*,p.nombre, p.apellidos FROM citas as c, pacientes as p Where c.id_paciente = p.id_paciente');
            res.json(respuesta);
        });
    }
    listarunaCita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM citas WHERE id_citas = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Cita no encontrado' });
        });
    }
    crearCita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body)
            const resp = yield database_1.default.query("INSERT INTO citas set ?", [req.body]);
            res.json(resp);
            //res.json(null);
        });
    }
    actualizarCita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //console.log(req.params);
            console.log(id);
            const resp = yield database_1.default.query("UPDATE citas set ? WHERE id_citas = ?", [req.body, id]);
            res.json(resp);
            //res.json(null);
        });
    }
    eliminarCita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM citas WHERE id_citas = ${id}`);
            res.json(resp);
        });
    }
}
exports.citasController = new CitasController();
