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
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d2e45307a0b918c23ae702a610bbce8e&units=metric`
		).then((res) => {
			if (res.status === 200) {
				return res.json().then((data) => {
					setWeatherData({
						city: data.name,
						temp: data.main.temp,
						icon: data.weather[0].icon,
						description: data.weather[0].main,
					});
					setLoaderDisplay(false);
				});
			} else {
				setErrorDisplay(true);
			}
		});
	});
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
