<script>
  import axios from 'axios';

  const API_KEY = 'decd7a39f6663f6c1ea0fadd';
  const BASE_URL = 'https://open.er-api.com/v6/latest/USD';

  /**
     * @param {string} baseCurrency
     * @param {string} targetCurrency
     */
   export async function getExchangeRate(baseCurrency, targetCurrency) {
    try {
      const response = await axios.get(`${BASE_URL}?base=${baseCurrency}&symbols=${targetCurrency}&apiKey=${API_KEY}`);
      const data = response.data;
      return data.rates[targetCurrency];
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      return null;
    }
  }

  import { onMount } from 'svelte';

  let amount1 = 0;
  let amount2 = 0;
  let currency1 = 'USD';
  let currency2 = 'EUR';
  let exchangeRate = 0.85;
  let convertedAmount1 = 0;
  let convertedAmount2 = 0;

  async function fetchExchangeRate() {
    exchangeRate = await getExchangeRate(currency1, currency2);
  }

  function convertAmount1() {
    convertedAmount1 = amount1 * exchangeRate;
    amount2 = convertedAmount1;
  }

  function convertAmount2() {
    convertedAmount2 = amount2 / exchangeRate;
    amount1 = convertedAmount2;
  }

  function handleAmount1Change() {
    if (amount1 !== 0) {
      convertAmount1();
    }
  }

  function handleAmount2Change() {
    if (amount2 !== 0) {
      convertAmount2();
    }
  }

  onMount(fetchExchangeRate);
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .input {
    margin-bottom: 10px;
  }
</style>

<div class="container">
  <h1>Конвертер валют</h1>
  <input class="input" type="number" bind:value={amount1} on:input={handleAmount1Change}>
  <select class="input" bind:value={currency1} on:change={fetchExchangeRate}>
    <option value="USD">USD</option>
    <option value="EUR">EUR</option>
    <option value="GBP">GBP</option>
  </select>
  <input class="input" type="number" bind:value={amount2} on:input={handleAmount2Change}>
  <select class="input" bind:value={currency2} on:change={fetchExchangeRate}>
    <option value="USD">USD</option>
    <option value="EUR">EUR</option>
    <option value="GBP">GBP</option>
  </select>
</div>
