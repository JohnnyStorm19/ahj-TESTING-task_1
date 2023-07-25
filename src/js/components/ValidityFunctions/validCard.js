export function isValidCard(num) {
    const s = num
    const lastDigit = s[s.length - 1]; 

    const withoutLastDigit = s.slice(0, s.length -1); // получаем число без последней цифры
    const reversedDigit = withoutLastDigit.split('').reverse().join('');

    let multipliedNumber = '';

    for (let i = 0; i < reversedDigit.length; i += 1) {
      let mul;
      if (i === 0 || i % 2 === 0) {
        mul = reversedDigit[i] * 2;
        if (mul > 9) {
          mul -= 9;
        }
        multipliedNumber += mul;
      } else {
        multipliedNumber += reversedDigit[i];
      }
    }
    const sum = multipliedNumber.split('').reduce((acc, item) => acc += Number(item), 0);

    let res = sum % 10;

    if (res === Number(lastDigit)) {
        return true;
    } else {
      return false;
    }
}

export function cardSystem(num) {
    const str = String(num);

    const firstTwo = str.slice(0, 2);
    const firstThree = str.slice(0, 3); 
    const firstFour = str.slice(0, 4);
    const firstSix = str.slice(0, 6);

    if (str.length === 16 || str.length === 19) {
        if ( str.startsWith('6011') || str.startsWith('65') || (Number(firstThree) >= 644 && Number(firstThree) <= 649) || ( Number(firstSix) >= 622126 && Number(firstSix) <= 622925 ) ) {
            return 'Discover';
        }
        if (Number(firstFour) >= 3528 && Number(firstFour) <= 3589) {
            return 'JCB';
        }
        if (str.startsWith('5018') || str.startsWith('5020') || str.startsWith('5038') || str.startsWith('5893') || str.startsWith('6304') || str.startsWith('6759') || str.startsWith('6761') || str.startsWith('6762') || str.startsWith('6763')) {
            return 'Maestro';
        }
    }
    if (str.length === 16) {
        if ( (Number(firstTwo) >= 51 && Number(firstTwo) <= 55) || Number(firstSix) >= 222100 && Number(firstSix) <= 272099 ) {
            return 'MasterCard';
        } 
        if (str.startsWith('2201') || str.startsWith('2200')) {
            return 'Mir';
        }
    }
    if (str.length === 13 || str.length === 16 || str.length === 19) {
        if (str.startsWith('4')) {
            return 'Visa';
        }
    }
    return 'another pay system';
}