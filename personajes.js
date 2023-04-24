// Declaración de una constante que representa la URL base de la API de Rick and Morty
const API_URL = 'https://rickandmortyapi.com/api';

// Función que realiza una llamada a la API para obtener los personajes de una página específica
function fetchCharacters(page = 1) {
  const url = `${API_URL}/character?page=${page}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((error) => console.log(error));
}

// Función que renderiza los personajes en el DOM
function renderCharacters(characters) {
  const container = document.querySelector('#personajes');
  container.innerHTML = '';

  characters.forEach((character) => {
    let div_cont = document.createElement('div');   //div contenedor de la tarjeta
    div_cont.classList.add( "p-0", "g-0", "gy-2");

    const div_card = document.createElement('div');     //div tarjeta principal
    div_card.classList.add("card", "personaje", "p-0", "m-1", "h-100", "shadow-sm");
    div_card.id = "character" + character.id;

    let div = document.createElement('div');    //div cuerpo de la tarjeta
    div.classList.add("card-body");

    let img = document.createElement('img');    //imagen del personaje
    img.classList.add('card-img-top');
    img.alt = character.name;
    img.src = character.image;

    let h5 = document.createElement('h5');    //titulo
    h5.classList.add('card-title');
    h5.textContent = character.name;

    let p = document.createElement('p');      //Info
    p.classList.add('card-text');
    p.textContent = `${character.species} - ${character.status}`;

    div.append(h5, p);
    div_card.append(img, div);
    div_cont.append(div_card);
    container.append(div_cont);
  });

  
}

// Función que renderiza los botones de paginación en el DOM
// function renderPagination(currentPage, totalPages) {
//   const container = document.querySelector('#paginas');
//   container.innerHTML = '';

//   for (let i = 1; i <= totalPages; i++) {
//     const button = document.createElement('button');
//     button.classList.add('btn');
//     if (i === currentPage) {
//       button.classList.add('btn-primary');
//     } else {
//       button.classList.add('btn-outline-primary');
//     }
//     button.textContent = i;

//     button.addEventListener('click', () => {
//       fetchCharacters(i).then((characters) => {
//         renderCharacters(characters);
//         renderPagination(i, totalPages);
//       });
//     });

//     container.append(button);
//   }
// }

// Función que se ejecuta al cargar la página y que inicializa el estado y los eventos
function init() {
  fetchCharacters().then((characters) => {
    renderCharacters(characters);
  });

  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const gender = document.querySelector('#gender').value;
    const status = document.querySelector('#status').value;
    const species = document.querySelector('#species').value;

    let url = `${API_URL}/character?`;
    if (gender) {
      url += `gender=${gender}&`;
    }
    if (status) {
      url += `status=${status}&`;
    }
    if (species) {
      url += `species=${species}&`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        renderCharacters(data.results);
        renderPagination(1, data.info.pages);
      })
      .catch((error) => console.log(error));
  });
}

// Inicialización de la aplicación
//init();

let listaPersonajes = {};
