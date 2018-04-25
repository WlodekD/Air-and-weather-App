import React from 'react';
import {getAPI} from '../api/getGeolocationData.js';

class WindModule extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            windSpeed: 0
        }
    }

    componentDidMount(){
        getAPI(this.props.lat, this.props.lon, (data) => {
            if(data !== false){
                this.setState({
                    windSpeed: data.wind.speed,
                    windDeg: data.wind.deg
                })
            }
        })
    }

    render(){

        const windSKm = (this.state.windSpeed * 3.6).toFixed(1);
        const windDeg = this.state.windDeg;

        this.windDirFunc = (num) => {
            const val = Math.floor((num / 22.5)+ 0.5);
            const windDir = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
            return windDir[(val % 16)];
        };

        return <div className='windBoxWrapper'>
            <div className='windSpeedDiv'>
                <p className='windSpeed'>Prędkość wiatru:</p>
                <div>
                    <p>{windSKm} km/h</p>
                </div>
            </div>
            <div className='windDirDiv'>
                <p className='windDir'>Kierunek wiatru:</p>
                <div>
                    <p>{this.windDirFunc(windDeg)}</p>
                </div>
            </div>
        </div>
    }
}

export {WindModule};