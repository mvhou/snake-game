const styling = () => {
    const snakeStyle = document.querySelector("#game-style");
    const styleMap = {
        rainbow: "animation: rainbow 0.8s infinite linear;",
        green: "background-color: green;",
        fog: "animation: fog 0.8s infinite linear;"
    };

    const template = (style) => `.snake {
        ${style}
    }` 

    const setStyle = (style) => snakeStyle.innerHTML = template(styleMap[style] || "background-color: green;");

    return { setStyle }
}

export default styling
