export const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const randomPos = (maxY, maxX) => [randomNum(0, maxY), randomNum(0, maxX)];

export const checkPos = ([y1, x1], [y2, x2]) => (y1 == y2 && x1 == x2);

export const sleep = async (t) => new Promise((r) => setTimeout(r, t));

export const setClass = ([y,x], c, board) => board[y][x].classList.add(c);

export const removeClass = ([y,x], c, board) => board[y][x].classList.remove(c);