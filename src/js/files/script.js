document.addEventListener('DOMContentLoaded', function () {
    const daySelect = document.getElementById('day');
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');

    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    const popupClose = document.getElementById('popup-close');

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = month;
        monthSelect.appendChild(option);
    });

    for (let i = currentYear; i >= 1924; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }

    function updateDays() {
        const month = parseInt(monthSelect.value, 10);
        const year = parseInt(yearSelect.value, 10);
        let daysInMonth = 31;

        if (!isNaN(month) && !isNaN(year)) {
            if (month === 2) {
                daysInMonth = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
            } else if ([4, 6, 9, 11].includes(month)) {
                daysInMonth = 30;
            }
        }

        daySelect.innerHTML = '<option value="">Выберите день</option>';

        for (let i = 1; i <= daysInMonth; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            daySelect.appendChild(option);
        }
    }

    monthSelect.addEventListener('change', updateDays);
    yearSelect.addEventListener('change', updateDays);

    function sumDigits(number) {
        return String(number).split('').map(Number).reduce((acc, num) => acc + num, 0);
    }

    function showPopup(message) {
        popupMessage.innerText = message;
        popup.style.display = 'block';
    }

    function calculateResults() {
        const day = parseInt(daySelect.value, 10);
        const month = parseInt(monthSelect.value, 10);
        const year = parseInt(yearSelect.value, 10);

        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            showPopup('Пожалуйста, выберите корректные значения для дня, месяца и года.');
            return;
        }

        if (year > currentYear ||
            (year === currentYear && month > currentMonth) ||
            (year === currentYear && month === currentMonth && day > currentDay)) {
            showPopup('Выбранная дата не может быть в будущем.');
            return;
        }

        const dayResult = day > 22 ? day - 22 : day;
        const monthResult = month;
        let yearSum = sumDigits(year);
        if (yearSum > 22) yearSum -= 22;

        const sumDayMonth = dayResult + monthResult;
        const sumMonthYear = monthResult + yearSum;
        let finalResult = sumDayMonth + sumMonthYear;

        if (finalResult > 22) finalResult -= 22;

        document.getElementById('dayResult').innerText = dayResult;
        document.getElementById('monthResult').innerText = monthResult;
        document.getElementById('yearResult').innerText = yearSum;
        document.getElementById('sumDayMonth').innerText = sumDayMonth;
        document.getElementById('sumMonthYear').innerText = sumMonthYear;
        document.getElementById('finalResult').innerText = finalResult;
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

    updateDays();
});