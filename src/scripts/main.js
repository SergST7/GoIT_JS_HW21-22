/**
 * Created by SergST on 12.09.2016.
 */

"use strict";

//= parts/_lodash.js
;
//= parts/_jquery-3.1.0.js
;
//= parts/_data.js
;

$( () => {

  try {
    var test = localStorage.getItem('test');
    test = JSON.parse(test);
  } catch (e) {
    alert('Ошибка в данных')
  }

  // объект для отображения ошибок и результатов теста
  let resultsObj = {
    msg: '',
    answersLength: 0,
    correct: 0,
    incorrect: 0,
    error: false,
    errorMsg: ''
  };

  let rightAnswers = []; // массив правильных ответов из объекта test

  function render(id, obj, parent) {
    let tmpl = _.template($(id).html());
    let result = tmpl(obj);
    $(parent).append(result);
  }

// начало теста
  function startTest() {
    reset();
    render('#test', test, '.test-wrapper');
    $('.checkRes').click(checkResults);
  }

  // заполним массив правильными ответами в формате 'номер вопроса-верный ответ'
  function getRightAnswers() {
    rightAnswers = [];
    for (let i = 0; i < test.data.length; i++) {
      let str;
      test.data[i].right.forEach( (item) => {
        str = (i + 1) + '-' + item;
        rightAnswers.push(str);
      });
    }
    resultsObj.answersLength = rightAnswers.length;
  }

  // подсчет результатов и проверки
  function checkResults() {
    getRightAnswers();
    if (checkEmptyAnswer()) {
      showModal(resultsObj);
      resultsObj.error = false;
      return
    }
    // проверим все выбранные чекбоксы на присутствие их ID в массиве
    // правильных ответов и зададим соответствующие классы
    let $userAnswers = $('input:checked');

    $userAnswers.each( function() {
      let id = $(this).attr('id');
      if (_.includes(rightAnswers, id)) {
        $(this).parent().addClass('correct');
        resultsObj.correct++;
      } else {
        $(this).parent().addClass('incorrect');
        resultsObj.incorrect++;
      }
    });

    // в случае одной ошибки тест - не засчитывается
    if (resultsObj.incorrect != 0) {
      resultsObj.msg = 'Тест не пройден'
    } // в случае не полных ответов тест не засчитан
    else if ($userAnswers.length < resultsObj.answersLength) {
      resultsObj.msg = 'Тест не пройден, ответ не полный'
    } else {
      resultsObj.msg = 'Тест пройден'
    }
    showModal(resultsObj);
  }

  //проверяет все ли вопросы с ответами
  function checkEmptyAnswer() {
    let str = '';
    $('.question').each(function (index) {
      if ($(this).find('input:checked').length == 0) {
        str += (+index + 1) + '; '
      }
    });
    if (str) {
      resultsObj.error = true;
      resultsObj.errorMsg = ('Не получены ответы на вопросы ' + str);
      return true;
    }
  }

  // отображает модальное окно
  function showModal(msgObj) {
    render('#modal-result', msgObj, '.test-wrapper');
    $('.errorOK').click(removeModal);
    $('.show-results').click(function () {
      removeModal();
      showResults();
    });
    $('.start-modal').click(startTest);
  }

  function removeModal() {
    $('.overlay').remove();
  }

  function showResults() {
    $('.correct').css('background-color', 'green');
    $('.incorrect').css('background-color', 'red');
    $('.checkRes').toggle();
    $('.start').toggle();
  }

  function reset() {
    resultsObj.msg = '';
    resultsObj.answersLenght = 0;
    resultsObj.correct = 0;
    resultsObj.incorrect = 0;
    resultsObj.error = false;
    resultsObj.errorMsg = '';
    $('.test-wrapper').html('');
  }

  $('.start').click(function () {
    startTest();
    $(this).hide();
  })
});



