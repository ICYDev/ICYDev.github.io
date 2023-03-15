//Text Glich Cycle Effect
document.querySelectorAll("h1").forEach((element) => {
    element.onmouseover = event => {
        const iterationPerChar = 2;
        let iteration = 0
        const interval = setInterval(() => {
            event.target.textContent = event.target.textContent.split("")
                .map((letter, index) => {
                    if(index < iteration) {
                        return event.target.dataset.value[index]; 
                    }
                    return (Math.floor(Math.random() * 36)).toString(36).toUpperCase()
                })
                .join("");

            if(iteration >= event.target.dataset.value.length) clearInterval(interval);
            iteration += 1 / iterationPerChar;
        }, 40)
    }
})

//Grid Stagger Effect
const wrapper = document.getElementById("tiles");



let columns = Math.floor(document.body.clientWidth / 50),
    rows = Math.floor(document.body.clientHeight / 50),
    gridVisable = true;

const handleOnClick = index => {
    gridVisable = !gridVisable;
    anime({
        targets: ".tile",
        opacity: gridVisable ? 1 : 0,
        delay: anime.stagger(50, {
            grid: [columns, rows]
        })
    })
}

const createTile = index => {
    const tile = document.createElement("div");

    tile.classList.add("tile");

    tile.onclick = e => handleOnClick(index);

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