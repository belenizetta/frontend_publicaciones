<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-body-secondary text-black text-center">Crear Publicación</div>
        <div class="card-body">
          <form v-on:submit="guardar">
            <div class="input group mb-3 d-flex justify-content-between">
              <span class="input-group-text"><i class="fa-solid fa-house"></i></span>
              <input type="text" v-model="propiedad" id="propiedad" class="form-control" placeholder="Tipo Propiedad" required>
            </div>
            <div class="input group mb-3 d-flex justify-content-between">
              <span class="input-group-text"><i class="fa-solid fa-comments-dollar"></i></span>
              <input type="text" v-model="operacion" id="operacion" class="form-control" placeholder="Tipo Operación" required>
            </div>
            <div class="input group mb-3 d-flex justify-content-between">
              <span class="input-group-text"><i class="fa-solid fa-comment"></i></span>
              <input type="text" v-model="descripcion" id="descripcion" class="form-control" placeholder="Descripción" required>
            </div>
            <div class="input group mb-3 d-flex justify-content-between">
              <span class="input-group-text"><i class="fa-solid fa-door-open"></i></span>
              <input type="number" v-model="ambientes" id="ambientes" class="form-control" placeholder="Ambientes" required>
            </div>
            <div class="input group mb-3 d-flex justify-content-between">
              <span class="input-group-text"><i class="fa-solid fa-ruler"></i></span>
              <input type="number" v-model="m2" id="m2" class="form-control" placeholder="M2" required>
            </div>
            <div class="input group mb-3 d-flex justify-content-between">
              <span class="input-group-text"><i class="fa-solid fa-hourglass-start"></i></span>
              <input type="number" v-model="antiguedad" id="antiguedad" class="form-control" placeholder="Antiguedad" required>
            </div>
            <div class="input group mb-3 d-flex justify-content-between">
              <span class="input-group-text"><i class="fa-solid fa-gauge-simple"></i></span>
              <input type="number" v-model="latitud" id="latitud" class="form-control" placeholder="Latitud" required>
              <span class="input-group-text"><i class="fa-solid fa-gauge-simple"></i></span>
              <input type="number" v-model="longitud" id="longitud" class="form-control" placeholder="Longitud" required>
            </div>
            <div class="input group mb-3 d-flex justify-content-between">
              <span class="input-group-text"><i class="fa-regular fa-image"></i></span>
              <input type="file" v-on:change="cargarImagen" id="imagenes" class="form-control" accept="image/*" multiple required>
            </div>
            <div class="d-grid col-6 mx-auto ">
              <button class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i> Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { show_alerta, enviarSolicutud} from "@/funciones";

  export default{
    data(){
      return{
        operacion: '', propiedad: '', descripcion: '', antiguedad: '', ambientes: '', m2: '',
        latitud: '',longitud: '', imagenes: '', url: 'https://localhost:7000/api/crear'
      }
    },
    methods:{
      cargarImagen(evento) {
        const archivos = evento.target.files;
        console.log(evento.target.files); 
        console.log(archivos);
        
        // Verifica si se han seleccionado archivos
        if (archivos.length > 0) {
            // Itera sobre cada archivo seleccionado
            for (let i = 0; i < archivos.length; i++) {
                this.imagenes = archivos[i];
            }
        }
        console.log(this.imagenes);
      },
      guardar(){
        event.preventDefault();
        if(this.operacion.trim() === ''){
          show_alerta('Completa el campo Tipo Operación', 'warning', operacion);
        }else if(this.propiedad.trim() === ''){
          show_alerta("Completa el campo Tipo Propiedad", 'warning');
        }else if(this.descripcion.trim() === ''){
          show_alerta("Completa el campo Descripción", 'warning');
        } else if(this.antiguedad === 0){
          show_alerta("Completa el campo Antiguedad", 'warning');
        }else if(this.ambientes === 0){
          show_alerta("Completa el campo Ambientes", 'warning');
        }else if(this.m2 === 0){
          show_alerta("Completa el campo M2", 'warning');
        }else if(this.latitud === ''){
          show_alerta("Completa el campo Latitud", 'warning');
        }if(this.longitud === ''){
          show_alerta("Completa el campo Longitud", 'warning');
        }else {
          const formData = new FormData();

            // Agregar datos al formulario
            formData.append('tipoPropiedad', this.propiedad);
            formData.append('tipoOperacion', this.operacion);
            formData.append('descripcion', this.descripcion);
            formData.append('ambientes', this.ambientes);
            formData.append('m2', this.m2);
            formData.append('antiguedad', this.antiguedad);
            formData.append('latitud', this.latitud);
            formData.append('longitud', this.longitud);
            formData.append('listaImagenes', this.imagenes);
          enviarSolicutud('POST',formData,this.url, 'Producto Generado');
        }
      }
    }
  }
</script>
