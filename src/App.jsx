import { useEffect, useState } from 'react';

import './App.css';

function App() {
	const [value, setValue] = useState(0);
	const [currency, setCurrency] = useState('');
	const [baseCurrency, setBaseCurrency] = useState('USD');
	const [toCurrency, setToCurrency] = useState('USD');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(
		function () {
			if (value === 0) return;

			setIsLoading(true);

			async function getCurrency() {
				const res = await fetch(
					`https://api.frankfurter.app/latest?amount=${value}&from=${baseCurrency}&to=${toCurrency}`
				);

				const data = await res.json();
				console.log(data);
				// setCurrency(data);
				setCurrency(data.rates[toCurrency]);
				setIsLoading(false);
			}

			if (baseCurrency === toCurrency) return setCurrency(value);

			getCurrency();
		},
		[value, baseCurrency, toCurrency]
	);

	// const answer =
	// 	currency?.rates?.INR ||
	// 	currency?.rates?.USD ||
	// 	currency?.rates?.CAD ||
	// 	currency?.rates?.EUR;

	// const answer = currency?.rates?.toCurrency;

	return (
		<form>
			<input
				type='text'
				value={value}
				onChange={(e) => setValue(Number(e.target.value))}
				// disabled={isLoading}
			/>
			<select
				onChange={(e) => setBaseCurrency(e.target.value)}
				disabled={isLoading}>
				<option value='USD'>USD</option>
				<option value='EUR'>EUR</option>
				<option value='CAD'>CAD</option>
				<option value='INR'>INR</option>
			</select>
			<select
				onChange={(e) => setToCurrency(e.target.value)}
				disabled={isLoading}>
				<option value='USD'>USD</option>
				<option value='EUR'>EUR</option>
				<option value='CAD'>CAD</option>
				<option value='INR'>INR</option>
			</select>
			<p>
				{currency} {toCurrency}
			</p>
		</form>
	);
}

export default App;
