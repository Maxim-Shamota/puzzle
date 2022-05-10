// Подключение функционала "Чертогов Фрилансера"
import { isMobile, removeClasses } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

window.onload = function () {
    document.addEventListener("click", documentActions);

    //Actions (делегирование событий click)
    function documentActions(e) {
        const targetElement = e.target;
        if (window.innerWidth > 768 && isMobile.any()) {
            if (targetElement.classList.contains('menu__arrow')) {
                targetElement.closest('.menu__item').classList.toggle('_hover');
            }
            if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
                removeClasses(document.querySelectorAll('.menu__item._hover'), '_hover');
            }
        }
    }

    //Header
    const headerElement = document.querySelector('.header');

    const callback = function (entries, observer) {
        if (entries[0].isIntersecting) {
            headerElement.classList.remove('_scroll');
        } else {
            headerElement.classList.add('_scroll');
        }
    }

    const headerObserver = new IntersectionObserver(callback);
    headerObserver.observe(headerElement);

    // калькулятор установки душевой кабины
    try {
        const calcCab = (cabSize, cabPallet, cabGenerator, mkadCab, resultCab) => {
            const sizeCab = document.querySelector(cabSize),
                palletCab = document.querySelector(cabPallet),
                generatorCab = document.querySelector(cabGenerator),
                cabMkad = document.querySelector(mkadCab),
                cabResult = document.querySelector(resultCab);

            let sum = 0;
            const cabFunc = () => {
                sum = Math.round((+sizeCab.value) + (+palletCab.value) + (+generatorCab.value));
                if (cabMkad.value > 0) {
                    sum = sum + 300 + (+cabMkad.value * 30);
                }
                cabResult.textContent = sum;
            };

            sizeCab.addEventListener('change', cabFunc);
            palletCab.addEventListener('change', cabFunc);
            generatorCab.addEventListener('change', cabFunc);
            cabMkad.addEventListener('input', cabFunc);
        }
        calcCab('#cabSize', '#cabPallet', '#cabGenerator', '#mkadCab', '#resultCab');
    } catch (e) { }

    // калькулятор ремонта поддона
    try {
        const calcPallet = (palletSize, palletCab, palletRift, palletMkad, palletResult) => {
            const sizePallet = document.querySelector(palletSize),
                cabPallet = document.querySelector(palletCab),
                riftPallet = document.querySelector(palletRift),
                mkadPallet = document.querySelector(palletMkad),
                resultPallet = document.querySelector(palletResult);

            let sum = 0;
            const palletFunc = () => {
                sum = Math.round((+sizePallet.value) + (+cabPallet.value) + (+riftPallet.value));
                if (mkadPallet.value > 0) {
                    sum = sum + 300 + (+mkadPallet.value * 30);
                }
                resultPallet.textContent = sum;
            };

            sizePallet.addEventListener('change', palletFunc);
            cabPallet.addEventListener('change', palletFunc);
            riftPallet.addEventListener('change', palletFunc);
            mkadPallet.addEventListener('input', palletFunc);
        }
        calcPallet('#palletSize', '#palletCab', '#palletRift', '#palletMkad', '#palletResult');
    } catch (e) { }

    // калькулятор техобслуживания офисов
    try {
        const calcTechOffice = (techExit, techHours, techToFire, techResult) => {
            const exitTech = document.querySelector(techExit),
                hoursTech = document.querySelector(techHours),
                toFireTech = document.querySelector(techToFire),
                resultTech = document.querySelector(techResult);

            let sum = 0;
            const officeFunc = () => {
                sum = 2000 + Math.round(((+exitTech.value) * (+hoursTech.value)));
                if (toFireTech.checked) {
                    sum = sum + 1000;
                }
                resultTech.textContent = sum;
            };

            exitTech.addEventListener('change', officeFunc);
            hoursTech.addEventListener('change', officeFunc);
            toFireTech.addEventListener('change', officeFunc);
        }
        calcTechOffice('#techExit', '#techHours', '#techToFire', '#techResult');
    } catch (e) { }

    // калькулятор техобслуживания магазинов
    try {
        const calcTechOffice = (shopExit, shopHours, shopToFire, shopResult) => {
            const exitTech = document.querySelector(shopExit),
                hoursTech = document.querySelector(shopHours),
                toFireTech = document.querySelector(shopToFire),
                resultTech = document.querySelector(shopResult);

            let sum = 0;
            const officeFunc = () => {
                sum = 2000 + Math.round(((+exitTech.value) * (+hoursTech.value)));
                if (toFireTech.checked) {
                    sum = sum + 1000;
                }
                resultTech.textContent = sum;
            };

            exitTech.addEventListener('change', officeFunc);
            hoursTech.addEventListener('change', officeFunc);
            toFireTech.addEventListener('change', officeFunc);
        }
        calcTechOffice('#shopExit', '#shopHours', '#shopToFire', '#shopResult');
    } catch (e) { }

}

// для отправки формы в телеграм

jQuery(document).ready(function () {
    jQuery("form").submit(function () { // Событие отправки с формы
        var form_data = jQuery(this).serialize(); // Собираем данные из полей
        jQuery.ajax({
            type: "POST", // Метод отправки
            url: "sendform.php", // Путь к PHP обработчику sendform.php
            data: form_data,
            success: swal({
                title: "Ваши данные отправлены. Мы перезвоним Вам в течении 60 секунд!",
                type: "success",
                showConfirmButton: false,
                timer: 2000
            })
        });
        // $(this).find('input, textarea').prop('reset', true);
        event.preventDefault();
    });
});


