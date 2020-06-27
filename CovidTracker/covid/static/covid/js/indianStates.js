$(document).ready(function () {
    $('#indianStatesTable').DataTable( {
        "order": [[ 1, "desc" ]],
        "aLengthMenu": [[15, 30, -1], [15, 30, "All"]],
        "iDisplayLength": 15,
        stateSave: true,
        responsive:true
    });
});
