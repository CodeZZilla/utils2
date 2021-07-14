$(document).ajaxStart(function () {
    let div = document.getElementById('divTable');
    let divDisplay = getComputedStyle(div).display;
    if (divDisplay == 'none') {
        div.style.display = 'block';
    }
    $('.loader').show();
}).ajaxStop(function () {
    let div = document.getElementById('divTable');
    let divDisplay = getComputedStyle(div).display;
    if (divDisplay == 'block') {
        div.style.display = 'none';
    }
    $('.divTable').show();
});

$(document).ready(function () {
    $('.loader').hide();
    console.log('start')
    $.get('/prom-data', function (arr) {
        console.log('start2')
        let table = $("#table").DataTable();
        table.clear();
        table.destroy();

        $('#table').DataTable({
            data: arr,
            columns: [
                {data: 'feed_id'},
                {data: 'product_name'},
                {data: 'price'},
                {
                    data: 'url',
                    "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                        $(nTd).html("<a href='" + oData.url + "'  target=\"_blank\">" + oData.url + "</a>");
                    }
                },
                {data: 'status'}
            ]
        });
    });
});