let allPokemon = [];
let allPokemonURL = [];
let pokemonDetails = [];
let flavorTexts = [];
let currentPokemon = [];

async function init() {
    await fetchAllPokemonNames();
    await fetchURLs();
    pokemonDetails = await mapThroughURLs();
    await fetchFlavorTexts();
    fillCards();
}

const BASE_URL = "https://pokeapi.co/api/v2/"

let offset = 0;
let limit = 15;

async function loadMorePokemon() {
    offset = offset + 15;
    await fetchURLs();
    pokemonDetails = await mapThroughURLs();
    await fetchFlavorTexts();
    fillMoreCards();
}

async function fetchAllPokemonNames(path = "") {
    let response = await fetch(BASE_URL + "pokemon?offset=" + 0 + "&limit=" + 151 + path + ".json");
    let responseAsJson = await response.json();
    let pokemonData = responseAsJson.results;

    pushAllPokemonNames(pokemonData);
}

async function fetchURLs(path = "") {
    let response = await fetch(BASE_URL + "pokemon?offset=" + offset + "&limit=" + limit + path + ".json");
    let responseAsJson = await response.json();
    let pokemonData = responseAsJson.results;

    pushPokemonURL(pokemonData);
}

function pushPokemonURL(pokemonData) {
    pokemonData.forEach(pokemon => {
        allPokemonURL.push(pokemon.url);
    })
}

function pushAllPokemonNames(pokemonData) {
    pokemonData.forEach(pokemon => {
        allPokemon.push({
            name: pokemon.name,
        })
    })
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
    for (let i = offset; i < pokemonDetails.length; i++) {
        document.getElementById("content").innerHTML += pokemonCard(i);
    }
}

async function fillMoreCards() {
    for (let i = offset; (i < offset + limit) && (i < 151); i++) {
        document.getElementById("content").innerHTML += pokemonCard(i);
    }
}

function fillTypes1(index) {
    return pokemonDetails[index]["types"][0]["type"]["name"];
}

function fillTypes2(index) {
    if (pokemonDetails[index]["types"].length == 1) {
        return "noSecondElement";
    } else {
        return pokemonDetails[index]["types"][1]["type"]["name"];
    }
}

//function findSprite(index) {
//    let pokemonImg = pokemonDetails[index]["sprites"]["other"]["showdown"]["front_shiny"];
//    return pokemonImg;
//}

function filterPokemon() {
    let query = document.getElementById("searchBox").value;
    currentPokemon = allPokemon.filter(name => name.includes(query));
    console.log(currentPokemon);
}

function openDetailView(index) {
    document.getElementById("detailView").innerHTML = fillDetailView(index)
    document.getElementById('detailView').classList.replace("isHidden", "isShown");
}

function closeDetailView() {
    document.getElementById('detailView').classList.replace("isShown", "isHidden");
}