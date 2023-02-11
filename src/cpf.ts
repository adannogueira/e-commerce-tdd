const CPF_LENGTH = 11;
const REMOVE_NON_NUMBERS_REGEX = /[^\d]+/g

export class Cpf {
  constructor(private readonly value: string) {
    if (!this.validate()) throw new Error('Invalid CPF')
  }

  getValue() {
    return this.value.replace(REMOVE_NON_NUMBERS_REGEX, '');
  }

  validate (): boolean {
    if (!this.value) return false
    const parsedCpf = this.value.replace(REMOVE_NON_NUMBERS_REGEX, '')
    if (parsedCpf.length !== CPF_LENGTH) return false
    const allDigitsTheSame = [...parsedCpf].every(digit => digit === parsedCpf[0])
    if (allDigitsTheSame) return false
    const digits = this.calculateDigit(parsedCpf.substring(0, 9))
    return digits === parsedCpf.substring(9, 11)
  }

  private calculateDigit (parsedCpf: string): string {
    const firstDigit = this.calculateDigitAt(parsedCpf, 0)
    const secondDigit = this.calculateDigitAt(parsedCpf + firstDigit, 1)
    return firstDigit + secondDigit
  }

  private calculateDigitAt (parsedCpf: string, index: number): string {
    const sum = parsedCpf
      .split('')
      .map((digit, i) => parseInt(digit) * (10 - i + index))
      .reduce((acc, curr) => acc + curr, 0)
    return (sum * 10) % 11 < 10 ? (sum * 10) % 11 + '' : '0'
  }
}
