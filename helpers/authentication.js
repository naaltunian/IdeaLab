module.exports = {
    isAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()){
            return next()
        }
        req.flash('error_msg', "Register or Login");
        res.redirect('/users/login');
    }
}