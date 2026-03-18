$("li").on("click", function(){
  
  var item = $(this),
      pos = "-"+(item.index() * 515)+"px";
 
  item.addClass("active");
  item.siblings().removeClass("active");
  
  $("ul").css("left", pos);
  
});