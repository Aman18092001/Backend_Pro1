module.exports.home=function(req,res){
    console.log(req.cookies);
    res.cookie('aman',28);
    return res.render('home',{
        title:"hommies"
    });
};


