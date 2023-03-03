const express=require('express');
const app=express();
const port=4000;
const cookieParser=require('cookie-parser');
const expressLayout=require('express-ejs-layouts');
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
const sassMIddleware=require('node-sass-middleware');
app.use(sassMIddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));

app.use(expressLayout);
//extract styles and scripts from subpages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// set up view engine
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the session cookie in the db 
app.use(session({
    name:'codeial',
    // TODO change the secret before deployment in production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000 * 60 *100)
    },
    store: MongoStore.create(
      {
        mongoUrl:"mongodb://127.0.0.1:27017/codeial_db",
        autoRemove:'disabled'
      },
      function(err){
        console.log(err || 'connect_mongodb setup ok');
      }  
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`error in server: ${err}`);
    }
    console.log(`server is running on: ${port}`);
});