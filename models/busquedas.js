const axios = require('axios');

class Busquedas {

    constructor() {

    }

    async ciudad(lugar) {
        try {
            const response = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/santa%20rosa%20de%20osos.json?language=es&limit=5&access_token=pk.eyJ1IjoiYWxlam9wcDA2IiwiYSI6ImNsNm1sN3NvMTBteW0zZG4wc3Z5ZWRqOHoifQ.b_0k9dbc6BoaRmMhjI4NVg')

            console.log(response.data);
        } catch (error) {
            return [];
        }
    }
}

module.exports = Busquedas;