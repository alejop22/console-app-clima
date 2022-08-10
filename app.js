require('dotenv').config();
require('colors')
const { inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async() => {

    const busquedas = new Busquedas();

    let opt = '';
    do {

        const historial = busquedas.leerHistorial();

        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                const ciudad = await leerInput('Ciudad: ');
                
                const lugares = await busquedas.ciudades(ciudad);

                const id = await listarLugares(lugares);

                if (id === '0') continue;
                
                const {nombre, lon, lat } = lugares.find(lugar => lugar.id === id);
                
                busquedas.guardarHistorial(nombre, historial);

                const {descripcion, temp, temp_min, temp_max} = await busquedas.detalleCiudad(lat,lon);
                
                console.clear();
                console.log('\nInformacion de la ciudad\n');
                console.log('Ciudad:', nombre.green);
                console.log('Como esta el clima:', descripcion.green);
                console.log('Latitud:', lat);
                console.log('Longitud:', lon);
                console.log(`Temperatura: ${(temp+'°').green}`);
                console.log(`Minima: ${(temp_min+'°').green}`);
                console.log(`Maxima: ${(temp_max+'°').green}`);

                break;
            case 2:
                busquedas.mostrarHistorial(historial);
                break;
        }

        if(opt !== 0) await pausa();

    } while (opt !== 0);
}

main();