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
let limit = 30;



async function loadMorePokemon() {
    offset = offset + 30;
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

function typeCheck(index) {
    if (pokemonDetails[index]["types"].length == 1) {
        return `<img id="type" src="img/types/${fillTypes1(index)}.svg" title="${fillTypes1(index)}" alt="${fillTypes1(index)}"></img>`
    } else {
        return `<img id="type" src="img/types/${fillTypes1(index)}.svg" title="${fillTypes1(index)}" alt="${fillTypes1(index)}"></img>
                <img id="type" src="img/types/${fillTypes2(index)}.svg" title="${fillTypes2(index)}" alt="${fillTypes2(index)}"></img>`; 
    }
}

//document.getElementById("searchBox").addEventListener("input", filterPokemon());

function filterPokemon() {

    let query = document.getElementById("searchBox").value;

    if (query.length > 2) {let regExp = new RegExp(query, 'i');

    console.log(allPokemon.filter(x => regExp.test(x.name)));}
}

function openDetailView(index) {
    document.getElementById("detailView").innerHTML = fillDetailView(index);
    document.getElementById("detailView").classList.replace("isHidden", "isShown");
    document.getElementById("opaqueBackground").classList.replace("isHidden", "isShown");
}

function closeDetailView() {
    document.getElementById("detailView").classList.replace("isShown", "isHidden");
    document.getElementById("opaqueBackground").classList.replace("isShown", "isHidden");
}