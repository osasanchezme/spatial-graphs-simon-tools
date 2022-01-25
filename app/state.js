const $ = require('jquery');
const config = require('../config.json');
const graph = require('./graph');
const getState = require('./getState');

let d = 10;
let dz = -10;
let c = 'rgb(211,211,211)';
let f = 'rgb(220,220,220)';
const data = [
    {
        type: 'mesh3d',
        x: [0, 0, -d, -d, d, d, 0, 0, -d, -d, d, d],
        y: [0, d, d, -d, -d, 0, 0, d, d, -d, -d, 0],
        z: [0, 0, 0, 0, 0, 0, dz, dz, dz, dz, dz, dz],
        i: [1, 1, 2, 2, 3, 3, 4, 4, 0, 0, 0, 0, 6, 6, 6, 6],
        j: [8, 8, 3, 8, 4, 9, 5, 10, 1, 3, 5, 3, 7, 9, 11, 9],
        k: [2, 7, 9, 9, 10, 10, 11, 11, 2, 2, 4, 4, 8, 8, 10, 10],
        facecolor: [c, c, c, c, c, c, c, c, f, f, f, f, f, f, f, f],
        lighting: {
            ambient: 1,
        },
        opacity: 1,
        // intensity: intensity,
        // colorscale: [
        //     [0, 'rgb(0, 0, 255)'],
        //     [0.5, 'rgb(0, 0, 255)'],
        //     [1, 'rgb(0, 0, 255)'],
        // ],
    },
];

const initial_state = {
    problem: 'boussinesq',
    // problem: 'kelvin',
    // problem: 'cerruti',
    view: {
        x: 0,
        y: 0,
        z: {
            min: 0,
            max: 100,
        },
    },
    data: data,
};

function initializeApp() {
    const available_problems = {
        Boussinesq: {},
        Kelvin: {},
        Cerruti: {},
    };
    // Set options to the dropdown
    Object.keys(available_problems).forEach((problem_name) => {
        $('#problem_name').append(
            `<option value="${String(problem_name).toLowerCase()}">${problem_name}</option>`
        );
        console.log(problem_name);
    });
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
    graph.updatePlot();
}

module.exports = {
    initial_state,
    setState,
    initializeApp,
    getState,
};
