document.addEventListener("DOMContentLoaded", function () {

        for (let i = 1; i <= 20; i++) {
          const checkbox = document.getElementById(`check-${i}`);
          const inputCantidad = document.getElementById(`cantidad-${i}`);
    
          
          if (checkbox && inputCantidad) {
    
            
            checkbox.addEventListener("change", function () {
              if (checkbox.checked) {
                
                inputCantidad.disabled = false;
                inputCantidad.value = 1;
                inputCantidad.focus(); 
              } else {
                
                inputCantidad.value = 0;
                inputCantidad.disabled = true;
              }
              calcularPotInst();
            });
            
            inputCantidad.addEventListener("input", calcularPotInst);

          }

        }


});

function calcularPotInst(){
  let totalPotencia = 0;
  for (let i = 1; i <= 20; i++){
    const check = document.getElementById(`check-${i}`);
    const cantidadInput = document.getElementById(`cantidad-${i}`);

    if (check.checked) {
      const potencia = parseFloat(check.value);           
      const cantidad = parseInt(cantidadInput.value);     

      if (!isNaN(potencia) && !isNaN(cantidad) && cantidad > 0) {
        totalPotencia += potencia * cantidad;
      }
    }
  }

  let total = totalPotencia+suma_pot_manual;
  document.getElementById("resultadoPotencia").textContent = `${total.toLocaleString("es-PY")} W`;
  ocultarCardResultados();
  return total;
}

let suma_pot_manual = 0;
function agregarElectro(){
  const listaElectro = document.getElementById("listaElectro");
  let nombreElectro = document.getElementById("nombre").value;
  let valorPotMan = parseFloat(document.getElementById("potencia_manual").value);
  let cantElectro = document.getElementById("cantidad_manual").value;

  if(nombreElectro && valorPotMan && cantElectro > 0){
    let subpotmanual = valorPotMan*cantElectro;
    //crear nuevo div
    let nuevodiv = document.createElement("div");
    nuevodiv.className = "idText col-12 col-lg-4";
    let fila_aux = document.createElement("div");
    fila_aux.className = "d-flex justify-content-between align-items-center shadow p-2 mb-2 bg-body-tertiary rounded";

    let textoElectro = document.createElement("p");
    textoElectro.className = "m-0 flex-grow-1";
    textoElectro.innerHTML = `${cantElectro} x ${nombreElectro} (${valorPotMan.toLocaleString("es-PY")} W) <strong class="ms-3">[${subpotmanual.toLocaleString("es-PY")} W]</strong>`;


    //agregar boton eliminar
    let botonEliminar = document.createElement('button');
    botonEliminar.className = "btn btn-outline-danger";
    botonEliminar.innerHTML = '<i class="bi bi-trash"></i>';
    
    botonEliminar.onclick = function() {
      nuevodiv.remove();
      agregarsubtext();
      calcPotInst_manual(-subpotmanual);
      ocultarCardResultados();
      calcularPotInst();
      
    };
    ocultarCardResultados();
    calcPotInst_manual(subpotmanual);

    fila_aux.append(textoElectro, botonEliminar)
    nuevodiv.appendChild(fila_aux);
    listaElectro.appendChild(nuevodiv);
    
    

    document.getElementById("nombre").value = "";
    document.getElementById("potencia_manual").value = "";
    document.getElementById("cantidad_manual").value = "";
  } else{
    alert("Favor completar los datos para agregar electrodomestico");
  }
  
  agregarsubtext();
  calcularPotInst();
}
function agregarsubtext(){
  const subtex_listPot = document.getElementById("subtext_listPot");
  let cantElect = document.querySelectorAll('.idText').length;
  let nroEquipo = document.getElementById("nroEquipo");
  if(cantElect){
    subtex_listPot.classList.remove("d-none");
    nroEquipo.textContent = `${cantElect}`;
  } else{
    subtex_listPot.classList.add("d-none");
    nroEquipo.textContent = ``;
  }
}

function calcPotInst_manual(subpotmanual){
 suma_pot_manual += subpotmanual;
 return suma_pot_manual;
}

document.getElementById("btnReset").addEventListener("click", function () {
  ocultarCardResultados();
  for (let i = 1; i <= 20; i++) {
    const check = document.getElementById(`check-${i}`);
    const cantidad = document.getElementById(`cantidad-${i}`);
    if (check) check.checked = false;
    if (cantidad) {
      cantidad.value = 0;
      cantidad.disabled = true;
    }
  }

  const contenedor_lista = document.getElementById("listaElectro");
  contenedor_lista.innerHTML = ""; 

  document.getElementById("nombre").value = "";
  document.getElementById("potencia_manual").value = "";
  document.getElementById("cantidad_manual").value = "";
  suma_pot_manual = 0;
  calcularPotInst();
  agregarsubtext()
});

const factoresDemanda = [
  { desde: 0, hasta: 2.7, factor: 1 },
  { desde: 2.7, hasta: 3.8, factor: 0.95 },
  { desde: 3.8, hasta: 7.2, factor: 0.9 },
  { desde: 7.2, hasta: 12, factor: 0.85 },
  { desde: 12, hasta: 20, factor: 0.8 },
  { desde: 20, hasta: 30, factor: 0.75 },
  { desde: 30, hasta: 50, factor: 0.7 }
];

document.getElementById("potDecl").addEventListener("click", function () {
  
  let potenciaInstalada = calcularPotInst();
  let potInstKw = potenciaInstalada/1000;
  let factorDemanda = obtenerFactorDemanda(potInstKw);
  if (factorDemanda && potInstKw <= 40 ){
   
    let potenciaDemanda = potInstKw*obtenerFactorDemanda(potInstKw);
    let conexion = tipoDeRed(potInstKw);
    let corrienteDemanda = corrienteDem(conexion, potenciaDemanda);
    
    document.getElementById("resPotDeclarada").textContent = `${potenciaDemanda.toLocaleString("es-PY", { minimumFractionDigits: 2})} kW`;
    document.getElementById("resTipoConexion").textContent = `${conexion}`;
    document.getElementById("resCorriente").textContent = `${parseFloat(corrienteDemanda).toLocaleString("es-PY", { minimumFractionDigits: 2 })} A`;
    mostrarCardResultados();
  } else{
    document.getElementById("resPotDeclarada").textContent = `- - - kW`;
    document.getElementById("resTipoConexion").textContent = `Trifásico (excede el limite de 40kW de potencia declarada para baja tensión, contactese con la ANDE)`;
    document.getElementById("resCorriente").textContent = `- - - A`;
    mostrarCardResultados();
    return;
  }
  
});

function obtenerFactorDemanda(potInstKw){
  const valorfactor = factoresDemanda.find(rango =>
      potInstKw > rango.desde && potInstKw <= rango.hasta
   );
  return valorfactor ? valorfactor.factor : null;
}
function tipoDeRed(potInstKw){
  if (potInstKw <= 10){
    return "Monofásico"
  }else if (potInstKw <= 40){
    return "Trifásico"

  }
}
function corrienteDem(conexion, potenciaDemanda){
  let potW = potenciaDemanda*1000;
  let corriente = 0;
  if(conexion === "Monofásico"){
    corriente = potW/220;
  } else if (conexion === "Trifásico"){
    corriente = potW/(Math.sqrt(3)*380);
  }
  return corriente.toFixed(2);
}
function ocultarCardResultados() {
  document.getElementById("cardResultados").classList.add("d-none");
  document.getElementById("cardResultados").classList.remove("activo");
}
function mostrarCardResultados() {
  const verifDespliegue = document.getElementById("cardResultados");
  verifDespliegue.classList.remove("d-none");
  void verifDespliegue.offsetWidth;
  verifDespliegue.classList.add("activo");

}
