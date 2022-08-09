const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            },
        ]
    }
];

const inquirerMenu = async() => {
    console.clear();
    console.log('=============================='.green);
    console.log('    Seleccione una accion'.green);
    console.log('==============================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async() => {
    await inquirer.prompt([
        {
            type: 'input',
            name: 'pausa',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ]);
    console.log();
}

const leerInput = async(message) => {
    const {desc} = await inquirer.prompt([
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if(value.length === 0) return 'Por favor ingrese un valor';
                return true;
            }
        }
    ]);

    return desc;
}

const listarLugares = async(lugares) => {

    const choices = lugares.map((lugar,index) => {
        return {
            value: lugar.id,
            name: `${(index+1+'.').green} ${lugar.nombre}`
        }
    });
    
    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancelar` 
    });

    const {id} = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione un lugar:',
            choices
        }
    ]);

    return id;
}

const confirmar = async(message) => {
    
    const ok = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]);

    return ok;
}

const mostrarListadoCheckList = async(tareas) => {
    if (tareas.length !== 0) {
        const choices = tareas.map((tarea, index) => {
            return {
                value: tarea.id,
                name: `${(index+1+'.').green} ${tarea.desc}`,
                checked: (tarea.completadoEn) ? true : false
            }
        });
    
        const {ids} = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'ids',
                message: 'Check list tareas',
                choices
            }
        ]);
    
        return ids;
    } else {
        console.log('No hay tareas en la lista :D'.green);
    }
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoCheckList
}