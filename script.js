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

//     let form = document.querySelector("form");

//     form.addEventListener("submit", (e)=>{
//         e.preventDefault();
//         let selectedPokemon = e.target["pokemon-select"].value;

//         // console.log("https://pokeapi.co/api/v2/pokemon/" + selectedPokemon)
//         let errMessage = document.querySelector("#error-message");
//         if( selectedPokemon !== "default" ){
//             errMessage.textContent = "";
//             fetch("https://pokeapi.co/api/v2/pokemon/" + selectedPokemon)
//                 .then((res)=>res.json())
//                 .then((data)=>{
//                     let currentPokemonEl = document.querySelector("#current-pokemon");

//                     let img = document.createElement("img");
//                     img.src = data.sprites["front_default"];
                    
//                     currentPokemonEl.append(img);
//                 });
//         } else {
//             errMessage.textContent = "Please select a Pokemon!";
//         }

//         // console.log(selectedPokemon);
//     });