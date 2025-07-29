const btnGroup= document.querySelectorAll(".btn-group-lg input");
const btnGroup2= document.querySelectorAll("#fpbtn input");
//const GroupPot= document.querySelectorAll(".form-pot");
btnGroup.forEach(btn => {
  const okPotencia = btn.id === "potenciaON";
  
  btn.addEventListener("change", () => {

    document.querySelectorAll(".form-pot").forEach(estados =>{
      if(okPotencia){
        estados.value="";
        estados.disabled=false;
        
      }else{
        estados.value="";
        estados.disabled=true;
      }
    })

    document.getElementById("Campcorriente").classList.toggle("d-none", okPotencia);
    document.getElementById("grupoPotencia").classList.toggle("d-none", !okPotencia);
    if(!okPotencia){
      document.getElementById("fpOFF").checked=true;
      document.getElementById("fpnorma").classList.remove("d-none");
      document.getElementById("fpingrese").classList.add("d-none");
      document.getElementById("fpValor").value="";
      document.getElementById("fpValor").disabled= true;
      document.getElementById("corriente").disabled=false;
      document.getElementById("corriente").value="";
      
    }else{
      document.getElementById("corriente").disabled=true;
      document.getElementById("corriente").value="";
      
    }
  });
  
  
});

btnGroup2.forEach(btn2 => {
  btn2.addEventListener("change", () => {
    const okfpON = btn2.id === "fpON";
    document.getElementById("fpnorma").classList.toggle("d-none", okfpON);
    document.getElementById("fpingrese").classList.toggle("d-none", !okfpON);
    if(!okfpON){
      document.getElementById("fpValor").value="";
      document.getElementById("fpValor").disabled= true;
    }else{
      document.getElementById("fpValor").disabled= false;
    }
  });
});
  //funcion para ocultar los campos adicionales tipo F y G
  const tipoInstalacion = document.getElementById("tipoInstalacion");
     
  function actualizarOcultos1(){
    let valorTipoInst= tipoInstalacion.value;

    let camposOcultos1 = document.querySelectorAll(".form1");

    camposOcultos1.forEach( selectocultos =>{
      selectocultos.value="";
      selectocultos.disabled=true;
    })
    
    if(valorTipoInst === "F"){
      document.getElementById("ocultoF").classList.remove("d-none");
      document.getElementById("ocultoG").classList.add("d-none");
      document.getElementById("dispConductoresF").disabled = false;
    }else if(valorTipoInst === "G"){
      document.getElementById("ocultoG").classList.remove("d-none");
      document.getElementById("ocultoF").classList.add("d-none");
      document.getElementById("dispConductoresG").disabled = false;
    } else {
      document.getElementById("ocultoF").classList.add("d-none");
      document.getElementById("ocultoG").classList.add("d-none");
    }
    actualizarConductores();
  }
  tipoInstalacion.addEventListener("change", actualizarOcultos1);

  document.getElementById("dispConductoresF").addEventListener("change", actualizarConductores);
  function actualizarConductores() {
    const tipoInstalacion = document.getElementById("tipoInstalacion").value;
    const disposicionF = document.getElementById("dispConductoresF").value;
    const campoConductores = document.getElementById("nroConductores");
  
    // Buscar la opción con valor "2"
    const opcion2 = campoConductores.querySelector('option[value="2"]');
  
    // Por defecto, la opción "2" está habilitada
    opcion2.disabled = false;
  
    // Si es tipo F y disposición en trébol → deshabilitar "2"
    if (tipoInstalacion === "F" && disposicionF === "Trebol") {
      opcion2.disabled = true;
      if (campoConductores.value === "2") campoConductores.value = "3";
    }
  
    // Si es tipo G → deshabilitar "2"
    if (tipoInstalacion === "G") {
      opcion2.disabled = true;
      if (campoConductores.value === "2") campoConductores.value = "3";
    }
  }

  document.getElementById("tipoAislacion").addEventListener("change", actualizarTemperaturas);
  function actualizarTemperaturas() {
    const tipoAislacion = document.getElementById("tipoAislacion").value;
    const selectTemperatura = document.getElementById("temperatura");
  
    // Lista de temperaturas que deben estar deshabilitadas para PVC
    const temperaturasProhibidasPVC = ["65", "70", "75", "80"];
  
    // Recorremos todas las opciones del select
    Array.from(selectTemperatura.options).forEach(option => {
      if (tipoAislacion === "PVC") {
        // Deshabilitar si es una de las prohibidas
        option.disabled = temperaturasProhibidasPVC.includes(option.value);
      } else {
        // Habilitar todas para EPR o XLPE
        option.disabled = false;
      }
    });
    if (selectTemperatura.options[selectTemperatura.selectedIndex].disabled) {
      selectTemperatura.value = "";
    }
  }
// Función que valida las condiciones del agrupamiento
function validarAgrupamiento() {
  const tipoInstalacion = document.getElementById("tipoInstalacion").value;
  const metodoAgrupElem = document.getElementById("metodoAgrupamiento");
  const metodoAgrup = metodoAgrupElem.value;


  // Obtiene el valor del select "forma_agrup" si existe
  const formaAgrupElem = document.getElementById("forma_agrup");
  const formaAgrup = formaAgrupElem ? formaAgrupElem.value : "";
  const formaAgrupTexto = formaAgrupElem ? formaAgrupElem.options[formaAgrupElem.selectedIndex].text : "";
  const metodoAgrupTexto = document.getElementById("metodoAgrupamiento").options[document.getElementById("metodoAgrupamiento").selectedIndex].text;

  // 1. Validación para ciertas formas de agrupamiento que requieren instalación tipo "C"
  if (formaAgrup === "camada_unica_pared_piso_bandeja_cerrada" || formaAgrup === "camada_unica_en_techo"){
    if (tipoInstalacion !== "C") {
      mostrarAlerta(
        `Para la opción <strong>"${formaAgrupTexto}"</strong> en <strong>"Forma de agrupamiento"</strong>, el tipo de instalación debe ser <strong>"C"</strong>`
      );
      return false;
    }
  }

  // 2. Validación para formas que requieren tipo de instalación "E" o "F"
  if (formaAgrup === "camada_unica_bandeja_perforada" || formaAgrup === "camada_unica_parrilla_soporte"){

    if (tipoInstalacion !== "E" && tipoInstalacion !== "F") {
      mostrarAlerta(
        `Para la opción <strong>"${formaAgrupTexto}"</strong> en la <strong>"Forma de agrupamiento"</strong>, el tipo de instalación debe ser <strong>"E" o "F"</strong>`
      );
      return false;
    }
  }

  // 3. Si el método es "multiple", se requiere tipo "C", "E" o "F"
  if (metodoAgrup === "multiple") {
    if ( tipoInstalacion !== "C" && tipoInstalacion !== "E" && tipoInstalacion !== "F"){
      mostrarAlerta(
        `Para el método de agrupamiento <strong>"${metodoAgrupTexto}"</strong> el tipo de instalación debe ser <strong>"C", "E" o "F"</strong>`
      );
      return false;
    }
  }

  // 4. Si el método es "enterrado" o "electroducto_enterrado", se requiere tipo "D"
  if ( metodoAgrup === "enterrado" || metodoAgrup === "electroducto_enterrado" ){
    if (tipoInstalacion !== "D") {
      mostrarAlerta(
        `Para el método de agrupamiento <strong>"${metodoAgrupTexto}"</strong>, el tipo de instalación debe ser <strong>"D"</strong>`
      );
      return false;
    }
  }
  // Si todas las validaciones se cumplen
  return true;
}

  


// Escucha cambios en los selects y ejecuta la validación automáticamente
document.getElementById("forma_agrup")?.addEventListener("change", validarAgrupamiento);
document.getElementById("metodoAgrupamiento").addEventListener("change", validarAgrupamiento);
document.getElementById("tipoInstalacion").addEventListener("change", validarAgrupamiento);

function validartipoPotYred() {
  const tipoPot = document.getElementById("seleccionTipoPotencia").value;
  const tipoRed = document.getElementById("nroConductores").value;

  // Si la potencia es monofásica, el tipo de red debe ser "2"
  if (tipoPot === "monofasico" && tipoRed !== "2") {
    mostrarAlerta('Verifica si el campo Tipo de Potencia es igual al campo Tipo de Red');
    return false;
  }

  // Si la potencia es trifásica, el tipo de red debe ser "3" o "4"
  if (tipoPot === "trifasico" && tipoRed !== "3" && tipoRed !== "4") {
    mostrarAlerta('Verifica si el campo Tipo de Potencia es igual al campo Tipo de Red');
    return false;
  }

  // Todo está bien
  return true;
}

function mostrarAlerta(mensaje, tipo = "warning") {
  // Eliminar alertas anteriores
  document.querySelectorAll(".alert").forEach(alerta => alerta.remove());

  // Crear la alerta
  const alerta = document.createElement("div");
  alerta.className = `alert alert-${tipo} alert-dismissible fade show position-fixed z-3 top-0 end-0 m-3`;
  alerta.role = "alert";
  alerta.innerHTML = `
   <i class="bi bi-exclamation-triangle-fill fs-5"></i> ${mensaje}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  const container = document.querySelector(".container");
  container.prepend(alerta);
  
}


  
  const switch_seleccion = document.getElementById("switch_seleccion");
  const factoresCorreccion = document.getElementById("factoresCorreccion");
  switch_seleccion.addEventListener("change", () => {
    factoresCorreccion.classList.toggle("d-none", !switch_seleccion.checked);
    
    if (!switch_seleccion.checked) {
      document.querySelectorAll(".factCorreccion").forEach((campo) => {
        campo.classList.add("d-none");
      });
      document.querySelectorAll(".toggle").forEach(function(sw) {
        sw.checked = false;
      });
      Object.values(agrupamientos).forEach((grupo) => {
        grupo.forEach((elemento) => {
          elemento.classList.add("d-none");
        });
      });
      resetearCampos();
    }
  });
  
  function manejarVisibilidad(event) {
    const campo = document.getElementById(event.target.dataset.tipofactor);
    if (campo) {
      campo.classList.toggle("d-none", !event.target.checked);
      if (event.target.dataset.tipofactor === "poragrupamiento" && !event.target.checked) {
        Object.values(agrupamientos).forEach((grupo) => {
          grupo.forEach((elemento) => {
            elemento.classList.add("d-none");
          });
        });
        
      }
      if (!event.target.checked) {
        resetearCamposFactor(campo);
      } else {
        habilitarCamposFactor(campo);
      }
    }
  }
  document.querySelectorAll(".toggle").forEach((sw) => {
    sw.addEventListener("change", manejarVisibilidad);
  });
// funcion para resetear todos los campos cuando se desactiva la sw seleccion
function resetearCampos() {
  document.querySelectorAll("#portemperatura select, #poragrupamiento select, #porCaidaTension input[type='number']").forEach((elemento) => {
    elemento.value = "";
    elemento.disabled = true;
  });
}
// funcion para resetear los campos dentro de un factor específico
function resetearCamposFactor(factor) {
  factor.querySelectorAll("select, input").forEach((elemento) => {
    elemento.value = "";
    elemento.disabled = true;
  });
}

// funcion para habilitar los campos dentro de un factor específico
function habilitarCamposFactor(factor) {
  factor.querySelectorAll("select, input").forEach((elemento) => {
    elemento.disabled = false;
  });
}
//logica para habilitar o ocular metodos de agrupacion
  const metodoAgrupamiento = document.getElementById("metodoAgrupamiento");
  const agrupamientos = {
    unica: document.querySelectorAll(".camadaUni"),
    multiple: document.querySelectorAll(".camadaMul"),
    enterrado: document.querySelectorAll(".direcEnt"),
    electroducto_enterrado: document.querySelectorAll(".electrodEnt"),
  };

  metodoAgrupamiento.addEventListener("change", function () {
    // oculta todos los elementos
    Object.values(agrupamientos).forEach(function (grupo) {
      grupo.forEach(function (elemento) {
        elemento.classList.add("d-none");
        resetearCamposFactor(elemento);
      });
    });

    var seleccion = metodoAgrupamiento.value;

    // muestra los campos
    if (agrupamientos[seleccion]) {
      agrupamientos[seleccion].forEach(function (elemento) {
        elemento.classList.remove("d-none");       
        habilitarCamposFactor(elemento);
      });
    }
  });

// Función que reinicia los radios de caída de tensión y selecciona el del 5%
function resetearCriterioCaida() {
  const radios = document.querySelectorAll('.criterioCaida');

  radios.forEach(radio => {
    radio.checked = (radio.id === "cd_5");
  });
}


document.getElementById("switch_seleccion").addEventListener("change", resetearCriterioCaida);
document.getElementById("switch_caidaTension").addEventListener("change", resetearCriterioCaida);




//funcion para validar el form
const form = document.getElementById("calculadoraSeccion");

form.addEventListener("submit", function(validacion) {
    validacion.preventDefault(); 

    if (!form.checkValidity()) { 
        form.classList.add("was-validated"); 

        // Buscar los campos que faltan completar
        let camposFaltantes = [];
        document.querySelectorAll("#calculadoraSeccion input:invalid, #calculadoraSeccion select:invalid").forEach(campo => {
            let label = document.querySelector(`label[for=${campo.id}]`);
            let nombreCampo = label ? label.textContent : campo.id; // Si tiene label, usa el texto; si no, el id
            camposFaltantes.push(nombreCampo);
        });

        // Mostrar alerta con los campos que faltan
        if (camposFaltantes.length > 0) {
            alert("Complete los siguientes campos requeridos:\n\n" + camposFaltantes.join("\n"));
        }
    } else {
        calcular(); 
    }
});
function calcular() {
  if (!validarAgrupamiento()) {
    return;
  }
  if (!validartipoPotYred()) {
    return; // No continuar si la validación falla
  }
  // 1. Verificar si se ingresa corriente o potencia
  const tipoEntrada = document.getElementById("corrienteON").checked ? "corriente" : "potencia";
  let corriente_proyecto = 0;


  if (tipoEntrada === "corriente") {
    corriente_proyecto = parseFloat(document.getElementById("corriente").value);
  } else {
    const potencia = parseFloat(document.getElementById("potencia").value);
    const tipoPotencia = document.getElementById("seleccionTipoPotencia").value;
    let fp = 0.92;

    if (document.getElementById("fpON").checked) {
      fp = parseFloat(document.getElementById("fpValor").value);
    }

    if (tipoPotencia === "monofasico") {
      corriente_proyecto = potencia / (220 * fp); // suponiendo 220 V
    } else if (tipoPotencia === "trifasico") {
      corriente_proyecto = potencia / (Math.sqrt(3) * 380 * fp); // suponiendo 380 V
    }
  }

  // 2. Capturar datos técnicos del formulario
  const tipo_aislacion = document.getElementById("tipoAislacion").value;
  const tipo_instalacion = document.getElementById("tipoInstalacion").value;
  let nro_conductores = parseInt(document.getElementById("nroConductores").value);
  if (nro_conductores === 4) {
    nro_conductores = 3;
  }

  let disposicion = null;
  if (tipo_instalacion === "F") {
    disposicion = document.getElementById("dispConductoresF").value;
  } else if (tipo_instalacion === "G") {
    disposicion = document.getElementById("dispConductoresG").value;
  }

  // 3. Guardar en objeto (nombres iguales al JSON)
  const datosEntrada = {
    tipoEntrada,
    corriente_proyecto,
    tipo_aislacion,
    tipo_instalacion,
    nro_conductores,
    disposicion
  };
  buscarSeccion(datosEntrada);
}
// 4. Buscar sección adecuada en capacidades.json
async function buscarSeccion(datosEntrada) {
  try {
    // 1. Cargar los archivos JSON
    const [capacidades, por_temperatura, agrupamiento] = await Promise.all([
      fetch("./data/capacidades.json").then(res => res.json()),
      fetch("./data/por_temperatura.json").then(res => res.json()),
      fetch("./data/agrupamiento.json").then(res => res.json())
    ]);
    let factorTemp = 1;
    let factorAgrup = 1;
   if (document.getElementById("switch_temperatura").checked) {
      factorTemp = obtenerFactorTemperatura(datosEntrada, por_temperatura);
    }

    if (document.getElementById("switch_agrupacion").checked) {
      factorAgrup = obtenerFactorAgrupamiento(datosEntrada, agrupamiento);
    }
    // 3. Calcular corriente corregida
    let factorNeutro = 1;
    if (parseInt(document.getElementById("nroConductores").value)=== 4) {
      factorNeutro = 0.86;
    }
    
    const corrienteCorregida = datosEntrada.corriente_proyecto / (factorTemp * factorAgrup * factorNeutro);
    

    let esFG;
    if (datosEntrada.tipo_instalacion === "F" || datosEntrada.tipo_instalacion === "G") {
      esFG = true;
    } else {
      esFG = false;
    }

    const capacidadesValidas = capacidades.filter(item => {
      const coincide =
        item.tipo_aislacion === datosEntrada.tipo_aislacion &&
        item.tipo_instalacion === datosEntrada.tipo_instalacion &&
        item.nro_conductores === datosEntrada.nro_conductores;
      return esFG ? coincide && item.disposicion === datosEntrada.disposicion : coincide;
    });
    
    const itemS1 = capacidadesValidas.find(item => {
      const corriente_maxima = parseFloat(item.corriente_maxima.toString().replace(",", "."));
      return corriente_maxima > corrienteCorregida;
    });

    if (!itemS1) {
      const advertencia = `
        <p class="fs-6 text-danger fw-semibold text-center">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          No se encontró una sección que soporte la corriente ingresada según la tabla de capacidades de la norma INTN.
        </p>`;
      
      mostrar_resultados("", "", advertencia, true);
      return;
    }


    let S1 = parseFloat(itemS1.seccion_mm2.toString().replace(",", "."));

    if (document.getElementById("switch_caidaTension").checked) {

      const L = parseFloat(document.getElementById("longCable").value);

      const criterio = parseInt(document.querySelector('.criterioCaida:checked').id.split("_")[1]);
      let criterio_ajustado = criterio;
      let mensajeAdvertencia ="";
      //caso que la longitud sea mayor a 100m
      if (L > 100) {
        const metros_excedentes = L - 100;
        const incremento = metros_excedentes * 0.005; // cada metro agrega 0,005%
        mensajeAdvertencia = `<div class="alert alert-warning border border-danger-subtle px-3 py-2 text-start">
            <p class="mb-1 fs-6 text-danger fw-semibold">
              <i class="bi bi-exclamation-triangle-fill me-2"></i>
              Advertencia: la longitud del conductor supera los 100.
            </p>
            <p class="mb-1 text-dark">
              La norma INTN NP 2 028 96 establece un ajuste máximo de <strong>+0,5%</strong> sobre el criterio de caída de tensión cuando la longitud supera 
              los 100 metros, aplicando <strong>0,005%</strong> de incremento por cada metro excedente.
            </p>
            <p class="mb-1 text-dark">
              Longitud ingresada: <strong>${L.toFixed(2).toString().replace(".", ",")} m</strong> → incremento calculado: <strong>${incremento.toFixed(3).toString().replace(".", ",")}%</strong>.
            </p>
            </div>`;
        if (incremento > 0.5) {

          mensajeAdvertencia = `<div class="alert alert-warning border border-danger-subtle px-3 py-2">
            <p class="mb-1 fs-6 text-danger fw-semibold">
              <i class="bi bi-exclamation-triangle-fill me-2"></i>
              Advertencia: la longitud del conductor supera el límite permitido por la norma INTN NP 2 028 96.
            </p>
            <p class="mb-1 text-dark">
              La norma INTN NP 2 028 96 establece un ajuste máximo de <strong>+0,5%</strong> sobre el criterio de caída de tensión cuando la longitud supera 
              los 100 metros, aplicando <strong>0,005%</strong> de incremento por cada metro excedente.
            </p>
            <p class="mb-1 text-dark">
              Longitud ingresada: <strong>${L.toFixed(2).toString().replace(".", ",")} m</strong> → incremento calculado: <strong>${incremento.toFixed(2).toString().replace(".", ",")}%</strong>.
            </p>
            <p class="mb-0 text-danger fw-semibold">
              Se muestra el resultado, pero <strong>se recomienda reconsiderar la instalación</strong> según la norma.
            </p>
          </div>`;
            


          
         
                   
        }
        if(incremento<=0.5){
          criterio_ajustado += incremento;
        } else{
          criterio_ajustado +=0.5;
        }
        
      
      }      

      
      const tipoRed = document.getElementById("nroConductores").value;
      const itemS2 = calcularSeccionCaida(datosEntrada.corriente_proyecto, L, tipoRed, criterio_ajustado, capacidadesValidas);

      const S2 = itemS2.seccion; 
      const S_final = (S2 >= S1) ? S2 : S1;


      const resultadoSeccion = `<p class="mb-1 p-0 fs-5 fw-semibold"><i class="bi bi-check-square-fill text-success fs-5 me-2"></i>
                                Sección final recomendada: ${S_final.toFixed(1).toString().replace(".", ",")} mm²
                                </p>`;
      let bloqCaida = ``;

      bloqCaida += `<p class="fs-5 fw-medium">Comparación de secciones evaluadas:</p>`;

      bloqCaida += `<p class="ms-0 fs-6"><i class="bi bi-lightning-fill me-0 me-md-2 text-warning"></i>
      Sección mínima por caída de tensión: ${itemS2.datos_caida.seccion_mm2} mm² (corriente máxima: ${itemS2.datos_caida.corriente_maxima} A)
      </p>`;
      bloqCaida += `<p class="ms-0 fs-6"><i class="bi bi-check-circle me-1 me-md-2 text-secondary"></i>
      L: ${L.toFixed(2).toString().replace(".", ",")}m cumple con el criterio seleccionado (${itemS2.caidaTension.toFixed(2).toString().replace(".", ",")}% < ${criterio_ajustado}%).
      </p>`;
      if (criterio_ajustado !== criterio) {
        bloqCaida += `<p class="ms-0 fs-6"><i class="bi bi-rulers text-primary me-1 me-md-2"></i>Ajuste aplicado por longitud >100m (+${(criterio_ajustado - criterio).toFixed(3).toString().replace(".", ",")}% permitido)</p>`;
      }
      
      if (document.getElementById("switch_agrupacion").checked || document.getElementById("switch_temperatura").checked) {
        
        bloqCaida += `<p class="ms-0 fs-6"><i class="bi bi-wrench-adjustable-circle-fill me-1 me-md-2 text-secondary"></i>Sección corregida por factores: ${S1.toFixed(2).toString().replace(".", ",")} mm² (corriente máxima: ${itemS1.corriente_maxima} A)</p>`;

      } else {
        bloqCaida += `<p class="ms-0 fs-6"><i class="bi bi-bookmark-x-fill me-1 me-md-2 text-secondary"></i>Sección sin factores de corrección: ${S1.toFixed(2).toString().replace(".", ",")} mm² (corriente máxima: ${itemS1.corriente_maxima} A)</p>`;
      }

      bloqCaida+= `<p class="d-inline-block ms-0 fs-6 text-info-emphasis bg-info-subtle rounded"><i class="bi bi-chevron-double-up me-1 me-md-2"></i>Se elige la mayor sección: ${S_final.toFixed(1).toString().replace(".", ",")} mm²</p>`;
    
      

      mostrar_resultados(bloqCaida, resultadoSeccion,mensajeAdvertencia, mensajeAdvertencia !== "", {
        corriente_ingresada: datosEntrada.corriente_proyecto,
        potencia: datosEntrada.tipoEntrada === "potencia" ? document.getElementById("potencia").value : null,
        fp: datosEntrada.tipoEntrada === "potencia" && document.getElementById("fpON").checked ? document.getElementById("fpValor").value : null,
        corriente_corregida: corrienteCorregida,
        factorTemp,
        factorAgrup,
        factorNeutro
      });
    } else {
      const resultadoSeccion = `<p class="mb-1 p-0 fs-5 fw-semibold"><i class="bi bi-check-square-fill text-success me-2"></i>
      Sección recomendada: ${itemS1.seccion_mm2} mm² (corriente máxima: ${itemS1.corriente_maxima} A)</p>`;
      mostrar_resultados(null, resultadoSeccion,"", false, {
        corriente_ingresada: datosEntrada.corriente_proyecto,
        potencia: datosEntrada.tipoEntrada === "potencia" ? document.getElementById("potencia").value : null,
        fp: datosEntrada.tipoEntrada === "potencia" && document.getElementById("fpON").checked ? document.getElementById("fpValor").value : null,
        corriente_corregida: corrienteCorregida,
        factorTemp,
        factorAgrup,
        factorNeutro
      });
    }
  } catch (error) {
    console.error("Error al cargar capacidades.json:", error);
  }
}

function obtenerFactorTemperatura(datosEntrada, por_temperatura) {
  const tipoAislacion = datosEntrada.tipo_aislacion;
  const tipoAmbiente = document.getElementById("tipoAmbiente").value;
  const temperatura = document.getElementById("temperatura").value;

  // Filtrar todos los registros que coincidan por tipo de aislación y ambiente
  const registrosFiltrados = por_temperatura.filter(item =>
    item.tipo_aislacion === tipoAislacion &&
    item.tipo_ambiente === tipoAmbiente
  );

  // Buscar coincidencia exacta con la temperatura seleccionada
  const registro = registrosFiltrados.find(item => item.temperatura == temperatura);
  
  if (!registro) {
    alert("⚠️ No se encontró un factor de corrección para la temperatura indicada.");
    return 1;
  }

  // Devolver el factor como número (reemplazando coma por punto)
  const factor = parseFloat(registro.factor_correccion_temp.toString().replace(",", "."));

  return factor;
}

function obtenerFactorAgrupamiento(datosEntrada, agrupamiento) {
  const metodo = document.getElementById("metodoAgrupamiento").value;
  let nro_circuitos = "";
  let registro = null;
  if (metodo === "unica") {
    nro_circuitos = document.getElementById("nro_circuitos1").value;
    const forma = document.getElementById("forma_agrup").value;

    registro = agrupamiento.find(entry =>
      entry.tipo_instalacion === datosEntrada.tipo_instalacion &&
      entry.metodo_agrupamiento === "unica" &&
      entry.nro_circuitos == nro_circuitos &&
      entry.forma_agrupamiento === forma
    );
 
  } else if (metodo === "multiple") {
    nro_circuitos = document.getElementById("nro_circuitos2").value;
    const camadas = document.getElementById("nro_camadas").value;

    registro = agrupamiento.find(entry =>
      entry.tipo_instalacion === datosEntrada.tipo_instalacion &&
      entry.metodo_agrupamiento === "multiple" &&
      entry.nro_circuitos == nro_circuitos &&
      entry.nro_camadas == camadas
    );

  } else if (metodo === "enterrado") {
    nro_circuitos = document.getElementById("nro_circuitos3").value;
    const separacion = document.getElementById("separacionCables").value;

    registro = agrupamiento.find(entry =>
      entry.tipo_instalacion === datosEntrada.tipo_instalacion &&
      entry.metodo_agrupamiento === "enterrado" &&
      entry.nro_circuitos == nro_circuitos &&
      entry.distancia_cables === separacion
    );

  } else if (metodo === "electroducto_enterrado") {
    nro_circuitos = document.getElementById("nro_circuitos4").value;
    const tipoCable = document.getElementById("tipoCable").value;
    const separacion = document.getElementById("separacionElectroductos").value;

    registro = agrupamiento.find(entry =>
      entry.tipo_instalacion === datosEntrada.tipo_instalacion &&
      entry.metodo_agrupamiento === "electroducto_enterrado" &&
      entry.nro_circuitos == nro_circuitos &&
      entry.tipo_cable === tipoCable &&
      entry.distancia_electroductos === separacion
    );
  }

  if (!registro) {
    alert("⚠️ No se encontró un factor de corrección por agrupamiento para la combinación seleccionada.");
    return 1;
  }

  const factor = parseFloat(registro.factor_correccion_agrup.replace(",", "."));
  return factor;
}

function calcularSeccionCaida(I_proy, L, tipoRed, criterio_ajustado, capacidadesValidas) {
  const p = 0.0175; // resistividad del cobre (ohm·mm²/m)
  let V_nominal, mult, deltaVmaximo, seccionMinima;
  
  if (tipoRed === "2") {
    V_nominal = 220;
    mult = 2;
    deltaVmaximo = 220*(criterio_ajustado/100);
    
  } else if (tipoRed === "3" || tipoRed === "4") {
    V_nominal = 380;
    mult = Math.sqrt(3);
    deltaVmaximo = 380*(criterio_ajustado/100);
    
  }
  seccionMinima =(mult * p * L * I_proy) / deltaVmaximo;
  const candidatos = capacidadesValidas.map(item => {
    return {
      seccion: parseFloat(item.seccion_mm2.toString().replace(",", ".")),
      elem: item
    };
  }).sort((a, b) => a.seccion - b.seccion);

  for (let i = 0; i < candidatos.length; i++) {
    const elementos = candidatos[i]; // obtenemos el elemento actual manualmente
    let deltaVcalculado;
    if(criterio_ajustado >= 10){
      const R = p / elementos.seccion;
      const X = 0.08 / 1000; // Reactancia típica en ohm/m
      deltaVcalculado = (mult * L * I_proy * (R * 0.3 + X * 0.954)) / elementos.seccion;
      
    }else{
      deltaVcalculado = (mult * L * I_proy * p) / elementos.seccion;

    }
    
    const caida_criterio = (deltaVcalculado / V_nominal) * 100;
    
    if (caida_criterio <= criterio_ajustado && parseFloat(elementos.elem.corriente_maxima) > I_proy && elementos.seccion >= seccionMinima ) {
      return {
        seccion: elementos.seccion,
        datos_caida : elementos.elem,
        caidaTension: caida_criterio
      };
    }
    
  }
  const ultimo = candidatos[candidatos.length - 1];
  return {
    seccion: ultimo.seccion,
    datos_caida: ultimo.elem
  };


}

function mostrar_resultados(bloqueCaida = "", bloqueResultado = "", mensajeAdvertencia = "", esError = false, extras = {}) {

  const container = document.querySelector(".container");

  const cardAntigua = document.getElementById("resultadoCard");
  if (cardAntigua) {
    cardAntigua.remove();
  }

  const cardDiv = document.createElement("div");
  cardDiv.id = "resultadoCard";

  let bloqueCorriente = ``;
  let bloqueFactores = ``;

  if (extras.corriente_ingresada && !extras.potencia && (bloqueCaida!=="" || bloqueCaida!==null)) {
    bloqueCorriente += extras.corriente_corregida !== extras.corriente_ingresada ? `<p class="fs-5 fw-medium">Comparacion de corriente</p>`: `<p class="fs-5 fw-medium">Parámetros de entrada:</p>`;

    
    bloqueCorriente += `<p class="fs-6"><i class="bi bi-arrow-right-square-fill text-info me-2"></i>Corriente ingresada: ${extras.corriente_ingresada.toFixed(2).toString().replace(".", ",")} A</p>`;
  }

  if (extras.potencia) {
    bloqueCorriente += extras.corriente_corregida !== extras.corriente_ingresada ? `<p class="fs-5 fw-medium">Comparacion de corriente</p>`: `<p class="fs-5 fw-medium">Parámetros de entrada:</p>`;

    bloqueCorriente += `<p class="fs-6"><i class="bi bi-plug-fill me-2 text-secondary"></i>Potencia ingresada: ${parseFloat(extras.potencia).toLocaleString("es-PY")} W</p>`;
    bloqueCorriente += `<p class="fs-6"><i class="bi bi-calculator me-2 text-secondary"></i>Corriente calculada: ${extras.corriente_ingresada.toFixed(2).toString().replace(".", ",")} A</p>`;
  }

  if (extras.fp) {
    bloqueCorriente += `<p class="fs-6"><i class="bi bi-speedometer me-2 text-secondary"></i>Factor de potencia: ${extras.fp.toString().replace(".", ",")}</p>`;
  }

  if ((extras.corriente_corregida!==extras.corriente_ingresada)) {
    bloqueCorriente += `<p class="fs-6"><i class="me-2 text-info bi ${extras.corriente_corregida  > extras.corriente_ingresada ? 'bi-arrow-up-square-fill' : 'bi-arrow-down-square-fill'}"></i>Corriente corregida: ${extras.corriente_corregida.toFixed(2).toString().replace(".", ",")} A</p>`;
    const aumentoPorcentual = ((extras.corriente_corregida - extras.corriente_ingresada) / extras.corriente_ingresada) * 100;
    bloqueCorriente += `<p class="fs-6">La corriente ${extras.corriente_corregida  > extras.corriente_ingresada ? 'aumento' : 'disminuyo'} un ${aumentoPorcentual.toFixed(2).toString().replace(".", ",")}% por efecto de los factores de corrección</p>`;
    if(extras.factorTemp != 1 || extras.factorAgrup != 1){
      bloqueFactores += `<p class="fs-5 fw-medium">Factores de correccion:</p>`;
      if(extras.factorTemp != 1){
      bloqueFactores += `<p class="fs-6"><i class="bi bi-thermometer-half me-2"></i>Temperatura: <span class="badge bg-info">${extras.factorTemp.toString().replace(".", ",")}</span></p>`;
      }
      if(extras.factorAgrup != 1){
      bloqueFactores += `<p class="fs-6">🪢 Agrupamiento: <span class="badge bg-info">${extras.factorAgrup.toString().replace(".", ",")}</span></p>`;
      }
      if (extras.factorNeutro && extras.factorNeutro !== 1) {
        bloqueFactores += `<p class="fs-6"><i class="bi bi-exclamation-triangle-fill text-warning me-2"></i>Neutro cargado: <span class="badge bg-info">${extras.factorNeutro.toString().replace(".", ",")}</span></p>`;
      }
      
    }else{
      if (extras.factorNeutro && extras.factorNeutro !== 1) {
        bloqueFactores += `<p class="fs-5 fw-medium">Factores de correccion:</p>`;
        bloqueFactores += `<p class="fs-6"><i class="bi bi-exclamation-triangle-fill text-warning me-2"></i>Neutro cargado: <span class="badge bg-info">${extras.factorNeutro.toString().replace(".", ",")}</span></p>`;
      }
    }

  }
  let panelCaida = "";
  let panelCorriente = "";
  let panelFactores = "";
  if (bloqueCaida !== "" && bloqueCaida !== null) {
     panelCaida = `<div class="border border-primary rounded shadow-sm bg-body-tertiary p-3">
     ${bloqueCaida}
     </div>`;
  }
  if (bloqueCorriente !== "") {
     panelCorriente = `<div class="border border-primary rounded shadow-sm bg-body-tertiary px-3 pt-3">
     ${bloqueCorriente}
     </div>`;
  }
  if (bloqueFactores !== "") {
     panelFactores = `<div class="border border-primary rounded shadow-sm bg-body-tertiary p-3">
     ${bloqueFactores}
     </div>`;
  }


  cardDiv.innerHTML = `
    <div id="resultadosCond" class="card mt-3 ${esError ? 'border-danger' : 'border-success'}">
      <div class="card-header ${esError ? 'bg-warning' : 'bg-success'} text-white fw-bold fs-4">
        ${esError ? 'Advertencia en el cálculo' : 'Resultados del cálculo'}
      </div>
      <div class="card-body p-1 d-flex flex-column justify-content-center text-start">

          ${mensajeAdvertencia || ""}
          <div class="card border-0">
          <div class="card-header text-center shadow bg-success p-2 text-dark bg-opacity-10 rounded">

            ${bloqueResultado}

          </div>
          <div class="card-body d-flex flex-column flex-xl-row gap-2 justify-content-center">
            ${panelCaida}
            ${panelCorriente}
            ${panelFactores}
            
            
          </div>

          </div>


        
      </div>
    </div>
  `;

  container.appendChild(cardDiv);
  const cardResultado = document.getElementById("resultadosCond");
if (cardResultado) {
  cardResultado.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}
}
document.getElementById("btnLimpiar").addEventListener("click", function () {
  limpiarResultadoCond();
  const formularioCond = document.getElementById("calculadoraSeccion");
  formularioCond.reset();
  const datosPot = document.getElementById("grupoPotencia");
  datosPot.classList.add("d-none");
  document.getElementById("Campcorriente").classList.remove("d-none");
  document.getElementById("corriente").disabled = false;
  datosPot.querySelectorAll("input, select").forEach(el => {
    el.disabled = true;

    if (el.type === "radio") {
      el.checked = el.defaultChecked;
      el.disabled = false;
    }
  });
  document.querySelectorAll(".ocultar").forEach(el =>{
    el.classList.add("d-none");
  })
  actualizarTemperaturas();
  resetearCampos();
  resetearCriterioCaida();




});

function limpiarResultadoCond() {
  const card = document.getElementById("resultadosCond");
  if (card) {
    card.remove(); // elimina el card de resultados si existe
  }
  
}
function ocultarResultadosAleatorio(){
  const formulario = document.getElementById("calculadoraSeccion");
  const entradas = formulario.querySelectorAll("input, select");
  entradas.forEach(elemento => {
    elemento.addEventListener("input", function(){
      if(document.getElementById("resultadoCard")){
        limpiarResultadoCond();
      }
    })
    elemento.addEventListener("change", function(){
      if(document.getElementById("resultadoCard")){
        limpiarResultadoCond();
      }
    })
  })
}
ocultarResultadosAleatorio();



