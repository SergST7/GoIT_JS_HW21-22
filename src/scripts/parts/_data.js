/**
 * Created by SergST on 08.10.2016.
 */

let testObj = {
	topic: 'Тест по программированнию',
	data: [{
		question: 'Какой формат передачи данных наиболее распостранен?',
		answers: ['SQL', 'XML', 'TXT', 'JSON'],
		right: [4]
	}, {
		question: 'С помощью какого метода можно сохранить данные в локальное хранилище?',
		answers: ['save()', 'saveToLocalStorage()', 'setItem()', 'saveItem()'],
		right: [3]
	}, {
		question: 'Какой объект для работы с JSON файлами втроен во все современные браузеры?',
		answers: ['JSON', 'JSONParser', 'Json', 'Такого объекта нет. Необходимо' +
		' пользоваться внешними библиотеками.'],
		right: [1]
	}, {
		question: 'Какие цвета входят в модель RGB (3 варианта)',
		answers: ['синий', 'желтый', 'зеленый', 'белый', 'черный', 'красный'],
		right: [1, 3, 6]
	}]
};

localStorage.setItem('test', JSON.stringify(testObj));