import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

TestApp.propTypes = {
  amount: PropTypes.number,
  firstCurrency: PropTypes.string,
  secondCurrency: PropTypes.string,
  outPut: PropTypes.number,
};

export default function TestApp() {
  const [amount, setAmount] = useState(1);
  const [firstCurrency, setFirstCurrency] = useState("USD");
  const [secondCurrency, setSecondCurrency] = useState("EUR");
  const [outPut, setOutPut] = useState({});
  const [error, setError] = useState("");
  //console.log(amount,firstCurrency,secondCurrency)
  useEffect(
    function () {
      const controller = new AbortController();
      async function getConverted() {
        try {
          const response = await axios.get(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${firstCurrency}&to=${secondCurrency}`,
            { signal: controller.signal }
          );
          if (firstCurrency === secondCurrency)
            throw new Error("Currency could not be equal");
          if (amount === 0) return;
          setOutPut(response.data.rates);
          setError("");
        } catch (err) {
          if (err.name !== "AxiosError") {
            setError(err.message);
          }
        } finally {
          setError("");
        }
      }
      getConverted();
      return function () {
        controller.abort();
      };
    },
    [amount, firstCurrency, secondCurrency]
  );
  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      ></input>
      <select
        value={firstCurrency}
        onChange={(e) => setFirstCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={secondCurrency}
        onChange={(e) => setSecondCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {amount === 0
          ? ""
          : outPut.EUR || outPut.INR || outPut.USD || outPut.CAD}
        {error && <ErrorMessage message={error} />}
      </p>
    </div>
  );
}
const ErrorMessage = ({ message }) => {
  return (
    <p className="error">
      <span>❌</span>
      {message}
    </p>
  );
};
