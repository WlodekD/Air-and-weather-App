import React from 'react';
import {LocationModule} from './locationModule.jsx';
import {TempModule} from './tempModule.jsx';
import {AirQualityModule} from './airQualityModule.jsx';
import {PressHumModule} from './pressureHumidityModule.jsx';
import {WindModule} from './windModule.jsx';

class MainWrapper extends React.Component {

    render(){

        const lat = this.props.lat;
        const lon = this.props.lon;

        return <div className='mainWrapper'>
            <LocationModule lat={lat} lon={lon}/>
            <TempModule lat={lat} lon={lon} />
            <AirQualityModule lat={lat} lon={lon} />
            <PressHumModule lat={lat} lon={lon} />
            <WindModule lat={lat} lon={lon} />
        </div>
    }
}

export {MainWrapper};