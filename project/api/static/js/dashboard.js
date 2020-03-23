var plotElement = [];

const loadData = async (endpoint) => {
    let headers = new Headers();
    
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        redirect: 'follow'
      }
    });
  
    if ( response.status !== 200) {
      throw new Error('Error loading data');
    };
  
    return await response.json();
}

function plot_dash_graph_cost(plotIndex) {
    loadData(`/historical/global/${days}`)
        .then(h_data => {

            let labels = [];
            let h_y = [];

            h_data['historical'].forEach(item => {
                labels.push(item.x);
                h_y.push(item.y * kwh_cost) ;
            });            

            const annotation_year = labels[labels.length -1];

            loadData(`/prediction/global/${days}`)
                .then(p_data => {

                    let p_y = [];                   
                    h_y.forEach(item => p_y.push(null));    // add null values to shift the prediction line 
                    p_y[p_y.length - 1] = h_y[h_y.length - 1];                    

                    p_data['predictions'].forEach(item => {
                        labels.push(item.x);
                        p_y.push(item.yhat * kwh_cost) ;
                    });                    

                    let canvas = document.querySelector('#dash_graph_cost_consume').getContext('2d');
                    if (plot[plotIndex]) plot[plotIndex].destroy();

                    let dataset = [
                        {
                            label : 'Cost',
                            backgroundColor : 'rgb(75, 192, 192)',
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            data: h_y
                        },
                        {
                            label: 'Prediction',
                            backgroundColor: 'rgb(255, 99, 132)',
                            fill: false,
                            borderColor: 'rgb(255, 99, 132)',
                            data: p_y,
                        }
                    ];
                    
                    let options = {
                        responsive: true,
                        maintainAspectRatio: false,
                        annotation: {
                            drawTime: 'afterDraw',
                            annotations: [{
                                type: 'line',
                                mode: 'vertical',
                                scaleID: 'x-axis-0',
                                value: annotation_year,
                                borderColor: 'black',
                                borderWidth: 1,
                                label: {
                                    enabled: true,
                                    position: 'center',
                                    content: 'forecast',                                                                        
                                }
                            }]
                        },                        
                        scales: {
                            yAxes: [{
                               ticks: {
                                  beginAtZero: true,
                                  fontSize : 10,
                               },
                               scaleLabel: {
                                   display : true,
                                   labelString: '($)'
                               }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontSize : 10,
                                }
                            }]
                        },
                    };

                    plot[plotIndex] = new Chart( canvas, {
                        type: 'line',
                        data :{
                            labels : labels,
                            datasets : dataset                            
                        },
                        options : options
                    });                    
                })
                .catch(err => console.log(err));

        })
        .catch(err => console.log(err));    
}


function plot_dash_graph_consume(plotIndex) {

    loadData(`/historical/global/${days}`)
        .then(h_data => {

            let labels = [];
            let h_y = [];

            h_data['historical'].forEach(item => {
                labels.push(item.x);
                h_y.push(item.y) ;
            });            

            const annotation_year = labels[labels.length -1];

            loadData(`/prediction/global/${days}`)
                .then(p_data => {

                    let p_y = [];                   
                    h_y.forEach(item => p_y.push(null));    // add null values to shift the prediction line 
                    p_y[p_y.length - 1] = h_y[h_y.length - 1];                    

                    p_data['predictions'].forEach(item => {
                        labels.push(item.x);
                        p_y.push(item.yhat) ;
                    });                    

                    let canvas = document.querySelector('#dash_graph_cost_consume').getContext('2d');
                    if (plot[plotIndex]) plot[plotIndex].destroy();

                    let dataset = [
                        {
                            label : 'Consumption',
                            backgroundColor : 'rgb(143, 165, 201)',
                            fill: false,
                            borderColor: 'rgb(143, 165, 201)',
                            data: h_y
                        },
                        {
                            label: 'Prediction',
                            backgroundColor: 'rgb(255, 159, 64)',
                            fill: false,
                            borderColor: 'rgb(255, 159, 64)',
                            data: p_y,
                        }
                    ];
                    
                    let options = {
                        responsive: true,
                        maintainAspectRatio: false,
                        annotation: {
                            drawTime: 'afterDraw',
                            annotations: [{
                                type: 'line',
                                mode: 'vertical',
                                scaleID: 'x-axis-0',
                                value: annotation_year,
                                borderColor: 'black',
                                borderWidth: 1,
                                label: {
                                    enabled: true,
                                    position: 'center',
                                    content: 'forecast',                                                                        
                                }
                            }]
                        },                        
                        scales: {
                            yAxes: [{
                               ticks: {
                                  beginAtZero: true,
                                  fontSize : 10,
                               },
                               scaleLabel: {
                                   display : true,
                                   labelString: 'kWh'
                               }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontSize : 10,
                                }
                            }]
                        },
                    };

                    plot[plotIndex] = new Chart( canvas, {
                        type: 'line',
                        data :{
                            labels : labels,
                            datasets : dataset                            
                        },
                        options : options
                    });                    
                })
                .catch(err => console.log(err));

        })
        .catch(err => console.log(err));        


}

function plot_dash_active_energy(plotIndex, unit) {

    toggleSpinner();

    let tot_consume = document.querySelector('#tot_consume');   
    let tot_predict = document.querySelector('#tot_predict');
    let tot_change = document.querySelector('#tot_change');
    let tot_upper_error = document.querySelector('#tot_upper_error');
    let tot_lower_error = document.querySelector('#tot_lower_error');
    
    let a_tot_consume = [];
    let a_tot_predict = [];
    let a_tot_upper_error = [];
    let a_tot_lower_error = [];


    loadData(`/historical/global/${days}`)
        .then(h_data => {

            let labels = [];
            let h_y = [];

            h_data['historical'].forEach(item => {
                labels.push(item.x);
                if ( unit == 0 ) {
                    h_y.push(item.y * kwh_cost) ; 
                    a_tot_consume.push(item.y * kwh_cost);

                } else if (unit == 1) {                    
                    h_y.push(item.y) ;
                    a_tot_consume.push(item.y);
                }                
            });            

            const annotation_year = labels[labels.length -1];

            loadData(`/prediction/global/${days}`)
                .then(p_data => {

                    let p_y = [];
                    let p_y_upper = [];
                    let p_y_lower = [];

                    h_y.forEach(item => p_y.push(null));             // add null values to shift the prediction line 
                    h_y.forEach(item => p_y_upper.push(null));       // add null values to shift the prediction line 
                    h_y.forEach(item => p_y_lower.push(null));       // add null values to shift the prediction line 
                    
                    // join graph
                    p_y[p_y.length - 1] = h_y[h_y.length - 1];
                    p_y_upper[p_y_upper.length -1] = h_y[h_y.length - 1];
                    p_y_lower[p_y_lower.length -1] = h_y[h_y.length - 1];

                    p_data['predictions'].forEach(item => {
                        labels.push(item.x);

                        if ( unit == 0 ) {
                            p_y.push(item.yhat * kwh_cost);
                            p_y_upper.push(item.yhat_upper * kwh_cost);
                            p_y_lower.push(item.yhat_lower * kwh_cost);

                            a_tot_predict.push(item.yhat * kwh_cost);  
                            a_tot_upper_error.push(item.yhat_upper * kwh_cost);
                            a_tot_lower_error.push(item.yhat_lower * kwh_cost);

                        } else if (unit == 1) {
                            p_y.push(item.yhat) ;
                            p_y_upper.push(item.yhat_upper);
                            p_y_lower.push(item.yhat_lower);
                            
                            a_tot_predict.push(item.yhat);
                            a_tot_upper_error.push(item.yhat_upper);
                            a_tot_lower_error.push(item.yhat_lower);
                        }                        
                    });                     

                    let canvas = document.querySelector('#dash_graph_cost_consume').getContext('2d');
                    if (plotElement[plotIndex]) plotElement[plotIndex].destroy();

                    let dataset = [
                        {
                            label : 'Consumption',
                            backgroundColor : '',
                            fill: false,
                            borderColor: '',
                            data: h_y
                        },
                        {
                            label: 'Prediction',
                            backgroundColor: '',
                            fill: false,
                            borderColor: '',
                            data: p_y,
                        }, 
                        {
                            label: 'Upper Bound',
                            backgroundColor: 'rgb(201, 203, 207, 0.2)',
                            fill: +1,
                            borderColor: 'rgb(201, 203, 207, 0.2)',
                            data: p_y_upper
                        },
                        {
                            label: 'Lower Bound',
                            backgroundColor: 'rgb(201, 203, 207, 0.2)',
                            fill: +1,
                            borderColor: 'rgb(201, 203, 207, 0.2)',
                            data: p_y_lower
                        },

                    ];

                    let options = {
                        responsive: true,
                        maintainAspectRatio: false,
                        annotation: {
                            drawTime: 'afterDraw',
                            annotations: [{
                                type: 'line',
                                mode: 'vertical',
                                scaleID: 'x-axis-0',
                                value: annotation_year,
                                borderColor: 'black',
                                borderWidth: 1,
                                label: {
                                    enabled: true,
                                    position: 'center',
                                    content: 'forecast',                                                                        
                                }
                            }]
                        },                        
                        scales: {
                            yAxes: [{
                               ticks: {
                                  beginAtZero: true,
                                  fontSize : 10,
                               },
                               scaleLabel: {
                                   display : true,
                                   labelString: ''
                               }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontSize : 10,
                                }
                            }]
                        },
                    };

                    kpi_consume = a_tot_consume.reduce((accumulator, currentValue) => accumulator + currentValue);
                    kpi_predict = a_tot_predict.reduce((accumulator, currentValue) => accumulator + currentValue);
                    kpi_upper_err = a_tot_upper_error.reduce((accumulator, currentValue) => accumulator + currentValue);
                    kpi_lower_err = a_tot_lower_error.reduce((accumulator, currentValue) => accumulator + currentValue);

                    if (unit == 0 ) {
                        dataset[0].backgroundColor = 'rgb(75, 192, 192)';
                        dataset[0].borderColor = 'rgb(75, 192, 192)';

                        dataset[1].backgroundColor = 'rgb(54, 162, 235)';
                        dataset[1].borderColor = 'rgb(54, 162, 235)';
                        options.scales.yAxes[0].scaleLabel.labelString = '$';

                        tot_consume.textContent = kpi_consume.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
                        tot_predict.textContent = kpi_predict.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
                        tot_change.textContent = (kpi_predict -  kpi_consume).toLocaleString('en-US', { style: 'currency', currency: 'USD' });   
                        tot_upper_error.textContent =  kpi_upper_err.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
                        tot_lower_error.textContent =  kpi_lower_err.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
                        
                    } else if (unit == 1){
                        dataset[0].backgroundColor = 'rgb(75, 192, 192)';
                        dataset[0].borderColor = 'rgb(75, 192, 192)';

                        dataset[1].backgroundColor = 'rgb(54, 162, 235)';
                        dataset[1].borderColor = 'rgb(54, 162, 235)';
                        options.scales.yAxes[0].scaleLabel.labelString = 'kWh';

                        tot_consume.textContent = kpi_consume.toFixed(0) + ' kWh';
                        tot_predict.textContent = kpi_predict.toFixed(0) + ' kWh';                                        
                        tot_change.textContent = (kpi_predict -  kpi_consume).toFixed(0) + ' kWh';
                        tot_upper_error.textContent =  kpi_upper_err.toFixed(0) + ' kWh';
                        tot_lower_error.textContent =  kpi_lower_err.toFixed(0) + ' kWh';
                    }                    


                    plotElement[plotIndex] = new Chart( canvas, {
                        type: 'line',
                        data :{
                            labels : labels,
                            datasets : dataset                            
                        },
                        options : options
                    });   
                    
                    toggleSpinner();
                })
                .catch(err => console.log(err));

        })
        .catch(err => console.log(err)); 
        
        
}

function plot_appliance(plotConfig) {    

    plotConfig.plots.forEach(plot => {
        toggleSpinner();
        
        loadData(`/historical/${plot.feature}/${days}`)
        .then(h_data => {
            let labels = [];
            let h_yaxis = [];

            h_data['historical'].forEach(item => {
                labels.push(item.x);
                h_yaxis.push(item.y * plot.unitNumber);
            });
            
            const annotation_year = labels[labels.length -1];

            loadData(`/prediction/${plot.feature}/${days}`)
                .then(p_data => {

                    let p_yaxis = [];
                    let p_y_upper = [];
                    let p_y_lower = [];

                    // shift prediction series
                    h_yaxis.forEach(item => {
                        p_yaxis.push(null);
                        p_y_upper.push(null);
                        p_y_lower.push(null);
                    });

                    p_yaxis[p_yaxis.length - 1] = h_yaxis[h_yaxis.length - 1];
                    p_y_upper[p_y_upper.length - 1] = h_yaxis[h_yaxis.length - 1];
                    p_y_lower[p_y_lower.length - 1] = h_yaxis[h_yaxis.length - 1];

                    p_data['predictions'].forEach(item => {
                        labels.push(item.x);
                        
                        p_yaxis.push(item.yhat * plot.unitNumber);
                        p_y_upper.push(item.yhat_upper * plot.unitNumber);
                        p_y_lower.push(item.yhat_lower * plot.unitNumber);
                    });

                    let canvas = document.querySelector(`#${plot.canvas}`).getContext('2d');
                    if (plotElement[plot.plotIndex]) plotElement[plot.plotIndex].destroy();

                    let dataset = [{
                        label : plot.label,
                        backgroundColor : plot.backgroundColor,
                        borderColor : plot.borderColor,
                        fill : false,
                        data : h_yaxis
                    },
                    {
                        label: 'Prediction',
                        backgroundColor: 'rgb(54, 162, 235)',
                        fill: false,
                        borderColor : 'rgb(54, 162, 235)',
                        data: p_yaxis
                    },
                    {
                        label : 'Upper Bound',
                        backgroundColor: 'rgb(201, 203, 207, 0.2)',
                        fill: +1,
                        borderColor: 'rgb(201, 203, 207, 0.2)',
                        data: p_y_upper
                    },
                    {
                        label : 'Lower Bound',
                        backgroundColor: 'rgb(201, 203, 207, 0.2)',
                        fill: +1,
                        borderColor: 'rgb(201, 203, 207, 0.2)',
                        data : p_y_lower
                    }];

                    let options = {
                        responsive: true,
                        maintainAspectRatio: false,
                        annotation: {
                            drawTime: 'afterDraw',
                            annotations: [{
                                type: 'line',
                                mode: 'vertical',
                                scaleID: 'x-axis-0',
                                value: annotation_year,
                                borderColor: 'black',
                                borderWidth: 1,
                                label: {
                                    enabled: true,
                                    position: 'center',
                                    content: 'forecast',                                                                        
                                }
                            }]
                        },
                        scales: {
                            yAxes: [{
                               ticks: {
                                  beginAtZero: true,
                                  fontSize : 10,
                               },
                               scaleLabel: {
                                   display : true,
                                   labelString: ''
                               }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontSize : 10,
                                }
                            }]
                        },
                    };

                    plotElement[plot.plotIndex] = new Chart( canvas, {
                        type: 'line',
                        data :{
                            labels : labels,
                            datasets : dataset                            
                        },
                        options : options
                    });
                    
                    toggleSpinner();
                    
                })

                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });

    


}

function init() {

    let selectUnit = document.querySelector("#selectUnit");
    let currentTab = $('.nav-tabs .active').text()


    if ( currentTab === 'Active Energy') {
        plot_dash_active_energy(0, selectUnit.selectedIndex);

    } else if (currentTab === 'Appliances') {
        plot_appliance({
            'plots' : [{
                'feature'         : 'kitchen',
                'unitNumber'      : (selectUnit.selectedIndex ? 1 : kwh_cost),
                'unitSymbol'      : (selectUnit.selectedIndex ? 'kWh' : '$'),
                'canvas'          : 'kitchen_consume',
                'plotIndex'       : 1, 
                'label'           : 'Kitchen',
                'backgroundColor' : 'rgb(255, 99, 132)',
                'borderColor'     : 'rgb(255, 99, 132)',
            },
            {
                'feature'         : 'laundry',
                'unitNumber'      : (selectUnit.selectedIndex ? 1 : kwh_cost),
                'unitSymbol'      : (selectUnit.selectedIndex ? 'kWh' : '$'),
                'canvas'          : 'laundry_consume',
                'plotIndex'       : 2, 
                'label'           : 'Laundry',
                'backgroundColor' : 'rgb(255, 159, 64)',
                'borderColor'     : 'rgb(255, 159, 64)',
            },
            {
                'feature'         : 'water',
                'unitNumber'      : (selectUnit.selectedIndex ? 1 : kwh_cost),
                'unitSymbol'      : (selectUnit.selectedIndex ? 'kWh' : '$'),
                'canvas'          : 'water_consume',
                'plotIndex'       : 3, 
                'label'           : 'Water',
                'backgroundColor' : 'rgb(153, 102, 255)',
                'borderColor'     : 'rgb(153, 102, 255)',
            },
            {
                'feature'         : 'equipment',
                'unitNumber'      : (selectUnit.selectedIndex ? 1 : kwh_cost),
                'unitSymbol'      : (selectUnit.selectedIndex ? 'kWh' : '$'),
                'canvas'          : 'equipment_consume',
                'plotIndex'       : 4, 
                'label'           : 'Equipment',
                'backgroundColor' : 'rgb(255, 205, 86)',
                'borderColor'     : 'rgb(255, 205, 86)',
            }]
        });   
    }


}

/*
$( document ).ready(() => {
    init();
});
*/

$(document).ready(function() {
    init();

    // Handling data-toggle manually
        $('.nav-tabs a').click(function(){
            $(this).tab('show');
        });
    // The on tab shown event
        $('.nav-tabs a').on('shown.bs.tab', function (e) {
            let current_tab = e.target;
            let previous_tab = e.relatedTarget;

            init();
        });
    });
