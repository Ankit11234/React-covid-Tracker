import React from 'react';
import './Info.css';
import { Card, CardContent, Typography } from "@material-ui/core";

function Info({title,cases,isRed,active,total,...props}) {
    return (
        <Card onClick={props.onClick} className={`card ${active && 'active'} ${isRed && 'red'}`}>
            <CardContent>
                <Typography >
                {title}
                </Typography>
                <h2 className={`case ${!isRed && 'green'}`}>{cases}</h2>
                <Typography >
                {total} total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Info
