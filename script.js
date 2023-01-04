/*Zmienne */
const currency1 = document.querySelector("#currency-one");

const currency2 = document.querySelector("#currency-two");

const amount1 = document.querySelector("#value-one");
const amount2 = document.querySelector("#value-two");
const swapBtn = document.querySelector(".swap");
const rateInfo = document.querySelector(".rate-info");

const currency1Value = currency1.value;
const currency2Value = currency2.value;

const amount1Value = amount1.value;
const amount2Value = amount2.value;

/*Wywołanie funkcji po załadowaniu strony */
exchangeApp();

/* AddEventListery: */

//funkcja dla swapBtn zamieniająca wartości walut (i siłą rzeczy aktywująca funkcję)
swapBtn.addEventListener("click", () => {
    swapCurrencies();
    exchangeApp();
});

// Zmiana walut uaktywnia funkcję exchangeApp()
currency1.addEventListener("change", exchangeApp);
currency2.addEventListener("change", exchangeApp);

amount1.addEventListener("input", exchangeApp);

/* Funkcje */
function exchangeApp() {
    // przypisanie zmiennych
    let currency1Value = currency1.value;
    let currency2Value = currency2.value;

    // pobranie odpowiednich danych z API
    /* Dane zostały pobrane kodem dostępnym na stronie źródłowej. Równie dobrze można było zrobić to 
        metodą fetch(); 

        fetch(`https://api.exchangerate.host/convert?from=PLN&to=USD`)
                .then((response) => response.json())
                .then((data) => console.log(data)); 

*/

    var requestURL = `https://api.exchangerate.host/convert?from=${currency1Value}&to=${currency2Value}`;
    var request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType = "json";
    request.send();

    request.onload = function () {
        var response = request.response;
        console.log(response);

        console.log(response.result);

        amount2.value = (amount1.value * response.result).toFixed(2);

        changeRateInfo(response.result, currency1Value, currency2Value);
    };
}

function swapCurrencies() {
    let oldValue1 = currency1.value;
    let oldValue2 = currency2.value;

    currency1.value = oldValue2;
    currency2.value = oldValue1;
}

function changeRateInfo(ratio, curr1, curr2) {
    rateInfo.textContent = `1 ${curr1} = ${ratio} ${curr2}`;
}
