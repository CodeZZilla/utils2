$(document).ajaxStart(function () {
    let div = document.getElementById('divTable');
    let divDisplay = getComputedStyle(div).display;
    if (divDisplay == 'block') {
        div.style.display = 'none';
    }
    $('.loader').show();
}).ajaxStop(function () {
    let div = document.getElementById('divTable');
    let divDisplay = getComputedStyle(div).display;
    if (divDisplay == 'none') {
        div.style.display = 'block';
    }
    $('.loader').hide();
});

let dataInput = [];

$(document).ready(function () {
    $('.loader').hide();
    console.log('start')
    $.get('/prom-data', function (arr) {
        dataInput = arr;
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



function btnClick(){
    let val = $("#statusSelect").val();

    let viewArr = [];
    for (let item of dataInput){
        if(val === 0 && item.status === 'ПОЛНОЕ_СОВПАДЕНИЕ'){
            viewArr.push(item);
        }else if(val === 1 && item.status === 'ТОЧНОЕ_СОВПАДЕНИЕ'){
            viewArr.push(item);
        }else if(val === 2 && item.status === 'ЧАСТИЧНОЕ_СОВПАДЕНИЕ'){
            viewArr.push(item);
        }
    }

    let table = $("#table").DataTable();
    table.clear();
    table.destroy();

    $('#table').DataTable({
        data: viewArr,
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
}