function getByClass(oParent,sClass)
    {
        var aEle = document.getElementsByTagName('*');
        var aResult = [];

        for(var i=0;i<aEle.length;i++)
        {
            if(aEle[i].className ==sClass)
            {
                aResult.push(aEle[i]);
            }
        }
        return aResult;
    }

   window.onload = function()
   {

        var aDatas=
        ['日本の樱','去奈良喂小鹿哟~','仓镰-灌篮高手','啊~秋叶原！','去藤子不二雄博物馆，唤醒童年记忆','泡汤~~'];

        var oDiv = document.getElementById('playimages');
        var oBtnPrev = getByClass(oDiv,'prev')[0];
        var oBtnNext = getByClass(oDiv,'next')[0];
        var oMarkLeft = getByClass(oDiv,'mark_left')[0];
        var oMarkRight = getByClass(oDiv,'mark_right')[0];
        var timer=null;

        oBtnPrev.onmouseover = oMarkLeft.onmouseover = function()
        {
            startMove(oBtnPrev,'opacity',100);
        }
        oBtnPrev.onmouseout = oMarkLeft.onmouseout = function()
        {
            startMove(oBtnPrev,'opacity',0);
        }//markleft和prev是同一个层级，没有父子关系，移到Prev上就相当于移出Markleft了
         oBtnNext.onmouseover = oMarkRight.onmouseover = function()
        {
            startMove(oBtnNext,'opacity',100);
        }
        oBtnNext.onmouseout = oMarkRight.onmouseout = function()
        {
            startMove(oBtnNext,'opacity',0);
        }
        //鼠标移动到哪个小图上，就让该小图变成不透明，移出变半透明；点击哪个小图，就让该小图变成不透明，别的变成半透明，同时让上面大图对应那一张拿下来 ‘小图点击，大图显示’
        var oSmallUl = getByClass(oDiv,'small_pic')[0].getElementsByTagName('ul')[0];
        var aSmallLi = oSmallUl.getElementsByTagName('li');

        var oBigUl = getByClass(oDiv,'big_pic')[0];
        var aBigLi = oBigUl.getElementsByTagName('li');
        var iNow=0;
        var iMinZindex = 2;//最小层级,试了试1也可以，不清楚这里2是怎么来的？
        var oTxt=getByClass(oDiv,'text')[0];
        var oLength=getByClass(oDiv,'length')[0];

        oSmallUl.style.width = aSmallLi.length*aSmallLi[0].offsetWidth+'px';//记得加‘px’,用JS加可以自适应宽度，有几张图片就是几张的宽度

        for(var i=0;i<aSmallLi.length;i++)
        {
            aSmallLi[i].index = i;//给所有asmallli都增加索引值
            aSmallLi[i].onmouseover = function()
            {
                //alert('a');//出不来东西，可以先自己测试，比如随便弹个东西，看事件加上没有
                startMove(this,'opacity',100);
            }
            aSmallLi[i].onmouseout = function()
            {
                if(this.index!=iNow)//当前的this是要移出的，iNow是点击的
                {
                     startMove(this,'opacity',60);
                }
            }
            aSmallLi[i].onclick = function()
            {
                if(this.index==iNow)
                {
                    return;
                }//当点击的是当前图时，返回空，即什么都不做，避免重复加图片
                iNow=this.index;

                tab();
            }

            function tab()
            {
                //增加了文字说明部分
                oTxt.innerHTML = aDatas[iNow];
                oLength.innerHTML = (iNow+1)+'/6';

                for(var i=0;i<aSmallLi.length;i++)
                {

                    startMove(aSmallLi[i],'opacity',60);
                }
                //this就是asmallli[inow],this.index就是inow
                startMove(aSmallLi[iNow],'opacity',100);//类似选项卡，所有都先设为一个值，再改当前值
                aBigLi[iNow].style.zIndex=iMinZindex++;//假如没有这句，单纯地下拉图片，永远只能看到都是层级最高的那一个图片，因为它们是有层级的，其他图片会被挡在后面
                aBigLi[iNow].style.height=0;
                startMove(aBigLi[iNow],'height',oBigUl.offsetHeight);//高度是从零开始往下拉
               
                if(iNow==0)//第一张，左边距设为0
                {
                    startMove(oSmallUl,'left',0);
                }
                else if(iNow==aSmallLi.length-1)//最后一张，左边距为-(n-2)*li.width
                {
                    startMove(oSmallUl,'left',-(iNow-2)*aSmallLi[0].offsetWidth);
                }
                else
                {
                    startMove(oSmallUl,'left',-(iNow-1)*aSmallLi[0].offsetWidth);
                }
                

                //点击后，移出是开始会变淡，所以增加了索引值，移出时判断当前移出的是不是点击的那个，若是，就不改变透明度，否则就改变透明度
                
            }
            oBtnPrev.onclick = function()
            {
                iNow--;
                if(iNow==-1)
                {
                    iNow=aSmallLi.length-1;//过了第零张，就从最后一张重新开始
                }
                tab();
            }
            oBtnNext.onclick=function()
            {
                iNow++;
                if(iNow==aSmallLi.length)
                {
                    iNow=0;//过界了从零开始
                }
                tab();
            }
            //还有自动播放、更改文字
            oDiv.onmouseout = function()
            {
               
                startAutoPlay();

            }
            oDiv.onmouseover=function()
            {
                stopAutoPlay();
            }
            function startAutoPlay()
            {
                if (timer)
                {
                    clearInterval(timer);
                }
                timer=setInterval(function(){
                    // alert('');
                    iNow++;
                    if(iNow==aSmallLi.length)
                    {
                        iNow=0;
                    }
                    tab();

                },3000);
            }
            
            function stopAutoPlay()
            {
                if(timer)
                {
                    clearInterval(timer);
                    timer=null;
                }
            }

            oTxt.innerHTML = aDatas[iNow];
            oLength.innerHTML = (iNow+1)+'/6';
            // 刚加载完页面后，若还没调用tab(),那么刚开始文字说明部分没有，所以这里加一句，保证刚加载过去的时候就有说明部分
        }
            

   } 