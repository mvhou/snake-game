import styling from "./styling.js";

const WIDTH = 20;
const HEIGHT = 20;
const GAME_SPEED = 50;
const STARTING_LENGTH = 5;
var newDirection = [1, 0];
var direction = [1,0];
var restart = false;
var paused = false;

const getDirection = (d) => ((d[0] === 0 && direction[0] === 0) || (d[1] === 0 && direction[1] === 0)) ? direction : d;

const addEventListeners = () => {
    document.addEventListener("keydown", (e) => {
        const moveMap = {
            "w": [-1, 0],
            "s": [1,0],
            "a": [0,-1],
            "d": [0,1]
        };
        if (Object.keys(moveMap).includes(e.key))
            newDirection = getDirection(moveMap[e.key]);
        else if (e.key === 'p') {
            paused = !paused
        }
    });

    document.querySelector("#restart").onclick = async () => { 
        restart = true;
        await sleep(GAME_SPEED);
        restart = false;
        direction, newDirection = [1,0];
        playGame(initializeSnake(), initializeGame());
    }

    document.querySelector("#color").onchange = (e) => {
        console.log(styling)
        styling().setStyle(e.target.value);
    }
}

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randomPos = (maxY, maxX) => [randomNum(0, maxY), randomNum(0, maxX)];

const checkPos = ([y1, x1], [y2, x2]) => (y1 == y2 && x1 == x2);

const createNewCoin = (tail, board) => {
    let newCoin = randomPos(HEIGHT-1, WIDTH-1);
    while (tail.find(x => (checkPos(x, newCoin)))) {
        newCoin = randomPos(HEIGHT-1, WIDTH-1);
    }
    setClass(newCoin, "coin", board);
    return newCoin;
}

const createLine = () => `<line>${document.createElement('line').innerHTML = Array(WIDTH).fill(null).map((_,i) => `<pixel><sub></x§sub></pixel>`).join('')}</line>`;

const initializeGame = () => {
    const gb = document.querySelector('gameboard');
    const lines = Array(WIDTH).fill(null).map(createLine);
    gb.innerHTML = [...lines].join('');
    const b = [...document.querySelectorAll('line')].map(line => [...line.querySelectorAll('pixel')])
    return {
        score: 0,
        coin: createNewCoin([], b),
        board: b,
    };
}

const initializeSnake = () => ({
    position: [WIDTH / 2, HEIGHT / 2],
    direction: direction,
    tail: [],
    length: STARTING_LENGTH,
    dead: false,
});

const setClass = ([y,x], c, board) => board[y][x].classList.add(c);

const removeClass = ([y,x], c, board) => board[y][x].classList.remove(c);

const checkTailHit = (position, tail) => (tail.find(x => checkPos(x, position)) !== undefined)

const sleep = async (t) => new Promise((r) => setTimeout(r, t));

const manageTail = (snake, board) => {
    snake.tail.push(snake.position);
    if (snake.tail.length > snake.length) {
        removeClass(snake.tail.splice(0,1)[0], "snake", board);
    }
    setClass(snake.position, "snake", board)
}

const getNewPosition = ([dY, dX], [pY, pX]) => {
    var newY = (dY + pY) % HEIGHT;
    var newX = (dX + pX) % WIDTH;
    return [(newY >= 0) ? newY : HEIGHT - 1, (newX >= 0) ? newX : WIDTH -1];
}

const playGame = async (snake, game) => {
    while (!restart) {
        if (!paused) {
            snake.direction = newDirection;
            direction = newDirection;
            snake.position = getNewPosition(snake.direction, snake.position);
            if (checkPos(snake.position, game.coin)) {
                setClass(game.coin, "snake", game.board);
                removeClass(game.coin, "coin", game.board);
                game.coin = createNewCoin(snake.tail, game.board);
                snake.length += 1;
                game.score += 1;
            }
            document.querySelector('#score').innerText = game.score;
            if (checkTailHit(snake.position, snake.tail))
                throw new Error("lol");
            manageTail(snake, game.board);
        }
        await sleep(GAME_SPEED)
    }
}

((_main_) => {
    addEventListeners();
    playGame(initializeSnake(), initializeGame());
})();
