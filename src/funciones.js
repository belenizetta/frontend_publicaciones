import Swal from "sweetalert2";
import axios from "axios";

export function show_alerta(mensaje, icono, foco=''){
    if(foco !== '')
    {
        document.getElementById(foco).focus();
    }
    Swal.fire({
        title: mensaje,
        icon: icono,
        customClass: {confirmButton: 'btn btn-primary', popup:'animated zoomIn'},
        buttonsStyling:false
    });
}

export function confirmar(id){
    var url = 'https://localhost:7000/api/eliminar/'+id;
    const swalWithBootstrapButtons= Swal.mixin({
        customClass:{confirmButton: 'btn btn-success me-3', cancelButton: 'btn btn-danger'},
        buttonsStyling:false
    });
    swalWithBootstrapButtons.fire({
        title: 'Esta seguro que desea eliminar la publicación '+ id,
        text: 'Se perderá la información de la publicación',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-check"></i> Sí, eliminar',
        cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar'
    }).then((result) => {
        if(result.isConfirmed){
            enviarSolicutud('DELETE', {id:id}, url, 'Publicación eliminada')
        }else{
            show_alerta('Operación cancelada', 'info')
        }
    }) 
}

export function enviarSolicutud(metodo, parametros, url, mensaje){
    axios({method:metodo,url:url,data:parametros}).then(function(respuesta){
        if(respuesta.status == 200){
            show_alerta(mensaje, 'success');
            window.setTimeout(function(){
                window.location.href= '/';
            },1000);
        }
        else{
            var listado ='';
            show_alerta('Error en la solicitud', 'error');
        }
    }).catch(function(error){
        show_alerta('Error en la solicitud','error');
    });
}
