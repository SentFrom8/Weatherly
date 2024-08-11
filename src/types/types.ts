export type Geolocation = {
  country: string;
  lat: number;
  local_names: [];
  lon: number;
  name: string;
  state: string;
}

export type WeatherData = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level?: number;
    grnd_level?: number;
    humidity: number;
    temp_kf: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  visibility?: number;
  pop: number;
  rain?: {
    '3h': number;
  };
  snow?: {
    '3h': number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export type CurrentWeatherData = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level?: number;
    grnd_level?: number;
    humidity: number;
  };
  visibility?: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  rain?: {
    '1h'?: number;
    '3h'?: number;
  };
  snow?: {
    '1h'?: number;
    '3h'?: number;
  };
  dt: number; // Time of data calculation, unix, UTC
  sys: {
    type?: number;
    id?: number;
    message?: number;
    country: string;
    sunrise: number; // Sunrise time, unix, UTC
    sunset: number; // Sunset time, unix, UTC
  };
  timezone: number; // Shift in seconds from UTC
  id: number; // City ID
  name: string; // City name
  cod: number; // Internal parameter
}

export type ForecastData = {
  cod: string;
  message: number;
  cnt: number;
  list: Array<WeatherData>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population?: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}