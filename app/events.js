const $ = require('jquery');
const state = require('./state');
const getState = require('./getState')
const graph = require('./graph');
const helpers = require('./helpers')

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
    const available_results = window.problems[helpers.toTitleCase(String(value))];
    model.result = Object.keys(available_results)[0];
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

function resultChanged(value){
    let model = getState();
    model.result = String(value).toLowerCase();
    state.setState(model);
}

function minValChanged(value){
    let model = getState();
    let problem = helpers.toTitleCase(model.problem);
    let result = model.result;
    console.log("Min val:", value==="");
    model.problems[problem][result].min = value !== "" ? Number(value) : null;
    state.setState(model);
}

function maxValChanged(value){
    let model = getState();
    let problem = helpers.toTitleCase(model.problem);
    let result = model.result;
    model.problems[problem][result].max = value !== "" ? Number(value) : null;
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
    $('#advanced_check_view').on('change', (e) => {
        if ($('#advanced_check_view')[0].checked){
            $('#advanced_view').removeClass('hidden');
        }else{
            $('#advanced_view').addClass('hidden');
        }
    });
    $('#result').on('change', (e) => {
        resultChanged(e.target.value);
    });
    $('#min_val').on('change', (e) => {
        minValChanged(e.target.value);
        console.log('Changed min');
    });
    $('#max_val').on('change', (e) => {
        maxValChanged(e.target.value);
        console.log('Changed max');
    });
}

module.exports = {assignActions};