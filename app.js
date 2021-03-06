const express = require('express');
const path = require('path');
const fs = require('fs')
const txml = require('txml');
const builder = require('xmlbuilder');
const model = require('./models/RozetkaAPI');
const passport = require('./config/passport.js');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});
const LocalStrategy = require('passport-local').Strategy;
const request = require('request-promise')

const options = {
    method: 'GET',
    uri: 'http://45.10.88.241:8026/hotline_feed?status=CONFIRMED'
}

const app = express();

const PORT = 8099;

// let map = new Map()
// fs.readFile('feedAll.js', "utf8", async function (err, data) {
//     let arr = JSON.parse(data);
//     for (let item of arr) {
//         map.set(item.id, item.supl_price);
//     }
// })


app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/login/LogIn', urlencodedParser,  /*loginController.login*/ passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    badRequestMessage: 'Некоректно введені дані'
    /*
        sessions:false
    */
}));

app.get('/login', async function (req, res) {
    res.render('login')
});

app.get('/', async function (req, res) {
    res.render('index')
});

app.get('/prom', async (req, res) => {
    res.render('promTable2')   //'promTable'
});

app.get('/prom-data', async (req, res) => {
    let arrAll = await model.getAllProducts()

    let outputArr = []
    for (let item of arrAll) {
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

app.get('/prom-data-good', async (req, res) => {
    let arrAll = await model.getAllGoodProducts()
    let outputArr = []
    for (let item of arrAll) {
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
    console.log(req.query)
    await model.updateProduct(req.query)
    res.send('ok');
});

app.get('/tablo', async function (req, res) {
    res.render('tablo')
});

// app.get('/feed', async function (req, res) {
//     res.send((map.get(Number.parseInt(req.query.id)))+'')
// });

app.get('/feed_hotline_all', async function (req, res){
    fs.readFile('feed_hotline_all.xml', "utf8", async function (err, data) {
        let mapFromFile = new Map()
        let arrFromRequest = []
        await request(options)
            .then(function (response) {
                arrFromRequest = JSON.parse(response);
            })
            .catch(function () {
                console.log('http://45.10.88.241:8026/hotline_feed?status=CONFIRMED   НЕТ ОТВЕТА')
            })

        for await (let item of txml.parse(data)[1].children[2].children) {
            let id = item.children[0].children[0];
            let url = item.children[1].children[0];
            mapFromFile.set(Number.parseInt(id), url);
        }

        for await (let item of arrFromRequest){
            if(!mapFromFile.has(Number.parseInt(item.feedId))){
                mapFromFile.set(Number.parseInt(item.feedId), item.autoSearchUrl)
            }
        }

        let objSave = {
            'price':{
                'date' : '2021-07-16 12:00',
                'firmName' : 'Комтрейдинг',
                'items' : []
            }
        }
        for await (let [key, value] of mapFromFile) {
            objSave.price.items.push({
                'item' : {
                    'id' : key,
                    'hotline_url': value
                }
            });
        }

        let xml = builder.create(objSave, {encoding: 'utf-8'})
            .end({ pretty: true });

        fs.writeFileSync('feed_hotline_all.xml',
            xml, {flag: 'w+'});


        const file = `${__dirname}/feed_hotline_all.xml`;
        res.download(file);
    })
})


app.listen(PORT, () => {
    console.log('Server Start!!!! PORT: ' + PORT);
});