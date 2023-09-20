export function isRequired(value: string) {
  return !!value || "This field is required";
}

export function isEmail(value: string) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(value) || "Not a valid Email";
}

export function noSymbols(value: string) {
    const noSymbolsRegex = /[a-zA-Z]$/
    return noSymbolsRegex.test(value) || "No special characters allowed";
}