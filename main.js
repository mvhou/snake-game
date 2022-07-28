import * as u from './utilities.js'
import { init } from './init.js'
import * as g from './gameFunctions.js'

const playGame = async (snake, game) => {
    while (game.restart) {
        if (!game.paused) {
            snake.position = u.getNewPosition(snake.direction, snake.position);
            if (u.checkPos(snake.position, game.coin)) {
                u.setClass(game.coin, "snake", game.board);
                u.removeClass(game.coin, "coin", game.board);
                game.coin = g.createNewCoin(snake.tail, game.board);
                snake.length += 1;
                game.score += 1;
            }
            u.updateScore(game.score)
            if (u.checkTailHit(snake.position, snake.tail))
                return ;
            g.manageTail(snake, game.board);
        }
        await u.sleep(game.speed)
    }
}

(_main_ => playGame(...init()))();
