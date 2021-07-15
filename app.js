const express = require('express');
const path = require("path");
const model = require('./models/RozetkaAPI');


const app = express();

const PORT = 8099;



app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get('/', async function (req, res) {
    res.render('index')
});

app.get('/prom', async (req, res) =>{
    res.render('promTable2')   //'promTable'
});

app.get('/prom-data', async (req, res) => {
    let arrAll = await model.getAllProducts()

    let outputArr = []
    for (let item of arrAll){
        outputArr.push({
            id: item.id,
            feed_id: item.feed_id,
            product_name: item.product_name,
            price: item.price,
            url: item.url,
            status: item.compare_status
        })
    }
    res.send(outputArr)
});

app.get('/updateUrl', async function (req, res) {
    console.log(req.query);
    console.log(req.params);
    res.send('ok');
});



app.listen(PORT, () => {
    console.log('Server Start!!!! PORT: ' + PORT);
});