import React from 'react';

class AirQualityModule extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lat: 0,
            long: 0,
            closestStationName: '',
            c6h6: '',
            co: '',
            no2: '',
            pm10: '',
            pm25: '',
            airColor: 'black',

            divInfo1: 'none',
            hideDiv1: 'flex',

            divInfo2: 'none',
            hideDiv2: 'flex',

            divInfo3: 'none',
            hideDiv3: 'flex',

            divInfo4: 'none',
            hideDiv4: 'flex',

            divInfo5: 'none',
            hideDiv5: 'flex',
        };

    }

    componentDidMount() {

        fetch('https://cors-anywhere.herokuapp.com/https://api.gios.gov.pl/pjp-api/rest/station/findAll').then( resp => {
            if (resp.ok)
                return resp.json();
            else
                throw new Error('Something went wrong');
        }).then( data => {
            const latU = Number(this.state.lat);
            const longU = Number(this.state.long);
            const stationsArr = [];

            let minDist = Infinity;
            let closestID = Number;
            data.forEach(el => {
                const {gegrLat, gegrLon, id} = el;
                const dist = (Math.abs(latU - gegrLat)) + (Math.abs(longU - gegrLon));
                if(dist < minDist){
                    minDist = dist;
                    closestID = id;
                    stationsArr.push(el);
                }
            });

            const closestStationCity = stationsArr[stationsArr.length - 1].city.name;
            const closestStationStreet = stationsArr[stationsArr.length - 1].addressStreet;

            this.getClosestStationName(closestStationCity,closestStationStreet);
            this.getID(closestID);

        }).catch( err => {
            console.log('error! ', err);
        });

        this.getClosestStationName = (city, street) => {
            this.setState({
                closestStationName: city +', '+street,
            });
        };

        this.getID = (id) => {
            fetch('https://cors-anywhere.herokuapp.com/http://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/'+id)
                .then(r => r.json())
                .then( data => {
                    if(data.c6h6IndexLevel !== null){
                        this.setState({
                            c6h6: data.c6h6IndexLevel.indexLevelName
                        })
                    } else {
                        this.setState({
                            c6h6: "Brak danych z punktu pomiaru"
                        })
                    }

                    if(data.coIndexLevel !== null) {
                        this.setState({
                            co: data.coIndexLevel.indexLevelName
                        })
                    } else {
                        this.setState({
                            co: "Brak danych z punktu pomiaru"
                        })
                    }

                    if(data.no2IndexLevel !== null){
                        this.setState({
                            no2: data.no2IndexLevel.indexLevelName
                        })
                    } else {
                        this.setState({
                            no2: "Brak danych z punktu pomiaru"
                        })
                    }

                    if(data.pm10IndexLevel !== null){
                        this.setState({
                            pm10: data.pm10IndexLevel.indexLevelName
                        })
                    } else {
                        this.setState({
                            pm10: "Brak danych z punktu pomiaru"
                        })
                    }

                    if(data.pm25IndexLevel !== null){
                        this.setState({
                            pm25: data.pm25IndexLevel.indexLevelName
                        })
                    }else {
                        this.setState({
                            pm25:  "Brak danych z punktu pomiaru"
                        })
                    }
                });
        };

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    lat: position.coords.latitude.toFixed(4),
                    long: position.coords.longitude.toFixed(4)
                });
            });
        }

        this.showInfo1 = () => {

            this.setState({
                divInfo1: 'flex',
                hideDiv1: 'none',

                hideDiv2: 'none',
                hideDiv3: 'none',
                hideDiv4: 'none',
                hideDiv5: 'none'
            });
        };

        this.hideInfo1 = () => {

            this.setState({
                divInfo1: 'none',
                hideDiv1: 'flex',

                hideDiv2: 'flex',
                hideDiv3: 'flex',
                hideDiv4: 'flex',
                hideDiv5: 'flex'
            });
        };

        this.showInfo2 = () => {

            this.setState({
                divInfo2: "flex",
                hideDiv2: 'none',

                hideDiv1: 'none',
                hideDiv3: 'none',
                hideDiv4: 'none',
                hideDiv5: 'none'
            });
        };

        this.hideInfo2 = () => {

            this.setState({
                divInfo2: "none",
                hideDiv2: 'flex',

                hideDiv1: 'flex',
                hideDiv3: 'flex',
                hideDiv4: 'flex',
                hideDiv5: 'flex'
            });
        };

        this.showInfo3 = () => {

            this.setState({
                divInfo3: "flex",
                hideDiv3: 'none',

                hideDiv1: 'none',
                hideDiv2: 'none',
                hideDiv4: 'none',
                hideDiv5: 'none'
            });
        };

        this.hideInfo3 = () => {

            this.setState({
                divInfo3: "none",
                hideDiv3: 'flex',

                hideDiv1: 'flex',
                hideDiv2: 'flex',
                hideDiv4: 'flex',
                hideDiv5: 'flex'
            });
        };

        this.showInfo4 = () => {

            this.setState({
                divInfo4: "flex",
                hideDiv4: 'none',

                hideDiv1: 'none',
                hideDiv2: 'none',
                hideDiv3: 'none',
                hideDiv5: 'none'
            });
        };

        this.hideInfo4 = () => {

            this.setState({
                divInfo4: "none",
                hideDiv4: 'flex',

                hideDiv1: 'flex',
                hideDiv2: 'flex',
                hideDiv3: 'flex',
                hideDiv5: 'flex'
            });
        };

        this.showInfo5 = () => {

            this.setState({
                divInfo5: "flex",
                hideDiv5: 'none',

                hideDiv1: 'none',
                hideDiv2: 'none',
                hideDiv3: 'none',
                hideDiv4: 'none'
            });
        };

        this.hideInfo5 = () => {

            this.setState({
                divInfo5: "none",
                hideDiv5: 'flex',

                hideDiv1: 'flex',
                hideDiv2: 'flex',
                hideDiv3: 'flex',
                hideDiv4: 'flex'
            });
        };
    }

    render(){

        let airCol1 = '';
        let airCol2 = '';
        let airCol3 = '';
        let airCol4 = '';
        let airCol5 = '';

        switch (this.state.c6h6) {
            case "Bardzo dobry":
                airCol1 = 'rgb(20,125,10)';
                break;
            case "Dobry":
                airCol1 = 'rgb(32,196,16)';
                break;
            case "Umiarkowany":
                airCol1 = 'rgb(237,196,14)';
                break;
            case "Dostateczny":
                airCol1 = 'rgb(239,110,22)';
                break;
            case "Zły":
                airCol1 = 'rgb(239,51,30)';
                break;
            case "Bardzo zły":
                airCol1 = 'rgb(140,30,17)';
                break;
        }

        switch (this.state.co) {
            case "Bardzo dobry":
                airCol2 = 'rgb(20,125,10)';
                break;
            case "Dobry":
                airCol2 = 'rgb(32,196,16)';
                break;
            case "Umiarkowany":
                airCol2 = 'rgb(237,196,14)';
                break;
            case "Dostateczny":
                airCol2 = 'rgb(239,110,22)';
                break;
            case "Zły":
                airCol2 = 'rgb(239,51,30)';
                break;
            case "Bardzo zły":
                airCol2 = 'rgb(140,30,17)';
                break;
        }

        switch (this.state.pm10) {
            case "Bardzo dobry":
                airCol3 = 'rgb(20,125,10)';
                break;
            case "Dobry":
                airCol3 = 'rgb(32,196,16)';
                break;
            case "Umiarkowany":
                airCol3 = 'rgb(237,196,14)';
                break;
            case "Dostateczny":
                airCol3 = 'rgb(239,110,22)';
                break;
            case "Zły":
                airCol3 = 'rgb(239,51,30)';
                break;
            case "Bardzo zły":
                airCol3 = 'rgb(140,30,17)';
                break;
        }

        switch (this.state.pm25) {
            case "Bardzo dobry":
                airCol4 = 'rgb(20,125,10)';
                break;
            case "Dobry":
                airCol4 = 'rgb(32,196,16)';
                break;
            case "Umiarkowany":
                airCol4 = 'rgb(237,196,14)';
                break;
            case "Dostateczny":
                airCol4 = 'rgb(239,110,22)';
                break;
            case "Zły":
                airCol4 = 'rgb(239,51,30)';
                break;
            case "Bardzo zły":
                airCol4 = 'rgb(140,30,17)';
        }

        switch (this.state.no2) {
            case "Bardzo dobry":
                airCol5 = 'rgb(20,125,10)';
                break;
            case "Dobry":
                airCol5 = 'rgb(32,196,16)';
                break;
            case "Umiarkowany":
                airCol5 = 'rgb(237,196,14)';
                break;
            case "Dostateczny":
                airCol5 = 'rgb(239,110,22)';
                break;
            case "Zły":
                airCol5 = 'rgb(239,51,30)';
                break;
            case 'Bardzo zły':
                airCol5 = 'rgb(140,30,17)';
                break;
        }

        return <div className='airQualityBox'>
            <hr className='hrStyle1'/>
            <div>
                <h1>Index jakości powietrza</h1>
                <h2>Twoja najbliższa stacja pomiaru:</h2>
                <p>{this.state.closestStationName}</p>
            </div>
            <div className='airQFlexBox'>

                <div onClick={this.hideInfo1} style={{display: this.state.divInfo1, width: '14rem', height: '14rem'}}>
                    <p className='infoDivParagraph'>
                        <strong>Benzen</strong> – uważany za bardzo toksyczny i rakotwórczy co potwierdzają liczne badania.
                        Czy jest się czego bać? Odnotowywane największe stężenia benzenu w Polsce (22 µg/m3) są o ok 4 tyś.
                        razy słabsze od dawek mogących być niebezpiecznymi dla naszego zdrowia (80 mg/m3). Czy kompletnie
                        nie mamy czego się obawiać? Stężenia benzenu mogą być niebepieczne głównie w zamkniętych pomieszczeniach.
                        Bądźmy jednak ostrożni i zgłaszajmy każdy wypadek bądź odchylenie od normy.<br/>
                        <a href="http://www.chemiaibiznes.com.pl/aktualnosc/benzen-w-powietrzu-czy-jest-sie-czego-bac" target='_blank'>źródło</a>
                    </p>
                </div>
                <div className='divInfo' onClick={this.showInfo1} style={{display: this.state.hideDiv1}}>
                    <p>Wskaźnik chh6</p>
                    <p style={{fontWeight: '700', color: airCol1, fontSize: '.9rem'}}>{this.state.c6h6}</p>
                </div>


                <div onClick={this.hideInfo2} style={{display: this.state.divInfo2, width: '14rem', height: '14rem'}}>
                    <p className='infoDivParagraph'>
                        <strong>Tlenek węgla</strong> – jego toksyczność wynika z większego od tlenu (250–300 razy) powinowactwa
                        do hemoglobiny. Tworzy on połączenie zwane karboksyhemoglobiną, które jest trwalsze niż służąca do
                        transportu tlenu z płuc do tkanek oksyhemoglobina (połączenie tlenu z hemoglobiną).
                        Prowadzi to do niedotlenienia i może skutkować śmiercą. Może mieć pochodzenie naturalne (erupcje wulkanów,
                        naturalne pożary), ale jego głównymi źródłami są wysokotemperaturowe procesy technologiczne, w których paliwem
                        jest głównie węgiel i ropa naftowa. <br/>
                        <a href="https://pl.wikipedia.org/wiki/Tlenek_w%C4%99gla" target='_blank'>źródło</a>
                    </p>
                </div>
                <div className='divInfo' onClick={this.showInfo2} style={{display: this.state.hideDiv2}}>
                    <p>Wskaźnik co</p>
                    <p style={{fontWeight: '700', color: airCol2, fontSize: '.9rem'}}>{this.state.co}</p>
                </div>

                <div onClick={this.hideInfo3} style={{display: this.state.divInfo3, width: '14rem', height: '14rem'}}>
                    <p className='infoDivParagraph'>
                        <strong>Dwutlenek azotu</strong> - brunatny, silnie toksyczny gaz o ostrym zapachu.
                        Tlenki azotu są odopowiedialne nie tylko za powstawanie smogu ale również za powiększanie się dzury
                        ozonowej. Głównymi źródłami emisji dwutlenku azotu są transport drogowy, energetyka zawodowa oraz lokalne systemy
                        grzewcze. Dwutlenek azotu może powodować uczulenia, podrażniać płuca i powodować mniejszą odporność na infekcje
                        dróg oddechowych (np. grypa), a nawet powodować zwiększoną przewlekłą zachorowalność układu oddechowego u dzieci. <br/>
                        <a href="http://www.powietrze.podkarpackie.pl/index.php/item-85/ct-menu-item-87/ct-menu-item-89" target='_blank'>źródło</a>
                    </p>
                </div>
                <div className='divInfo' onClick={this.showInfo3} style={{display: this.state.hideDiv3}}>
                    <p>Wskaźnik no2</p>
                    <p style={{fontWeight: '700', color: airCol5, fontSize: '.9rem'}}>{this.state.no2}</p>
                </div>

                <div onClick={this.hideInfo4} style={{display: this.state.divInfo4, width: '14rem', height: '14rem'}}>
                    <p className='infoDivParagraph'>
                        <strong>Pył PM10</strong> składa się z mieszaniny cząstek zawieszonych w powietrzu, będących mieszaniną substancji organicznych i
                        nieorganicznych. Pył zawieszony może zawierać substancje toksyczne takie jak wielopierścieniowe węglowodory aromatyczne
                        (np. benzopireny), metale ciężkie oraz dioksyny i furany. Pył PM10 zawiera cząstki o średnicy mniejszej niż 10 mikrometrów,
                        które mogą docierać do górnych dróg oddechowych i płuc. Poziom dopuszczalny dla stężenia średniorocznego wynosi 40 µg/m3,
                        a poziom alarmowy 200 µg/m3. <br/>
                        <a href="http://sojp.wios.warszawa.pl/?page=pm" target='_blank'>źródło</a>
                    </p>
                </div>
                <div className='divInfo' onClick={this.showInfo4} style={{display: this.state.hideDiv4}}>
                    <p>Wskaźnik pm10</p>
                    <p style={{fontWeight: '700', color: airCol3, fontSize: '.9rem'}}>{this.state.pm10}</p>
                </div>

                <div onClick={this.hideInfo5} style={{display: this.state.divInfo5, width: '14rem', height: '14rem'}}>
                    <p className='infoDivParagraph'>
                        <strong>Pył PM2,5</strong> zawiera cząstki o średnicy mniejszej niż 2,5 mikrometra, które mogą docierać do górnych dróg oddechowych,
                        płuc oraz przenikać do krwi. Docelowa wartość średnioroczna dla pyłu PM2,5 wynosi 25 µg/m3. Największą emisję pyłów powoduje spalanie
                        węgla w starych i często źle wyregulowanych kotłach i piecach domowych. Emisja pyłów powodowana jest również przez przemysł, ale ze
                        względu na wysokość emitorów oraz obowiązujące przepisy regulujące dopuszczalne wartości emisji, źródła te mają zwykle dużo mniejszy
                        wpływ na jakość powietrza. <br/>
                        <a href="http://sojp.wios.warszawa.pl/?page=pm" target='_blank'>źródło</a>
                    </p>
                </div>
                <div className='divInfo' onClick={this.showInfo5} style={{display: this.state.hideDiv5}}>
                    <p>Wskaźnik pm2.5</p>
                    <p style={{fontWeight: '700', color: airCol4, fontSize: '.9rem'}}>{this.state.pm25}</p>
                </div>

            </div>
            <hr className='hrStyle1'/>
        </div>
    }
}

export {AirQualityModule}