const styling = () => {
    const s = document.querySelector("#game-style");
    const styleMap = {
        rainbow: "animation: rainbow 0.5s infinite linear;",
        green: "background-color: green;",
        fog: "animation: fog 1s infinite linear;"
    };

    const currentStyle = {
        snake: "background-color: green;",
        board: "animation: fog 10s infinite linear;"
    }

    const template = () => `.snake {
        ${currentStyle.snake}
    }
    .gameboard {
        ${currentStyle.board}
    }`

    const setStyle = (element, style) => {
        currentStyle[element] = styleMap[style] || currentStyle[element];
        s.innerText = template();
        console.log("s", s)
        console.log("current", currentStyle)
    }

    return { setStyle }
}

export default styling
