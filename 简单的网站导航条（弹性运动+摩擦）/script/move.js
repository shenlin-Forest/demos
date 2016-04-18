var iSpeed = 0;//速度放在了函数外面，以免每次都清零，就没意义了
var left=0;//不用obj.offsetLeft,而是一个变量，因为变量可以为小数;样式类的东西不能是小数

function startMove(obj,iTarget)
{
	clearInterval(obj.timer);

	obj.timer = setInterval(function(){
		iSpeed +=(iTarget-obj.offsetLeft)/5;//弹性运动
		iSpeed *= 0.7;//摩擦

		left += iSpeed;

		if(Math.abs(iSpeed)<1 && Math.abs(left-iTarget)<1)
			//速度足够小，并且距离也足够小的时候，关闭定时器
		{
			clearInterval(obj.timer);

			obj.style.left = iTarget + 'px';//关闭定时器后，把位置定住
		}
		else
		{
			obj.style.left = left + 'px';
			// obj.style.left = obj.offsetLeft +  iSpeed + 'px';
			
		}
		document.title = obj.offsetLeft +'|'+iTarget;
		
	},30);
}

window.onload = function()
{
	var oUl = document.getElementById('ul1');
	var aLi = oUl.getElementsByTagName('li');
	var oBg = aLi[aLi.length-1];

	for(var i=0;i<aLi.length-1;i++)
	{
		aLi[i].onmouseover = function()
		{
			startMove(oBg,this.offsetLeft);
		}
	}//bg本身不用加事件,所以是i<aLi.length-1;
}