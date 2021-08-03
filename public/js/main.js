function btnClick() {
    let str = 'https://api2.comtrading.ua/orders_feed?from=' + $('#dateFrom').val()
        + '&to=' + $('#dateTo').val()
        + '&limit=99999999999999999';
    $.get(str, async function (data) {
        $('#vseH2').text('Всего: ' + data.length)

        let biVal = $('#biSel').val()
        let bi1Arr = [], bi2Arr = []
        for (let item of data) {
            if (item.BI == 1) {
                bi1Arr.push(item)
            } else {
                bi2Arr.push(item)
            }
        }


        $('#bi1').text('BI=1: ' + bi1Arr.length)
        $('#bi2').text('BI=0: ' + bi2Arr.length)

        let bi1Sum = 0, bi2Sum = 0;

        for await (let v of bi1Arr) {
            for await (let product of v.products) {
                let value = feedAll.find(el => el.id === product.id)
                if (value == undefined) {
                    value = 0
                }else value = value.price
                bi1Sum += (product.price - Number.parseFloat(value));
            }
        }
        $('#bi1Sum').text('BI 1 sum: ' + bi1Sum.toFixed(2))


        for await (let v of bi2Arr) {
            for await (let product of v.products) {
                let value = feedAll.find(el => el.id === product.id)
                if (value == undefined) {
                    value = 0
                }else value = value.price
                bi2Sum += (product.price - Number.parseFloat(value));
            }
        }
        $('#bi2Sum').text('BI 0 sum: ' + bi2Sum.toFixed(2))

        $('#vseSum').text('All sum: ' + (bi2Sum + bi1Sum).toFixed(2))


        // let allSumBITrue = 0;
        // for (let item of data) {
        //     if (item.BI == "1") {
        //         allSum += item.total_UAH;
        //
        //         let flag = false;
        //         for (let item2 of item.products) {
        //             if (item2.BI === true) {
        //                 flag = true;
        //                 break;
        //             }
        //         }
        //
        //         if (flag) {
        //             allSumBITrue += item.total_UAH;
        //         }
        //     }
        // }
        // $('#allOrders').text('Всего: ' + allSum + ' грн')
        // $('#biTrue').text('BI(true): ' + allSumBITrue + ' грн')

        let table = $("#table").DataTable();
        table.clear();
        table.destroy();

        if (biVal == 1) {
            $('#table').DataTable({
                data: bi1Arr,
                columns: [
                    {data: 'order_id'},
                    {data: 'createdAt'},
                    {data: 'order_status_id'},
                    {data: 'BI'},
                    {data: 'total'},
                    {data: 'total_UAH'}
                ]
            });
        } else {
            $('#table').DataTable({
                data: bi2Arr,
                columns: [
                    {data: 'order_id'},
                    {data: 'createdAt'},
                    {data: 'order_status_id'},
                    {data: 'BI'},
                    {data: 'total'},
                    {data: 'total_UAH'}
                ]
            });
        }

    });
}

$(document).ready(function () {
    $('#table').DataTable();
});