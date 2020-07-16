const currency_oneElement = document.getElementById('currency-one');
const currency_twoElement = document.getElementById('currency-two');

const amount_oneElement = document.getElementById('amount-one');
const amount_twoElement = document.getElementById('amount-two');

const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currency_oneElement.value;
  const currency_two = currency_twoElement.value;

  fetch(`https://api.exchangeratesapi.io/latest?base=${currency_one}`)
    .then(res => res.json())
    .then(data => {

      const rate = data.rates[currency_two];

      rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amount_twoElement.value = (amount_oneElement.value * rate).toFixed(2);
    })
  ;
}

// Event listeners
currency_oneElement.addEventListener('change', calculate);

amount_oneElement.addEventListener('input', calculate);

currency_twoElement.addEventListener('change', calculate);

amount_twoElement.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currency_oneElement.value;
  currency_oneElement.value = currency_twoElement.value;
  currency_twoElement.value = temp;
  calculate();
});


calculate();
