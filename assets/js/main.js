$(document).ready(function () {
    $(".loading").hide();
    initTyped();
    getLinks();
    getProjects();
    getContacts();
});

$('.menu a').click(function () {
    target = $(this).attr('goto');
    switchTo(target);
});

function initTyped(){
//     var options = {
// 	  strings: ['这里是 liyan 的主页啦...','一直看下去的话... 人家会害羞的qwq'],
// 	  typeSpeed: 120,
// 	  loop: false,
// 	  backDelay: 300,
// 	  backSpeed: 64,
// 	  showCursor: false
// 	};
// 	var typed = new Typed('#typed', options);
}
function getLinks(){
    $.getJSON("/templates/links.json", function(json){
        $.each(json,function(i, obj){
            if(!obj.logo){
                obj.logo = 'https://gravatar.wp-china-yes.net/avatar/114514?d=mm&s=256';
            }
            $('#friendlinks').append('<a href="'+obj.link+'" target="_blank"><img src="'+obj.logo+'"/><span>'+obj.name+'</span></a>');
        });
    });
}
function getProjects(){
    $.getJSON("/templates/projects.json", function(json){
        $.each(json,function(i, obj){
            if(!obj.logo){
                obj.logo = 'https://s3.undefined.moe/images/2021/07/20/imagea6b5046e9b629742.png';
            }
            $('#projectsarea').append('<a href="'+obj.link+'" target="_blank"><img src="'+obj.logo+'"/><span>'+obj.name+'</span></a>');
        });
    });
}
function getContacts(){
    $.getJSON("/templates/contacts.json", function(json){
        $.each(json,function(i, obj){
            if(!obj.icon){
                obj.icon = 'fa fa-globe';
            }
            $('#contacts').append('<a href="'+obj.link+'" target="_blank"><i class="'+obj.icon+'"></i><span>'+obj.name+'</span></a>');
        });
    });
}

function switchTo(target) {
    $('.right section').each(function () {
        $(this).removeClass('active');
    });
    $(target).addClass('active');
}

function getHitokoto() {
    $.ajax({
        url: "https://v1.hitokoto.cn/",
        dataType: "json",
        success: function (result) {
            write(result.hitokoto + " —— " + result.from);
        },
        error: function () {
            write("Error...");
        }
    });
}

function write(text) {
    if (text.length < 30) {
        $('#hitokoto').html(text);
    } else {
        getHitokoto();
    }
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}