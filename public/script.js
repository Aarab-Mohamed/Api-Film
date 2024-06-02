let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener("click", () => {
  if (pagina < 1000) {
    pagina += 1;
    cargarPeliculas();
  }
});

btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina -= 1;
    cargarPeliculas();
  }
});

function buscarPelicula() {
  const apiKey = "f9162d252a0cb02496f2dd406aa03bda";
  const searchInput = document.getElementById("searchInput").value;

  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}`
  )
    .then((response) => response.json())
    .then((data) => {
      cargarPeliculas(data.results);
    })
    .catch((error) => console.error("Error al buscar película:", error));
}


const cargarPeliculas = async () => {
	const apiKey = "f9162d252a0cb02496f2dd406aa03bda";
  const searchInput = document.getElementById("searchInput").value;
  try {
    const respuesta = await fetch(
		`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}&page=${pagina}`);

    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      let peliculas = "";
		
      datos.results.forEach((pelicula) => {
        peliculas += `
					<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
						<a href="https://www.themoviedb.org/movie/${pelicula.id}" target="_blank"> +Info </a>
					</div>
				`;
      });

      document.getElementById("contenedor").innerHTML = peliculas;
    } else if (respuesta.status === 401) {
      alert("Pusiste la llave mal");
    } else if (respuesta.status === 404) {
      alert("La pelicula que buscas no existe");
    } else {
      alert("Hubo un error y no sabemos que paso");
    }
  } catch (error) {
    console.log(error);
  }
};

