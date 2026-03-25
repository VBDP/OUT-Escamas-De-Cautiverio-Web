$(".slider li").on("click", function(){
  
  var item = $(this),
      pos = "-"+(item.index() * 515)+"px";
 
  item.addClass("active");
  item.siblings().removeClass("active");
  
  $(".slider ul").css("left", pos);
  
});