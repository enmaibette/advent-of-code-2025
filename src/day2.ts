import * as helper from "./helper";

const input = helper.readFiles('files/day2.txt')

const inputArray: string[] = input.split(',')

let invalidIdsSum = 0;
let invalidIdsSumPart2 = 0;
for (let currentInput of inputArray) {
    let firstNumber = parseInt(currentInput.split('-')[0])
    let lastNumber = parseInt(currentInput.split('-')[1])

    for(firstNumber; firstNumber <= lastNumber; firstNumber++) {
        if (firstNumber.toString().startsWith('0')) {
            console.log(`Invalid ID: ${firstNumber}`)
            invalidIdsSum += firstNumber;
            invalidIdsSumPart2 += firstNumber;
        } else {
            let possibleDouble: boolean = firstNumber.toString().length % 2 === 0;
            let invalidFound: boolean = false;
            if (possibleDouble){
                const firstHalf = firstNumber.toString().slice(0, firstNumber.toString().length / 2);
                const secondHalf = firstNumber.toString().slice(firstNumber.toString().length / 2);
                if (firstHalf === secondHalf) {
                    invalidIdsSum += firstNumber;
                    invalidIdsSumPart2 += firstNumber;
                    invalidFound = true;
                    console.log(`Invalid ID: ${firstNumber}`)
                }

            }
            if (!invalidFound) {
                for (let j = 1; j <= Math.floor(firstNumber.toString().length / 2); j++) {
                    const seq: Array<string> = [];
                    let multipleSeq: boolean = false;
                    for (let i = 0; i < firstNumber.toString().length; i+=j) {
                        seq.push(firstNumber.toString().slice(i, i + j));
                    }
                    let prev = ''
                    for (let k of seq) {
                        if (prev === '') {
                            prev = k;
                        } else {
                            if (prev === k) {
                                multipleSeq = true;
                            } else {
                                multipleSeq = false;
                                break;
                            }
                        }

                    }
                    if (multipleSeq) {
                        console.log(`Invalid ID: ${firstNumber}`)
                        invalidIdsSumPart2 += firstNumber;
                        break;
                    }
                }
            }
        }
    }
}

console.log(`Part 1: invalidIdsSum: ${invalidIdsSum}`)
console.log(`Part 2: invalidIdsSum: ${invalidIdsSumPart2}`)