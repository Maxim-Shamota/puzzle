document.addEventListener('DOMContentLoaded', function () {
    const birthDaySelect = document.getElementById('birthDay');
    const birthMonthSelect = document.getElementById('birthMonth');
    const birthYearSelect = document.getElementById('birthYear');

    const currentDaySelect = document.getElementById('currentDay');
    const currentMonthSelect = document.getElementById('currentMonth');
    const currentYearSelect = document.getElementById('currentYear');

    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    const popupClose = document.getElementById('popup-close');

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Месяцы начинаются с 0
    const currentDay = currentDate.getDate();

    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    // Заполнение месяцов в обоих выпадающих списках
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = month;

        // Добавление в месяц рождения
        birthMonthSelect.appendChild(option.cloneNode(true));
        // Добавление в текущий месяц
        currentMonthSelect.appendChild(option.cloneNode(true));
    });

    // Заполнение годов в обоих выпадающих списках
    for (let i = currentYear; i >= 1924; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        birthYearSelect.appendChild(option.cloneNode(true));
        currentYearSelect.appendChild(option.cloneNode(true));
    }

    function updateDays(selectMonth, selectYear, selectDay) {
        const month = parseInt(selectMonth.value, 10);
        const year = parseInt(selectYear.value, 10);
        let daysInMonth = 31;

        if (!isNaN(month) && !isNaN(year)) {
            if (month === 2) {
                daysInMonth = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
            } else if ([4, 6, 9, 11].includes(month)) {
                daysInMonth = 30;
            }
        }

        selectDay.innerHTML = '<option value="">Выберите день</option>';

        for (let i = 1; i <= daysInMonth; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            selectDay.appendChild(option);
        }
    }

    // Добавление обработчиков событий для обновления дней
    birthMonthSelect.addEventListener('change', () => {
        updateDays(birthMonthSelect, birthYearSelect, birthDaySelect);
    });
    birthYearSelect.addEventListener('change', () => {
        updateDays(birthMonthSelect, birthYearSelect, birthDaySelect);
    });

    currentMonthSelect.addEventListener('change', () => {
        updateDays(currentMonthSelect, currentYearSelect, currentDaySelect);
    });
    currentYearSelect.addEventListener('change', () => {
        updateDays(currentMonthSelect, currentYearSelect, currentDaySelect);
    });

    function sumDigits(number) {
        return String(number).split('').map(Number).reduce((acc, num) => acc + num, 0);
    }

    function showPopup(message) {
        popupMessage.innerText = message;
        popup.style.display = 'block';
    }

    function calculateResults() {
        const day = parseInt(birthDaySelect.value, 10);
        const month = parseInt(birthMonthSelect.value, 10);
        const year = parseInt(birthYearSelect.value, 10);

        const currentDay = parseInt(currentDaySelect.value, 10);
        const currentMonth = parseInt(currentMonthSelect.value, 10);
        const currentYear = parseInt(currentYearSelect.value, 10);

        if (isNaN(day) || isNaN(month) || isNaN(year) || isNaN(currentDay) || isNaN(currentMonth) || isNaN(currentYear)) {
            showPopup('Пожалуйста, выберите корректные значения для всех дат.');
            return;
        }

        if (year > currentYear ||
            (year === currentYear && month > currentMonth) ||
            (year === currentYear && month === currentMonth && day > currentDay)) {
            showPopup('Дата рождения не может быть позже текущей даты.');
            return;
        }

        const dayResult = day;
        const monthResult = month;
        let yearSum = sumDigits(year);
        if (yearSum > 22) yearSum -= 22;

        let sumDayMonth = dayResult + monthResult;
        if (sumDayMonth > 22) sumDayMonth -= 22;

        const sumMonthYear = monthResult + yearSum;
        let finalResult = sumDayMonth + sumMonthYear;

        if (finalResult > 22) finalResult -= 22;

        let lcgSum = sumDigits(dayResult + monthResult + sumDigits(currentYear));
        let lcgResult = sumDigits(lcgSum);

        let yearScenarioSum = day + sumDigits(currentYear);
        if (yearScenarioSum > 22) yearScenarioSum -= 22;

        let lessonSum = sumDigits(month) + sumDigits(currentYear);
        if (lessonSum > 22) lessonSum -= 22;

        let birthYearSum = sumDigits(year);
        if (birthYearSum > 22) birthYearSum -= 22;

        let yearExamSum = sumDigits(birthYearSum) + sumDigits(currentYear);
        if (yearExamSum > 22) yearExamSum -= 22;

        // Ключевой Аркан 1
        let adjustedBirthDay = sumDigits(day);
        let adjustedBirthMonth = sumDigits(month);
        let keyArc1 = adjustedBirthDay + adjustedBirthMonth + sumDigits(currentYear);
        if (keyArc1 > 22) keyArc1 -= 22;

        // Ключевой Аркан 2
        if (day > 22) {
            adjustedBirthDay = day - 22; // Обновляем день
        }
        let keyArc2 = sumDigits(adjustedBirthDay) + sumDigits(month) + sumDigits(currentYear);
        if (keyArc2 > 22) keyArc2 -= 22;

        // Ключевой Аркан 3
        let ageDifference = currentYear - year;
        let adjustedCurrentYear = currentYear + ageDifference;
        let keyArc3 = sumDigits(adjustedCurrentYear);
        if (keyArc3 > 22) keyArc3 -= 22;

        let resourceYear = lessonSum + yearExamSum;
        if (resourceYear > 22) resourceYear -= 22;

        let givesEnergy = sumMonthYear + sumDigits(currentYear);
        if (givesEnergy > 22) givesEnergy -= 22;

        let possibilities = resourceYear + givesEnergy;
        if (possibilities > 22) possibilities -= 22;

        let voltage = yearScenarioSum + lessonSum;
        if (voltage > 22) voltage -= 22;

        let takesEnergy = sumDayMonth + sumDigits(currentYear);
        if (takesEnergy > 22) takesEnergy -= 22;

        let barrier = voltage + takesEnergy;
        if (barrier > 22) barrier -= 22;

        let idea = finalResult + sumDigits(currentYear);
        if (idea > 22) idea -= 22;

        let assistant = idea + lessonSum;
        if (assistant > 22) assistant -= 22;

        let taskYear = dayResult + monthResult + yearSum + sumDigits(currentYear);
        if (taskYear > 22) taskYear -= 22;

        let month1 = yearScenarioSum + currentMonth;
        if (month1 > 22) month1 -= 22;

        let month2 = lessonSum + currentMonth;
        if (month2 > 22) month2 -= 22;

        let month3 = yearExamSum + currentMonth;
        if (month3 > 22) month3 -= 22;

        let month4 = keyArc1 + currentMonth;
        if (month4 > 22) month4 -= 22;

        let month5 = keyArc2 + currentMonth;
        if (month5 > 22) month5 -= 22;

        let month6 = keyArc3 + currentMonth;
        if (month6 > 22) month6 -= 22;

        let lcm = sumDigits(lcgSum + currentMonth);

        let taskMonth = taskYear + currentMonth;
        if (taskMonth > 22) taskMonth -= 22;

        let day1 = month1 + currentDay;
        if (day1 > 22) day1 -= 22;
        if (day1 > 22) day1 -= 22;

        let day2 = month2 + currentDay;
        if (day2 > 22) day2 -= 22;
        if (day2 > 22) day2 -= 22;

        let day3 = month3 + currentDay;
        if (day3 > 22) day3 -= 22;
        if (day3 > 22) day3 -= 22;

        let day4 = month4 + currentDay;
        if (day4 > 22) day4 -= 22;
        if (day4 > 22) day4 -= 22;

        let day5 = month5 + currentDay;
        if (day5 > 22) day5 -= 22;
        if (day5 > 22) day5 -= 22;

        let day6 = month6 + currentDay;
        if (day6 > 22) day6 -= 22;
        if (day6 > 22) day6 -= 22;

        let lcd = sumDigits(lcm + currentDay);

        let taskDay = taskMonth + currentDay;
        if (taskDay > 22) taskDay -= 22;

        // Update the results in the DOM
        document.getElementById('dayResult').innerText = dayResult;
        document.getElementById('monthResult').innerText = monthResult;
        document.getElementById('yearResult').innerText = yearSum;
        document.getElementById('sumDayMonth').innerText = sumDayMonth;
        document.getElementById('sumMonthYear').innerText = sumMonthYear;
        document.getElementById('finalResult').innerText = finalResult;
        document.getElementById('lcgResult').innerText = lcgResult;
        document.getElementById('yearScenario').innerText = yearScenarioSum;
        document.getElementById('lesson').innerText = lessonSum;
        document.getElementById('yearExam').innerText = yearExamSum;
        document.getElementById('keyArc1').innerText = keyArc1;
        document.getElementById('keyArc2').innerText = keyArc2;
        document.getElementById('keyArc3').innerText = keyArc3;
        document.getElementById('resourceYear').innerText = resourceYear;
        document.getElementById('givesEnergy').innerText = givesEnergy;
        document.getElementById('possibilities').innerText = possibilities;
        document.getElementById('voltage').innerText = voltage;
        document.getElementById('takesEnergy').innerText = takesEnergy;
        document.getElementById('barrier').innerText = barrier;
        document.getElementById('idea').innerText = idea;
        document.getElementById('assistant').innerText = assistant;
        document.getElementById('taskYear').innerText = taskYear;
        document.getElementById('month1').innerText = month1;
        document.getElementById('month2').innerText = month2;
        document.getElementById('month3').innerText = month3;
        document.getElementById('month4').innerText = month4;
        document.getElementById('month5').innerText = month5;
        document.getElementById('month6').innerText = month6;
        document.getElementById('lcm').innerText = lcm;
        document.getElementById('taskMonth').innerText = taskMonth;
        document.getElementById('day1').innerText = day1;
        document.getElementById('day2').innerText = day2;
        document.getElementById('day3').innerText = day3;
        document.getElementById('day4').innerText = day4;
        document.getElementById('day5').innerText = day5;
        document.getElementById('day6').innerText = day6;
        document.getElementById('lcd').innerText = lcd;
        document.getElementById('taskDay').innerText = taskDay;
    }

    document.getElementById('calculateLink').addEventListener('click', function (event) {
        event.preventDefault();
        calculateResults();
    });

    popupClose.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    window.onclick = function (event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    };

    // Инициализация дней для рождения и текущей даты
    updateDays(birthMonthSelect, birthYearSelect, birthDaySelect);
    updateDays(currentMonthSelect, currentYearSelect, currentDaySelect);
});