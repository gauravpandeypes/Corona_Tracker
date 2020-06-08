i=0;
var sum_confirmed=0;
var sum_deaths=0;
var sum_recovered=0;
for(i=0 ; i<world_data.length ; i++){
    sum_confirmed += Number(world_data[i]['TotalConfirmed']);
    sum_deaths += Number(world_data[i]['TotalDeaths']);
    sum_recovered += Number(world_data[i]['TotalRecovered']);
}

var a="<pre>Total Cases</pre>"+sum_confirmed.toLocaleString();
document.getElementById('total_cases').innerHTML = a;
a="<pre>Total Recovered</pre>"+sum_recovered.toLocaleString();
document.getElementById('total_recovered').innerHTML = a;
a="<pre>Total Deaths</pre>"+sum_deaths.toLocaleString();
document.getElementById('total_deaths').innerHTML = a;


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

$(document).ready(function () {
    $('#world_table').DataTable( {
        "order": [[ 1, "desc" ]],
        "aLengthMenu": [[25, 50, 100, 150, -1], [25, 50, 100, 150, "All"]],
        "iDisplayLength": 25,
        stateSave: true,
        responsive:true
    });
});
