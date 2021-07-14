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
            ],
            initComplete: function () {
                this.api().columns().every( function () {
                    let column = this;
                    let select = $('<select><option value=""></option></select>')
                        .appendTo( $(column.footer()).empty() )
                        .on( 'change', function () {
                            let val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );

                            column
                                .search( val ? '^'+val+'$' : '', true, false )
                                .draw();
                        } );

                    column.data().unique().sort().each( function ( d, j ) {
                        select.append( '<option value="'+d+'">'+d+'</option>' )
                    } );
                } );
            }
        });
    });
});