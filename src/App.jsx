import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { getWeatherByCity } from "./services/weatherAPI.js";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [backgroundClass, setBackgroundClass] = useState("bg-morning");
  const [localTime, setLocalTime] = useState("");

  const handleSearch = async (cityName) => {
    setCity(cityName);
    setError("");
    setWeather(null);
    setLocalTime("");

    try {
      const data = await getWeatherByCity(cityName);
      setWeather(data);
      
      // ✅ Calcular la hora real del país con timezone
      const utcSeconds = data.dt + data.timezone;
      const localDate = new Date(utcSeconds * 1000);

      // ✅ Formatear a AM/PM
      let hours = localDate.getUTCHours();
      const minutes = localDate.getUTCMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;

      const formattedTime = `${hours}:${minutes} ${ampm}`;
      setLocalTime(formattedTime);

      // ✅ Cambiar fondo según hora local
      const hour = localDate.getUTCHours(); // importante: UTC
      let bgClass = "";
      if (hour >= 6 && hour < 12) {
        bgClass = "bg-morning";
      } else if (hour >= 12 && hour < 18) {
        bgClass = "bg-afternoon";
      } else if (hour >= 18 && hour < 21) {
        bgClass = "bg-evening";
      } else {
        bgClass = "bg-night";
      }
      setBackgroundClass(bgClass);
    } catch (err) {
      setError("Ciudad no encontrada o error con la API");
    }
  };

  return (
    <div className={`min-vh-100 d-flex flex-column ${backgroundClass}`}>
      <header className="text-center my-3">
<div className="d-inline-block p-1 rounded-circle" style={{
  background: 'linear-gradient(135deg, #ffffff 0%, #e0f7fa 100%)',
  border: '2px solid #00bcd4',
  boxShadow: '0 4px 10px rgba(0, 188, 212, 0.3)'
}}>
  <img
    src="/src/images/1.png"
    alt="Mi Logotipo"
    className="rounded-circle"
    style={{ width: "100px", height: "100px" }}
  />
</div>
      </header>
      <h1 className="text-center mb-4">🌤️ Pronóstico del Tiempo</h1>
      <SearchBar onSearch={handleSearch} />

      {error && <p className="text-danger text-center">{error}</p>}

      {weather && (
        <div
          className="card text-center mt-4 mx-auto"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <div className="card-body">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <div className="d-flex justify-content-center my-3">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt="icono clima"
                className="rounded-circle border shadow bg-white p-2"
                style={{
                  width: "80px",
                  height: "80px",
                  transition: "transform 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>
            <h4>{weather.weather[0].description}</h4>
            <p>🌡️ Temperatura: {weather.main.temp} °C</p>
            <p>💧 Humedad: {weather.main.humidity}%</p>
            <p>🌬️ Viento: {weather.wind.speed} m/s</p>
            <p>☁️ Nubosidad: {weather.clouds.all}%</p>
            <p>🕒 Hora local: {localTime}</p>
          </div>
        </div>
      )}
      <footer className="text-center py-3 mt-auto">
        <p>Sígueme en redes:</p>
        <a
          href="https://www.facebook.com/nicolas.cortesgarcia.1/"
          target="_blank"
          className="mx-2 text-dark"
        >
          <i className="bi bi-facebook"></i>
        </a>
        <a
          href="https://github.com/Niko-NkDev"
          target="_blank"
          className="mx-2 text-dark"
        >
          <i class="bi bi-github"></i>
        </a>
        <a
          href="https://www.instagram.com/nico.nkd/"
          target="_blank"
          className="mx-2 text-dark"
        >
          <i class="bi bi-instagram"></i>
        </a>
        <a
          href="https://www.linkedin.com/feed/"
          target="_blank"
          className="mx-2 text-dark"
        >
          <i class="bi bi-linkedin"></i>
        </a>
      </footer>
    </div>
  );
}

export default App;
