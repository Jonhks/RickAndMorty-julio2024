const root = document.getElementById("root");
const mujeres = document.getElementById("mujeres");
const hombres = document.getElementById("hombres");
const todos = document.getElementById("todos");
const contenedor = document.getElementById("contenedor");
const totalPersonajes = document.getElementById("total-personajes");

// ? Paginator
const paginaActual = document.getElementById("pagina-actual");
const totalPaginas = document.getElementById("total-paginas");

let pagina = 1;

const getData = async () => {
  const url = `https://rickandmortyapi.com/api/character`;
  const resp = await fetch(url);
  const json = await resp.json();
  data = await json;
  const pages = json.info.pages;
  paginaActual.innerHTML = pagina;
  totalPaginas.innerHTML = pages;
  printData(json.results);
};

let data = {};

const printData = (arr) => {
  contenedor.classList.remove("esconder");
  setTimeout(() => {
    contenedor.classList.add("esconder");
  }, 700);
  totalPersonajes.innerHTML = arr.length;
  // let card = "";
  // arr.forEach((personaje) => {
  //   const { image, name, gender, species, status, location, origin } =
  //     personaje;
  //   card =
  //     card +
  //     `<div class="col s12 m6 l3">
  //       <div class="card">
  //         <div class="card-image">
  //           <img src=${image}>
  //         </div>
  //         <div class="card-content">
  //           <p>Nombre: ${name}</p>
  //           <p>Genero: ${gender}</p>
  //           <p>Species: ${species}</p>
  //           <p>Status: ${status}</p>
  //           <p>Origen: ${origin.name} </p>
  //           <p>Locación: ${location.name}</p>
  //         </div>
  //         <div class="card-action">
  //           <a href="#">Ver más</a>
  //         </div>
  //       </div>
  //     </div>`;
  // });
  const card = arr.reduce(
    (acum, current) =>
      acum +
      `<div class="col s12 m6 l3">
        <div class="card">
          <div class="card-image">
            <img src=${current.image}>
          </div>
          <div class="card-content">
            <p>Nombre: ${current.name}</p>
            <p>Genero: ${current.gender}</p>
            <p>Species: ${current.species}</p>
            <p>Status: ${current.status}</p>
            <p>Origen: ${current.origin.name} </p>
            <p>Locación: ${current.location.name}</p>
          </div>
          <div class="card-action">
            <a href="#">Ver más</a>
          </div>
        </div>
      </div>`,
    ""
  );
  root.innerHTML = card;
};

mujeres.addEventListener("click", () => {
  const arr = data.results;
  let arrMujeres = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "Female") {
      arrMujeres.push(arr[i]);
    }
  }
  printData(arrMujeres);
});

hombres.addEventListener("click", () => {
  const arrHombres = data.results.filter(
    (personaje) => personaje.gender === "Male"
  );
  printData(arrHombres);
});

todos.addEventListener("click", () => {
  printData(data.results);
});

getData();
