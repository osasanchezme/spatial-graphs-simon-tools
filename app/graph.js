const Plotly = require('plotly.js-dist');
const getState = require('./getState');
const state = require('./state');

function updatePlot() {
    let graph_cont = document.getElementById('graph_container');

    // TODO - Implement resize
    const model = getState();

    Plotly.newPlot(graph_cont, model.data, {});
}

function createPlotData(model) {
    let d = 10;
    let dx = model.view.x;
    let dy = model.view.y;
    let dz = model.view.z.max;
    let c = 'rgb(211,211,211)';
    let f = 'rgb(220,220,220)';
    const data = [
        {
            type: 'mesh3d',
            x: [dx, dx, -d, -d, d, d, dx, dx, -d, -d, d, d],
            y: [dy, d, d, -d, -d, dy, dy, d, d, -d, -d, dy],
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
    return data;
}

module.exports = { updatePlot, createPlotData };
