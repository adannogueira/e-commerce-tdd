import { Cpf } from '../src/cpf';

describe('Cpf', () => {
  it('Should throw error when no cpf is provided', () => {
    expect(() => new Cpf('')).toThrow('Invalid CPF');
  })

  it('Should throw error when parsed cpf has incorrect length', () => {
    expect(() => new Cpf('abc.123.456-78')).toThrow('Invalid CPF');
  })

  it('Should throw error when all digits are the same', () => {
    expect(() => new Cpf('111.111.111-11')).toThrow('Invalid CPF');
  })

  it('Should throw error when cpf is invalid', () => {
    expect(() => new Cpf('121.121.121-11')).toThrow('Invalid CPF');
  })

  it('Should return true when cpf is valid', () => {
    const result = new Cpf('000.000.001-91');
    expect(result.getValue()).toEqual('00000000191');
  })
})
