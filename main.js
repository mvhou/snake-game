import { WIDTH, HEIGHT } from "./parameters.js";
import * as u from './utilities.js'
import { init } from './init.js'
import * as g from './gameFunctions.js'

const checkTailHit = (position, tail) => (tail.find(x => u.checkPos(x, position)) !== undefined)

const manageTail = (snake, board) => {
    snake.tail.push(snake.position);
    if (snake.tail.length > snake.length) {
        u.removeClass(snake.tail.splice(0,1)[0], "snake", board);
    }
    u.setClass(snake.position, "snake", board)
}

const getNewPosition = ([dY, dX], [pY, pX]) => {
    const newY = (dY + pY) % HEIGHT;
    const newX = (dX + pX) % WIDTH;
    return [(newY >= 0) ? newY : HEIGHT - 1, (newX >= 0) ? newX : WIDTH -1];
}

const playGame = async (snake, game) => {
    console.log(snake, game)
    while (game.restart) {
        if (!game.paused) {
            snake.position = getNewPosition(snake.direction, snake.position);
            if (u.checkPos(snake.position, game.coin)) {
                u.setClass(game.coin, "snake", game.board);
                u.removeClass(game.coin, "coin", game.board);
                game.coin = g.createNewCoin(snake.tail, game.board);
                snake.length += 1;
                game.score += 1;
            }
            document.querySelector('#score').innerText = game.score;
            if (checkTailHit(snake.position, snake.tail))
                return ;
            manageTail(snake, game.board);
        }
        await u.sleep(game.speed)
    }
}

(_main_ => playGame(...init()))();
