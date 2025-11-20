const pokemonNameInput = document.getElementById('pokemonName');
const pokemonInfoDiv = document.getElementById('pokemon-info');

async function searchPokemon() {
    const pokemonName = pokemonNameInput.value.toLowerCase();
    pokemonInfoDiv.innerHTML = ''; // Limpia la información anterior

    if (!pokemonName) {
        pokemonInfoDiv.innerHTML = '<p>Por favor, ingresa un nombre de Pokémon.</p>';
        return;
    }

    try {
        // Realiza la petición a la PokeAPI
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        // Verifica si la petición fue exitosa (código 200)
        if (!response.ok) {
            throw new Error(`Pokémon no encontrado: ${response.statusText}`);
        }

        // Convierte la respuesta a JSON
        const data = await response.json();

        // Crea los elementos para mostrar la información
        const name = document.createElement('h2');
        name.textContent = data.name.toUpperCase();

        const image = document.createElement('img');
        image.src = data.sprites.other['official-artwork'].front_default;
        image.alt = data.name;

        // Agrega los elementos al div de información
        pokemonInfoDiv.appendChild(name);
        pokemonInfoDiv.appendChild(image);

    } catch (error) {
        pokemonInfoDiv.innerHTML = `<p>Error al buscar el Pokémon: ${error.message}</p>`;
        console.error('Hubo un problema con la petición fetch:', error);
    }
}

function saveFavorite() {
    if (!currentPokemon) {
        alert("Primero busca un Pokémon.");
        return;
    }
    let favorites = JSON.parse(localStorage.getItem("favoritos")) || [];
    // Evitar duplicados
    const exists = favorites.some(p => p.name === currentPokemon.name);
    if (exists) {
        alert("Este Pokémon ya está en favoritos.");
        return;
    }
    favorites.push(currentPokemon);
    localStorage.setItem("favoritos", JSON.stringify(favorites));
    updateFavoritesList();
}