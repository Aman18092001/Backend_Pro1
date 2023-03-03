const User=require('../models/users');

module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:'User Profile'

    })
};

//render the signUp page
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_signUp',{
        title:"codeial|Sign Up"
    })
}

//render the signIN page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_signIn',{
        title:"codeial | sign In"
    })
}

//get the signUp data
module.exports.create=function(req,res){
    if(req.body.password !=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user while signing up');
            return
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating user while signing up');
                    return
                }
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    });
}

//sign in and create a session for the user
module.exports.createSession=function(req,res){
    return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    req.logout((error) => {
        if (error) {
          return console.log(error);
        }
        res.redirect("/");
      });

}
