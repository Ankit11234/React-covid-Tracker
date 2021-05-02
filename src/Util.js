import numeral from 'numeral';
import React from 'react';
import './Util.css'
import { Circle, Popup } from "react-leaflet";

export const editValue = (stat) => (
    stat ? `+${numeral(stat).format("0.0a")}`
        : '+0')


const casesTypeColors = {
    cases: {
        hex: '#CC1034',
        mult: 400
    },
    recovered: {
        hex: '#7DD71D',
        mult: 600
    },
    deaths: {
        hex: '#B50527',
        mult: 1000
    },
}



export const sortData = (data) => {

    const sortedData = data;
    return sortedData.sort(
        (a, b) => (b.cases - a.cases));
};

export const showData = (data, casesType) => (

    data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            pathOptions={{

                color: casesTypeColors[casesType].hex,
                fillColor: casesTypeColors[casesType].hex,
            }}
            radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].mult}
        >
            <Popup>
                <div>
                    <div className='info-flag' style={{ backgroundImage: `url(${country.countryInfo.flag})` }} />
                    <div><h1>{country.country}</h1></div>
                    <div>Cases: {numeral(country.cases).format("0,0")}</div>
                    <div>Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div>Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>

        </Circle>
    ))

)