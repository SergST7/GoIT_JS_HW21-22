/**
 * Created by SergST on 07.10.2016.
 */

var app = require('../for-testing/test-pow.js');

describe("Тест модуля возведения в степень.", function () {

	it("Проверка на число", function () {
		var res = app.isNumeric('nnb');
		expect(res).toBe(false);
	});

	it("Проверка на число", function () {
		var res = app.isNumeric(6);
		expect(res).toBe(true);
	});

	it("Проверка 0 в 0 степени", function () {
		var res = app.pow(0, 0);
		expect(res).toBe('0 в 0 степени - неопределен');
	});

	it("Проверка на 0 степень", function () {
		var res = app.pow(5, 0);
		expect(res).toEqual(1);
	});

	it("Проверка на отрицательную степень", function () {
		var res = app.pow(5, -3);
		var check = 1 / (5 * 5 * 5);
		expect(res).toEqual(check);
	});

	it("Проверка 2 в 3 степени", function () {
		var res = app.pow(2, 3);
		var check = (2 * 2 * 2);
		expect(res).toEqual(check);
	});

	it("Проверка 5 в 4 степени", function () {
		var res = app.pow(5, 4);
		expect(res).toEqual(625);
	});

});
