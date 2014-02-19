登陆检查
========================

## API
+ session           Connect中件间，启动时加载
+ sessionAdmin      Connect中件间，增加admin判断，启动时加载
+ login             登陆
+ logout            退出
+ isLoggedIn        检查是否已登陆，如果已登陆执行next()，未登陆转向redirect
+ isLoggedInAdmin   检查是否管理员已登陆，如果已登陆执行next()，未登陆转向redirect
+ isLoggedOut       检查是否未登陆，如果未登陆执行next()，已登陆转向redirect

## demo
```{javascript}
var login = require("ape-auth-check");

...

app.use(express.cookieParser());
app.use(express.session({ secret: "blog.fens.me" }));
app.use(login.session());
app.use(login.sessionAdmin())
app.use(app.router);

...

app.get("/home",
    login.isLoggedIn(),
    site.index);

app.get("/admin",
    login.isLoggedInAdmin(),
    site.index);

app.get("/login",
    login.isLoggedOut(),
    site.login);
```

```{javascript}
app.get("/logout", function (req, res) {
    login.logout(req,function(){
        res.redirect("/");
    });
});

app.get("/oauth/callback", function (req, res) {
    db.getUser(function(err,user)){
         login.login(req,user,function(){
             res.redirect("/");
         });
    }
});
```

## License

private

