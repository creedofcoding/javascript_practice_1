const refreshPage = () => {
  location.reload();
};

document.getElementById("btn_proceed").addEventListener("click", function (e) {
  let min_value = parseInt(document.getElementById("min_value").value);
  let max_value = parseInt(document.getElementById("max_value").value);
  let clicks = 1;
  let gameRun = true;
  let answer_phrase = "";
 
  let units = [
    "",
    "один",
    "два",
    "три",
    "четыре",
    "пять",
    "шесть",
    "семь",
    "восемь",
    "девять",
  ];
  let teens = [
    "",
    "десять",
    "одинадцать",
    "двенадцать",
    "тринадцать",
    "четырнадцать",
    "пятнадцать",
    "шестнадцать",
    "семнадцать",
    "восемнадцать",
    "девятнадцать",
  ];
  let dozens = [
    "",
    "двадцать",
    "тридцать",
    "сорок",
    "пятьдесят",
    "шестьдесят",
    "семьдесят",
    "восемьдесят",
    "девяносто",
  ];
  let hundreds = [
    "",
    "сто",
    "двести",
    "триста",
    "четыреста",
    "пятьсот",
    "шестьсот",
    "семьсот",
    "восемьсот",
    "девятьсот",
  ];

  function numberToText(answer_number) {
    let number = Math.abs(answer_number);
    let text = "";

    if (number == 0) {
      text = "ноль";
      return text;
    }

    if (number <= 9) {
      return units[Math.floor(Math.abs(number) / 1)];
    }

    if (number > 9 && number < 20) {
      return teens[Math.floor(number / 10 + (number % 10))];
    }

    if (number >= 20 && number <= 99) {
      return (
        dozens[Math.floor(number / 10) - 1] +
        " " +
        units[Math.floor(number % 10)]
      );
    }

    if (number >= 100 && number <= 999) {
      return (
        hundreds[Math.floor(number / 100)] +
        " " +
        numberToTextHundreds(answer_number)
      );
    }
  }

  function numberToTextHundreds(answer_number) {
    let unitsTeensDozens = Math.abs(answer_number) % 100;

    if (unitsTeensDozens <= 9) {
      return units[Math.floor(unitsTeensDozens / 1)];
    }

    if (unitsTeensDozens > 9 && unitsTeensDozens < 20) {
      return teens[Math.floor(unitsTeensDozens / 10) + (unitsTeensDozens % 10)];
    }

    if (unitsTeensDozens >= 20 && unitsTeensDozens <= 99) {
      return (
        dozens[Math.floor(unitsTeensDozens / 10) - 1] +
        " " +
        units[Math.floor(unitsTeensDozens % 10)]
      );
    }
  }

  e.preventDefault();

  min_value = min_value < -999 ? -999 : min_value > 999 ? 999 : min_value;
  max_value = max_value > 999 ? 999 : max_value < -999 ? -999 : max_value;

  if (max_value < min_value) {
    [max_value, min_value] = [min_value, max_value];
  }

  if (Number.isNaN(max_value) || Number.isNaN(min_value)) {
    min_value = 0;
    max_value = 100;
  }

  if (parseInt(min_value) || parseInt(max_value)) {
    let btn_proceed = document.getElementById("btn_proceed");
    btn_proceed.remove();

    let card_body_col = document.getElementById("card_body_col");
    card_body_col.remove();

    let card_header = document.getElementById("card_header");
    card_header.innerText = "Условия игры";

    card_body_col = document.createElement("div");
    card_body_col.id = "card_body_col";
    document.querySelector(".card-body").appendChild(card_body_col);

    let card_body_col_text = document.createElement("p");
    card_body_col_text.id = "card_body_col_text";
    card_body_col_text.textContent = `Загадайте любое целое число от ${min_value} до ${max_value}, а я его угадаю!`;
    document.getElementById("card_body_col").appendChild(card_body_col_text);

    let card_footer = document.querySelector(".card-footer");

    let btn_next = document.createElement("button");
    btn_next.className = "btn btn-primary";
    btn_next.id = "btn_next";
    btn_next.textContent = "Далее";
    card_footer.appendChild(btn_next);

    btn_next.addEventListener("click", function (e) {
      e.preventDefault();

      card_header.innerText = `Игра «Угадай-ка»`;

      let card_body_col_text = document.getElementById("card_body_col_text");

      let answer_number = Math.floor((min_value + max_value) / 2);

      card_body_col_text.innerText =
        answer_number >= 0
          ? numberToText(answer_number).length < 20 && answer_number >= 0
            ? `Вы загадали число ${numberToText(answer_number)}?`
            : `Вы загадали число ${answer_number}?`
          : numberToText(answer_number).length < 20
          ? `Вы загадали число минус ${numberToText(answer_number)}?`
          : `Вы загадали число ${answer_number}?`;

      btn_next.remove();

      let btn_less = document.createElement("button");
      btn_less.className = "form-btn btn btn-info";
      btn_less.id = "btn_less";
      btn_less.textContent = "меньше";
      card_footer.appendChild(btn_less);

      let btn_equal = document.createElement("button");
      btn_equal.className = "form-btn btn btn-primary btn-lg";
      btn_equal.id = "btn_equal";
      btn_equal.textContent = "верно!";
      card_footer.appendChild(btn_equal);

      let btn_more = document.createElement("button");
      btn_more.className = "form-btn btn btn-info";
      btn_more.id = "btn_more";
      btn_more.textContent = "больше";
      card_footer.appendChild(btn_more);

      btn_less.addEventListener("click", function (e) {
        e.preventDefault();

        if (gameRun) {
          card_header.innerText = "Вопрос №" + clicks++;

          if (min_value === max_value || min_value == answer_number) {
            const phrase_random = Math.round(Math.random() * 3);
            switch (phrase_random) {
              case 0:
                answer_phrase = `Вы загадали неправильное число!\n\u{1F914}`;
                break;

              case 1:
                answer_phrase = `Вы забыли, какое число загадали?\n\u{1F92A}`;
                break;

              case 2:
                answer_phrase = `Вы ошиблись с числом!\n\u{1F9D0}`;
                break;

              case 3:
                answer_phrase = `Не жульничайте!\n\u{1F620}`;
                break;
            }

            card_body_col_text.innerText = answer_phrase;
            gameRun = false;

            btn_less.remove();
            btn_equal.remove();
            btn_more.remove();

            let card_footer = document.querySelector(".card-footer");

            let btn_retry = document.createElement("button");
            btn_retry.className = "form-btn btn btn-danger btn-lg";
            btn_retry.id = "btn_retry";
            btn_retry.textContent = "Заново";

            card_footer.appendChild(btn_retry);

            btn_retry.addEventListener("click", function (e) {
              e.preventDefault();
              refreshPage();
            });
          } else {
            max_value = answer_number - 1;
            answer_number = Math.floor((min_value + max_value) / 2);

            const phrase_random = Math.round(Math.random() * 4);

            switch (phrase_random) {
              case 1:
                answer_phrase = `Может быть, это число `;
                break;

              case 2:
                answer_phrase = `Возможно `;
                break;

              case 3:
                answer_phrase = `Это число `;
                break;

              case 4:
                answer_phrase = `Скорее всего, это число `;
                break;
            }

            card_body_col_text.innerText =
              answer_number >= 0
                ? numberToText(answer_number).length < 20 && answer_number >= 0
                  ? `${answer_phrase} ${numberToText(answer_number)}?`
                  : `${answer_phrase} ${answer_number}?`
                : numberToText(answer_number).length < 20
                ? `${answer_phrase} минус ${numberToText(answer_number)}?`
                : `${answer_phrase} ${answer_number}?`;
          }
        }
      });

      btn_equal.addEventListener("click", function (e) {
        e.preventDefault();
        if (gameRun) {
          let answer_phrase = "";

          const random_phrase = Math.round(Math.random() * 3);
          switch (random_phrase) {
            case 0:
              answer_phrase = `Я всегда угадываю!\n\u{1F60E}`;
              break;

            case 1:
              answer_phrase = `Yes!\n\u{1F60E}`;
              break;

            case 2:
              answer_phrase = `Отлично!\n\u{1F973}`;
              break;

            case 3:
              answer_phrase = `Я победил!\n\u{1F929}`;
              break;
          }

          card_body_col_text.innerText = answer_phrase;
          gameRun = false;

          btn_less.remove();
          btn_equal.remove();
          btn_more.remove();

          let card_footer = document.querySelector(".card-footer");

          let btn_retry = document.createElement("button");
          btn_retry.className = "form-btn btn btn-danger btn-lg";
          btn_retry.id = "btn_retry";
          btn_retry.textContent = "Заново";

          card_footer.appendChild(btn_retry);

          btn_retry.addEventListener("click", function (e) {
            e.preventDefault();
            refreshPage();
          });
        }
      });

      btn_more.addEventListener("click", function (e) {
        e.preventDefault();

        if (gameRun) {
          card_header.innerText = "Вопрос №" + clicks++;
          let answer_number = Math.floor((min_value + max_value) / 2);

          if (min_value === max_value) {
            const phrase_random = Math.round(Math.random() * 3);
            switch (phrase_random) {
              case 0:
                answer_phrase = `Вы загадали неправильное число!\n\u{1F914}`;
                break;

              case 1:
                answer_phrase = `Вы забыли, какое число загадали?\n\u{1F92A}`;
                break;

              case 2:
                answer_phrase = `Вы ошиблись с числом!\n\u{1F9D0}`;
                break;

              case 3:
                answer_phrase = `Не жульничайте!\n\u{1F620}`;
                break;
            }

            card_body_col_text.innerText = answer_phrase;
            gameRun = false;

            btn_less.remove();
            btn_equal.remove();
            btn_more.remove();

            let card_footer = document.querySelector(".card-footer");

            let btn_retry = document.createElement("button");
            btn_retry.className = "form-btn btn btn-danger btn-lg";
            btn_retry.id = "btn_retry";
            btn_retry.textContent = "Заново";

            card_footer.appendChild(btn_retry);

            btn_retry.addEventListener("click", function (e) {
              e.preventDefault();
              refreshPage();
            });
          } else {
            min_value = answer_number + 1;
            answer_number = Math.floor((min_value + max_value) / 2);

            const phrase_random = Math.round(Math.random() * 4);

            switch (phrase_random) {
              case 1:
                answer_phrase = `Может быть, это число `;
                break;

              case 2:
                answer_phrase = `Возможно `;
                break;

              case 3:
                answer_phrase = `Это число `;
                break;

              case 4:
                answer_phrase = `Скорее всего, это число `;
                break;
            }

            card_body_col_text.innerText =
              answer_number >= 0
                ? numberToText(answer_number).length < 20 && answer_number >= 0
                  ? `${answer_phrase} ${numberToText(answer_number)}?`
                  : `${answer_phrase} ${answer_number}?`
                : numberToText(answer_number).length < 20
                ? `${answer_phrase} минус ${numberToText(answer_number)}?`
                : `${answer_phrase} ${answer_number}?`;
          }
        }
      });
    });
  }
});