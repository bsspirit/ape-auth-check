'use strict';
// isAuthenticate check

/**
 * 设置connect中件间，启动加载
 */
exports.session = function(){
    return function(req, res, next){
        if(req.user ||  req.session.user){
            req.isAuthenticated = function(){
                return true;
            }
        }
        next();
    }
}

/**
 *登陆
 */
exports.login=function(req,user,next){
    req['user'] = user;
    req.session['user']=user;
    next();
}

/**
 *退出
 */
exports.logout = function(req,next){
    delete req['user'];
    delete req.session['user'];
    next();
}


/**
 * 检查是否已登陆，如果已登陆执行next()，未登陆转向redirect
 */
exports.isLoggedIn = function(redirect) {
    return function (req, res, next) {
        if (req.isAuthenticated && req.isAuthenticated()) {
            return next();
        }
        res.redirect(redirect || '/login');
    }
}

/**
 * 检查是否未登陆，如果未登陆执行next()，已登陆转向redirect
 */
exports.isLoggedOut = function(redirect) {
    return function (req, res, next) {
        if (!req.isAuthenticated || !req.isAuthenticated()) {
            return next();
        }
        res.redirect(redirect || '/home');
    }
}