import { addMessage } from './slices';


export function encrypt (message, cipherNum, dispatch) {
    if (message =='') return
    const d = dispatch;
    
    const baseAlphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    const baseUppers = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    
    const shiftAlphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    const shiftUppers = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    const encrypted = []

    for (let index = 0; index < cipherNum; index++) {
        //Shift lowercase letters
        const shift = shiftAlphabet.shift()
        shiftAlphabet.push(shift)
        //Shift Upper Case letters
        const upperShift = shiftUppers.shift()
        shiftUppers.push(upperShift)
    }

    Array.from(message).forEach (character => {
        if (baseAlphabet.includes(character)) {
            let letter = baseAlphabet.indexOf(character)
            encrypted.push(shiftAlphabet[letter])
        }
        else if (baseUppers.includes(character)) {
            let letter = baseUppers.indexOf(character)
            encrypted.push(shiftUppers[letter])
        }
        else {
            encrypted.push(character)
        }
    });

    let encrypt = encrypted.join('')

    d(addMessage({shifted: encrypt, marked: false}))

    return encrypt

}

export function decrypt (message, cipherNum) {

    if (message == '') return;

    const baseAlphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    const baseUppers = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    
    const shiftAlphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    const shiftUppers = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    const decrypted = []

    for (let index = 0; index < cipherNum; index++) {
        //Shift lowercase letters
        const shift = shiftAlphabet.shift()
        shiftAlphabet.push(shift)
        //Shift Upper Case letters
        const upperShift = shiftUppers.shift()
        shiftUppers.push(upperShift)
    }

    Array.from(message).forEach (character => {
        if (shiftAlphabet.includes(character)) {
            let letter = shiftAlphabet.indexOf(character)
            decrypted.push(baseAlphabet[letter])
        }
        else if (shiftUppers.includes(character)) {
            let letter = shiftUppers.indexOf(character)
            decrypted.push(baseUppers[letter])
        }
        else {
            decrypted.push(character)
        }
    });

    let decrypt = decrypted.join('');
    
    return decrypt;
}