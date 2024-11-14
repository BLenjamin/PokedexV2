let allPokemon = [];
let allPokemonURL = [];
let pokemonDetails =  [];
let flavorTexts = [];

async function init() {
    await fetchURLs();
    pokemonDetails = await mapThroughURLs();
    await fetchFlavorTexts();
    console.log(pokemonDetails);
    fillCards();
}

const BASE_URL = "https://pokeapi.co/api/v2/"
//const BASE_URL2 = "https://pokeapi.co/api/v2/pokemon-species/"

async function fetchURLs(path = "") {
    let response = await fetch(BASE_URL + "pokemon?offset=45&limit=25" + path + ".json");
    let responseAsJson = await response.json();
    let pokemonData = responseAsJson.results;

    pokemonData.forEach(pokemon => {
        allPokemon.push(pokemon.name);
        allPokemonURL.push(pokemon.url);
    });
}

async function mapThroughURLs() {
    let pokemonData = [];

    for (let i = 0; i < allPokemonURL.length; i++) {
        let data = await fetchPokemonDetails(i);
        pokemonData.push(data);
    }
    return pokemonData;
}

async function fetchPokemonDetails(index) {
    let response = await fetch(allPokemonURL[index]);
    let fetchedData = await response.json();

    return fetchedData;
}

async function fetchFlavorTexts() {
    let texts = [];

    for (let i = 0; i < pokemonDetails.length; i++) {
        let speciesURL = pokemonDetails[i].species.url;
        let response = await fetch(speciesURL);
        let speciesData = await response.json();
        let flavorText = speciesData.flavor_text_entries[0].flavor_text;
        let cleanFlavor = flavorText.replace(/\n/g, ' ').replace(/\f/g, ' ');

        texts.push({
            name: pokemonDetails[i].name,
            flavor_text: cleanFlavor
        });
    }

    flavorTexts = texts;
}


async function fillCards() {
    for (let i = 0; i < pokemonDetails.length; i++) {
        document.getElementById("content").innerHTML += pokemonCard(i);
    }
}

function fillTypes1(index) {
    return pokemonDetails[index]["types"][0]["type"]["name"];
}

function fillTypes2(index) {
    if (pokemonDetails[index]["types"].length == 1)  {
        return "noSecondElement";   
    } else {
       return pokemonDetails[index]["types"][1]["type"]["name"];
    }
}

function findSprite(index) {
    let pokemonImg = pokemonDetails[index]["sprites"]["other"]["showdown"]["front_shiny"];
    return pokemonImg;
}

function filterPokemon(query) {
    currentPokemon = allPokemon.filter(name => name.includes(query))
    renderPokemon();
}
