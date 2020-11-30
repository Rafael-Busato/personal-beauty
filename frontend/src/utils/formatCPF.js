import onlyNumbers from './onlyNumbers';



export const formater = {

  maxLenght: (value, maxLenght) => {

    if (!value)
      return '';

    if (typeof (value) !== "string" || typeof (maxLenght) !== "number")
      return '';

    return value.substring(0, maxLenght);

  },

  number: (value) => {

    if (!value)
      return '';

    if (typeof (value) !== "string")
      return '';

    return value.replace(/\D/g, '') + '';

  },

  monetaryBRL: (value, useCurrencyStamp) => {

    if (!value)
      return '';

    if (typeof (value) !== "string")
      return '';

    let filteredValue = formater.number(value);

    if (!filteredValue)
      return '';

    let invertedCharArray = [...filteredValue].reverse();
    let commaUsed = false;
    let currentIndex = 0;

    let result = invertedCharArray.reduce((accumulator, currentValue) => {

      if (commaUsed) {

        if (currentIndex === 2) {

          currentIndex = 0;
          return accumulator + '.' + currentValue;

        }

      } else {

        if (currentIndex === 2) {

          currentIndex = 0;
          commaUsed = true;
          return accumulator + ',' + currentValue;

        }

      }

      currentIndex++;
      return accumulator + currentValue;

    }, '');

    result = [...result].reverse().join('');

    if (useCurrencyStamp && typeof useCurrencyStamp === 'boolean')
      result = "R$ " + result;

    return result;

  },

  template: (value, template) => {

    if (!value || !template)
      return '';

    if (typeof (value) !== "string" || typeof (template) !== "string")
      return '';

    let filteredValue = formater.number(value);

    if (!filteredValue)
      return '';

    let currentIndex = 0;

    return [...template].reduce((accumulator, currentValue) => {

      if (typeof filteredValue[currentIndex] === "undefined")
        return accumulator;

      if (currentValue === '0') {

        let result = accumulator + filteredValue[currentIndex];
        currentIndex++;
        return result;

      } else {

        return accumulator + currentValue;

      }

    }, '');

  },

  date: (value) => {

    if (!value)
      return '';

    if (typeof (value) !== "string")
      return '';

    let filteredValue = formater.number(value);

    return [...filteredValue].reduce((accumulator, currentValue, currentIndex) => {

      if (currentIndex === 2 || currentIndex === 4) {

        currentValue = "/" + currentValue;

      }

      if (currentIndex > 7) {

        currentValue = "";

      }

      return accumulator + currentValue;

    }, '');

  },

  hour: (value) => {

    if (!value)
      return '';

    if (typeof (value) !== "string")
      return '';

    let filteredValue = formater.number(value);

    return [...filteredValue].reduce((accumulator, currentValue, currentIndex) => {

      if (currentIndex === 2) {

        currentValue = ":" + currentValue;

      }

      if (currentIndex > 4) {

        currentValue = "";

      }

      return accumulator + currentValue;

    }, '');

  },

  cpf: (value) => {

    if (!value)
      return '';

    if (typeof (value) !== "string")
      return '';

    let filteredValue = formater.number(value);

    return [...filteredValue].reduce((accumulator, currentValue, currentIndex) => {

      if (currentIndex === 3 || currentIndex === 6) {

        currentValue = "." + currentValue;

      }

      if (currentIndex === 9) {

        currentValue = "-" + currentValue;

      }

      if (currentIndex > 10) {

        currentValue = "";

      }

      return accumulator + currentValue;

    }, '');

  },

  cnpj: (value) => {

    if (!value)
      return '';

    if (typeof (value) !== "string")
      return '';

    let filteredValue = formater.number(value);

    return [...filteredValue].reduce((accumulator, currentValue, currentIndex) => {

      if (currentIndex === 2 || currentIndex === 6) {

        currentValue = "." + currentValue;

      }

      if (currentIndex === 5) {

        currentValue = "." + currentValue;

      }

      if (currentIndex > 8) {

        currentValue = "/";

      }

      if (currentIndex > 12) {

        currentValue = "-";

      }

      if (currentIndex > 14) {

        currentValue = "";

      }

      return accumulator + currentValue;

    }, '');

  },

  cep: (value) => {

    let filteredValue = formater.number(value);

    return [...filteredValue].reduce((accumulator, currentValue, currentIndex) => {

      if (currentIndex === 5) {

        currentValue = "-" + currentValue;

      }

      if (currentIndex > 7) {

        currentValue = "";

      }

      return accumulator + currentValue;

    }, '');

  }

}