# Issues Scrum del projecte Kanban DAW06

Aquest document recull el contingut preparat per crear les 5 issues del projecte a GitHub.

## Issue 1 - Inicialització del projecte i estructura base

**Objectiu:** deixar el repositori preparat, amb l'esquelet HTML/CSS/JS i rutes correctes per funcionar en local i a GitHub Pages.

### Tasques

- [x] Crear repositori local i primer commit amb estructura mínima:
  - `index.html`
  - `css/estils.css`
  - `js/script.js`
  - `img/`
  - `README.md`
- [x] Estructurar `index.html` amb etiquetes semàntiques: `header`, `main`, `section`, `aside` i `footer`.
- [x] Afegir el layout base amb formulari de tasques, zona de filtres/cerca i tauler Kanban.
- [x] Crear les tres columnes: Per fer, En curs i Fet.
- [x] Enllaçar correctament `css/estils.css` i `js/script.js`.
- [x] Afegir `.gitignore`.
- [x] Fer commit descriptiu inicial.

### Criteris d'acceptació

- [x] El projecte obre en local i mostra el formulari i les 3 columnes.
- [x] Les rutes són relatives i funcionen a GitHub Pages.

---

## Issue 2 - Model de dades i persistència amb localStorage

**Objectiu:** definir l'estructura de la tasca i garantir que es desa i es recupera correctament.

### Tasques

- [x] Definir el model de tasca amb:
  - `id`
  - `titol`
  - `descripcio`
  - `prioritat`
  - `dataVenciment`
  - `estat`
  - `creatEl`
- [x] Crear la funció `carregarTasques()` per llegir de `localStorage`.
- [x] Crear la funció `guardarTasques(tasques)` per desar a `localStorage`.
- [x] Utilitzar una clau clara: `tasquesKanban`.
- [x] Inicialitzar l'aplicació carregant les tasques desades.

### Criteris d'acceptació

- [x] Les tasques es mantenen després de recarregar la pàgina.
- [x] `localStorage` conté la clau `tasquesKanban`.

---

## Issue 3 - CRUD complet de tasques i renderització del Kanban

**Objectiu:** afegir, editar i eliminar tasques, i pintar-les al DOM en la columna correcta.

### Tasques

- [x] Implementar la creació de tasques des del formulari.
- [x] Validar que el títol sigui obligatori.
- [x] Implementar l'edició de tasques.
- [x] Preomplir el formulari quan es prem `Editar`.
- [x] Canviar el botó del formulari a `Guardar canvis` durant l'edició.
- [x] Implementar l'eliminació amb confirmació.
- [x] Crear la funció `renderTauler(tasques)` per pintar columnes i targetes.
- [x] Diferenciar visualment les tasques segons la prioritat.
- [x] Afegir un selector per canviar l'estat de cada tasca.
- [x] Actualitzar `localStorage` després de cada canvi.

### Criteris d'acceptació

- [x] Es poden crear, editar i eliminar tasques.
- [x] Els canvis es reflecteixen immediatament al tauler.
- [x] Les tasques apareixen a la columna corresponent segons el seu estat.
- [x] Cada canvi actualitza `localStorage`.

---

## Issue 4 - Filtres, cerca i estadístiques

**Objectiu:** afegir eines de productivitat i un resum numèric fiable.

### Tasques

- [x] Afegir filtre per estat: Per fer, En curs i Fet.
- [x] Afegir filtre per prioritat: baixa, mitjana i alta.
- [x] Afegir cerca de text sobre títol i descripció.
- [x] Fer que la cerca no distingeixi majúscules i minúscules.
- [x] Crear la funció `getTasquesFiltrades(tasques, filtres)`.
- [x] Mostrar el nombre total de tasques.
- [x] Mostrar el nombre de tasques per estat.
- [x] Mostrar el percentatge de tasques completades.
- [x] Actualitzar estadístiques quan canvien les dades.

### Criteris d'acceptació

- [x] Els filtres i la cerca es poden combinar.
- [x] Les estadístiques globals coincideixen amb les tasques existents.
- [x] El tauler mostra només les tasques que compleixen els filtres actius.

---

## Issue 5 - Responsive, Git flow i desplegament + documentació final i PDF

**Objectiu:** acabar el producte, desplegar-lo i deixar evidència documental.

### Tasques

- [x] Fer el disseny responsiu amb Grid/Flexbox.
- [x] Apilar les columnes en vertical en pantalles petites.
- [x] Fer que el formulari i els filtres siguin accessibles en mòbil.
- [x] Preparar README complet amb:
  - descripció del projecte
  - guia d'ús
  - estructura de carpetes
  - enllaç al repositori
  - enllaç a GitHub Pages
  - captura de pantalla
- [x] Preparar PDF del procés.
- [x] Incloure al PDF els enllaços del repositori i GitHub Pages.
- [x] Explicar el procés pas a pas seguint les 5 issues.
- [x] Pujar el projecte a GitHub.
- [ ] Activar GitHub Pages des de `Settings > Pages`.
- [ ] Validar que la URL pública funciona correctament.

### Criteris d'acceptació

- [x] La web és usable en pantalles petites.
- [x] El README està complet.
- [x] El PDF està creat i alineat amb les issues.
- [x] El repositori està pujat a GitHub.
- [ ] GitHub Pages funciona i l'enllaç públic està operatiu.
