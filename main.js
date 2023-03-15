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