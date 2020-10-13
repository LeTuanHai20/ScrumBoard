let ProjectRouter = Backbone.Router.extend({
  initialize:function () {
      Backbone.history.start({pushState:true});
  }
})
router = new ProjectRouter();
let ColumnModel = Backbone.Model.extend({
  url:'/api/Column'
});
let TaskModel = Backbone.Model.extend({
  url:'/api/Task'
});
GetData();
var ractive = new Ractive({
  el:"#app",
  template:"#index",
  data:{
    cookie:document.cookie.split("=")[0],
    Islogin: document.cookie.split("=")[1]?true:false
  }
})

function GetData() { 
  let arrData = []; 
  column = new ColumnModel();
  task = new TaskModel(); 
  column.fetch({ 
  success:function (column) {
     for (const property1 in column.attributes) 
     { 
       let data = { 
         ColumnId: column.attributes[property1].Id,
         ColumnName: column.attributes[property1].Name,
         ColumnUserId: column.attributes[property1].UserId, Task:[]
         };
       task.fetch({ 
        success:function (task) {
         for (const property2 in task.attributes)
          { 
            if(task.attributes[property2].ColumnId == column.attributes[property1].Id)
            { 
              data.Task.push(task.attributes[property2]) 
            } 
          } 
        } 
      }).then((x) => { 
        arrData.push(data);
        ractive.set({ columns: arrData }) 
        }); 
      } 
    } 
  }); 
} 

//task

let TaskToDeleteModel = Backbone.Model.extend({
  url:'/api/deleteColumn'
});
ractive.on("addTask", function (ctx) {
  task = new TaskModel({ 
    ColumnId :$(`#${ctx.node.parentElement.children[0].id}`).val(),
    Name:$(`#${ctx.node.parentElement.children[1].childNodes[0].id}`).val(),
    Content:$(`#${ctx.node.parentElement.children[2].childNodes[0].id}`).val(),
    cookie: document.cookie.split("=")[1]
  });
  task.save({}, {
    success: function (result) {
      window.location.reload();
    },
    error:function (model, response) {
      if( JSON.parse(response.responseText)["error"] === 4){
        router.navigate("login.html",{ trigger: true });
        window.location.reload();
      }else{
        alert("Tên Task là bắt buộc")
      }
    }
  });
})
ractive.on("DeleteColumn", function (ctx,id) {
  if (confirm('Are You Sure?')){
    task = new TaskToDeleteModel({ 
      ColumnId :id
    });
    task.save({}, {
      success: function (result) {
        window.location.reload();
      },
      error:function () {
        alert("Không xóa thành công")
      }
    });
  }
})
//columns
ractive.on('logout', function( ctx, cookie ) {
  document.cookie = cookie +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  window.location.reload();
});
ractive.on("addColumn", function(ctx){
  column = new ColumnModel({ 
    Name:$("#nameColumn").val() 
  });
  column.save({}, {
    success: function (result) {
      window.location.reload();
    },
    error:function () {
      alert("Tên cột không được để trống và chỉ có tối đa 6 bảng")
    }
  });

})
ractive.on("ShowForm", function (ctx, id) {
    $(`#${ctx.node.id}`).next().slideToggle();
})
ractive.on("HiddenForm", function (ctx, id) {
    $(`#${ctx.node.parentNode.id}`).hide();
})
$(document).ready(function () {
 
  //drag
$(".column" ).sortable({
  connectWith: ".column",
  handle: ".portlet-header",
  cancel: ".portlet-toggle",
  start: function (event, ui) {
    ui.item.addClass('tilt');
  },
  stop: function (event, ui) {
    ui.item.removeClass('tilt');
  }
  });
  $( ".portlet" )
  .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
  .find( ".portlet-header" )
    .addClass( "ui-widget-header ui-corner-all" )
    .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");
  $( "#sortable" ).sortable();
  $( "#sortable" ).disableSelection();
  // click 
  $('.content').slideUp();
  $('.addColumn').slideUp();
  $('.addTask').slideUp();
  $(".portlet .portlet-header").click(function (e) { 
    e.preventDefault();
    $(this).next().slideToggle();
  });
  $("#idAddColumn").click(function (e) { 
    e.preventDefault();
    $(this).hide();
    $(this).next().slideToggle();
  });
  $(".btnCancelColumn").click(function (e) { 
    $(".addColumn").hide();
    $("#idAddColumn").show();
  });
});


