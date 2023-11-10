export function isRequired(value: string) {
  return !!value || "This field is required";
}

export function isEmail(value: string) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/;
  return emailRegex.test(value) || "Not a valid Email";
}

export function noSymbols(value: string) {
    const noSymbolsRegex = /^[a-zA-Z]+$/
    return noSymbolsRegex.test(value) || "No special chars";
}

export function minLengthFive(value: string) {
    return value.length >= 5 || "Minimum length is 5 chars"
}

export function fiveLength(value: string) {
  return value.length == 5 || "Length is 5 chars"
}

export function onlyDigits(value: string) {
  const noSymbolsRegex = /^[0-9]+$/
  return noSymbolsRegex.test(value) || "Only digit chars";
}