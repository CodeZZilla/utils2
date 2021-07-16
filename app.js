const express = require('express');
const path = require("path");
const model = require('./models/RozetkaAPI');
const passport = require('./config/passport.js');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const LocalStrategy = require('passport-local').Strategy;


const app = express();

const PORT = 8099;

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
    failureFlash:true,
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

app.get('/prom-data-good', async (req, res) => {
    let arrAll = await model.getAllGoodProducts()
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
    console.log(req.query)
    await model.updateProduct(req.query)
    res.send('ok');
});



app.listen(PORT, () => {
    console.log('Server Start!!!! PORT: ' + PORT);
});