import React from 'react';
import {getAPI} from '../api/getGeolocationData.js';

class PressHumModule extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pressure: 0,
            humidity: 0,
            windDeg: ''
        }
    }

    componentDidMount(){
        getAPI(this.props.lat, this.props.lon, (data) => {
            if(data !== false){
                this.setState({
                    pressure: data.main.pressure,
                    humidity: data.main.humidity,
                    windDeg: data.wind.deg
                })
            }
        })
    }

    render(){

        const windDeg = this.state.windDeg;
        const prefix = 'wi wi-wind towards-';
        const code = windDeg+'-deg';
        const windIcon = prefix+code;

        return <div className='pressHummBox'>
            <div className='pressHummBoxDiv'>
                <div>
                    <div className='pressure'>
                        <p>Ciśnienie</p>
                        <p>{this.state.pressure} hPa</p>
                    </div>
                    <hr className='hrStyle2'/>
                    <div className='humidity'>
                        <p>Wilgotność</p>
                        <p>{this.state.humidity}%</p>
                    </div>
                </div>
                <div>
                    <i className={windIcon}/>
                </div>
            </div>
            <hr className='hrStyle1'/>
        </div>
    }
}

export {PressHumModule}