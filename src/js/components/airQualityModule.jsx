import React from 'react';

class AirQualityModule extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lat: this.props.lat,
            long: this.props.lon,
            closestStationName: '',
            c6h6: '',
            co: '',
            no2: '',
            pm10: '',
            pm25: '',
            airColor: 'black',

            divInfo1: 'hidden',
            hideDiv1: 'visible',
            opacityInfo1: 0,
            opacityData1: 1,

            divInfoWidth1: 0,
            divInfoHeight1: 0,
            divDataWidth1: '7rem',
            fontSize1: 0,


            divInfo2: 'hidden',
            hideDiv2: 'visible',
            opacityInfo2: 0,
            opacityData2: 1,

            divInfoWidth2: 0,
            divInfoHeight2: 0,
            divDataWidth2: '7rem',
            fontSize2: 0,


            divInfo3: 'hidden',
            hideDiv3: 'visible',
            opacityInfo3: 0,
            opacityData3: 1,

            divInfoWidth3: 0,
            divInfoHeight3: 0,
            divDataWidth3: '7rem',
            fontSize3: 0,


            divInfo4: 'hidden',
            hideDiv4: 'visible',
            opacityInfo4: 0,
            opacityData4: 1,

            divInfoWidth4: 0,
            divInfoHeight4: 0,
            divDataWidth4: '7rem',
            fontSize4: 0,


            divInfo5: 'hidden',
            hideDiv5: 'visible',
            opacityInfo5: 0,
            opacityData5: 1,

            divInfoWidth5: 0,
            divInfoHeight5: 0,
            divDataWidth5: '7rem',
            fontSize5: 0,
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

        this.showInfo1 = () => {

            this.setState({
                divInfo1: 'visible',
                hideDiv1: 'hidden',
                opacityInfo1: 1,
                opacityData1: 0,
                divInfoWidth1: '14rem',
                divInfoHeight1: '14rem',
                fontSize1: '0.65rem',
                divDataWidth1: '0',

                hideDiv2: 'hidden',
                opacityData2: '0',
                divDataWidth2: '0',

                hideDiv3: 'hidden',
                opacityData3: '0',
                divDataWidth3: '0',

                hideDiv4: 'hidden',
                opacityData4: '0',
                divDataWidth4: '0',

                hideDiv5: 'hidden',
                opacityData5: '0',
                divDataWidth5: '0',
            });
        };

        this.hideInfo1 = () => {

            this.setState({
                divInfo1: 'hidden',
                hideDiv1: 'visible',
                opacityInfo1: 0,
                opacityData1: 1,
                divInfoWidth1: '0',
                divInfoHeight1: '0',
                fontSize1: '0',
                divDataWidth1: '7rem',

                hideDiv2: 'visible',
                opacityData2: '1',
                divDataWidth2: '7rem',

                hideDiv3: 'visible',
                opacityData3: '1',
                divDataWidth3: '7rem',

                hideDiv4: 'visible',
                opacityData4: '1',
                divDataWidth4: '7rem',

                hideDiv5: 'visible',
                opacityData5: '1',
                divDataWidth5: '7rem',
            });
        };

        this.showInfo2 = () => {

            this.setState({
                divInfo2: 'visible',
                hideDiv2: 'hidden',
                opacityInfo2: 1,
                opacityData12: 0,
                divInfoWidth2: '14rem',
                divInfoHeight2: '14rem',
                fontSize2: '0.65rem',
                divDataWidth2: '0',

                hideDiv1: 'hidden',
                opacityData1: '0',
                divDataWidth1: '0',

                hideDiv3: 'hidden',
                opacityData3: '0',
                divDataWidth3: '0',

                hideDiv4: 'hidden',
                opacityData4: '0',
                divDataWidth4: '0',

                hideDiv5: 'hidden',
                opacityData5: '0',
                divDataWidth5: '0',
            });
        };

        this.hideInfo2 = () => {

            this.setState({
                divInfo2: 'hidden',
                hideDiv2: 'visible',
                opacityInfo2: 0,
                opacityData2: 1,
                divInfoWidth2: '0',
                divInfoHeight2: '0',
                fontSize2: '0',
                divDataWidth2: '7rem',

                hideDiv1: 'visible',
                opacityData1: '1',
                divDataWidth1: '7rem',

                hideDiv3: 'visible',
                opacityData3: '1',
                divDataWidth3: '7rem',

                hideDiv4: 'visible',
                opacityData4: '1',
                divDataWidth4: '7rem',

                hideDiv5: 'visible',
                opacityData5: '1',
                divDataWidth5: '7rem',
            });
        };

        this.showInfo3 = () => {

            this.setState({
                divInfo3: 'visible',
                hideDiv3: 'hidden',
                opacityInfo3: 1,
                opacityData13: 0,
                divInfoWidth3: '14rem',
                divInfoHeight3: '14rem',
                fontSize3: '0.65rem',
                divDataWidth3: '0',

                hideDiv1: 'hidden',
                opacityData1: '0',
                divDataWidth1: '0',

                hideDiv2: 'hidden',
                opacityData2: '0',
                divDataWidth2: '0',

                hideDiv4: 'hidden',
                opacityData4: '0',
                divDataWidth4: '0',

                hideDiv5: 'hidden',
                opacityData5: '0',
                divDataWidth5: '0',
            });
        };

        this.hideInfo3 = () => {

            this.setState({
                divInfo3: 'hidden',
                hideDiv3: 'visible',
                opacityInfo3: 0,
                opacityData3: 1,
                divInfoWidth3: '0',
                divInfoHeight3: '0',
                fontSize3: '0',
                divDataWidth3: '7rem',

                hideDiv1: 'visible',
                opacityData1: '1',
                divDataWidth1: '7rem',

                hideDiv2: 'visible',
                opacityData2: '1',
                divDataWidth2: '7rem',

                hideDiv4: 'visible',
                opacityData4: '1',
                divDataWidth4: '7rem',

                hideDiv5: 'visible',
                opacityData5: '1',
                divDataWidth5: '7rem',
            });
        };

        this.showInfo4 = () => {

            this.setState({
                divInfo4: 'visible',
                hideDiv4: 'hidden',
                opacityInfo4: 1,
                opacityData14: 0,
                divInfoWidth4: '14rem',
                divInfoHeight4: '14rem',
                fontSize4: '0.65rem',
                divDataWidth4: '0',

                hideDiv1: 'hidden',
                opacityData1: '0',
                divDataWidth1: '0',

                hideDiv2: 'hidden',
                opacityData2: '0',
                divDataWidth2: '0',

                hideDiv3: 'hidden',
                opacityData3: '0',
                divDataWidth3: '0',

                hideDiv5: 'hidden',
                opacityData5: '0',
                divDataWidth5: '0',
            });
        };

        this.hideInfo4 = () => {

            this.setState({
                divInfo4: 'hidden',
                hideDiv4: 'visible',
                opacityInfo4: 0,
                opacityData4: 1,
                divInfoWidth4: '0',
                divInfoHeight4: '0',
                fontSize4: '0',
                divDataWidth4: '7rem',

                hideDiv1: 'visible',
                opacityData1: '1',
                divDataWidth1: '7rem',

                hideDiv2: 'visible',
                opacityData2: '1',
                divDataWidth2: '7rem',

                hideDiv3: 'visible',
                opacityData3: '1',
                divDataWidth3: '7rem',

                hideDiv5: 'visible',
                opacityData5: '1',
                divDataWidth5: '7rem',
            });
        };

        this.showInfo5 = () => {

            this.setState({
                divInfo5: 'visible',
                hideDiv5: 'hidden',
                opacityInfo5: 1,
                opacityData15: 0,
                divInfoWidth5: '14rem',
                divInfoHeight5: '14rem',
                fontSize5: '0.65rem',
                divDataWidth5: '0',

                hideDiv1: 'hidden',
                opacityData1: '0',
                divDataWidth1: '0',

                hideDiv2: 'hidden',
                opacityData2: '0',
                divDataWidth2: '0',

                hideDiv3: 'hidden',
                opacityData3: '0',
                divDataWidth3: '0',

                hideDiv4: 'hidden',
                opacityData4: '0',
                divDataWidth4: '0',
            });
        };

        this.hideInfo5 = () => {

            this.setState({
                divInfo5: 'hidden',
                hideDiv5: 'visible',
                opacityInfo5: 0,
                opacityData5: 1,
                divInfoWidth5: '0',
                divInfoHeight5: '0',
                fontSize5: '0',
                divDataWidth5: '7rem',

                hideDiv1: 'visible',
                opacityData1: '1',
                divDataWidth1: '7rem',

                hideDiv2: 'visible',
                opacityData2: '1',
                divDataWidth2: '7rem',

                hideDiv3: 'visible',
                opacityData3: '1',
                divDataWidth3: '7rem',

                hideDiv4: 'visible',
                opacityData4: '1',
                divDataWidth4: '7rem',
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

                <div onClick={this.hideInfo1} style={{visibility: this.state.divInfo1, opacity: this.state.opacityInfo1,
                    width: this.state.divInfoWidth1, height: this.state.divInfoHeight1, transition: 'opacity 2000ms, visibility 2000ms'}}>
                    <p className='infoDivParagraph' style={{fontSize: this.state.fontSize1}}>
                        <strong>Benzen</strong> – uważany za bardzo toksyczny i rakotwórczy co potwierdzają liczne badania.
                        Czy jest się czego bać? Odnotowywane największe stężenia benzenu w Polsce (22 µg/m3) są o ok 4 tyś.
                        razy słabsze od dawek mogących być niebezpiecznymi dla naszego zdrowia (80 mg/m3). Czy kompletnie
                        nie mamy czego się obawiać? Stężenia benzenu mogą być niebepieczne głównie w zamkniętych pomieszczeniach.
                        Bądźmy jednak ostrożni i zgłaszajmy każdy wypadek bądź odchylenie od normy.<br/>
                        <a href="http://www.chemiaibiznes.com.pl/aktualnosc/benzen-w-powietrzu-czy-jest-sie-czego-bac" target='_blank'>źródło</a>
                    </p>
                </div>
                <div className='divInfo' onClick={this.showInfo1} style={{visibility: this.state.hideDiv1,
                    opacity: this.state.opacityData1, width: this.state.divDataWidth1}}>
                    <p>Wskaźnik chh6</p>
                    <p style={{fontWeight: '700', color: airCol1, fontSize: '.9rem'}}>{this.state.c6h6}</p>
                </div>


                <div onClick={this.hideInfo2} style={{visibility: this.state.divInfo2, opacity: this.state.opacityInfo2,
                    width: this.state.divInfoWidth2, height: this.state.divInfoHeight2, transition: 'opacity 2000ms, visibility 2000ms'}}>
                    <p className='infoDivParagraph' style={{fontSize: this.state.fontSize2}}>
                        <strong>Tlenek węgla</strong> – jego toksyczność wynika z większego od tlenu (250–300 razy) powinowactwa
                        do hemoglobiny. Tworzy on połączenie zwane karboksyhemoglobiną, które jest trwalsze niż służąca do
                        transportu tlenu z płuc do tkanek oksyhemoglobina (połączenie tlenu z hemoglobiną).
                        Prowadzi to do niedotlenienia i może skutkować śmiercą. Może mieć pochodzenie naturalne (erupcje wulkanów,
                        naturalne pożary), ale jego głównymi źródłami są wysokotemperaturowe procesy technologiczne, w których paliwem
                        jest głównie węgiel i ropa naftowa. <br/>
                        <a href="https://pl.wikipedia.org/wiki/Tlenek_w%C4%99gla" target='_blank'>źródło</a>
                    </p>
                </div>
                <div className='divInfo' onClick={this.showInfo2} style={{visibility: this.state.hideDiv2,
                    opacity: this.state.opacityData2, width: this.state.divDataWidth2}}>
                    <p>Wskaźnik co</p>
                    <p style={{fontWeight: '700', color: airCol2, fontSize: '.9rem'}}>{this.state.co}</p>
                </div>

                <div onClick={this.hideInfo3} style={{visibility: this.state.divInfo3, opacity: this.state.opacityInfo3,
                    width: this.state.divInfoWidth3, height: this.state.divInfoHeight3, transition: 'opacity 2000ms, visibility 2000ms'}}>
                    <p className='infoDivParagraph' style={{fontSize: this.state.fontSize3}}>
                        <strong>Dwutlenek azotu</strong> - brunatny, silnie toksyczny gaz o ostrym zapachu.
                        Tlenki azotu są odopowiedialne nie tylko za powstawanie smogu ale również za powiększanie się dzury
                        ozonowej. Głównymi źródłami emisji dwutlenku azotu są transport drogowy, energetyka zawodowa oraz lokalne systemy
                        grzewcze. Dwutlenek azotu może powodować uczulenia, podrażniać płuca i powodować mniejszą odporność na infekcje
                        dróg oddechowych (np. grypa), a nawet powodować zwiększoną przewlekłą zachorowalność układu oddechowego u dzieci. <br/>
                        <a href="http://www.powietrze.podkarpackie.pl/index.php/item-85/ct-menu-item-87/ct-menu-item-89" target='_blank'>źródło</a>
                    </p>
                </div>
                <div className='divInfo' onClick={this.showInfo3} style={{visibility: this.state.hideDiv3,
                    opacity: this.state.opacityData3, width: this.state.divDataWidth3}}>
                    <p>Wskaźnik no2</p>
                    <p style={{fontWeight: '700', color: airCol5, fontSize: '.9rem'}}>{this.state.no2}</p>
                </div>

                <div onClick={this.hideInfo4} style={{visibility: this.state.divInfo4, opacity: this.state.opacityInfo4,
                    width: this.state.divInfoWidth4, height: this.state.divInfoHeight4, transition: 'opacity 2000ms, visibility 2000ms'}}>
                    <p className='infoDivParagraph' style={{fontSize: this.state.fontSize4}}>
                        <strong>Pył PM10</strong> składa się z mieszaniny cząstek zawieszonych w powietrzu, będących mieszaniną substancji organicznych i
                        nieorganicznych. Pył zawieszony może zawierać substancje toksyczne takie jak wielopierścieniowe węglowodory aromatyczne
                        (np. benzopireny), metale ciężkie oraz dioksyny i furany. Pył PM10 zawiera cząstki o średnicy mniejszej niż 10 mikrometrów,
                        które mogą docierać do górnych dróg oddechowych i płuc. Poziom dopuszczalny dla stężenia średniorocznego wynosi 40 µg/m3,
                        a poziom alarmowy 200 µg/m3. <br/>
                        <a href="http://sojp.wios.warszawa.pl/?page=pm" target='_blank'>źródło</a>
                    </p>
                </div>
                <div className='divInfo' onClick={this.showInfo4} style={{visibility: this.state.hideDiv4,
                    opacity: this.state.opacityData4, width: this.state.divDataWidth4}}>
                    <p>Wskaźnik pm10</p>
                    <p style={{fontWeight: '700', color: airCol3, fontSize: '.9rem'}}>{this.state.pm10}</p>
                </div>

                <div onClick={this.hideInfo5} style={{visibility: this.state.divInfo5, opacity: this.state.opacityInfo5,
                    width: this.state.divInfoWidth5, height: this.state.divInfoHeight5, transition: 'opacity 2000ms, visibility 2000ms'}}>
                    <p className='infoDivParagraph' style={{fontSize: this.state.fontSize5}}>
                        <strong>Pył PM2,5</strong> zawiera cząstki o średnicy mniejszej niż 2,5 mikrometra, które mogą docierać do górnych dróg oddechowych,
                        płuc oraz przenikać do krwi. Docelowa wartość średnioroczna dla pyłu PM2,5 wynosi 25 µg/m3. Największą emisję pyłów powoduje spalanie
                        węgla w starych i często źle wyregulowanych kotłach i piecach domowych. Emisja pyłów powodowana jest również przez przemysł, ale ze
                        względu na wysokość emitorów oraz obowiązujące przepisy regulujące dopuszczalne wartości emisji, źródła te mają zwykle dużo mniejszy
                        wpływ na jakość powietrza. <br/>
                        <a href="http://sojp.wios.warszawa.pl/?page=pm" target='_blank'>źródło</a>
                    </p>
                </div>
                <div className='divInfo' onClick={this.showInfo5} style={{visibility: this.state.hideDiv5,
                    opacity: this.state.opacityData5, width: this.state.divDataWidth5}}>
                    <p>Wskaźnik pm2.5</p>
                    <p style={{fontWeight: '700', color: airCol4, fontSize: '.9rem'}}>{this.state.pm25}</p>
                </div>

            </div>
            <hr className='hrStyle1'/>
        </div>
    }
}

export {AirQualityModule}