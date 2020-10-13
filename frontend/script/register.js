var ractive = new Ractive({
  el:"#app",
  template:"#register",
  data:{
    cookie:document.cookie.split("=")[0],
    Islogin: document.cookie.split("=")[1]?true:false
  }
})
//model
let Users = Backbone.Model.extend({
  url:'/api/register'
});
let Router = Backbone.Router.extend({
  initialize:function () {
      Backbone.history.start({pushState:true});
  }
})
router = new Router();
ractive.on("register", function (ctx) {
  user = new Users( { 
    name:$('#name').val(),
    email:$('#email').val(), 
    password: $('#password').val()
  });
  user.save({},{
    success: function (result) {
      alert("Bạn đã đăng kí thành công")
      router.navigate("index.html",{ trigger: true });
      window.location.reload();
    },
    error:function () {
        document.getElementById("error").innerHTML = "<label>Các trường không được để trống</label>";
    }
  });
})
ractive.on('logout', function( ctx, cookie ) {
  document.cookie = cookie +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  window.location.reload();
});
ValidateEmail = () =>{
  let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let email = $('#email').val();
  if(!email.match(regexEmail)){
    document.getElementById("register").disabled = true;
    document.getElementById("error").innerHTML = "<label>Email chỉ được có chữ, số và kí tự _ và kết thúc bằng đuôi @gmail.com</label>";
  }
  else
  {
    document.getElementById("error").innerHTML = "";
    document.getElementById("register").disabled = false;
  }
}
ValidatePassword = () => {
  let regexPassword =/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/gm;
  let password =  $('#password').val();
  if(!password.match(regexPassword)){
    document.getElementById("register").disabled = true;
    document.getElementById("error").innerHTML = "<label>Mật khẩu phải được ít nhất một chữ, một số,6 kí tự</label>";
  }
  else
  {
    document.getElementById("register").disabled = false;
    document.getElementById("error").innerHTML = "";
  }
}
ractive.on('validateEmail', ValidateEmail)
ractive.on('validatePassword', ValidatePassword);

