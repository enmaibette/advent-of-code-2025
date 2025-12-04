import * as helper from './helper'

type Coordinates = {
    x: number,
    y: number
}

type AdjacentCount = {
    nw: boolean,
    n: boolean,
    ne: boolean,
    e: boolean,
    se: boolean,
    s: boolean
    sw: boolean,
    w: boolean,
}

function count8thAdjacent(inputArray: string[][], index: Coordinates, width: number, height: number) :number {
    let adjacentCount: AdjacentCount = {
        nw: true,
        n: true,
        ne: true,
        e: true,
        se: true,
        s: true,
        sw: true,
        w: true,
    }
    let counter: number = 0;
    if (index.y <= 0) {
        adjacentCount.nw = false
        adjacentCount.n = false
        adjacentCount.ne = false
    }

    if (index.x <= 0) {
        adjacentCount.nw = false
        adjacentCount.w = false
        adjacentCount.sw = false
    }

    if (index.y >= height - 1) {
        adjacentCount.sw = false
        adjacentCount.s = false
        adjacentCount.se = false
    }

    if (index.x >= width - 1) {
        adjacentCount.ne = false
        adjacentCount.e = false
        adjacentCount.se = false
    }

    if (adjacentCount.nw) {
        if (inputArray[index.y - 1][index.x - 1] === '@') {
            counter += 1;
        }
    }

    if(adjacentCount.n) {
        if (inputArray[index.y - 1][index.x] === '@') {
            counter += 1;

        }
    }
    if(adjacentCount.ne) {
        if (inputArray[index.y - 1][index.x + 1] === '@') {
            counter += 1;

        }
    }
    if(adjacentCount.e) {
        if (inputArray[index.y][index.x + 1] === '@') {
            counter += 1;
        }
    }
    if(adjacentCount.se) {
        if (inputArray[index.y + 1][index.x + 1] === '@') {
            counter += 1;
        }
    }
    if(adjacentCount.s) {
        if (inputArray[index.y + 1][index.x] === '@') {
            counter += 1;
        }
    }
    if(adjacentCount.sw) {
        if (inputArray[index.y + 1][index.x - 1] === '@') {
            counter += 1;
        }
    }
    if(adjacentCount.w) {
        if (inputArray[index.y][index.x - 1] === '@') {
            counter += 1;
        }
    }

    return counter;
}


const challengeInput = helper.readFiles('files/day4.txt')
const inputArray: string[] = challengeInput.split('\n')
let grid = inputArray.map(row => row.split(''));
const matrixHeight: number = grid.length || 0;
const matrixWidth: number = grid[0].length || 0;
const coordinatesList: Coordinates[] = []
const maxAdjacentAllowed = 3;
let keepRemoving = true;
let lastIndex = 0;
let partOne = true;
let partOneCounter = 0;
let partTwoCounter = 0;

while (keepRemoving) {
    for (let i = 0; i < grid.length; i++) {
        for (let c = 0; c < grid[i].length; c++) {
            const index: Coordinates = {x: c, y: i}
            if (grid[i][c] !== '@') {
                continue;
            }
            let adjacentCounter = count8thAdjacent(grid, index, matrixWidth, matrixHeight)

            if (adjacentCounter <= maxAdjacentAllowed) {
                coordinatesList.push(index)
            }

        }
    }
    if (lastIndex === coordinatesList.length -1) {
        keepRemoving = false;
        partTwoCounter = coordinatesList.length
        break;
    }
    for (let i = lastIndex; i < coordinatesList.length; i++) {
        grid[coordinatesList[i].y][coordinatesList[i].x] = '.'
    }
    lastIndex = coordinatesList.length - 1
    if (partOne) {
        partOneCounter = coordinatesList.length
        partOne = false;
    }

}
console.log('Part 1: ', partOneCounter);
console.log('Part 2: ', partTwoCounter);


