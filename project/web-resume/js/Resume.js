/**
 * Created by jun on 2016/9/27.
 */
$(function(){

    $('#dowebok').fullpage({
        scrollingSpeed: 400,
        css3: true,
        resize: true,
        anchors: ["page1","page2","page3","page4","page5","page6"],
        verticalCentered: false,
        afterRender: function(){
            $("#home").css({"display":"block"}).addClass("home_zoom");
            $("aside").css({"top":($(".active").height()-$("aside").height())/2});
            $("header").before("<div id='header' style='opacity:0'></div>");
            $("#home_head").css({"margin-top":"100px"});
            $("header").animate({opacity:"1"},1000,function(){
                $("#header").css({"opacity":"0.3"});
                $("#home_info1").fadeIn(700,function(){
                    $(this).next().animate({width:"800px"},700,function(){
                        $("#home_info2").fadeIn(450,function(){
                            $(this).next().fadeIn(450,function(){
                                $(this).next().fadeIn(450,function(){
                                    $(this).next().fadeIn(450,function () {
                                        $(this).next().fadeIn(450,function(){
                                            $("aside").fadeIn(300);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
            $("aside a").eq(0).addClass("selected").siblings().removeClass("selected");
        },
        afterLoad: function(anchorLink,index){
            if(index==1){
                $("aside a").eq(0).addClass("selected").siblings().removeClass("selected");
            }
            if(index==2){
                $("aside a").eq(1).addClass("selected").siblings().removeClass("selected");
                $("#about_content h1").after("<div class='title_en'><h2>· About me ·</h2></div>");
                $(".title_en").animate({width:"130px"},800,function(){
                    $(".title_en h2").slideDown(400);
                });
                $("#about_info").animate({width:"800px",marginTop:"0",marginBottom:"0"},700,'easeOutElastic',function(){
                    $("#about_info p").eq(0).animate({bottom:"0"},700,function(){
                        $("#about_info p").eq(1).animate({bottom:"0"},700,function(){
                            $("#about_info p").eq(2).animate({bottom:"0"},700,function(){
                                $("#about_info p").eq(3).animate({bottom:"0"},700);
                            });
                        });
                    });
                });
            }

            if(index==3){
                $("aside a").eq(3).addClass("selected").siblings().removeClass("selected");
                $("#exp_content h1").after("<div class='title_en'><h2>· Experience ·</h2></div>");
                $(".title_en").animate({width:"130px"},800,function(){
                    $(".title_en h2").slideDown(400);
                });
                var i=-1;
                $(".exp_scale").each(function() {
                    var $this=$(this);
                    if(!$this.hasClass("b_to_t")){
                        i++;
                        setTimeout(function(){
                            $this.addClass("b_to_t");
                        },200*i);
                    }
                });
                $("#exp_list_to").fadeIn(800).delay(500).fadeTo(300,0.3);
            }

            if(index==4){
                $("aside a").eq(5).addClass("selected").siblings().removeClass("selected");
                $("#contact_content h1").after("<div class='title_en'><h2>· Contact me ·</h2></div>");
                $(".title_en").animate({width:"130px"},800,function(){
                    $(".title_en h2").slideDown(400);
                });
                var i=-1;
                $("#contact_head1").addClass("b_to_t");
                $("#contact_head2 span").each(function(){
                    var $this=$(this);
                    if(!$this.hasClass("fade_in")){
                        i++;
                        setTimeout(function(){
                            $this.addClass("fade_in");
                        },200*i);
                    }
                });
                var j=-1;
                setTimeout(function(){
                    $(".contact_scale").each(function(){
                        var $this=$(this);
                        if(!$this.hasClass("fade_in")){
                            j++;
                            setTimeout(function(){
                                $this.addClass("fade_in");
                            },350*j);
                        }
                    });
                },70);
            }
        },
        onLeave:function(index){
            if(index==2||index==3||index==4||index==5||index==6){
                $(".title_en").remove();
            }
        }
    });
});
//顶部标题文字切换
$("#header_p").mouseover(function(){
    $("#header_p1").html("Resume");
    $("#header_p2").html("前端工程师");
}).mouseout(function(){
    $("#header_p1").html("楚韵江南");
    $("#header_p2").html("个人简历");
});
//顶部导航取消
/*
$("header nav a:not(':first')").click(function(){
    if($("header nav a:not(':second')")){
        alert("正在努力建设中...请稍等");
        return false;
    }

});
*/
//侧边导航文字切换
$("aside a").hover(function(){
    $(this).find("b").fadeToggle(200,"easeInOutCubic");
});
// 头像切换
$("#home_photo2").hover(function(){
    $(this).fadeTo(800,1);
},function(){
    $(this).stop(true,false).fadeTo(800,0);
});

// 图片轮播
$("#exp_list_slider").width($(".exp_list").width());
$("#exp_list_content").width($(".exp_list").width()*3);
$("#exp_list_slider_content").mouseenter(function(){
    $("#exp_list_to").stop(true,false).fadeTo(700,1);
}).mouseleave(function(){
    $("#exp_list_to").stop(true,false).fadeTo(700,0.1);
});
var page=1;
$("#exp_timeline a").click(function(){
    $("#exp_list_content").stop(true,false).animate({left:-$(".exp_list").width()*$(this).index()},2000,"easeInOutCubic");
    page=$(this).index()+1;
});
$("#exp_list_toleft").click(function()
{
    if(!$("#exp_list_content").is(":animated")){
        if(page==1){
            $("#exp_list_content").animate({left:"+=50"},200,function(){
                $(this).animate({left:"-=50"},200);
            });
            return false;
        }
        $("#exp_list_content").animate({left:"+="+$(".exp_list").width()});
        page--;
    }
});
$("#exp_list_toright").click(function(){
    if(!$("#exp_list_content").is(":animated")){
        if(page==3){
            $("#exp_list_content").animate({left:"-=50"},200,function(){
                $(this).animate({left:"+=50"},200);
            });
            return;
        }
        $("#exp_list_content").animate({left:"-="+$(".exp_list").width()});
        page++;
    }
});
// 时光轴
var x=10;
var y=20;
$("#exp_timeline a").mouseover(function(e){
    this.aa=this.title;
    this.title="";
    $("body").append("<div class='exp_timeline_title'>"+this.aa+"</div>");
    $(".exp_timeline_title").css({
        "top":e.pageY+y+"px",
        "left":e.pageX+x+"px"
    }).show("fast");
}).mouseout(function(){
    this.title=this.aa;
    $(".exp_timeline_title").remove();
}).mousemove(function(e){
    $(".exp_timeline_title").css({
        "top":e.pageY+y+"px",
        "left":e.pageX+x+"px"
    });
}).click(function(){
    return false;
});
// 点击留言
$("#contact_message1").click(function(){
    $(this).fadeOut(200,function(){
        $("#contact_form").fadeIn(200);
    })
});
////内容适应居中
$(function(){
    $("aside").css({"top":($(".active").height()-$("aside").height())/2});
    $("#home_content").css({"padding-top":($(".active").height()-$("#home_content").height())/6});
    $("#about_content").css({"padding-top":($(".active").height()-$("#about_content").height())/6});
    $("#skill_content").css({"padding-top":($(".active").height()-$("#skill_content").height())/6});
    $("#exp_content").css({"padding-top":($(".active").height()-$("#exp_content").height())/6});
    $("#demo_content").css({"padding-top":($(".active").height()-$("#demo_content").height())/6});
});

$("#myArticles").click(function () {
    // swal({
    //     title: "Sorry!",
    //     text: "该功能建设中，请暂时移步博客模块",
    //     imageUrl: "image/logo.png"
    // });

    swal({
        title: "建设中...",
        text: "是否跳转到博客页面(chuyun.github.io) ",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, Go Ahead！",
        closeOnConfirm: false
    },
        function(){
        setTimeout(function () {
            window.location.href="http://chuyun.github.io/tags/article/";
        },1000);
            // window.open('http://chuyun.github.io/tags/article/');
            swal("Complete", "您正在前往博客页面(chuyun.github.io).", "success");
        });
});

$("#aboutMe").click(function () {
    window.location.href="http://chuyun.github.io/about/";
});