const $ = require('jquery');
const state = require('./state');
const getState = require('./getState')
const graph = require('./graph');

function xlimChanged(value){
    let model = getState();
    model.view.x = Number(value);
    state.setState(model);
}

function ylimChanged(value){
    let model = getState();
    model.view.y = Number(value);
    state.setState(model);
}

function zlimChanged(value){
    let model = getState();
    model.view.z.max = Number(value);
    state.setState(model);
}

function spaceChanged(value){
    let model = getState();
    model.view.space = Number(value);
    state.setState(model);
}

function problemNameChanged(value){
    let model = getState();
    model.problem = String(value).toLowerCase();
    console.log(model.problem);
    state.setState(model);
}

function assignActions() {
    $('#xdist').on('change', (e) => {
        xlimChanged(e.target.value);
    });
    $('#ydist').on('change', (e) => {
        ylimChanged(e.target.value);
    });
    $('#problem_name').on('change', (e) => {
        problemNameChanged(e.target.value);
    });
    $('#zdist').on('change', (e) => {
        zlimChanged(e.target.value);
    });
    $('#space').on('change', (e) => {
        spaceChanged(e.target.value);
    });
}

module.exports = {assignActions};