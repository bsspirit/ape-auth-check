'use strict';
// isAuthenticate check

var _this =this;

/**
 * 设置connect中件间，启动加载
 */
exports.session = function () {
    return function (req, res, next) {
        if (req.user || req.session.user) {
            req.isAuthenticated = function () {
                return true;
            }
        }
        next();
    }
}

/**
 * 设置管理员账号角色，启动加载
 */
exports.sessionAdmin = function () {
    return function (req, res, next) {
        if (req.user || req.session.user) {
            req.isAdmin = function(){
                var user = req.user || req.session.user;
                return  (user.role && user.role == 'admin')?true:false;
            }
        }
        next();
    }
}

/**
 *登陆
 */
exports.login = function (req, user, next) {
    req['user'] = user;
    req.session['user'] = user;
    next();
}

/**
 *退出
 */
exports.logout = function (req, next) {
    delete req['user'];
    delete req.session['user'];
    next();
}


/**
 * 检查是否已登陆，如果已登陆执行next()，未登陆转向redirect
 */
exports.isLoggedIn = function (redirect) {
    return function (req, res, next) {
        if (req.isAuthenticated && req.isAuthenticated()) {
            return next();
        }
        res.redirect(redirect || '/login');
    }
}

/**
 * 检查是否管理员已登陆，如果已登陆执行next()，未登陆转向redirect
 */
exports.isLoggedInAdmin = function (redirect) {
    return function (req, res, next) {
        if (req.isAuthenticated && req.isAuthenticated()) {
            if (req.isAdmin && req.isAdmin()) {
                return next();
            }
            res.redirect(redirect || '/home');
        }
        res.redirect(redirect || '/login');
    }
}

/**
 * 检查是否未登陆，如果未登陆执行next()，已登陆转向redirect
 */
exports.isLoggedOut = function (redirect) {
    return function (req, res, next) {
        if (!req.isAuthenticated || !req.isAuthenticated()) {
            return next();
        }
        res.redirect(redirect || '/home');
    }
}