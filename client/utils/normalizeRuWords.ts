type TStandardNouns = {
  [key: string]: {
    nounIfNumeralEqualsOne: string;
    nounIfNumeralEqualsTwo: string;
    nounIfNumeralEqualsFive: string;
  };
};

const standardNouns: TStandardNouns = {
  сом: {
    nounIfNumeralEqualsOne: "сом",
    nounIfNumeralEqualsTwo: "сома",
    nounIfNumeralEqualsFive: "сомов",
  },
  место: {
    nounIfNumeralEqualsOne: "место",
    nounIfNumeralEqualsTwo: "места",
    nounIfNumeralEqualsFive: "мест",
  },
  балл: {
    nounIfNumeralEqualsOne: "балл",
    nounIfNumeralEqualsTwo: "балла",
    nounIfNumeralEqualsFive: "баллов",
  },
  товар: {
    nounIfNumeralEqualsOne: "товар",
    nounIfNumeralEqualsTwo: "товара",
    nounIfNumeralEqualsFive: "товаров",
  },
  KGS: {
    nounIfNumeralEqualsOne: "сом",
    nounIfNumeralEqualsTwo: "сома",
    nounIfNumeralEqualsFive: "сомов",
  },
  RUB: {
    nounIfNumeralEqualsOne: "рубль",
    nounIfNumeralEqualsTwo: "рубля",
    nounIfNumeralEqualsFive: "рублей",
  },
  USD: {
    nounIfNumeralEqualsOne: "доллар",
    nounIfNumeralEqualsTwo: "доллара",
    nounIfNumeralEqualsFive: "долларов",
  },
};

export const normalizeRuWords = (
  numeral?: number,
  noun?: keyof typeof standardNouns | string[]
): string | undefined => {
  if (numeral === undefined || noun === undefined) {
    return undefined;
  }

  let nounIfNumeralEqualsOne, nounIfNumeralEqualsTwo, nounIfNumeralEqualsFive;

  if (Array.isArray(noun)) {
    [nounIfNumeralEqualsOne, nounIfNumeralEqualsTwo, nounIfNumeralEqualsFive] =
      [...noun];
  } else if (noun in standardNouns) {
    nounIfNumeralEqualsOne = standardNouns[noun]["nounIfNumeralEqualsOne"];
    nounIfNumeralEqualsTwo = standardNouns[noun]["nounIfNumeralEqualsTwo"];
    nounIfNumeralEqualsFive = standardNouns[noun]["nounIfNumeralEqualsFive"];
  }

  let secondWord;
  const double = Math.abs(numeral) % 100;
  if (double < 21 && double > 4) {
    secondWord = nounIfNumeralEqualsFive;
  }
  const single = double % 10;
  if (single === 1) {
    secondWord = nounIfNumeralEqualsOne;
  } else if (single < 5 && single > 1) {
    secondWord = nounIfNumeralEqualsTwo;
  } else {
    secondWord = nounIfNumeralEqualsFive;
  }

  return `${numeral} ${secondWord}`;
};
