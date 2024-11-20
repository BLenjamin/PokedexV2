function pokemonCard(index) {
    return `<div id="pokemonCard" onclick="openDetailView(${index})" class="${fillTypes1(index)}">
    <div id="upperSection">
        <span id="pokeID">#${pokemonDetails[index].id}</span>
        <h2>${capitalizeFirstLetter(pokemonDetails[index].name)}</h2>
        <div></div>
    </div>
        <img id="pokePic" src="${pokemonDetails[index].sprites.other.showdown.front_default}" alt="Pokepic">
        <div id="lowerSection">
            <span id="pokeText">${flavorTexts[index].flavor_text}</span>
            <div id="elements">
                <div id="element1" class="element ${fillTypes1(index)}">${fillTypes1(index)}</div>
                <div id="element2" class="element ${fillTypes2(index)}">${fillTypes2(index)}</div>
            </div>
        </div>
</div>`
}

function capitalizeFirstLetter(string) {
    let newString = string.charAt(0).toUpperCase() + string.slice(1);
    return newString;
}

function fillDetailView(index) {
    return `<div class="innerDetailWrapper ${fillTypes1(index)}">
        <div id="detailUpperSection">
            <span id="detailPokeID">#${pokemonDetails[index].id}</span>
            <h2>${capitalizeFirstLetter(pokemonDetails[index].name)}</h2>
            <div class="closeButton" onclick="closeDetailView()">X</div>
        </div>
        <div id="detailMidSection">
            <img id="detailPokePic" src="${pokemonDetails[index].sprites.other.home.front_default}" alt="Pokepic">
        </div>
        <span id="detailPokeText">${flavorTexts[index].flavor_text}</span>
        <div id="detailLowerSection">
            <div id="elements">
                <div id="detailElement1" class="element ${fillTypes1(index)}">${fillTypes1(index)}</div>
                <div id="detailElement2" class="element ${fillTypes2(index)}">${fillTypes2(index)}</div>
            </div>
        </div>
</div>`
}




/*function createElements(index) {
    if (pokemonDetails[index]["types"].length == 1) {
    document.getElementById("elements").innerHTML = `<div class="element" id="element_${filltypes1(index)}">
    </div>`
    } else {
        document.getElementById("elements").innerHTML = `<div class="element" id="element_${fillTypes1(index)}">
        </div>
        <div class="element" id="element_${fillTypes2(index)}">
        </div>`
    }
}*/