import PickCity from "../PickCity/PickCity";
import WeatherSummary from "../WeatherSummary/WeatherSummary";
import Loader from "../Loader/Loader";
import { useCallback } from "react";
import { useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";

const WeatherBox = (props) => {
	const [weatherData, setWeatherData] = useState(null);
	const [loaderDisplay, setLoaderDisplay] = useState(false);
	const [errorDisplay, setErrorDisplay] = useState(false);
	const handleCityChange = useCallback((city) => {
		setErrorDisplay(false);
		setLoaderDisplay(true);

		const apiKey = process.env.REACT_APP_API_KEY;
		const apiUrl = process.env.REACT_APP_API_URL;

		const fetchWeatherData = async () => {
			try {
				const res = await fetch(
					`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`
				);
				if (!res.ok) {
					throw new Error("Failed to fetch weather data");
				}

				const data = await res.json();
				setWeatherData({
					city: data.name,
					temp: data.main.temp,
					icon: data.weather[0].icon,
					description: data.weather[0].main,
				});
				setLoaderDisplay(false);
			} catch (error) {
				setErrorDisplay(true);
				setLoaderDisplay(false);
				console.error("Error fetching weather data:", error);
			}
		};
		fetchWeatherData();
	}, []);
	return (
		<section>
			<PickCity onSearch={handleCityChange} />
			{weatherData && !loaderDisplay && (
				<WeatherSummary weatherData={weatherData} />
			)}
			{loaderDisplay && !errorDisplay && <Loader />}
			{errorDisplay && <ErrorBox></ErrorBox>}
		</section>
	);
};

export default WeatherBox;
