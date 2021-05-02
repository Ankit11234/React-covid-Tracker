import React from 'react';
import './Map.css';
import numeral from 'numeral'

function Map({c}) {
    return (
        <div className="aa">

            <h1>Cases by Countries</h1>
            <div className="head">
            {
                c.map(({country,cases})=>(
                    <div className="pss"> <p>{country}</p>
                    <p>{numeral(cases).format("0,0")}</p>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default Map



