"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
const rolesRoutes_1 = __importDefault(require("./routes/rolesRoutes"));
const medicosRoutes_1 = __importDefault(require("./routes/medicosRoutes"));
const pacientesRoutes_1 = __importDefault(require("./routes/pacientesRoutes"));
const horariomedicoRoutes_1 = __importDefault(require("./routes/horariomedicoRoutes"));
const historialclinicoRoutes_1 = __importDefault(require("./routes/historialclinicoRoutes"));
const citasRoutes_1 = __importDefault(require("./routes/citasRoutes"));
const consultaRoutes_1 = __importDefault(require("./routes/consultaRoutes"));
//import{validarToken}from'../middleware/auth';
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        this.app.use('/documentacion', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    }
    config() {
        this.app.set('port', process.env.PORT || 80);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api/usuarios', usuariosRoutes_1.default);
        this.app.use('/api/roles', rolesRoutes_1.default);
        this.app.use('/api/medicos', medicosRoutes_1.default);
        this.app.use('/api/pacientes', pacientesRoutes_1.default);
        this.app.use('/api/horariomedico', horariomedicoRoutes_1.default);
        this.app.use('/api/historialclinico', historialclinicoRoutes_1.default);
        this.app.use('/api/citas', citasRoutes_1.default);
        this.app.use('/api/consulta', consultaRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('servidor en el puerto', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
