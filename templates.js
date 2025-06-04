function pokemonCard(index) {
    return `<div id="pokemonCard" onclick="openDetailView(${index})" class="${fillTypes1(index)}">
    <div id="upperSection">
        <span id="pokeID">#${pokemonDetails[index].id}</span>
        <h2>${capitalizeFirstLetter(pokemonDetails[index].name)}</h2>
        <div></div>
    </div>
        <img id="pokePic" src="${pokemonDetails[index].sprites.other.home.front_default}" alt="Pokepic">
        <div id="lowerSection">
            <span id="pokeText">${flavorTexts[index].flavor_text}</span>
            <div id="elements">
                ${typeCheck(index)}
            </div>
        </div>
</div>`
}

//<div id="element1" class="element ${fillTypes1(index)}">${fillTypes1(index)}</div>
//                <img id="type" src="img/types/${fillTypes1(index)}.svg" alt="${fillTypes1(index)}">
//                
//                <div id="element2" class="element ${fillTypes2(index)}">${fillTypes2(index)}</div>
//                <img id="type" src="img/types/${fillTypes2(index)}.svg" alt="${fillTypes2(index)}">




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
                ${typeCheck(index)}
            </div>
        </div>
</div>`
}

//<div id="detailElement1" class="element ${fillTypes1(index)}">${fillTypes1(index)}</div>
//                <div id="detailElement2" class="element ${fillTypes2(index)}">${fillTypes2(index)}</div>

