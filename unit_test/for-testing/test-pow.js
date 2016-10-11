/**
 * Created by SergST on 07.10.2016.
 */
var app = {
	a: null,
	b: null,

	checkNum: function (n) {
		while (!this.isNumeric(n)) {
			alert('это не число, попробуйте еще раз');
			n = prompt("Введите число");
		}
		return (n)
	},

	isNumeric: function (n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	},

	pow: function (x, n) {
		if (n == 0) {
			if (x == 0) {
				return '0 в 0 степени - неопределен';
			}
			return 1;
		}

		if (Math.round(n) != n) return 'возведение в дробную степень не поддержуется';

		var result = 1;

		for (var i = 0; i < Math.abs(n); i++) {
			result *= x;
		}
		if (n < 0) return 1 / result;
		return result;
	},

	init: function () {
		var a = prompt("Введите число", "");
		this.a = this.checkNum(a);

		var b = prompt("Введите степень в которую необходимо возвести " + a, "");
		this.b = this.checkNum(b);

		this.render();
	},

	render: function () {
		console.log(this.a + ' в ' + this.b + '-ой степени  = ' + this.pow(this.a, this.b));
	}

};

try {
	module.exports = app;
} catch(e) {}

