const axios = require('axios');
const fs = require('fs');
require('colors');

const { MAPBOX_KEY, OPENWEATHER_KEY } = process.env;
const db = './db/historial.json';

class Busquedas {

    constructor() {

    }

    get paramsMapbox() {
        return {
            'language': 'es',
            'limit': 5,
            'access_token': MAPBOX_KEY
        }
    }

    async ciudades(lugar) {
        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox,
            });

            const resp = await instance.get();

            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lon: lugar.center[0],
                lat: lugar.center[1]
            }));

        } catch (error) {
            return [];
        }
    }

    async detalleCiudad(lat, lon) {

        try {
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {
                    'lat': lat,
                    'lon': lon,
                    'appid': OPENWEATHER_KEY,
                    'units': 'metric',
                    'lang': 'es'
                }
            });

            const resp = await instance.get();

            const { weather, main } = resp.data;

            return {
                descripcion: weather[0].description,
                temp: main.temp,
                temp_min: main.temp_min,
                temp_max: main.temp_max
            }

        } catch (error) {
            
        }

    }

    guardarHistorial(nombre, historial) {

        if (historial.includes(nombre)) return

        if (historial.length >= 5) historial.pop();

        historial.unshift(nombre);

        fs.writeFileSync(db,JSON.stringify(historial));
    }

    leerHistorial() {
        if (fs.existsSync(db)) {
            const historial = JSON.parse(fs.readFileSync(db,{encoding: 'utf8'}));
            return historial;
        }

        return [];
    }

    mostrarHistorial(historial) {
        console.clear();
        console.log('Historial de busqueda\n'.green);
        let cont = 0;
        historial.forEach(ciudad => {
            cont++
            console.log(`${(cont+'.').green} ${ciudad}`);
        });
        console.log();
    }
}

module.exports = Busquedas;