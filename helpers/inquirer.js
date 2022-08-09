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
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: 2,
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: 3,
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: 4,
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: 5,
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: 6,
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir\n`
            }
        ]
    }
]

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

const listadoTareasBorrar = async(tareas) => {

    const choices = tareas.map((tarea, index) => {
        return {
            value: tarea.id,
            name: `${(index+1+'.').green} ${tarea.desc}`
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
            message: 'Borrar',
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
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}