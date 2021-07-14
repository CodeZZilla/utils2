$(window).load(function () {
    $('.loader').hide();
    //$('#divTable').show();
    let div = document.getElementById('divTable');
    let divDisplay = getComputedStyle(div).display;
    if (divDisplay == 'none') {
        div.style.display = 'block';
    }
});

$(document).ajaxStart(function () {
    $('.divTable').hide();
    $('.loader').show();
}).ajaxStop(function () {
    $('.loader').hide();
    $('.divTable').show();
});

$(document).ready(function () {
    console.log('start')
    $.get('/rozetka-data', function (arr) {
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