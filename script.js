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
        let errMessage = document.querySelector("#error-message");
        if( selectedPokemon !== "default" ){
            console.log(selectedPokemon);
            errMessage.textContent = ""; // erases the error message
            fetch("https://pokeapi.co/api/v2/pokemon/" + selectedPokemon)
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

                    console.log(hp); // HP
                    console.log(atk); // Atk
                    console.log(def); // Def

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
                        <div id="details-weight">Weight: ${data.weight}lbs.</div>
                        <div id="details-height">Height: ${data.height}ft.</div>
                    </div>
                    <div id="details-sub-text">
                        <h3>Base Attributes</h3>
                        <div>Hit Points: ${hp}</div>
                        <div>Attack: ${atk}</div>
                        <div>Defense: ${def}</div>  
                    </div>
                    <div id="details-action">
                        <!-- button that's not in a form -->
                        <button>Add -></button>
                    </div>`
                    // let currentPokemonEl = document.querySelector("#current-pokemon");

                    // let img = document.createElement("img");
                    // img.src = data.sprites["front_default"];
                    
                    // currentPokemonEl.append(img);
                });
        } else {
            errMessage.textContent = "Please choose a Pokémon!";
        }

        // console.log(selectedPokemon);
    });