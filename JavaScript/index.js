//多物体多样式的运动   startMove(this, "width", 300);
function startMove(node, cssObj, complete){ //complete = show;
    clearInterval(node.timer);
    node.timer = setInterval(function(){
        
        var isEnd = true; //假设所有动画都都到达目的值

        for(var attr in cssObj){
            //取出当前css样式的目的值
            var iTarget = cssObj[attr];
            //1、获取当前值
            var iCur = null;

            if(attr == "opacity"){
                iCur = parseInt(parseFloat(getStyle(node, "opacity")) * 100);
            }else{
                iCur = parseInt(getStyle(node, attr))
            }
            //2、计算速度
            var speed = (iTarget - iCur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if(attr == "opacity"){
                iCur += speed;
                node.style.opacity = iCur / 100;
                node.style.filter = `alpha(opacity=${iCur})`;

            }else{
                node.style[attr] = iCur + speed + 'px';
            }
            
            //当前值是否瞪目目的值
            if(iCur != iTarget){
                isEnd = false;
            }
        }
        

        if(isEnd){
            //说明都到达目的值
            clearInterval(node.timer);
           
            if(complete){
                complete.call(node);
            }
        }
    }, 30);
}

/*
    node  元素节点
    cssStyle  获取css样式类型
*/
function getStyle(node, cssStyle){
    if(node.currentStyle){
        return node.currentStyle[cssStyle];
    }else{
        return getComputedStyle(node)[cssStyle];
    }
}
window.onload = function () {
    const oBanner = document.querySelector(".banner");
    const oImgBox = document.querySelector(".imgBox");
    const aBtns = document.querySelectorAll(".pointBox li");
    const aLeftRightBtns = document.querySelectorAll(".leftRightTabs a");
    let iNow = 1; //代表当前显示的图片的下标。
    let timer = null;
    let isRuning = false; //代表正在动画

    //给每一个按钮添加点击
    for (let i = 0; i < aBtns.length; i++) {
      aBtns[i].index = i;
      aBtns[i].onclick = function () {
        iNow = this.index + 1;
        //切换
        tab();
      };
    }
    //给整个banner图效果，添加移入
    oBanner.onmouseenter = function () {
      clearInterval(timer);
    };
    oBanner.onmouseleave = function () {
      timer = setInterval(function () {
        if (!isRuning) {
          isRuning = true; //动画开始
        } else {
          return;
        }
        iNow++;
        tab();
      }, 2000);
    };

    //给左右按钮添加点击
    aLeftRightBtns[0].onclick = function () {
      if (!isRuning) {
        isRuning = true; //动画开始
      } else {
        return;
      }
      iNow--;
      tab();
      return false;
    };

    aLeftRightBtns[1].onclick = function () {
      if (!isRuning) {
        isRuning = true; //动画开始
      } else {
        return;
      }
      iNow++;
      tab();
      return false;
    };

    //启动自动轮播
    timer = setInterval(function () {
      if (!isRuning) {
        isRuning = true; //动画开始
      } else {
        return;
      }
      iNow++;
      tab();
    }, 3000);

    function tab() {
      for (let i = 0; i < aBtns.length; i++) {
        aBtns[i].className = "";
      }
      if (iNow == 7) {
        aBtns[1].className = "active";
      } else if (iNow == 0) {
        aBtns[0].className = "active";
      } else {
        aBtns[iNow - 1].className = "active";
      }

      startMove(oImgBox, { left: -1920 * iNow }, function () {
        //最后一张图片显示完毕以后，我们需要切回1这个图片
        if (iNow == 6) {
          iNow = 1;
          oImgBox.style.left = "-1920px";
        } else if (iNow == 0) {
          iNow = 5;
          oImgBox.style.left = iNow * -1920 + "px";
        }
        isRuning = false; //动画结束
      });

    }
  };