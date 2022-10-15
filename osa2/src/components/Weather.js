const Weather = ({ weather }) => {
  return (
    <div>
      <h2>Weather in {weather.name}</h2>
      {weather !== '' ? (
        <div>
          <p>temperature {weather.main.temp} celsius</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={'Weather icon'}
          ></img>
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <div>no weather data</div>
      )}
    </div>
  )
}

export default Weather
