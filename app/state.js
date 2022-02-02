const $ = require('jquery');
const config = require('../config.json');
const graph = require('./graph');
const getState = require('./getState');
const helpers = require('./helpers');

function initializeApp() {
    const available_problems = {
        Boussinesq: {
            sz: {
                formula: '(3 * d.z ** 3) / d.R ** 5',
                symbol: 'σ<sub>zz</sub>',
                units: 'kPa',
                max: 10,
				min: null,
            },
            sr: {
                formula: '-(1 / d.R**2)*((-3*d.z*d.r**2 / d.R**3) - ((1-2*d.v)*d.R/(d.R + d.z)))',
                custom: 'd.v = 0.2',
                symbol: 'σ<sub>rr</sub>',
                units: 'kPa',
                max: 10,
				min: null,
            },
            st: {
                formula: '-((1-2*d.v)/(d.R**2)) * (d.z/d.R - d.R/(d.R + d.z))',
                custom: 'd.v = 0.2',
                symbol: 'σ<sub>θθ</sub>',
                units: 'kPa',
                max: 5,
				min: -5,
            },
            trz: {
                formula: '(3*d.r*d.z**2 / (d.R**5))',
                symbol: 'τ<sub>rz</sub>',
                units: 'kPa',
                max: 10,
				min: null,
            },
            dz: {
                formula: '((1+d.v) / (d.E * d.R)) * (2*(1-d.v) + d.z**2 / d.R**2)',
                custom: 'd.v = 0.2; d\.E = 20000000',
                symbol: 'ε<sub>z</sub>',
                units: '[]',
                max: 0.000001,
				min: null,
            },
            dr: {
                formula: '((1+d.v) / (d.E * d.R)) * (d.r**2 / d.R**2 - (1-2*d.v)*d.r/(d.R+d.z))',
                custom: 'd.v = 0.2; d\.E = 20000000',
                symbol: 'ε<sub>r</sub>',
                units: '[]',
                max: 0.0000001,
				min: null,
            },
        },
        "Kelvin - Puntual": {
            sz: {
                formula: '1/(4*(1-d.v)) * (3*d.z**3 / d.R**5 + (d.z*(1-2*d.v))/d.R**3)',
                custom: 'd.v = 0.2',
                symbol: 'σ<sub>zz</sub>',
                units: 'kPa',
                max: 10,
				min: null,
            },
            sr: {
                formula: 'd.z/(4*(1-d.v)*d.R**3) * (3*d.r**2 / d.R**5 - (1-2*d.v))',
                custom: 'd.v = 0.2',
                symbol: 'σ<sub>rr</sub>',
                units: 'kPa',
                max: 10,
				min: -10,
            },
            st: {
                formula: '((1-2*d.v)/(4*(1-d.v))) * (d.z/d.R**3)',
                custom: 'd.v = 0.2',
                symbol: 'σ<sub>θθ</sub>',
                units: 'kPa',
                max: 10,
				min: null,
            },
            trz: {
                formula: 'd.r/(4*(1-d.v)*d.R**3) * (3*d.z**2 / d.R**2 + (1-2*d.v))',
                custom: 'd.v = 0.2',
                symbol: 'τ<sub>rz</sub>',
                units: 'kPa',
                max: 10,
				min: null,
            },
            dz: {
                formula: '((1+d.v) / (d.E * d.R * 4 * (1-d.v))) * (3 - 4*d.v + d.z**2 / d.R**2)',
                custom: 'd.v = 0.2; d\.E = 20000000',
                symbol: 'ε<sub>z</sub>',
                units: '[]',
                max: 0.000001,
				min: null,
            },
            dr: {
                formula: '((1+d.v) / (d.E * 4 * (1-d.v))) *(d.r*d.z/d.R**3)',
                custom: 'd.v = 0.2; d\.E = 20000000',
                symbol: 'ε<sub>r</sub>',
                units: '[]',
                max: 0.0000001,
				min: null,
            },
        },
        Cerruti: {
            sz: {
                formula: '3*d.x*d.z**2 / d.R**5',
                custom: 'd.v = 0.2',
                symbol: 'σ<sub>zz</sub>',
                units: 'kPa',
                max: 10,
				min: -10,
            },
            sx: {
                formula: '-d.x/d.R**3 * (-3*d.x**2 / d.R**2 + (1-2*d.v)/((d.R + d.z)**2) *(d.R**2 - d.y**2 - 2*d.R*d.y**2 / (d.R + d.z)))',
                custom: 'd.v = 0.2',
                symbol: 'σ<sub>xx</sub>',
                units: 'kPa',
                max: 10,
				min: -10,
            },
            sy: {
                formula: '-d.x/d.R**3 * (-3*d.y**2 / d.R**2 + (1-2*d.v)/((d.R + d.z)**2) *(3*d.R**2 - d.x**2 - 2*d.R*d.x**2 / (d.R + d.z)))',
                custom: 'd.v = 0.2',
                symbol: 'σ<sub>yy</sub>',
                units: 'kPa',
                max: 10,
				min: -10,
            },
            txy: {
                formula: '-d.y/d.R**3 * (-3*d.x**2 / d.R**2 + (1-2*d.v)/((d.R + d.z)**2) *(-(d.R**2) + d.x**2 + 2*d.R*d.x**2 / (d.R + d.z)))',
                custom: 'd.v = 0.2',
                symbol: 'τ<sub>xy</sub>',
                units: 'kPa',
                max: 10,
				min: -10,
            },
            tyz: {
                formula: '3*d.x*d.y*d.z/d.R**5',
                symbol: 'τ<sub>yz</sub>',
                units: 'kPa',
                max: 10,
				min: -10,
            },
            tzx: {
                formula: '3*d.x**2*d.z/d.R**5',
                symbol: 'τ<sub>zx</sub>',
                units: 'kPa',
                max: 10,
				min: null,
            },
            dz: {
                formula: '((1+d.v) / (d.E * d.R)) * (d.x*d.z/d.R**2 + (1-2*d.v)*d.x/(d.R+d.z))',
                custom: 'd.v = 0.2; d\.E = 20000000',
                symbol: 'ε<sub>z</sub>',
                units: '[]',
                max: 0.0000001,
				min: -0.0000001,
            },
            dx: {
                formula: '((1+d.v) / (d.E * d.R)) * (1 + d.x**2/d.R**2 + (1-2*d.v)*(d.R/(d.R+d.z) - d.x**2/(d.R+d.z)**2))',
                custom: 'd.v = 0.2; d\.E = 20000000',
                symbol: 'ε<sub>x</sub>',
                units: '[]',
                max: 0.000001,
				min: null,
            },
            dy: {
                formula: '((1+d.v) / (d.E * d.R)) * (d.x*d.y/d.R**2 - (1-2*d.v)*d.x*d.y/(d.R+d.z)**2)',
                custom: 'd.v = 0.2; d\.E = 20000000',
                symbol: 'ε<sub>y</sub>',
                units: '[]',
                max: 0.000000030,
				min: -0.000000030,
            },
        },
        "Kelvin - Distribuida": {
            sz: {
                formula: 'd.z/(d.R**2*(1-d.v)) * ((3-2*d.v)/2 - d.x**2/d.R**2)',
                custom: 'd.v = 0.2',
                symbol: 'σ<sub>zz</sub>',
                units: 'kPa',
                max: 10,
				min: null,
            },
            sx: {
                formula: 'd.z/(d.R**2*(1-d.v)) * (-(1-2*d.v)/2 + d.x**2/d.R**2)',
                custom: 'd.v = 0.2',
                symbol: 'σ<sub>xx</sub>',
                units: 'kPa',
                max: 1,
				min: -1,
            },
            sy: {
                formula: 'd.v*d.z/(d.R**2*(1-d.v))',
                custom: 'd.v = 0.2',
                symbol: 'σ<sub>yy</sub>',
                units: 'kPa',
                max: 1,
				min: null,
            },
            txz: {
                formula: 'd.x/(d.R**2*(1-d.v)) * (-(1-2*d.v)/2 + d.z**2/d.R**2)',
                custom: 'd.v = 0.2',
                symbol: 'τ<sub>xz</sub>',
                units: 'kPa',
                max: -1,
				min: 1,
            },
        },
    };
    window.problems = available_problems;
    // Set options to the dropdown
    Object.keys(available_problems).forEach((problem_name) => {
        $('#problem_name').append(`<option value="${String(problem_name).toLowerCase()}">${problem_name}</option>`);
    });
}

function createInitialState() {
    let initial_state = {
        problem: 'boussinesq',
        // problem: 'kelvin',
        // problem: 'cerruti',
        result: 'sz',
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
        problems: window.problems,
    };
    initial_state.data = graph.createPlotData(initial_state);
    return initial_state;
}

function setState(model) {
    const curr_model = getState();
    if (curr_model !== model) {
        console.log('Started to plot!');
        $('.loader').show();
        const data = graph.createPlotData(model);
        model.data = data;
        window[config.app_name].state = model;
        updateUI();
    }
}

function updateUI() {
    const model = getState();
    const available_problems = model.problems;
    const problem_name = String(model.problem);
    $('#xdist').val(Number(model.view.x));
    $('#ydist').val(Number(model.view.y));
    $('#problem_name').val(problem_name);
    $('#zdist').val(Number(model.view.z.max));
    $('#space').val(Number(model.view.space));
    $('#resolution').val(Number(model.settings.resolution));
    $('#load').val(Number(model.load));
    const available_results = available_problems[helpers.toTitleCase(problem_name)];
    $('#result').empty();
    Object.keys(available_results).forEach((available_result) => {
        $('#result').append(`<option value="${String(available_result)}">${available_results[available_result].symbol}</option>`);
    });
    $('#result').val(String(model.result));
    let result_data = available_problems[helpers.toTitleCase(problem_name)][String(model.result)];
    $('#min_val').val((result_data.min === null) ? "" : result_data.min);
    $('#max_val').val((result_data.max === null) ? "" : result_data.max);
    $('#units_minval').html(result_data.units);
    $('#units_maxval').html(result_data.units);
    graph.updatePlot();
}

module.exports = {
    setState,
    initializeApp,
    getState,
    createInitialState,
};
