
function getCharInfo() {
    const charNameInput = document.getElementById('charName');
    const charInfo = document.getElementById('charInfo');

    const charName = charNameInput.value.toLowerCase(); 

    fetch(`http://localhost:3000/character/${charName}`)
    .then(response => response.json())
    .then(data => {
        const {name, status, species, gender, image, origin} = data;
        charInfo.innerHTML = `
        <h2>${name}</h2> 
        <img src="${image}" alt="${name}"/>
        <p>Status: ${status}</p> 
        <p>Species: ${species}</p>
        <p>Gender: ${gender}</p>
        <p>Origin: ${origin.name}</p> 
        
        `;
    })
    .catch(error => charInfo.innerHTML = `<p>Imposible acceder al personaje</p>`);
}

