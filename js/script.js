var html = document.documentElement;
var iw = html.getBoundingClientRect().width;
html.style.fontSize = iw/15 + "px";
document.addEventListener('touchstart',function(ev){
    ev.preventDefault();
});
window.onload = function(){var wrap = document.querySelector('.wrap'),
    list = document.querySelector('.list'),
    a = document.querySelectorAll('nav a'),
    disX = 0,//按下的坐标
    listL = 0,//当前按下list的left值
    w = wrap.clientWidth,//一张图片的宽度
    len = 0,
    n = 0; //默认第一个小点为白色


    list.innerHTML += list.innerHTML;

    len = list.children.length;

    list.style.width = w * len + 'px';

    list.addEventListener('touchstart',start);
    list.addEventListener('touchmove',move);
    list.addEventListener('touchend',end);
    function start(ev){
        var e = ev.changedTouches[0];
        disX = e.pageX;
        list.style.transition = 'none';
        //console.log(disX);
        /*
            在按下的时候，要知道当前点击的是第几张图片
            如果是第一张快速拉到第5张的位置上。
        */
        var num = Math.round(list.offsetLeft / w);
        //console.log(len);
        if(num == 0){
            num = a.length;
            list.style.left = -num * w + 'px';
        }

        if(-num == len-1){
            num = a.length-1;
            list.style.left = -num * w + 'px';
            console.log(num);
        }

        listL = this.offsetLeft;
    }
    function move(ev){
        var e = ev.changedTouches[0];
        list.style.left = (e.pageX - disX) + listL + 'px';
    }
    function end(){
        var num = Math.round(list.offsetLeft / w);
        list.style.transition = '.5s';
        list.style.left = num * w + 'px';

        a[n].className = '';
        a[-num%a.length].className = 'active';
        n = -num%a.length;
    }};