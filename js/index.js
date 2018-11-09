$(function(){
    // $("#redpack").removeClass("hide")
    // .find(".redpack_close").click(function(){
    //     var $a = $(this);
    //     $a.parent().parent().addClass("hide");
    // })

    var x=[-300,0,300],y=[0,0,0],z=[0,100,0]; 
    function arrRool(arrs){
        var newArr=[];
        var len=arrs.length;
        newArr[len-1]=arrs[0];
        for (var i=0;i<len-1;i++){
            newArr[i]=arrs[i+1];
            //newArr[0]=arrs[1]
            //newArr[1]=arrs[2]
            //newArr[2]=arrs[0]
        }
	    for(var j=0;j<newArr.length;j++){
			arrs[j] = newArr[j];
        }
	}


    var $pro = $("#main").children(".choice").children().children(":last-child").children().children();
    
    function rotateY(){
        arrRool(x);
        arrRool(z);
        for(var i=0;i<$pro.length;i++){
            $($pro[i]).css("transform",`translate3d(${x[i]}px,${y[i]}px,${z[i]}px)`);
        } 
    }
    setInterval(rotateY,5000);

    ///////////搜索框//////////////
    function randomText(){
        var arrs=["白兔糖","巧克力","坚果","果酱","棒棒糖","星空糖","薯片","饼干"];
        var n = Math.floor(Math.random()*arrs.length);
        var input = document.querySelector("[data-random=randomText]");
        var placeholder = input.getAttribute("placeholder");
        if(placeholder==arrs[n]){
            arrs.splice(n,1);
            n = Math.floor(Math.random()*(arrs.length-1))
            input.setAttribute("placeholder",arrs[n])
        }else{
            input.setAttribute("placeholder",arrs[n])
        } 
    }
    setInterval(randomText,1000);


    /*********轮播图********* */
    function carousel(){
        var $carouselDiv = $("[data-carousel]");
        var $items =$carouselDiv.find(".carousel_items>.carousel_item");
        //////////轮播主程序///////////////
        function main(direction="next") {
            for (var item of $items) {
                var $item = $(item);
                if ($item.hasClass("active")) {
                    $item.removeClass("active");
                    if (direction == "next") {
                        if ($item.is(":last-child")) {
                            $item.parent().children(":first-child").addClass("active");
                        } else {
                            $item.next().addClass("active");
                            break;
                        }
                    } else {
                        if ($item.is(":first-child")) {
                            $item.parent().children(":last-child").addClass("active");
                            break;
                        } else {
                            $item.prev().addClass("active");
                            break;
                        }
                    }
                }
            }

            /************控制轮播点 */
            var activeImgIndex = $carouselDiv.find(".carousel_items>.active").index();
            $carouselDiv.children("#carousel_dots").children().eq(activeImgIndex).children().addClass("active").parent().siblings().children().removeClass("active");
            
        }
        var timer = setInterval(main,4000);

        /************显示左右箭头************ */
        var $leftArrow = $carouselDiv.children("[data-slide=prev]")
        var leftP = $leftArrow.css("left");
        var $rightArrow = $carouselDiv.children("[data-slide=next]")
        var rightP = $rightArrow.css("right");
        $carouselDiv.on("mouseenter",function(){
            $leftArrow.css("left",0);$rightArrow.css("right",0);
            clearInterval(timer);
        }).on("mouseleave",function(){
            $leftArrow.css("left",leftP);$rightArrow.css("right",rightP);
            timer = setInterval(main,4000);
        })    
        
        /************左右箭头切换图片*********** */
        function clickSlide(){
            $carouselDiv.on("click","[data-slide]",function(){
                var $slide = $(this);
                var dir = $slide.attr("data-slide");
                if($slide.is("[data-slide=prev]")){
                    main(dir);
                }else{
                    main(dir)
                }
            })
        }
        clickSlide()

        /***************轮播点链接****************** */
        function clickDot(){
            var $dots = $carouselDiv.children("#carousel_dots");
            $dots.on("click","[data-show]",function(e){
                e.preventDefault();
                var $dot = $(this);
                var index = $dot.parent().index();
                var $selImg = $items.eq(index);
                $selImg.addClass("active").siblings().removeClass("active");
                $dot.addClass("active").parent().siblings().children().removeClass("active");
                
            })
        }
        clickDot()
    }
    carousel();
    


    /*********nav颜色切换***********/
    function toggleColor(){
        var $nav = $("[data-toggle=color]");
        $nav.on("click","LI",function(){
            var $li = $(this);
            $nav.find(".active").removeClass("active");
            $li.addClass("active");
        })
        
    }
    toggleColor();
})