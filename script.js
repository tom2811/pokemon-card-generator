const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
};

const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");
const searchPkm = document.getElementById("searchPkm");
const pokeName = document.getElementById("poke-name"); 
const randomBtn = document.getElementById("randomBtn");

  
let getPokeData = () => {
    const pokemonName = searchPkm.value.toLowerCase().trim();
    const finalUrl = url + pokemonName;

    fetch(finalUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Pokemon not found!");
            }
            return response.json();
        })
        .then((data) => {
            generateCard(data);
        })
        .catch((error) => {
            console.error(error.message);
            displayError();
        });
};

let generateCard = (data) => {
console.log(data);
const hp = data.stats[0].base_stat;
const imgSrc = data.sprites.other.dream_world.front_default;
const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
const statAttack = data.stats[1].base_stat;
const statDefense = data.stats[2].base_stat;
const statSpeed = data.stats[5].base_stat;
const themeColor = typeColor[data.types[0].type.name];
console.log(themeColor);
card.innerHTML = `
        <p class="hp">
        <span>HP</span>
            ${hp}
        </p>
        <img src=${imgSrc} />
        <h2 class="poke-name">${pokeName}</h2>
        <div class="types">
        
        </div>
        <div class="stats">
        <div>
            <h3>${statAttack}</h3>
            <p>Attack</p>
        </div>
        <div>
            <h3>${statDefense}</h3>
            <p>Defense</p>
        </div>
        <div>
            <h3>${statSpeed}</h3>
            <p>Speed</p>
        </div>
        </div>
`;
appendTypes(data.types);
styleCard(themeColor);
};

let appendTypes = (types) => {
types.forEach((item) => {
    let span = document.createElement("SPAN");
    span.textContent = item.type.name;
    document.querySelector(".types").appendChild(span);
});
};

let styleCard = (color) => {
card.style.background = `linear-gradient(${color} 20%, #ffffff 60%`;
card.querySelectorAll(".types span").forEach((typeColor) => {
    typeColor.style.backgroundColor = color;
});
};

btn.addEventListener("click", getPokeData);
searchPkm.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        getPokeData();
    }
});

let displayError = () => {
    pokeName.innerHTML = `<p class="error-message">Pokemon not found!</p>`;
};

let getRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * 898) + 1; // There are currently 898 Pokemon

    fetch(url + randomId)
        .then((response) => response.json())
        .then((data) => {
            generateCard(data);
        })
        .catch((error) => {
            console.error(error.message);
            displayError();
        });
};

randomBtn.addEventListener("click", getRandomPokemon);
btn.addEventListener("click", () => {
    const pokemonName = searchPkm.value.toLowerCase().trim();
    getPokeData(pokemonName);
});

searchPkm.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const pokemonName = searchPkm.value.toLowerCase().trim();
        getPokeData(pokemonName);
    }
});