export interface Location {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state: string;
  value: string;
}

export interface Data {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: { lon: number, lat: number };
  dt: number;
  id: number;
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level: number
  };
  name: string;
  sys: { country: string, sunrise: number, sunset: number };
  timezone: number;
  visibility: number;
  weather: [{
    description: string;
    icon: string;
    id: number;
    main: string;
  }]
  wind: { speed: number, deg: number, gust: number }
}

export interface CardProps{
  data: Data
}