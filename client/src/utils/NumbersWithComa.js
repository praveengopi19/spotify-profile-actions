export const numberWithComa = (number) => {
    number += ''
    let newNumber = []
    number = number.split('').reverse().join('').split('').map((num, i) => {

        newNumber.push(num)
        if ((i + 1) % 3 === 0 && i < number.split('').length - 1) {
            newNumber.push(',')
        }
    })
    return newNumber.reverse().join('')

}