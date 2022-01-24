const $ = require('jquery');

const initial_state = {
    problem: 'boussinesq',
    view: {
        x: 0,
        y: 0,
        z: {
            min: 0,
            max: 100,
        },
    },
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

function assignActions() {}

function setState(state) {
    $('#xdist').val(Number(state.view.x));
    $('#ydist').val(Number(state.view.y));
}

module.exports = {
    initial_state,
    setState,
    initializeApp,
};
