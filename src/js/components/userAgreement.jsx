import React from 'react';
import ReactDOM from 'react-dom';
import {MainWrapper} from './mainComponent.jsx';

class AgreementModule extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userAgreement: null,
            sec: 0,
            lat: 0,
            lon: 0,
            data : false,
            image: []
        }
    }

    componentDidMount(){

        this.intervalID = setInterval(() => {

            this.setState({
                sec: this.state.sec + 1
            });

            if(this.state.sec === 1){
                if(navigator.geolocation){

                    navigator.geolocation.getCurrentPosition(position => {

                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;

                        if(lat !== null && lon !== null){
                            this.setState({
                                userAgreement: !null,
                                lat: lat,
                                lon: lon
                            })
                        } else {
                            window.location.reload();
                        }
                    });
                }
            } else if(this.state.sec === 20 && this.state.userAgreement === null){
                window.location.reload();
            } else if(this.state.sec === 21 || this.state.userAgreement !== null){
                clearInterval(this.intervalID);
            }

        }, 1000);
    }

    componentWillUnmount(){
        this.intervalID();
    }

    render(){

        const code = this.state.data;
        let weatherImg = 'clearSky';

        if(code === 800){
            weatherImg = 'clearSky'
        } else if(code >= 200 && code <= 232){
            weatherImg = 'thunder'
        } else if(code >= 300 && code <= 321){
            weatherImg = 'drizzleRain'
        } else if(code >= 500 && code <= 531){
            weatherImg = 'rain'
        } else if(code >= 600 && code <= 622){
            weatherImg = 'snow'
        } else if(code >= 701 && code <= 731){
            weatherImg = 'dayHaze'
        } else if(code >= 741 && code <= 781){
            weatherImg = 'fog'
        } else if(code >= 801 && code <= 804){
            weatherImg = 'cloudyGusts'
        } else if(code >= 900 && code <= 902){
            weatherImg = 'tornado'
        } else if(code >= 952 && code <= 962){
            weatherImg = 'windy'
        }

        const style = {
            backgroundImage: "url('../assets/images/"+weatherImg+".jpg')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        };

        if(this.state.userAgreement === null){
            return <div className='permissionWrap'>
                <div className='permissionDiv'>
                    <p>
                        Aplikacja którą masz przed sobą do poprawnego działania potrzebuje
                        Twoich danych geolokacyjnych. <br/> Jeśli więc chcesz z niej skorzystać
                        zezwól na sprawdzenie Twojej lokacji.
                    </p>
                </div>
            </div>
        } if(this.state.userAgreement !== null) {
            return <div>
                <div style={style}>
                    <MainWrapper lat={this.state.lat} lon={this.state.lon} />
                </div>
            </div>
        }
    }
}

class App extends React.Component {
    render(){
        return <AgreementModule />
    }
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});
