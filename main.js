//Text Glich Cycle Effect
const textCycle = element => {
    const iterationPerChar = 2;
    let iteration = 0
    const interval = setInterval(() => {
        element.textContent = element.dataset.value.split("")
            .map((letter, index) => {
                if(index + 1 < iteration || element.dataset.value[index] == " ") {
                    return element.dataset.value[index]; 
                }
                return (Math.floor(Math.random() * 36)).toString(36).toUpperCase()
            })
            .join("");

        if(iteration > element.dataset.value.length) clearInterval(interval);
        iteration += 1 / iterationPerChar;
    }, 40)
}

document.querySelectorAll(".hoverGlichText").forEach((element) => {
    element.onmouseover = event => textCycle(event.target);
})

//Grid Stagger Effect
const wrapper = document.getElementById("tiles");

let columns = Math.floor(document.body.clientWidth / 50),
    rows = Math.floor(document.body.clientHeight / 50),
    gridVisable = true;

const togglePreloadVisable = visable => {
    gridVisable = visable === undefined ? !gridVisable : visable;
    anime({
        targets: ".tile",
        opacity: gridVisable ? 1 : 0,
        delay: anime.stagger(100, {
            grid: [columns, rows],
            from: Math.random() * document.querySelectorAll(".tile").length
        })
    });
    anime({
        targets: ".loadElement",
        opacity: gridVisable ? 1 : 0,
        duration: document.querySelectorAll(".tile").length * 50
    });
}

const createTile = index => {
    const tile = document.createElement("div");

    tile.classList.add("tile");

    tile.style.opacity = gridVisable ? 1 : 0;
    tile.style.backgroundColor = '#12' + Math.floor(index%(Math.floor(document.body.clientWidth / 50)/3.8)*2.5+16).toString(16) + '3B';

    /*tile.onclick = e => togglePreloadVisable(index);*/

    return tile;
}

const createTiles = quantity => {
    Array.from(Array(quantity)).map((tile, index) => {
        wrapper.appendChild(createTile(index));
    })
}

const createGrid = () => {
    wrapper.innerHTML = "";

    const size = document.body.clientWidth > 800 ? 100 : 50;
    columns = Math.floor(document.body.clientWidth / 50),
    rows = Math.floor(document.body.clientHeight / 50);

    wrapper.style.setProperty("--columns", columns);
    wrapper.style.setProperty("--rows", rows);
  
    createTiles(rows * columns);
}

createGrid();
window.onresize = () => createGrid();

//PreLoad Animation
const textList = [
    ["Creating", "Designing", "Coding", "Animating", "Balancing"],
    ["Player", "Enemy", "Weapon", "Terrain"],
    ["Stats", "Behaviour", "Movement", "Lighting", "Generation"]
];

var loadTextElements = document.querySelectorAll(".loadScreenText");
const cycleText = () => {
    cycleTargetIndex = Math.floor(Math.random()*loadTextElements.length); 
    target = loadTextElements[cycleTargetIndex];
    while(target.dataset.value == target.textContent){
        target.dataset.value = textList[cycleTargetIndex][Math.floor(Math.random() * textList[cycleTargetIndex].length)];
    }
    textCycle(target);
};
setInterval(cycleText, 1250);

window.onload = () => {
    //togglePreloadVisable(false);
}

//setInterval(togglePreloadVisable,5000)