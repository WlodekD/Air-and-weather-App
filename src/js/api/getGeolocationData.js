function getAPI(lat, long, callback) {
    let url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&APPID=65abbbf90e06e64ea43e8b0ebaa43bb0';
    fetch(url)
        .then(res => {
            if (res.ok){
                return res.json();
            }
            else {
                throw new Error('Błąd sieci!');
            }
        })
        .then(data  => {
            callback(data);
        }).catch( err => {
            console.log( err );
    })

}

export {getAPI};
