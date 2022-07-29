const styling = () => {
    const s = document.querySelector("#game-style");
    const getNewStyle = (element, style, speed) => {
        const animationSpeed = speed / [100, 10][+(element === "board")]
        const styleMap = {
            rainbow: `animation: rainbow ${animationSpeed}s infinite linear;`,
            green: `background-color: green;`,
            fog: `animation: fog ${animationSpeed}s infinite linear;`,
        };
        return styleMap[style]
    }

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

    const setStyle = (element, style, speed) => {
        console.log("element", element)
        console.log("style", style)
        currentStyle[element] = getNewStyle(element, style, speed) || currentStyle[element];
        s.innerText = template();
        console.log("s", s)
        console.log("current", currentStyle)
    }

    return { setStyle }
}

export default styling
