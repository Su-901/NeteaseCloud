  $(function(){
            $(".small").mouseenter(function(){
                $(".mark").show();
                $(".big").show();
            }).mouseleave(function(){
                $(".mark").hide();
                $(".big").hide();
            }).mousemove(function(ev){
                var l = ev.clientX - $(".small").offset().left - 100;
                var t = ev.clientY - $(".small").offset().top - 100;
    
                //限制出界
                if(l <= 0){
                    l = 0;
                }
                if(l >=300){
                    l = 300
                }
    
                if(t <= 0){
                    t = 0;
                }
                if(t >= 300){
                    t = 300;
                }
    
                //改变遮罩层的位置
                $(".mark").css({
                    left: l,
                    top: t,
                  
                })
             
                //同时移动大图片的位置，反向四倍的距离
                $(".big img").css({
                    left: - l * 2,
                    top: - t * 2
                })
            })

        })