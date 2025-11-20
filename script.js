let currentPokemon = null;

// Buscar Pokémon
function searchPokemon() {
    const name = document.getElementById("pokemonInput").value.toLowerCase();

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(res => {
        if (!res.ok) throw new Error("No encontrado");
        return res.json();
    })
    .then(data => {
        currentPokemon = {
            name: data.name,
            img: data.sprites.front_default
        };

        document.getElementById("resultado").innerHTML = `
            <h3>${currentPokemon.name}</h3>
            <img src="${currentPokemon.img}">
        `;

        document.getElementById("btnFav").disabled = false;
    })
    .catch(() => {
        alert("Pokemon no encontrado");
        currentPokemon = null;
        document.getElementById("btnFav").disabled = true;
        document.getElementById("resultado").innerHTML = "";
    });
}

// Guardar favorito
function saveFavorite() {
    if (!currentPokemon) return;
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const existe = favoritos.some(p => p.name === currentPokemon.name);
    if (!existe) favoritos.push(currentPokemon);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    updateFavoritesList();
}

// Eliminar un favorito
function deleteFavorite(name) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    favoritos = favoritos.filter(p => p.name !== name);

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    updateFavoritesList();
}

// Borrar todos los favoritos
function clearAllFavorites() {
    localStorage.removeItem("favoritos");
    updateFavoritesList();
}

// Mostrar favoritos
function updateFavoritesList() {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const contenedor = document.getElementById("favoritos");

    contenedor.innerHTML = "";

    favoritos.forEach(poke => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p>${poke.name}</p>
            <img src="${poke.img}">
            <button class="btnEliminar" onclick="deleteFavorite('${poke.name}')">Eliminar</button>
        `;
        contenedor.appendChild(div);
    });
}
// Cargar favoritos al iniciar
updateFavoritesList();