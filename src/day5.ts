import * as helper from './helper.js'

interface Range {
    start: number
    end: number
}

function removeOverlapping(rangeList: Range[]): Range[]{
    let freshIds: Range[] = rangeList;
    let freshIdsCopy = [];
    let hasOverlapping = true;
    while(hasOverlapping) {
        for (let ids of freshIds) {
            const overlapping = freshIdsCopy.findIndex(range => ids.start <= range.end && ids.end >= range.start);
            if (overlapping !== -1) {
                freshIdsCopy[overlapping].start = Math.min(freshIdsCopy[overlapping].start, ids.start);
                freshIdsCopy[overlapping].end = Math.max(freshIdsCopy[overlapping].end, ids.end);
            } else {
                freshIdsCopy.push({start: ids.start, end: ids.end})
            }
        }
        if (freshIdsCopy.length === freshIds.length) {
            hasOverlapping = false;
            return freshIdsCopy;
        } else {
            freshIds = freshIdsCopy;
            freshIdsCopy = [];
        }
    }
    return freshIds;
}


const challengeInput = helper.readFiles('files/day5.txt')
const freshIngredientsIds: string[] = challengeInput.split('\n\r\n')[0].split("\n").map(val => val.trim());
const ingredientsId: number[] = challengeInput.split('\n\r\n')[1].split("\n").map(id => parseInt(id))
const freshIngredients: Range[] = [];
let part1Total: number = 0;
let part2Total: number = 0;

for (let i = 0; i < freshIngredientsIds.length; i++) {
    const firstNumber: number = parseInt(freshIngredientsIds[i].split('-')[0])
    const secondNumber: number = parseInt(freshIngredientsIds[i].split('-')[1])
    freshIngredients.push({start: firstNumber, end: secondNumber})
}
for(let id of ingredientsId){
    if(freshIngredients.some(range => id >= range.start && id <= range.end)){
        part1Total += 1;
    }
}
const freshIds: Range[] = removeOverlapping(freshIngredients);

for(let id of freshIds){
    part2Total += (id.end - id.start + 1);
}

console.log('Part 1: ', part1Total)
console.log('Part 2: ', part2Total)
