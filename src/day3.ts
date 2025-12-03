import * as helper from "./helper";

function getMaxNumber(input: string, totalNumbers: number): number {
    const numberList: number[] = []
    let currentNumberIndex: number
    let currentNumber :number
    const numbersToSum: number[] = []
    for(let j = 0; j < input.length; j++){
        numberList.push(parseInt(input.charAt(j)))
    }

    currentNumber = Math.max(...numberList.slice(0, numberList.length - totalNumbers))
    currentNumberIndex = numberList.indexOf(currentNumber)
    numbersToSum.push(currentNumber)

    for(let j = totalNumbers - 1; j >= 0; j--){
        currentNumber = Math.max(...numberList.slice(currentNumberIndex + 1, numberList.length - j))
        numbersToSum.push(currentNumber)
        for (let k = currentNumberIndex + 1; k < numberList.length; k++) {
            if (numberList[k] == currentNumber) {
                currentNumberIndex = k;
                break;
            }
        }
    }


    let numbersToSumString = numbersToSum.map(num => num.toString()).join('')

    return parseInt(numbersToSumString)
}


const input = helper.readFiles('files/day3.txt')

const inputArray: string[] = input.split('\n')
let totalJoltagePart1: number = 0;
let totalJoltagePart2: number = 0
const totalNumbersPart1: number = 1;
const totalNumbersPart2: number = 11;

for(let i of inputArray){
    i = i.trim()
    totalJoltagePart1 += getMaxNumber(i, totalNumbersPart1)
    totalJoltagePart2 += getMaxNumber(i, totalNumbersPart2)


}
console.log('Part 1: ', totalJoltagePart1)
console.log('Part 2: ', totalJoltagePart2)


