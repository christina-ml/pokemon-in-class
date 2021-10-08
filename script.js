/* Made code dynamic by fetching based on what pokemon name you put in function */
function fetchPokemonDetails(pokemonName, shouldAddToRecent) {

    let errMessage = document.querySelector("#error-message");
    if( pokemonName !== "default" ){
        // console.log(selectedPokemon);
        errMessage.textContent = ""; // erases the error message
        fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
            .then((res)=>res.json())
            .then((data)=>{
                /* use accumulator pattern */
                let hp; // HP
                let atk; // Atk
                let def;  // Def

                for (let statObj of data.stats){
                    if (statObj.stat.name === "hp"){
                        hp = statObj.base_stat;
                    } else if (statObj.stat.name === "attack"){
                        atk = statObj.base_stat;
                    } else if (statObj.stat.name === "defense"){
                        def = statObj.base_stat;
                    }
                }

                // console.log(hp); // HP
                // console.log(atk); // Atk
                // console.log(def); // Def

                let details = document.querySelector("#details");

                /* One-liner vs. writing it out */
                // let typeStr = data.types.map((typeEl)=>typeEl.type.name).join("/");
                let typeStr = data.types.map((typeEl)=>{
                    return typeEl.type.name;
                }).join("/");

                /* creating a template literal using interpolation for the URL to be dynamic */
                details.innerHTML = `
                    <div id="details-title">
                        <h2>Details</h2>
                    </div>
                    <div id="details-img-container">
                        <img src="${data.sprites.front_default}" alt="Image of selected Pokémon" />
                    </div>
                    <div id="details-text">
                        <div id="details-name">Name: ${data.name}</div>
                        <div id="details-species">Species: ${typeStr}</div>
                        <div id="details-weight">Weight: ${data.weight} hectograms</div>
                        <div id="details-height">Height: ${data.height} decimeters</div>
                    </div>
                    <div id="details-sub-text">
                        <h3>Base Attributes</h3>
                        <div>Hit Points: ${hp}</div>
                        <div>Attack: ${atk}</div>
                        <div>Defense: ${def}</div>  
                    </div>`
                    // <div id="details-action">
                    //     <!-- button that's not in a form -->
                    //     <button>Add -></button>
                    // </div>`


                /* IF add to recent is true, add this code/add to recent list.
                If false, skip it completely */
                if(shouldAddToRecent){
                    let recentList = document.querySelector("#recent-list");
                    // <div class="recent-list-items">
                    //     <img src="https://static.pokemonpets.com/images/monsters-images-800-800/147-Dratini.webp" alt="Evolution version image" />
                    //     <div>Dratini</div>
                    // </div>
    
                    let recentListItem = document.createElement("div");
                    recentListItem.classList.add("recent-list-item");
    
                    let recentListImg = document.createElement("img");
                    recentListImg.src = data.sprites.front_default;
                    recentListImg.alt = "evolution version image";
                    
                    let nameDiv = document.createElement("div");
                    nameDiv.textContent = data.name;
    
                    /* Make recent list item NAME (only) clickable */
                    nameDiv.addEventListener("click", (event)=>{
                        // console.log(event);
                        fetchPokemonDetails(event.target.textContent, false); // change details
                    });
    
                    recentListItem.append(recentListImg, nameDiv);
    
                    recentList.append(recentListItem);
                }


                // let currentPokemonEl = document.querySelector("#current-pokemon");

                // let img = document.createElement("img");
                // img.src = data.sprites["front_default"];
                
                // currentPokemonEl.append(img);
            });
        } else {
        errMessage.textContent = "Please choose a Pokémon!";
    }
}

fetch("https://pokeapi.co/api/v2/pokemon?limit=30")
    .then((res)=>{
        return res.json();
    }).then((data)=>{
        let pokemonList = data.results;
        for(let pokemon of pokemonList){
            /* Destructuring - extracted name from object, instead of using `pokemon.name` can just use `name` */
            let { name } = pokemon;
            let select = document.querySelector("#pokemon-selector select");
            
            /////////////////// Option
            let newOption = document.createElement("option");
            newOption.textContent = name[0].toUpperCase() + name.slice(1);
            newOption.value = name;
            /////////////////// Option
            
            select.append(newOption);
        }
    }).catch((err)=>{
        console.log(err);
    });

    let form = document.querySelector("form#pokemon-selector");

    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        let selectedPokemon = e.target["pokemon-select"].value;
        // console.log("https://pokeapi.co/api/v2/pokemon/" + selectedPokemon)
       
            /* REMOVED CODE FROM HERE TO MAKE HELPER FUNCTION (Above)
                Moved code into another function.
            */
            /* Passing in the name of the selected pokemon */
            fetchPokemonDetails(selectedPokemon, true); // passing in string

        // console.log(selectedPokemon);
    });


/* START - Add to team button */
let addToTeamButton = document.querySelector("#add-to-team");

addToTeamButton.addEventListener("click", ()=>{
    let currentPokemonName = document.querySelector("#details-name").textContent;
    console.log(currentPokemonName);
    // let currentPokemonImg;
})
/* END - Add to team button */