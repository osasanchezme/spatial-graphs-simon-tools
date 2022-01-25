const Plotly = require('plotly.js-dist');

function updatePlot() {
    let graph_cont = document.getElementById('graph_container');

    var intensity = [
        0, 0.14285714285714285, 0.2857142857142857, 0.42857142857142855, 0.5714285714285714,
        0.7142857142857143, 0.8571428571428571, 1,
    ];

    let d = 10;
    let dz = -10;
    let c = 'rgb(211,211,211)';
    let f = 'rgb(220,220,220)';

    var data = [
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

    // TODO - Implement resize

    Plotly.newPlot(graph_cont, data, {});
}

module.exports = {updatePlot}
