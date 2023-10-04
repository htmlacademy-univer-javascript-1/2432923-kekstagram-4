const checkLineLength = (input, maxLength) => input.length <= maxLength;

const isPalindrom = (input) => {
  const line = input.replaceAll(' ','').toLowerCase();
  let reverseLine = '';
  for (let i = line.length - 1; i >= 0; i--){
    reverseLine += line[i];
  }
  return reverseLine === line;
};

const extractDigits = (input) => {
  let result = '';
  for (let i = 0; i < input.toString().length; i++){
    if (input[i] >= '0' && input[i] <= '9'){
      result += input[i];
    }
  }
  return result === '' ? NaN : parseInt(result, 10);
};

checkLineLength('efg', 4); //true
checkLineLength('abcdefg', 4); //false

isPalindrom('Лёша на полке клопа нашёл '); //true
isPalindrom('abcdes'); //false

extractDigits('1 кефир, 0.5 батона'); //105
extractDigits('а я томат'); //NaN


