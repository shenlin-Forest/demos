function getByClass(oParent,sClass)
	{
		var aEl = document.getElementsByTagName('*');
		var aResult=[];

		for(var i=0;i<aEl.length;i++)
		{
			if(aEl[i].className==sClass)
			{
				aResult.push(aEl[i]);
			}
		}
		return aResult;
	}
	window.onload = function()
	{
		var oDiv = document.getElementById('playimages');
		var oBtnPrev = getByClass(oDiv,'prev')[0];
		var oBtnNext = getByClass(oDiv,'next')[0];
		var oMarkLeft = getByClass(oDiv,'mark_left')[0];
		var oMarkRight = getByClass(oDiv,'mark_right')[0];
		var iNow = 0;
		var oSmallUl = getByClass(oDiv,'small_pic')[0].getElementsByTagName('ul')[0];
		var aSmallLi= oSmallUl.getElementsByTagName('li');
		var iMinZindex=1;
		// alert(aSmallLi.length);确实为6
		var aDatas=['苏打绿新专辑','金秋新歌盘点','温暖小调','格雷森','聆听天籁的精灵','炫动色彩'];
		var oBack = document.getElementById('back');
		// alert(typeof(oBack));
		var oTxt = getByClass(oDiv,'text')[0];
		var oLength=getByClass(oDiv,'length')[0];
		var oBtn=document.getElementById('btn');
		var timer;
		var aA=oBtn.getElementsByTagName('a');
		// alert(typeof(aA));

		oSmallUl.style.width=aSmallLi.length * aSmallLi[0].offsetWidth+'px';
		
		oBtnPrev.onmouseover=oMarkLeft.onmouseover = function()
		{
			startMove(oBtnPrev,'opacity',100);
		}
		oBtnPrev.onmouseout=oMarkLeft.onmouseout= function()
		{
			startMove(oBtnPrev,'opacity',0);
		}
		oBtnNext.onmouseover=oMarkRight.onmouseover = function()
		{
			startMove(oBtnNext,'opacity',100);
		}
		oBtnNext.onmouseout=oMarkRight.onmouseout= function()
		{
			startMove(oBtnNext,'opacity',0);
		}

		for(var i=0;i<aSmallLi.length;i++)
		{
			aSmallLi[i].index=i;
			aSmallLi[i].onclick=function()
			{
				for(var i=0;i<aA.length;i++)
				{
					aA[i].className='index';
				}
				aA[this.index].className='active';

				iNow=this.index;
			}	
			//纯粹这里的inow和this,index就没关系，就是个数字而已
			

		}

		function tab()
		{
			oTxt.innerHTML=aDatas[iNow];
			oLength.innerHTML=(iNow+1)+'/6';
			startMove(oSmallUl,'left',-iNow*aSmallLi[0].offsetWidth);//这个算法和窗口是三个的不同，要根据具体情况来看，公式不是固定的
		}

		oBtnPrev.onclick = function()
		{
			 // alert(iNow);
			iNow--;
			if(iNow==-1)
			{
				iNow=aSmallLi.length-1;

			}
			// 
			tab();
		
		}
		oBtnNext.onclick = function()
		{	iNow++;
			if(iNow==aSmallLi.length)
			{
				iNow=0;
			}
			// 
			tab();
		}
		oTxt.innerHTML=aDatas[0];
		oLength.innerHTML=(0+1)+'/6';
	//自动播放
	oDiv.onmouseout = function()
	{
		// var oBack = document.getElementById('back');
		startMove(oBack,'height',0);

		startAutoPlay();
		// for(var i=0;i<aA.length;i++)
		// {
		// 	aA[i].style.display='none';
		// }
		
		
	}	
	oDiv.onmouseover = function()
	{
		// var oBack = document.getElementById('back');
		// alert(typeof(oBack));
		// oBack.style.zIndex = iMinZindex++;
		// if(oBack.style.height==30)
		// {
		// 	return;
		// }
		// oBack.style.height=0;
		startMove(oBack,'height',30);
		
		// for(var i=0;i<aA.length;i++)
		// {
		// 	aA[i].style.display='block';
		// }
		stopAutoPlay();
	}
	function startAutoPlay()
	{
		if(timer)
		{
			clearInterval(timer);
		}
		timer=setInterval(function()
		{
			iNow++;
			if(iNow==aSmallLi.length)
			{
				iNow=0;
			}
			// 
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

	}
