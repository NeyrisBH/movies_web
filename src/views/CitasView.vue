<template>
    <div class="container">
        <div class="card-header-flex">
            <h3>Citas</h3>
            <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#citaModal"
                @click="abrirModalRegistrar()">Insertar</button>
        </div>
        <div class="car-body table-responsive container">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>IDENTIFICACION</th>
                        <th>TIPO</th>
                        <th>LUGAR</th>
                        <th>FECHA</th>
                        <th>PACIENTE</th>
                        <th>MEDICO</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cita in citas">
                        <td>{{ cita.id }}</td>
                        <td>{{ cita.tipoExamen }}</td>
                        <td>{{ cita.lugarProcedimiento }}</td>
                        <td>{{ cita.fechaProcedimiento }}</td>
                        <td>{{ cita.paciente }}</td>
                        <td>{{ cita.idMedicoGeneral }}</td>
                        <td>
                            <div class="buttons-acciones">
                                <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                                    data-bs-target="#citaModal" @click="abrirModalEditar(cita)">
                                    <img src="../assets/svg/edit.svg" alt="">
                                </button>
                                <button type="button" class="btn btn-danger" @click="eliminarConfCita(cita.id)">
                                    <img src="../assets/svg/delete.svg" alt="">
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Modal - Register -->
    <div class="modal fade" id="citaModal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content container">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{tituloModal}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <form class="row g-4 container-fr">
                        <div class="col-md-6">
                            <label for="id">Id</label>
                            <input v-model="id" type="number" class="form-control" id="id" name="id">
                        </div>
                        <div class="col-md-6">
                            <label for="nombres">Tipo</label>
                            <input v-model="tipoExamen" type="text" class="form-control" id="tipoExamen"
                                name="tipoExamen">
                        </div>
                        <div class="col-md-6">
                            <label for="primerApellido">Centro medico</label>
                            <input v-model="lugarProcedimiento" type="text" class="form-control" id="lugarProcedimiento"
                                name="lugarProcedimiento">
                        </div>
                        <div class="col-md-6">
                            <label for="segundoApellido">Fecha</label>
                            <input v-model="fechaProcedimiento" type="date" class="form-control" id="fechaProcedimiento"
                                name="fechaProcedimiento">
                        </div>
                        <div class="col-md-6">
                            <label for="telefono">Paciente</label>
                            <input v-model="paciente" type="text" class="form-control" id="tepacientelefono"
                                name="paciente">
                        </div>
                        <div class="col-md-6">
                            <label for="correo">Id Medico</label>
                            <input v-model="idMedicoGeneral" type="number" class="form-control" id="idMedicoGeneral"
                                name="idMedicoGeneral">
                        </div>
                    </form>
                    <div class="modal-footer">
                        <button @click="crearCita" class="btn btn-primary" v-if="btnCrear">Guardar</button>
                        <button @click="actualizarCita(id)" class="btn btn-primary" v-if="btnActualizar">Actualizar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            titulo: "TuCita.com",
            tituloModal: '',
            btnCrear: false,
            btnActualizar: false,
            citas: [],
            id: null,
            tipoExamen: '',
            lugarProcedimiento: '',
            fechaProcedimiento: '',
            paciente: '',
            idMedicoGeneral: null,
            token: localStorage.getItem('token')
        };
    },
    methods: {
        limpiarForm() {
            this.id = null,
                this.tipoExamen = '',
                this.lugarProcedimiento = '',
                this.fechaProcedimiento = '',
                this.paciente = '',
                this.idMedicoGeneral = null
        },
        async consultaCitas() {
            const authorization = "Bearer "+ this.token;
            const opciones = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Authorization": authorization
                }
            };
            fetch("http://localhost:8080/api/ordenes", opciones)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        console.log(error.message);
                        throw error;
                    }
                    else {
                        this.citas = await response.json();
                    }
                });
        },
        async crearCita() {
            const authorization = "Bearer "+ this.token;
            const opciones = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Authorization": authorization
                },
                body: JSON.stringify({
                    id: this.id,
                    lugarProcedimiento: this.lugarProcedimiento,
                    tipoExamen: this.tipoExamen,
                    fechaProcedimiento: this.fechaProcedimiento,
                    paciente: this.paciente,
                    idMedicoGeneral: this.idMedicoGeneral,
                })
            };
            fetch("http://localhost:8080/api/ordenes", opciones)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        throw error;
                    }
                    else {
                        const data = await response.json();
                        this.limpiarForm();
                        this.consultaCitas();
                    }
                });
        },
        async actualizarCita(id) {
            const authorization = "Bearer "+ this.token;
            const opciones = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Authorization": authorization
                },
                body: JSON.stringify({
                    id: this.id,
                    lugarProcedimiento: this.lugarProcedimiento,
                    tipoExamen: this.tipoExamen,
                    fechaProcedimiento: this.fechaProcedimiento,
                    paciente: this.paciente,
                    idMedicoGeneral: this.idMedicoGeneral,
                })
            };
            fetch(`http://localhost:8080/api/ordenes/d/${id}`, opciones)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        throw error;
                    }
                    else {
                        const data = await response.json();
                        this.consultaCitas();
                    }
                });
        },
        async eliminarCita(id) {
            const authorization = "Bearer "+ this.token;
            const opciones = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Authorization": authorization
                }
            };
            fetch(`http://localhost:8080/api/ordenes/d/${id}`, opciones)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        throw error;
                    }
                    else {
                        this.consultaCitas();
                    }
                });
        },
        eliminarConfCita(id) {
            if (!confirm('¿Esta seguro de eliminar la cita?')) return;

            this.eliminarCita(id);
        },
        abrirModalRegistrar() {
            this.id = null,
            this.tipoExamen = '',
            this.lugarProcedimiento = '',
            this.fechaProcedimiento = '',
            this.paciente = '',
            this.idMedicoGeneral = null
            this.tituloModal = "Registrar Cita",
            this.btnCrear = true;
            this.btnActualizar = false;
        },
        abrirModalEditar(data) {
            this.id = data.id,
                this.tipoExamen = data.tipoExamen,
                this.lugarProcedimiento = data.lugarProcedimiento,
                this.fechaProcedimiento = data.fechaProcedimiento,
                this.paciente = data.paciente,
                this.idMedicoGeneral = data.idMedicoGeneral,
                this.tituloModal = "Editar Cita",
                this.btnCrear = false;
            this.btnActualizar = true;
        }
    },
    beforeMount() {
        this.consultaCitas();
    },
    components: {}
}
</script>

<style scoped>
.buttons-acciones {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
}

.buttons-acciones button {
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-header-flex {
    margin: 100px 30px 10px 30px;
    display: grid;
    grid-template-columns: 70% 30%;
}

.car-body {
    margin: 20px auto;
    font-size: 14px;
}

.car-body th {
    font-weight: 900;
}

#editarModal {
    display: flexbox;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>