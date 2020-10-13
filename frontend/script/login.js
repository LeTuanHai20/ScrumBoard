var ractive = new Ractive({
  el:"#app",
  template:"#login",
  data:{
      cookie:document.cookie.split("=")[1]?true:false
  }
})

//model
let Data = Backbone.Model.extend({
  url:'/api/login'
});
  //router
let ProjectRouter = Backbone.Router.extend({
  initialize:function () {
      Backbone.history.start({pushState:true});
  }
})
router = new ProjectRouter();
ractive.on("signIn", function (ctx) {
  user = new Data({ 
    email:$('#email').val(), 
    password: $('#password').val()
  });
  user.save({}, {
    success: function (result) {
      router.navigate("index.html",{ trigger: true });
      window.location.reload();
    },
    error:function () {
        document.getElementById("error").innerHTML = "<label>Thông tin tài khoản mật khẩu không chính xác</label>"
    }
  });
})



  
  