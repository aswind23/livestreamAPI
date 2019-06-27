// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// const port = process.env.PORT || 5000;
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


// app.get('/search', function(req, res) {
//     let query = req.query.queryStr;
//     let url = `https://glivestreaming.com/api.php?action=getmatch&apiuser=9wsnk&key=sEqw43df6M&format=JSON`;

//     axios({
//         method:'get',
//         url: url
//     })
//     .then(function (response) {
//         res.send(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
// });

// app.listen(port, function () {
//     console.log('Intentwise app is running on http://localhost:' + port);
// });

// module.exports = app;
const axios = require('axios');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/channels', function(req, res) {
    let query = req.query.queryStr;
    let url = `https://glivestreaming.com/api.php?action=getmatch&apiuser=9wsnk&key=sEqw43df6M&format=JSON`;

    axios({
        method:'get',
        url: url
    })
    .then(function (response) {
        res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
});

app.get('/streaming', function(req, res) {
    let query = req.query.queryStr;
    let channel = req.query.channel;
    let userip =  req.query.userip;
    console.log(req.query)
    //let ipaddress = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress).split(",")[0];
    let url = `http://glivestreaming.com/api.php?action=getsportsurl&apiuser=9wsnk&key=sEqw43df6M&ch=`+channel+`&ip=` + userip;

    axios({
        method:'get',
        url: url
    })
    .then(function (response) {
        res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
});

app.listen(port, function () {
    console.log('Intentwise app is running on http://localhost:' + port);
});