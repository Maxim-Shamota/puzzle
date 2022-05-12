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
                sum = Math.round(((+exitTech.value) * (+hoursTech.value)));
                if (toFireTech.checked) {
                    sum = sum + 10000;
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
                sum = Math.round(((+exitTech.value) * (+hoursTech.value)));
                if (toFireTech.checked) {
                    sum = sum + 10000;
                }
                resultTech.textContent = sum;
            };

            exitTech.addEventListener('change', officeFunc);
            hoursTech.addEventListener('change', officeFunc);
            toFireTech.addEventListener('change', officeFunc);
        }
        calcTechOffice('#shopExit', '#shopHours', '#shopToFire', '#shopResult');
    } catch (e) { }

    // калькулятор сборки кухни
    try {
        const calcKitchen = (sizeKitchen, washerKitchen, washerCutoutKitchen, hoodKitchen, ovenKitchen, dishwasherKitchen, frozenKitchen, washingKitchen, coffeeKitchen, hobKitchen, ventKitchen, transKitchen, cornerKitchen, filterKitchen, kitchenResult) => {
            const kitchenSize = document.querySelector(sizeKitchen),
                kitcherWasher = document.querySelector(washerKitchen),
                kitchenWasherCutout = document.querySelector(washerCutoutKitchen),
                kitchenHood = document.querySelector(hoodKitchen),
                kitchenOven = document.querySelector(ovenKitchen),
                kitchenDishWasher = document.querySelector(dishwasherKitchen),
                kitchenFrozen = document.querySelector(frozenKitchen),
                kitchenWashing = document.querySelector(washingKitchen),
                kitchenCoffee = document.querySelector(coffeeKitchen),
                kitchenHob = document.querySelector(hobKitchen),
                kitchenVent = document.querySelector(ventKitchen),
                kitchenTrans = document.querySelector(transKitchen),
                kitchenCorner = document.querySelector(cornerKitchen),
                kitchenFilter = document.querySelector(filterKitchen),
                resultKitchen = document.querySelector(kitchenResult);

            const kitchenFunc = () => {
                let sum = 0;

                if (kitchenSize.value > 0) {
                    sum = sum + (+kitchenSize.value * 2250);
                }
                if (kitcherWasher.checked) {
                    sum = sum + (+kitcherWasher.value);
                }
                if (kitchenWasherCutout.checked) {
                    sum = sum + (+kitchenWasherCutout.value);
                }
                if (kitchenHood.checked) {
                    sum = sum + (+kitchenHood.value);
                }
                if (kitchenOven.checked) {
                    sum = sum + (+kitchenOven.value);
                }
                if (kitchenDishWasher.checked) {
                    sum = sum + (+kitchenDishWasher.value);
                }
                if (kitchenFrozen.checked) {
                    sum = sum + (+kitchenFrozen.value);
                }
                if (kitchenWashing.checked) {
                    sum = sum + (+kitchenWashing.value);
                }
                if (kitchenCoffee.checked) {
                    sum = sum + (+kitchenCoffee.value);
                }
                if (kitchenHob.checked) {
                    sum = sum + (+kitchenHob.value);
                }
                if (kitchenVent.checked) {
                    sum = sum + (+kitchenVent.value);
                }
                if (kitchenTrans.checked) {
                    sum = sum + (+kitchenTrans.value);
                }
                if (kitchenCorner.checked) {
                    sum = sum + (+kitchenCorner.value);
                }
                if (kitchenFilter.checked) {
                    sum = sum + (+kitchenFilter.value);
                }
                resultKitchen.textContent = sum;
            };

            kitchenSize.addEventListener('input', kitchenFunc);
            kitcherWasher.addEventListener('change', kitchenFunc);
            kitchenWasherCutout.addEventListener('change', kitchenFunc);
            kitchenHood.addEventListener('change', kitchenFunc);
            kitchenOven.addEventListener('change', kitchenFunc);
            kitchenDishWasher.addEventListener('change', kitchenFunc);
            kitchenFrozen.addEventListener('change', kitchenFunc);
            kitchenWashing.addEventListener('change', kitchenFunc);
            kitchenCoffee.addEventListener('change', kitchenFunc);
            kitchenHob.addEventListener('change', kitchenFunc);
            kitchenVent.addEventListener('change', kitchenFunc);
            kitchenTrans.addEventListener('change', kitchenFunc);
            kitchenCorner.addEventListener('change', kitchenFunc);
            kitchenFilter.addEventListener('change', kitchenFunc);
        }
        calcKitchen('#sizeKitchen', '#washerKitchen', '#washerCutoutKitchen', '#hoodKitchen', '#ovenKitchen', '#dishwasherKitchen', '#frozenKitchen', '#washingKitchen', '#coffeeKitchen', '#hobKitchen', '#ventKitchen', '#transKitchen', '#cornerKitchen', '#filterKitchen', '#kitchenResult');
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


