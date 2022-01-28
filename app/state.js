const $ = require('jquery');
const config = require('../config.json');
const graph = require('./graph');
const getState = require('./getState');

function initializeApp() {
    const available_problems = {
        Boussinesq: {
            sz: {
                formula: '(3 * d.z ** 3) / d.R ** 5',
                symbol: '\\sigma_z',
            },
        },
        Kelvin: {},
        Cerruti: {
            sz: { formula: '(3 * d.z ** 4) / d.R ** 5', symbol: '\\sigma_z' },
            // Basic structure ready, missing select result to plot
        },
    };
    window.problems = available_problems;
    console.log(window.problems);
    // Set options to the dropdown
    Object.keys(available_problems).forEach((problem_name) => {
        $('#problem_name').append(`<option value="${String(problem_name).toLowerCase()}">${problem_name}</option>`);
        console.log(problem_name);
    });
}

function createInitialState() {
    let initial_state = {
        problem: 'boussinesq',
        // problem: 'kelvin',
        // problem: 'cerruti',
        load: 2 * Math.PI.toFixed(3),
        view: {
            x: 0,
            y: 0,
            z: {
                min: 0,
                max: -1,
            },
            space: 1,
        },
        settings: {
            resolution: 100,
        },
    };
    initial_state.data = graph.createPlotData(initial_state);
    return initial_state;
}

function setState(model) {
    const curr_model = getState();
    if (curr_model !== model) {
        const data = graph.createPlotData(model);
        model.data = data;
        window[config.app_name].state = model;
        updateUI();
    }
}

function updateUI() {
    const model = getState();
    $('#xdist').val(Number(model.view.x));
    $('#ydist').val(Number(model.view.y));
    $('#problem_name').val(String(model.problem));
    $('#zdist').val(Number(model.view.z.max));
    $('#space').val(Number(model.view.space));
    $('#resolution').val(Number(model.settings.resolution));
    $('#load').val(Number(model.load));
    graph.updatePlot();
}

module.exports = {
    setState,
    initializeApp,
    getState,
    createInitialState,
};
