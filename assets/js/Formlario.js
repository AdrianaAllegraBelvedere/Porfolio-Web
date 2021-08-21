function MostrarNotificacionExito(notificacionExitosa){

    document.getElementById("notificacion-exito").style = 'display:none';
    document.getElementById("notificacion-error").style = 'display:none';

    let tipoNotificacion = notificacionExitosa ? "notificacion-exito" : "notificacion-error";
    document.getElementById(`${tipoNotificacion}`).style = 'display:block';

}

function LimpiarFormulario(){
    document.getElementById("name").value = "";
    document.getElementById("email").value = ""; 
    document.getElementById("asunto").value = ""; 
    document.getElementById("mensaje").value = ""; 
}

function GuardarConsulta(nuevaConsulta){

    try {
        let formularioCompleto = nuevaConsulta.nombreValor.length > 0 && nuevaConsulta.emailValor.length  > 0 && nuevaConsulta.AsuntoValor.length  > 0 && nuevaConsulta.MensajeValor.length  > 0;
        if(formularioCompleto)
        {
            const dataBase= firebase.database();
            dataBase.ref('/Consulta').set(nuevaConsulta);
            LimpiarFormulario();
            MostrarNotificacionExito(true)
        }
        else{
            MostrarNotificacionExito(false)
        }
    } catch (error) {
        console.log(error);
        MostrarNotificacionExito(false)
    }

}

function EnviarConsulta(){

    let nombreValor = document.getElementById("name").value; 
    let emailValor = document.getElementById("email").value; 
    let AsuntoValor = document.getElementById("asunto").value; 
    let MensajeValor = document.getElementById("mensaje").value; 
    let fechaActual= new Date();
    let fecha = `${fechaActual.getDate()}/${fechaActual.getMonth()+1}/${fechaActual.getFullYear()} ${fechaActual.getHours()}:${fechaActual.getUTCMinutes()}`;
    let consulta = {nombreValor,emailValor,AsuntoValor,MensajeValor,fecha};
    GuardarConsulta(consulta);
}