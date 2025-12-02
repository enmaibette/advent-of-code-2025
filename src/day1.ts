import * as helper from './helper'

const input = helper.readFiles('files/day1.txt')

const inputArray: string[] = input.split('\n')
let currentPosition: number = 50
let countDialPoints = 0
let countZeroes = 0;

for ( let currentInput of inputArray) {
    const direction = currentInput.slice(0, 1)
    let steps = parseInt(currentInput.slice(1))

        for (let i = steps; i > 0; i--) {
            if (direction === 'L') {
                currentPosition -= 1;
                if (currentPosition < 0) {
                    currentPosition = 99
                }
                if (currentPosition === 0) {
                    countDialPoints += 1
                }
            }else if (direction === 'R') {
                currentPosition += 1;
                if (currentPosition > 99) {
                    currentPosition = 0
                }
                if (currentPosition === 0) {
                    countDialPoints += 1
                }
            }
        }
        if (currentPosition === 0) {
            countZeroes += 1;
        }

}
console.log(`Part 1: countZeroes: ${countZeroes}`)
console.log(`Part 2: countDialPoints: ${countDialPoints}`)
