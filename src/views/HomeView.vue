<template>
  <!-- Cabecera de Grilla -->
  <div class="row grid-encabezado" style="border: 1px solid black;">
    <div class="col-md-1 grid-encabezado ">Tipo Propiedad</div>
    <div class="col-2 col-md-1 ">Tipo Operación</div>
    <div class="col-4 col-md-2">Descripción</div>
    <div class="col-2 col-md-1">Ambientes</div>
    <div class="col-2 col-md-2">M2</div>
    <div class="col-2 col-md-1">Antiguedad</div>
    <div class="col-2 col-md-1">Coordenadas de Ubicación</div>
    <div class="col-2 col-md-2">Lista de imágenes</div>
    <div class="col-2 col-md-1">Acciones</div>
  </div>
  <div class="row grid-lista-publicaciones"  v-for="pub, i in publicaciones" :key="pub.id" style="">
    <div class="col-md-1">{{ pub.tipoPropiedad }}</div>
    <div class="col-2 col-md-1">{{ pub.tipoOperacion }}</div>
    <div class="col-4 col-md-2">{{ pub.descripcion }}</div>
    <div class="col-2 col-md-1">{{ pub.ambientes}}</div>
    <div class="col-2 col-md-2">{{ pub.m2 }}</div>
    <div class="col-2 col-md-1">{{ pub.antiguedad}}</div>
    <div class="col-2 col-md-1">{{ pub.latitud }} - {{ pub.longitud }}</div>
    <div class="col-2 col-md-2">
        <div class="card">
           <img :src=pub.listaImagenes class="card-img-top" alt="imagen">
        </div>
        </div>
    <div class="col-2 col-md-1">
        <router-link :to="{path:'edit/'+pub.id}" class="btn editar-btn">
            <i class="fa-solid fa-edit"></i>
        </router-link>
        <button class="btn eliminar-btn" v-on:click="eliminar(pub.id)">
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>
  </div>
  <vuejs-paginator :data="publicaciones" :options="options"></vuejs-paginator>
</template>


<script>
import { confirmar } from "@/funciones";
import axios from "axios";
import { computed } from "vue";
import VuePaginator from 'vuejs-paginator';

export default {
    components: {
        VuePaginator
    },
    data(){
        return {
            publicaciones:null,
        };},
    mounted(){
        this.getPublicaciones();
    },
    methods:{
        getPublicaciones(){
            axios.get('https://localhost:7000/api/publicaciones').then(
                response => (
                    this.publicaciones = response.data
                )
            );
        },
        eliminar(id){
            confirmar(id);
        }
    }
}
</script>

<style>
/* Estilos de paginación */
.pagination {
  display: inline-block;
}

.pagination-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pagination-link {
  display: inline-block;
  padding: 0.5rem;
  margin-right: 0.5rem;
  border: 1px solid #ccc;
  cursor: pointer;
}

.is-current {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}

.is-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>

