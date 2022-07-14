$(document).ready(function () {
    initChart();
    document.getElementById("myForm").addEventListener("submit", initChart);
});

function initChart() {
    var data = {
        "columna1": "Sentimental", "columna2": "Romantico", "columna3": "BienEnElAmor"
    };
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "http://127.0.0.1:8000/api/getTdData/",
        data: JSON.stringify(data),
        error: function () {
            alert("Ocurrio un error al consultar los datos");
        },
        success: function (data) {
            var as = JSON.parse(data);
            console.log(as);
            tdChart(as);
        }
    })
}

function changeChart(form) {
    var data = {
        "columna1": "Sentimental", "columna2": "Romantico", "columna3": "BienEnElAmor"
    };

    if (form != undefined) {
        var form = form.elements;
        var col1 = form["op1"].value;
        var col2 = form["op2"].value;
        var col3 = form["op3"].value;
        if (col1 !== "" && col2 !== "" && col3 !== "") {
            data = { "columna1": col1, "columna2": col2, "columna3": col3 };
            console.log(data);
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "http://127.0.0.1:8000/api/getTdData/",
                data: JSON.stringify(data),
                error: function () {
                    alert("Ocurrio un error al consultar los datos");
                },
                success: function (data) {
                    var as = JSON.parse(data);
                    console.log(as);
                    tdChart(as);
                }
            })
        }
    }
    
}

function tdChart(data) {
    // Give the points a 3D feel by adding a radial gradient
    Highcharts.setOptions({
        colors: data.colores
    });

    // Set up the chart
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            margin: 100,
            type: 'scatter3d',
            animation: false,
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 30,
                depth: 250,
                viewDistance: 5,
                fitToPlot: false,
                frame: {
                    bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
                    back: { size: 1, color: 'rgba(0,0,0,0.04)' },
                    side: { size: 1, color: 'rgba(0,0,0,0.06)' }
                }
            }
        },
        title: {
            text: 'Diagrama de 3 dimensiones'
        },
        subtitle: {
            text: 'Da click en el diagrama y arrastra para giralo'
        },
        plotOptions: {
            scatter: {
                width: 10,
                height: 10,
                depth: 10
            }
        },
        yAxis: {
            min: 0,
            max: data.yMax,
            title: null
        },
        xAxis: {
            min: 0,
            max: data.xMax,
            gridLineWidth: 1
        },
        zAxis: {
            min: 0,
            max: data.zMax,
            showFirstLabel: true
        },
        legend: {
            enabled: true
        },
        series: [{
            name: 'Rojo',
            colorByPoint: true,
            accessibility: {
                exposeAsGroupOnly: true
            },
            data: data.rojo
        }, {
                name: 'Verde',
                colorByPoint: true,
                accessibility: {
                    exposeAsGroupOnly: true
                },
                data: data.verde
            }, {
                name: 'Azul',
                colorByPoint: true,
                accessibility: {
                    exposeAsGroupOnly: true
                },
                data: data.azul
            }, {
                name: 'Cyan',
                colorByPoint: true,
                accessibility: {
                    exposeAsGroupOnly: true
                },
                data: data.cyan
            }, {
                name: 'Amarillo',
                colorByPoint: true,
                accessibility: {
                    exposeAsGroupOnly: true
                },
                data: data.amarillo
            },{
                name: 'Centroides',
                colorByPoint: true,
                accessibility: {
                    exposeAsGroupOnly: true
                },
                data: data.centroides
            }]
    });


    // Add mouse and touch events for rotation
    (function (H) {
        function dragStart(eStart) {
            eStart = chart.pointer.normalize(eStart);

            var posX = eStart.chartX,
                posY = eStart.chartY,
                alpha = chart.options.chart.options3d.alpha,
                beta = chart.options.chart.options3d.beta,
                sensitivity = 5,  // lower is more sensitive
                handlers = [];

            function drag(e) {
                // Get e.chartX and e.chartY
                e = chart.pointer.normalize(e);

                chart.update({
                    chart: {
                        options3d: {
                            alpha: alpha + (e.chartY - posY) / sensitivity,
                            beta: beta + (posX - e.chartX) / sensitivity
                        }
                    }
                }, undefined, undefined, false);
            }

            function unbindAll() {
                handlers.forEach(function (unbind) {
                    if (unbind) {
                        unbind();
                    }
                });
                handlers.length = 0;
            }

            handlers.push(H.addEvent(document, 'mousemove', drag));
            handlers.push(H.addEvent(document, 'touchmove', drag));


            handlers.push(H.addEvent(document, 'mouseup', unbindAll));
            handlers.push(H.addEvent(document, 'touchend', unbindAll));
        }
        H.addEvent(chart.container, 'mousedown', dragStart);
        H.addEvent(chart.container, 'touchstart', dragStart);
    }(Highcharts));
}