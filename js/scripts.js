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
  
    
    const opcion2 = campoConductores.querySelector('option[value="2"]');
  
    
    opcion2.disabled = false;
  
    
    if (tipoInstalacion === "F" && disposicionF === "Trebol") {
      opcion2.disabled = true;
      if (campoConductores.value === "2") campoConductores.value = "3";
    }
  
    
    if (tipoInstalacion === "G") {
      opcion2.disabled = true;
      if (campoConductores.value === "2") campoConductores.value = "3";
    }
  }

  document.getElementById("tipoAislacion").addEventListener("change", actualizarTemperaturas);
  function actualizarTemperaturas() {
    const tipoAislacion = document.getElementById("tipoAislacion").value;
    const selectTemperatura = document.getElementById("temperatura");
  
    
    const temperaturasProhibidasPVC = ["65", "70", "75", "80"];
  
    
    Array.from(selectTemperatura.options).forEach(option => {
      if (tipoAislacion === "PVC") {
        
        option.disabled = temperaturasProhibidasPVC.includes(option.value);
      } else {
        
        option.disabled = false;
      }
    });
    if (selectTemperatura.options[selectTemperatura.selectedIndex].disabled) {
      selectTemperatura.value = "";
    }
  }
  document.getElementById("tipoInstalacion").addEventListener("change", controlTemperatura);
  function controlTemperatura(){
     const tipoInstalacion = document.getElementById("tipoInstalacion").value;
     const select = document.getElementById("tipoAmbiente");
     const opcionSuelo = select.querySelector('option[value="suelo"]');
     const opcionAmbiente = select.querySelector('option[value="ambiente"]');

      if (tipoInstalacion === "D") {
        select.value = "";
        opcionSuelo.disabled = false;
        opcionAmbiente.disabled = true;
      } else {
        select.value= "";
        opcionSuelo.disabled = true;
        opcionAmbiente.disabled = false;
      }

  };


function validarAgrupamiento() {
  const tipoInstalacion = document.getElementById("tipoInstalacion").value;
  const metodoAgrupElem = document.getElementById("metodoAgrupamiento");
  const metodoAgrup = metodoAgrupElem.value;


  
  const formaAgrupElem = document.getElementById("forma_agrup");
  const formaAgrup = formaAgrupElem ? formaAgrupElem.value : "";
  const formaAgrupTexto = formaAgrupElem ? formaAgrupElem.options[formaAgrupElem.selectedIndex].text : "";
  const metodoAgrupTexto = document.getElementById("metodoAgrupamiento").options[document.getElementById("metodoAgrupamiento").selectedIndex].text;

  if (formaAgrup === "conjunto_al_aire_embutido_ducto"){
    if (tipoInstalacion === "D") {
      mostrarAlerta(
        `Para el tipo de instalación <strong>"D"</strong>, el <strong>"Método de agrupamiento"</strong>  debe de ser <strong>"Directamente enterrado"</strong> ó <strong>"Electroductos enterrados"</strong>`
      );
      return false;
    }
  }

  if (formaAgrup === "camada_unica_pared_piso_bandeja_cerrada" || formaAgrup === "camada_unica_en_techo"){
    if (tipoInstalacion !== "C") {
      mostrarAlerta(
        `Para la opción <strong>"${formaAgrupTexto}"</strong> en <strong>"Forma de agrupamiento"</strong>, el tipo de instalación debe ser <strong>"C"</strong>`
      );
      return false;
    }
  }

  
  if (formaAgrup === "camada_unica_bandeja_perforada" || formaAgrup === "camada_unica_parrilla_soporte"){

    if (tipoInstalacion !== "E" && tipoInstalacion !== "F") {
      mostrarAlerta(
        `Para la opción <strong>"${formaAgrupTexto}"</strong> en la <strong>"Forma de agrupamiento"</strong>, el tipo de instalación debe ser <strong>"E" o "F"</strong>`
      );
      return false;
    }
  }

  
  if (metodoAgrup === "multiple") {
    if ( tipoInstalacion !== "C" && tipoInstalacion !== "E" && tipoInstalacion !== "F"){
      mostrarAlerta(
        `Para el método de agrupamiento <strong>"${metodoAgrupTexto}"</strong> el tipo de instalación debe ser <strong>"C", "E" o "F"</strong>`
      );
      return false;
    }
  }

  
  if ( metodoAgrup === "enterrado" || metodoAgrup === "electroducto_enterrado" ){
    if (tipoInstalacion !== "D") {
      mostrarAlerta(
        `Para el método de agrupamiento <strong>"${metodoAgrupTexto}"</strong>, el tipo de instalación debe ser <strong>"D"</strong>`
      );
      return false;
    }
  }
  
  return true;
}

  



document.getElementById("forma_agrup")?.addEventListener("change", validarAgrupamiento);
document.getElementById("metodoAgrupamiento").addEventListener("change", validarAgrupamiento);
document.getElementById("tipoInstalacion").addEventListener("change", validarAgrupamiento);

function validartipoPotYred() {
  const tipoPot = document.getElementById("seleccionTipoPotencia").value;
  const tipoRed = document.getElementById("nroConductores").value;

  
  if (tipoPot === "monofasico" && tipoRed !== "2") {
    mostrarAlerta('Verifica si el campo Tipo de Potencia es igual al campo Tipo de Red');
    return false;
  }

  
  if (tipoPot === "trifasico" && tipoRed !== "3" && tipoRed !== "4") {
    mostrarAlerta('Verifica si el campo Tipo de Potencia es igual al campo Tipo de Red');
    return false;
  }

  
  return true;
}

function mostrarAlerta(mensaje, tipo = "warning") {
  
  document.querySelectorAll(".alert").forEach(alerta => alerta.remove());

  
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

function resetearCampos() {
  document.querySelectorAll("#portemperatura select, #poragrupamiento select, #porCaidaTension input[type='number']").forEach((elemento) => {
    elemento.value = "";
    elemento.disabled = true;
  });
}

function resetearCamposFactor(factor) {
  factor.querySelectorAll("select, input").forEach((elemento) => {
    elemento.value = "";
    elemento.disabled = true;
  });
}


function habilitarCamposFactor(factor) {
  factor.querySelectorAll("select, input").forEach((elemento) => {
    elemento.disabled = false;
  });
}

  const metodoAgrupamiento = document.getElementById("metodoAgrupamiento");
  const agrupamientos = {
    unica: document.querySelectorAll(".camadaUni"),
    multiple: document.querySelectorAll(".camadaMul"),
    enterrado: document.querySelectorAll(".direcEnt"),
    electroducto_enterrado: document.querySelectorAll(".electrodEnt"),
  };

  metodoAgrupamiento.addEventListener("change", function () {
    
    Object.values(agrupamientos).forEach(function (grupo) {
      grupo.forEach(function (elemento) {
        elemento.classList.add("d-none");
        resetearCamposFactor(elemento);
      });
    });

    var seleccion = metodoAgrupamiento.value;

    
    if (agrupamientos[seleccion]) {
      agrupamientos[seleccion].forEach(function (elemento) {
        elemento.classList.remove("d-none");       
        habilitarCamposFactor(elemento);
      });
    }
  });


function resetearCriterioCaida() {
  const radios = document.querySelectorAll('.criterioCaida');

  radios.forEach(radio => {
    radio.checked = (radio.id === "cd_5");
  });
}


document.getElementById("switch_seleccion").addEventListener("change", resetearCriterioCaida);
document.getElementById("switch_caidaTension").addEventListener("change", resetearCriterioCaida);





const form = document.getElementById("calculadoraSeccion");

form.addEventListener("submit", function(validacion) {
    validacion.preventDefault(); 

    if (!form.checkValidity()) { 
        form.classList.add("was-validated"); 

        
        let camposFaltantes = [];
        document.querySelectorAll("#calculadoraSeccion input:invalid, #calculadoraSeccion select:invalid").forEach(campo => {
            let label = document.querySelector(`label[for=${campo.id}]`);
            let nombreCampo = label ? label.textContent : campo.id; 
            camposFaltantes.push(nombreCampo);
        });

        
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
    return; 
  }
  
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
      corriente_proyecto = potencia / (220 * fp); 
    } else if (tipoPotencia === "trifasico") {
      corriente_proyecto = potencia / (Math.sqrt(3) * 380 * fp); 
    }
  }

  
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

async function buscarSeccion(datosEntrada) {
  try {
    
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
    
    let factorNeutro = 1;
    if (parseInt(document.getElementById("nroConductores").value)=== 4) {
      factorNeutro = 0.86;
    }
    
    const corrienteCorregida = datosEntrada.corriente_proyecto / (factorTemp * factorAgrup * factorNeutro);
    const corrientesinfactor = datosEntrada.corriente_proyecto;
   
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
    const seccionProyecto = capacidadesValidas.find(item => {
      const corriente_maxima = parseFloat(item.corriente_maxima.toString().replace(",", "."));
      return corriente_maxima > corrientesinfactor;
    });
    if (!itemS1 || !seccionProyecto) {
      const advertencia = `
        <p class="fs-6 text-danger fw-semibold text-center">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          No se encontró una sección que soporte la corriente ingresada según la tabla de capacidades de la norma INTN.
        </p>`;
      
      mostrar_resultados(advertencia, "", "", true);
      return;
    }
    let seccionOriginal = parseFloat(seccionProyecto.seccion_mm2.toString().replace(",", "."));
    let capacidadMaxCond = parseFloat(seccionProyecto.corriente_maxima.toString().replace(",", "."));
    


    let S1 = parseFloat(itemS1.seccion_mm2.toString().replace(",", "."));

    if (document.getElementById("switch_caidaTension").checked) {

      const L = parseFloat(document.getElementById("longCable").value);

      const criterio = parseInt(document.querySelector('.criterioCaida:checked').id.split("_")[1]);
      let criterio_ajustado = criterio;
      let mensajeAdvertencia ="";
      
      if (L > 100) {
        const metros_excedentes = L - 100;
        const incremento = metros_excedentes * 0.005; 
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
      const fpUsuario = parseFloat(document.getElementById("fpValor").value);
      const itemS2 = calcularSeccionCaida(datosEntrada.corriente_proyecto, L, tipoRed, criterio_ajustado, capacidadesValidas, fpUsuario);
     
      const S2 = itemS2.seccion; 
      let S_final, S_final_capacidad;

      if(S2 >= S1){
         S_final = S2;
         S_final_capacidad = itemS2.datos_caida.corriente_maxima;
      }else{
         S_final = S1;
         S_final_capacidad = itemS1.corriente_maxima;
      }
      
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
      
      if (document.getElementById("switch_agrupacion").checked || document.getElementById("switch_temperatura").checked || document.getElementById("nroConductores").value === "4" ) {
        
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
        factorNeutro,
        seccionOriginal,
        capacidadMaxCond,
        itemS1
        
      });
    } else {
      const resultadoSeccion = `<p class="mb-1 p-0 fs-5 fw-semibold"><i class="bi bi-check-square-fill text-success me-2"></i>
      Sección recomendada: ${itemS1.seccion_mm2} mm²</p>`;
      mostrar_resultados(null, resultadoSeccion,"", false, {
        corriente_ingresada: datosEntrada.corriente_proyecto,
        potencia: datosEntrada.tipoEntrada === "potencia" ? document.getElementById("potencia").value : null,
        fp: datosEntrada.tipoEntrada === "potencia" && document.getElementById("fpON").checked ? document.getElementById("fpValor").value : null,
        corriente_corregida: corrienteCorregida,
        factorTemp,
        factorAgrup,
        factorNeutro,
        seccionOriginal,
        capacidadMaxCond,
        itemS1
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

  
  const registrosFiltrados = por_temperatura.filter(item =>
    item.tipo_aislacion === tipoAislacion &&
    item.tipo_ambiente === tipoAmbiente
  );

  
  const registro = registrosFiltrados.find(item => item.temperatura == temperatura);
  
  if (!registro) {
    alert("⚠️ No se encontró un factor de corrección para la temperatura indicada.");
    return 1;
  }

  
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

function calcularSeccionCaida(I_proy, L, tipoRed, criterio_ajustado, capacidadesValidas, fpUsuario=null) {
  const rho = 0.0225;     
  const lambda = 0.00008; 
  let V_nominal, mult, deltaVmaximo;
  
  if (tipoRed === "2") {
    V_nominal = 220;
    mult = 2;
    deltaVmaximo = 220*(criterio_ajustado/100);
    
  } else if (tipoRed === "3" || tipoRed === "4") {
    V_nominal = 380;
    mult = Math.sqrt(3);
    deltaVmaximo = 380*(criterio_ajustado/100);
    
  }
  let cosPhi, senPhi, Iuso;
  if (criterio_ajustado >= 10) { 
    cosPhi = 0.35;                  
    senPhi = Math.sqrt(1 - cosPhi**2);
    Iuso = I_proy * 6;               
  } else { 
    cosPhi = fpUsuario ? fpUsuario : 0.92; 
    senPhi = Math.sqrt(1 - cosPhi**2);
    Iuso = I_proy;
  }

 
  const seccionMinima = parseInt((mult * L * Iuso * (rho * cosPhi + lambda * senPhi)) / deltaVmaximo);
  
  const candidatos = capacidadesValidas.map(item => {
    return {
      seccion: parseFloat(item.seccion_mm2.toString().replace(",", ".")),
      elem: item
    };
  }).sort((a, b) => a.seccion - b.seccion);

  for (let i = 0; i < candidatos.length; i++) {
    const elementos = candidatos[i]; 

    const R = rho / elementos.seccion;    
    const X = lambda / elementos.seccion; 

   
    const deltaVcalculado = mult * L * Iuso * (R * cosPhi + X * senPhi);

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
    bloqueCorriente += extras.corriente_corregida !== extras.corriente_ingresada ? `<p class="fs-5 fw-medium">Comparación de capacidades de conduccion</p>`: `<p class="fs-5 fw-medium">Capacidad de conducción:</p>`;

    
    bloqueCorriente += `<p class="fs-6"><i class="bi bi-arrow-right-square-fill text-info me-2"></i>Corriente ingresada: ${extras.corriente_ingresada.toFixed(2).toString().replace(".", ",")} A</p>`;
    bloqueCorriente += `<p class="fs-6">Capacidad de conducción sin factores: ${extras.capacidadMaxCond.toFixed(2).toString().replace(".", ",")} A → ${extras.seccionOriginal.toFixed(2).toString().replace(".", ",")} mm²</p>`;  
      

  }

  if (extras.potencia) {
    bloqueCorriente += extras.corriente_corregida !== extras.corriente_ingresada ? `<p class="fs-5 fw-medium">Comparación de capacidades de conduccion</p>`: `<p class="fs-5 fw-medium">Capacidad de conducción:</p>`;

    bloqueCorriente += `<p class="fs-6"><i class="bi bi-plug-fill me-2 text-secondary"></i>Potencia ingresada: ${parseFloat(extras.potencia).toLocaleString("es-PY")} W</p>`;
    bloqueCorriente += `<p class="fs-6"><i class="bi bi-calculator me-2 text-secondary"></i>Corriente calculada: ${extras.corriente_ingresada.toFixed(2).toString().replace(".", ",")} A</p>`;
    if (extras.fp) {
      bloqueCorriente += `<p class="fs-6"><i class="bi bi-speedometer me-2 text-secondary"></i>Factor de potencia: ${extras.fp.toString().replace(".", ",")}</p>`;
    } 
    bloqueCorriente += `<p class="fs-6">Capacidad de conducción sin factores: ${extras.capacidadMaxCond.toFixed(2).toString().replace(".", ",")} A → ${extras.seccionOriginal.toFixed(2).toString().replace(".", ",")} mm²</p>`;  
    
  }

  
  
  if ((extras.corriente_corregida!==extras.corriente_ingresada)) {

      bloqueCorriente += `<p class="fs-6">Capacidad reducida por factores (${(extras.factorTemp*extras.factorAgrup*extras.factorNeutro).toFixed(2).toString().replace(".", ",")} x ${extras.capacidadMaxCond.toFixed(2).toString().replace(".", ",")}) : ${(extras.capacidadMaxCond*extras.factorTemp*extras.factorAgrup*extras.factorNeutro).toFixed(2).toString().replace(".", ",")} A</p>`;
      bloqueCorriente += `<hr>`;
      bloqueCorriente += `<p class="fs-6">Sección necesaria con factores : ${extras.itemS1.seccion_mm2} mm² → ${extras.itemS1.corriente_maxima} A</p>`;
      bloqueCorriente += `<p class="fs-6">Capacidad reducida por factores (${(extras.factorTemp*extras.factorAgrup*extras.factorNeutro).toFixed(2).toString().replace(".", ",")} x ${extras.itemS1.corriente_maxima}) : ${(parseFloat(extras.itemS1.corriente_maxima)*extras.factorTemp*extras.factorAgrup*extras.factorNeutro).toFixed(2).toString().replace(".", ",")} A</p>`;
    
    
    if(extras.factorTemp != 1 || extras.factorAgrup != 1 || extras.factorNeutro !== 1){
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
       bloqueFactores += `<p class="fs-6"><i class="bi bi-gear-wide-connected me-2"></i>Factor total: <span class="badge bg-info">${(extras.factorTemp*extras.factorAgrup*extras.factorNeutro).toFixed(2).toString().replace(".", ",")}</span></p>`;
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
    card.remove(); 
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





