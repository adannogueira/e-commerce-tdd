import { Cpf } from '../../checkout/src/domain/entities/Cpf';

const validCpfs = [
	"987.654.321-00",
	"714.602.380-01",
	"313.030.210-72",
	"144.796.170-60"
];

const invalidCpfs = [
	"111.111.111-11",
	"222.222.222-22",
	"333.333.333-33",
	"444.444.444-44",
	"555.555.555-55",
	"666.666.666-66",
	"777.777.777-77",
	"888.888.888-88",
	"999.999.999-99",
	"987.654.321-01",
	"714.602.380-10",
	"313.030.210-70",
	"144.796.170-10"
];

test.each(validCpfs)("Should validate a CPF: %s", (value: string) => {
	// Act
	const cpf = new Cpf(value);

	// Assert
	expect(cpf).toBeInstanceOf(Cpf);
});

test.each(invalidCpfs)("Should throw when cpf is invalid: %s", (value: string) => {
	// Act & Assert
	expect(() => new Cpf(value)).toThrow('Invalid CPF');
});

test("Should throw when cpf has incorrect size", () => {
	// Act & Assert
	expect(() => new Cpf("123")).toThrow('Invalid CPF');
});
