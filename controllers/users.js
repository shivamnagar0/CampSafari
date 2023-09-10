const User = require('../models/user');

module.exports.renderRegister = (req , res) => {
    res.render('users/register')
}

module.exports.register = async(req , res , next) => {
    try{
        const {email , username , password} = req.body;
        const user = new User({email , username});
        const registeredUser = await User.register(user , password);
        req.login(registeredUser , err => {
            if (err) {
                return next(err);
            } else {
                req.flash('success' , 'Welcome to the CampSafari...');
                res.redirect('/campgrounds');        
            }
        })
    } catch (e) {
        req.flash('error' , e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin = (req , res) => {
    res.render('users/login');
}


module.exports.login = (req , res) => {
    req.flash('success' , 'Weclcome Back! 👋')
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = function(req, res, next){
    req.logout(function(err) {
      if (err) {
        return next(err); 
      } else {
        req.flash('success' , 'Logged Out Successfully...');
        res.redirect('/campgrounds');
      }
    });
  }