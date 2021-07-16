function btnClick() {
    let str = 'https://api2.comtrading.ua/orders_feed?from=' + $('#dateFrom').val()
        + '&to=' + $('#dateTo').val()
        + '&limit=99999999999999999';
    $.get(str, async function (data) {
        //console.log(data)
        //console.log(data.length)
        $('#vseH2').text('Всего: ' + data.length)

        let biVal = $('#biSel').val()
        let bi1Arr = [], bi2Arr = []
        for (let item of data) {
            if (item.BI == biVal) {
                bi1Arr.push(item)
            } else {
                bi2Arr.push(item)
            }
        }

        $('#bi1').text('BI=1: ' + bi1Arr.length)
        $('#bi2').text('BI=2: ' + bi2Arr.length)

        let allSum = 0, bi1Sum = 0, bi2Sum = 0;

        await $.each(bi1Arr, async function (k, v){
            await $.each(v.products, async  function (key, product) {
                await $.get('/feed?id=' + product.id, async function (data) {
                    bi1Sum += (product.price - data)
                })
            })
        }).then(function (){
            console.log(bi1Sum.toFixed(2))
        })



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
    });
}

$(document).ready(function () {
    $('#table').DataTable();
});