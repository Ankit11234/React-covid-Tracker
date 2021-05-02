import { MenuItem, FormControl, Select, } from "@material-ui/core";
import { useState, useEffect } from "react";
import Info from './Info.js';
import Map from './Map.js';
import LineGraph from './LineGraph.js';
import Graph from './Graph.js';
import "leaflet/dist/leaflet.css"
import { editValue, sortData } from './Util.js';
import './App.css';

function App() {

  const [countries, setCountries] = useState([]);
  const [mapCountry, setMapCountry] = useState([]);
  const [c, setC] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapcenter, setMapcenter] = useState([34.80, -40.47]);
  const [mapzoom, setMapzoom] = useState(3);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {

    fetch("https://disease.sh/v3/covid-19/all")
      .then(res => res.json())
      .then(data => {
        setCountryInfo(data);
      })

  }, []);
  useEffect(() => {

    const getData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ))
          const sortedData = sortData(data);
          setCountries(countries);
          setMapCountry(data)
          setC(sortedData);
        })
    }
    getData();

  }, [])

  const change = async (event) => {
    const countrycode = event.target.value;
    setCountry(countrycode);

    const url = countrycode === "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countrycode}`;

    await fetch(url)
      .then(res => res.json())
      .then(data => {
        setCountry(countrycode);
        setCountryInfo(data);
        countrycode === "worldwide" ? setMapcenter([34.80, -40.47])
          : setMapcenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapzoom(4);

      })
  };
  return (
    <div className="App">

      <div className='left'>
        <div className="app__header">

          <h1>COVID-19 TRACKER </h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={change}
              value={country}>

              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country) => (

                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>

          </FormControl>

        </div>

        <div className="app__stats">
          <Info
            isRed
            onClick={(e) => setCasesType("cases")}
            active={casesType === "cases"}
            title="Covid cases" cases={editValue(countryInfo.todayCases)}
            total={editValue(countryInfo.cases)} />
          <Info
            onClick={(e) => setCasesType("recovered")}
            active={casesType === "recovered"}
            title="Recoveres" cases={editValue(countryInfo.todayRecovered)}
            total={editValue(countryInfo.recovered)} />
          <Info
            isRed
            onClick={(e) => setCasesType("deaths")}
            active={casesType === "deaths"}
            title="Deaths" cases={editValue(countryInfo.todayDeaths)} total=
            {editValue(countryInfo.deaths)} />

        </div>

        <Graph center={mapcenter} zoom={mapzoom} mapcountries={mapCountry} casesType={casesType} />
      </div>

      <div className='right'>
        <Map cases={countryInfo.cases} countries={countries} c={c} />
        <LineGraph casesType={casesType} />
      </div>

    </div>

  );
}

export default App;
