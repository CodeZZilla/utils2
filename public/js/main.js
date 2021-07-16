function btnClick() {
    let str = 'https://api2.comtrading.ua/orders_feed?from=' + $('#dateFrom').val()
        + '&to=' + $('#dateTo').val()
        + '&limit=99999999999999999';
    $.get(str, function (data) {
        //console.log(data)
        //console.log(data.length)
        $('#vseH2').text('Всего: ' + data.length)

        let biVal = $('#biSel').val();
        let biArr = []
        for (let item of data) {
            if (item.BI == biVal) {
                biArr.push(item)
            }
        }
        $('#biH2').text('BI=' + $('#biSel').val() + ': ' + biArr.length)

        let allSum = 0;
        let allSumBITrue = 0;
        for (let item of data) {
            if (item.BI == "1") {
                allSum += item.total_UAH;

                let flag = false;
                for (let item2 of item.products) {
                    if (item2.BI === true) {
                        flag = true;
                        break;
                    }
                }

                if (flag) {
                    allSumBITrue += item.total_UAH;
                }
            }
        }
        $('#allOrders').text('Всего: ' + allSum + ' грн')
        $('#biTrue').text('BI(true): ' + allSumBITrue + ' грн')

        let table = $("#table").DataTable();
        table.clear();
        table.destroy();

        $('#table').DataTable({
            data: biArr,
            columns: [
                {data: 'order_id'},
                {data: 'createdAt'},
                {data: 'order_status_id'},
                {data: 'BI'},
                {data: 'total'},
                {data: 'total_UAH'}
            ]
        });
    });
}

$(document).ready(function () {
    $('#table').DataTable();
});