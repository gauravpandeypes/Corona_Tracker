country_data.reverse()
var total_Cases = document.getElementById('confirmed').getContext("2d");
// ctx.canvas.height = '300px';
// ctx.canvas.width = '300px';
var count;

if(count<30){
    count=country_data.length;
}
else {
    count = country_data.length - 30;
}


var i;
var confirmed=[];
var xaxis=[];
for(i=count ; i<country_data.length ; i++){
    if(country_data[i]['confirmed']>0){
        xaxis.push(country_data[i]['date'].split(',')[0]);
        confirmed.push(country_data[i]['confirmed']);
    }

}

new Chart(total_Cases, {
    type: 'line',
    data: {
        labels: xaxis,
        datasets: [{
            label:"Total Cases",
            responsive:true,
            maintainAspectRatio: true,
            pointBackgroundColor:'pink',
            pointBorderColor:'black',
            backgroundColor:'rgba(0,0,200,0.5)',
            pointRadius:3,
            pointHoverRadius:6,
            pointHitRadius:6,
            pointHoverBorderColor:'pink',
            data: confirmed
    }],
    options: {
        title: {
            display: true,
            text: 'Custom Chart Title'
        }
    }
    },
});

var xaxis=[];
var new_confirmed_data=[];
for(i=count ; i<country_data.length ; i++){

    if(country_data[i]['new_confirmed']>0){
        xaxis.push(country_data[i]['date'].split(',')[0]);
        new_confirmed_data.push(country_data[i]['new_confirmed']);
    }

}

var new_confirmed = document.getElementById('new_confirmed').getContext("2d");

new Chart(new_confirmed, {
    type: 'bar',
    data: {
        labels: xaxis,
        datasets: [{
            label:"New Cases",
            maintainAspectRatio: true,
            backgroundColor:'rgba(0,0,200,0.5)',
            hoverBorderColor:'black',
            hoverBorderWidth:2,
            hoverBackgroundColor:'pink',
            data: new_confirmed_data
    }],
    options: {
        title: {
            display: true,
            text: 'Custom Chart Title'
        }
    }
    },
});

var xaxis=[];
var deaths=[];
for(i=count ; i<country_data.length ; i++){
    if(country_data[i]['deaths']>0 && country_data[i]['recovered']>0){
        xaxis.push(country_data[i]['date'].split(',')[0]);
        deaths.push(country_data[i]['deaths']);
    }
}

var recovered=[];
for(i=count ; i<country_data.length ; i++){
    if(country_data[i]['deaths']>0 && country_data[i]['recovered']>0){
        recovered.push(country_data[i]['recovered']);
    }
}

var total_deaths_recovered = document.getElementById('deaths').getContext("2d");


new Chart(total_deaths_recovered, {
    type: 'line',
    data: {
        labels: xaxis,
        datasets: [{
            label:"Total Deaths",
            maintainAspectRatio: true,
            pointBackgroundColor:'rgba(200,0,0,0.5)',
            pointBorderColor:'black',
            backgroundColor:'rgba(200,0,0,0.5)',
            pointRadius:2,
            pointHoverRadius:4,
            pointHitRadius:4,
            pointHoverBackgroundColor:'pink',
            pointHoverBorderColor:'pink',
            data: deaths
    },
    {
        label:"Total recovered",
        maintainAspectRatio: true,
        pointBackgroundColor:'rgba(0,255,0,0.5)',
        pointBorderColor:'black',
        backgroundColor:'rgba(0,255,0,0.5)',
        pointRadius:2,
        pointHoverRadius:4,
        pointHitRadius:4,
        pointHoverBackgroundColor:'pink',
        pointHoverBorderColor:'pink',
        data: recovered
}

    ],
    options: {
        title: {
            display: true,
            text: 'Custom Chart Title'
        }
    }
    },
});

var xaxis=[];
var new_deaths=[];
for(i=count; i<country_data.length ; i++){
    if(country_data[i]['new_deaths']>0 && country_data[i]['new_recovered']>0){
        xaxis.push(country_data[i]['date'].split(',')[0]);
        new_deaths.push(country_data[i]['new_deaths']);
    }
}

var new_recovered=[];
for(i=count ; i<country_data.length ; i++){
    if(country_data[i]['new_deaths']>0 && country_data[i]['new_recovered']>0){
        new_recovered.push(country_data[i]['new_recovered']);
    }

}

var new_deaths_recovered = document.getElementById('new_deaths').getContext("2d");


new Chart(new_deaths_recovered, {
    type: 'bar',
    data: {
        labels: xaxis,
        datasets: [{
            label:"New Deaths",
            maintainAspectRatio: true,
            pointBorderColor:'black',
            backgroundColor:'rgba(200,0,0,0.5)',
            hoverBorderColor:'black',
            hoverBorderWidth:1,
            hoverBackgroundColor:'pink',
            data: new_deaths
    },
    {
        label:"New recovered",
        maintainAspectRatio: true,
        backgroundColor:'rgba(0,200,0,0.5)',
        hoverBorderColor:'black',
            hoverBorderWidth:1,
            hoverBackgroundColor:'pink',
        data: new_recovered
}

    ],
    options: {
        title: {
            display: true,
            text: 'Custom Chart Title'
        }
    }
    },
});

i=0;
var sum_confirmed=0;
var sum_deaths=0;
var sum_recovered=0;
for(i=0 ; i<country_data.length ; i++){
    sum_confirmed = Math.max(country_data[i]['confirmed'],sum_confirmed);
    sum_deaths = Math.max(country_data[i]['deaths'],sum_deaths);
    sum_recovered = Math.max(country_data[i]['recovered'],sum_recovered);
}


var colorHex = ['rgba(0,0,255,0.5)', 'rgba(200,0,0,0.5)', 'rgba(0,200,0,0.5)']
var pie_chart = document.getElementById('pie').getContext("2d");

new Chart(pie_chart, {
    type: 'pie',
    data: {
        datasets:[{
            data: [sum_confirmed, sum_deaths, sum_recovered],
            backgroundColor: colorHex,
            hoverBorderWidth:2,
            hoverBorderColor:'black',

        }],
        labels:['Total Confirmed', 'Total Deaths', 'Total Recovered']
    },
    options: {
        responsive: true,
    }
})
var a="<pre>Total Cases</pre>"+sum_confirmed.toLocaleString();
document.getElementById('total_cases').innerHTML = a;
a="<pre>Total Recovered</pre>"+sum_recovered.toLocaleString();
document.getElementById('total_recovered').innerHTML = a;
a="<pre>Total Deaths</pre>"+sum_deaths.toLocaleString();
document.getElementById('total_deaths').innerHTML = a;
