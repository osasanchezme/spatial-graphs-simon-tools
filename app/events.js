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
    state.setState(model);
}

function resolutionChanged(value){
    let model = getState();
    model.settings.resolution = Number(value);
    state.setState(model);
}

function loadChanged(value){
    let model = getState();
    model.load = Number(value);
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
    $('#resolution').on('change', (e) => {
        resolutionChanged(e.target.value);
    });
    $('#load').on('change', (e) => {
        loadChanged(e.target.value);
    });
    $('#advanced_check').on('change', (e) => {
        if ($('#advanced_check')[0].checked){
            $('#advanced_settings').removeClass('hidden');
        }else{
            $('#advanced_settings').addClass('hidden');
        }
    });
}

module.exports = {assignActions};