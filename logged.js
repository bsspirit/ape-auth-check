'use strict';
// isAuthenticate check

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