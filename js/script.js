const STORAGE_KEY = "tasquesKanban";

const ESTATS = {
  perFer: "Per fer",
  enCurs: "En curs",
  fet: "Fet",
};

const PRIORITATS = {
  baixa: "Baixa",
  mitjana: "Mitjana",
  alta: "Alta",
};

let tasques = [];

const form = document.querySelector("#tascaForm");
const tascaIdInput = document.querySelector("#tascaId");
const titolInput = document.querySelector("#titol");
const descripcioInput = document.querySelector("#descripcio");
const prioritatInput = document.querySelector("#prioritat");
const dataInput = document.querySelector("#dataVenciment");
const estatInput = document.querySelector("#estat");
const errorTitol = document.querySelector("#errorTitol");
const submitButton = document.querySelector("#submitButton");
const cancelEditButton = document.querySelector("#cancelEditButton");
const filtreEstat = document.querySelector("#filtreEstat");
const filtrePrioritat = document.querySelector("#filtrePrioritat");
const cercaInput = document.querySelector("#cerca");
const netejarFiltresButton = document.querySelector("#netejarFiltres");
const resultatsFiltre = document.querySelector("#resultatsFiltre");

function carregarTasques() {
  const dades = localStorage.getItem(STORAGE_KEY);
  if (!dades) {
    return [];
  }

  try {
    return JSON.parse(dades);
  } catch (error) {
    console.error("No s'han pogut carregar les tasques:", error);
    return [];
  }
}

function guardarTasques(llistaTasques) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(llistaTasques));
}

function crearId() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

function obtenirFiltres() {
  return {
    estat: filtreEstat.value,
    prioritat: filtrePrioritat.value,
    cerca: cercaInput.value.trim().toLowerCase(),
  };
}

function getTasquesFiltrades(llistaTasques, filtres) {
  return llistaTasques.filter((tasca) => {
    const coincideixEstat = filtres.estat === "tots" || tasca.estat === filtres.estat;
    const coincideixPrioritat = filtres.prioritat === "totes" || tasca.prioritat === filtres.prioritat;
    const text = `${tasca.titol} ${tasca.descripcio}`.toLowerCase();
    const coincideixCerca = !filtres.cerca || text.includes(filtres.cerca);
    return coincideixEstat && coincideixPrioritat && coincideixCerca;
  });
}

function escaparHtml(text) {
  const element = document.createElement("span");
  element.textContent = text;
  return element.innerHTML;
}

function formatarData(dataIso) {
  if (!dataIso) {
    return "Sense data limit";
  }

  return new Intl.DateTimeFormat("ca-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${dataIso}T00:00:00`));
}

function renderTauler(llistaTasques = tasques) {
  Object.keys(ESTATS).forEach((estat) => {
    const columna = document.querySelector(`#column-${estat}`);
    const tasquesEstat = llistaTasques.filter((tasca) => tasca.estat === estat);
    document.querySelector(`#count-${estat}`).textContent = tasquesEstat.length;

    if (tasquesEstat.length === 0) {
      columna.innerHTML = '<p class="empty-state">Cap tasca</p>';
      return;
    }

    columna.innerHTML = tasquesEstat.map((tasca) => crearTargetaTasca(tasca)).join("");
  });

  resultatsFiltre.textContent = `${llistaTasques.length} tasques visibles`;
}

function crearTargetaTasca(tasca) {
  const descripcio = tasca.descripcio || "Sense descripcio";

  return `
    <article class="task-card priority-${tasca.prioritat}" data-id="${tasca.id}">
      <h4>${escaparHtml(tasca.titol)}</h4>
      <p>${escaparHtml(descripcio)}</p>
      <div class="task-meta">
        <span class="tag ${tasca.prioritat}">${PRIORITATS[tasca.prioritat]}</span>
        <span class="tag due-date">${formatarData(tasca.dataVenciment)}</span>
      </div>
      <label class="card-status" for="estat-${tasca.id}">Moure a</label>
      <select id="estat-${tasca.id}" class="status-select" data-action="canviar-estat" data-id="${tasca.id}">
        ${Object.entries(ESTATS)
          .map(([valor, etiqueta]) => `<option value="${valor}" ${tasca.estat === valor ? "selected" : ""}>${etiqueta}</option>`)
          .join("")}
      </select>
      <div class="task-actions">
        <button class="secondary-button" type="button" data-action="editar" data-id="${tasca.id}">Editar</button>
        <button class="danger-button" type="button" data-action="eliminar" data-id="${tasca.id}">Eliminar</button>
      </div>
    </article>
  `;
}

function renderEstadistiques() {
  const total = tasques.length;
  const perFer = tasques.filter((tasca) => tasca.estat === "perFer").length;
  const enCurs = tasques.filter((tasca) => tasca.estat === "enCurs").length;
  const fet = tasques.filter((tasca) => tasca.estat === "fet").length;
  const percent = total === 0 ? 0 : Math.round((fet / total) * 100);

  document.querySelector("#statTotal").textContent = total;
  document.querySelector("#statPerFer").textContent = perFer;
  document.querySelector("#statEnCurs").textContent = enCurs;
  document.querySelector("#statFet").textContent = fet;
  document.querySelector("#statPercent").textContent = `${percent}%`;
}

function actualitzarInterficie() {
  const filtrades = getTasquesFiltrades(tasques, obtenirFiltres());
  renderTauler(filtrades);
  renderEstadistiques();
}

function validarFormulari() {
  const titol = titolInput.value.trim();
  if (!titol) {
    errorTitol.textContent = "El titol es obligatori.";
    titolInput.focus();
    return false;
  }

  errorTitol.textContent = "";
  return true;
}

function netejarFormulari() {
  form.reset();
  tascaIdInput.value = "";
  submitButton.textContent = "Afegir tasca";
  cancelEditButton.classList.add("hidden");
  errorTitol.textContent = "";
}

function llegirTascaDelFormulari() {
  return {
    titol: titolInput.value.trim(),
    descripcio: descripcioInput.value.trim(),
    prioritat: prioritatInput.value,
    dataVenciment: dataInput.value,
    estat: estatInput.value,
  };
}

function desarCanvisTasca(event) {
  event.preventDefault();

  if (!validarFormulari()) {
    return;
  }

  const dadesTasca = llegirTascaDelFormulari();
  const idEditant = tascaIdInput.value;

  if (idEditant) {
    tasques = tasques.map((tasca) => (tasca.id === idEditant ? { ...tasca, ...dadesTasca } : tasca));
  } else {
    tasques.push({
      id: crearId(),
      ...dadesTasca,
      creatEl: new Date().toISOString(),
    });
  }

  guardarTasques(tasques);
  netejarFormulari();
  actualitzarInterficie();
}

function editarTasca(id) {
  const tasca = tasques.find((item) => item.id === id);
  if (!tasca) {
    return;
  }

  tascaIdInput.value = tasca.id;
  titolInput.value = tasca.titol;
  descripcioInput.value = tasca.descripcio;
  prioritatInput.value = tasca.prioritat;
  dataInput.value = tasca.dataVenciment;
  estatInput.value = tasca.estat;
  submitButton.textContent = "Guardar canvis";
  cancelEditButton.classList.remove("hidden");
  titolInput.focus();
}

function eliminarTasca(id) {
  const tasca = tasques.find((item) => item.id === id);
  if (!tasca) {
    return;
  }

  const confirmat = confirm(`Vols eliminar la tasca "${tasca.titol}"?`);
  if (!confirmat) {
    return;
  }

  tasques = tasques.filter((item) => item.id !== id);
  guardarTasques(tasques);
  actualitzarInterficie();
}

function canviarEstat(id, nouEstat) {
  tasques = tasques.map((tasca) => (tasca.id === id ? { ...tasca, estat: nouEstat } : tasca));
  guardarTasques(tasques);
  actualitzarInterficie();
}

function gestionarClicsTauler(event) {
  const element = event.target;
  const id = element.dataset.id;
  const action = element.dataset.action;

  if (!action || !id || action === "canviar-estat") {
    return;
  }

  if (action === "editar") {
    editarTasca(id);
  }

  if (action === "eliminar") {
    eliminarTasca(id);
  }

}

function gestionarCanvisTauler(event) {
  const element = event.target;
  const id = element.dataset.id;

  if (element.dataset.action === "canviar-estat" && id) {
    canviarEstat(id, element.value);
  }
}

function netejarFiltres() {
  filtreEstat.value = "tots";
  filtrePrioritat.value = "totes";
  cercaInput.value = "";
  actualitzarInterficie();
}

function inicialitzarApp() {
  tasques = carregarTasques();
  form.addEventListener("submit", desarCanvisTasca);
  cancelEditButton.addEventListener("click", netejarFormulari);
  netejarFiltresButton.addEventListener("click", netejarFiltres);
  filtreEstat.addEventListener("change", actualitzarInterficie);
  filtrePrioritat.addEventListener("change", actualitzarInterficie);
  cercaInput.addEventListener("input", actualitzarInterficie);
  document.querySelector("#kanbanBoard").addEventListener("click", gestionarClicsTauler);
  document.querySelector("#kanbanBoard").addEventListener("change", gestionarCanvisTauler);
  actualitzarInterficie();
}

document.addEventListener("DOMContentLoaded", inicialitzarApp);
