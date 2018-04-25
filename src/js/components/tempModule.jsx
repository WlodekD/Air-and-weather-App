import React from 'react';
import {getAPI} from '../api/getGeolocationData.js';
import weatherIcons from '../vendor/icons.json';

class TempModule extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : false,
            tempC: 'inline',
            tempF: 'none'
        }
    }

    componentDidMount(){
        getAPI(this.props.lat, this.props.lon, (data) => {
            if(data !== false){
                this.setState({
                    data: data
                })
            }
        })
    }

    showTempInC = () => {
        this.setState({
            tempC: 'inline',
            tempF: 'none'
        });
    };

    showTempInF = () => {
        this.setState({
            tempC: 'none',
            tempF: 'inline'
        });
    };

    render(){
        if(this.state.data === false){
            return null;
        }

        const locationName = this.state.data.name;

        // in Celcius
        const tempC = (this.state.data.main.temp - 273.15).toFixed(1);
        const tempF = ((this.state.data.main.temp - 273.15) * (9/5) + 32).toFixed(1);

        const description = this.state.data.weather["0"].description;
        const prefix = 'wi wi-';
        const code = this.state.data.weather[0].id;
        let icon = weatherIcons[code].icon;

        if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
            icon = 'day-' + icon;
        }

        icon = prefix+icon;

        return <div className='tempBox'>
            <div>
                <i className={icon}/>
                <p>{description}</p>
            </div>
            <div>
                <div>
                    <p style={{display: this.state.tempC}}>{tempC}</p>
                    <p style={{display: this.state.tempF}}>{tempF}</p>
                </div>
                <span>
                    <a onClick={this.showTempInC} href="#">&deg;C</a>
                    <a>|</a>
                    <a onClick={this.showTempInF} href="#">&deg;F</a>
                </span>
            </div>
        </div>
    }
}

export {TempModule}