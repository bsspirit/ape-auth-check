登陆检查
========================

## API

+ isLoggedIn   检查是否已登陆，如果已登陆执行next()，未登陆转向redirect
+ isLoggedOut  检查是否未登陆，如果未登陆执行next()，已登陆转向redirect

## demo
```{javascript}
var login = require("ape-auth-check")

app.get('/',
    login.isLoggedIn(),
    site.index);

app.get('/login',
    login.isLoggedOut(),
    site.login);
```

## License

private

