
window.onload = function(){
	
	var json = {
		title : [
			'第1张扑克牌',
			'第2张扑克牌',
			'第3张扑克牌',
			'第4张扑克牌',
			'第5张扑克牌',
			'第6张扑克牌',
			'第7张扑克牌',
			'第8张扑克牌',
			'第9张扑克牌',
			'第10张扑克牌',
			'第11张扑克牌',
			'第12张扑克牌',
			'第13张扑克牌',
			'第14张扑克牌',
			'第15张扑克牌',
			'第16张扑克牌',
			'第17张扑克牌',
			'第18张扑克牌',
			'第19张扑克牌',
			'第20张扑克牌',
			'第21张扑克牌',
			'第22张扑克牌',
			'第23张扑克牌',
			'第24张扑克牌',
			'第25张扑克牌',
			'第26张扑克牌',
			'第27张扑克牌',
			'第28张扑克牌',
			'第29张扑克牌',
			'第30张扑克牌',
			'第31张扑克牌',
			'第32张扑克牌',
			'第33张扑克牌',
			'第34张扑克牌',
			'第35张扑克牌',
			'第36张扑克牌',
			'第37张扑克牌',
			'第38张扑克牌',
			'第39张扑克牌',

		]
	};
	
	var arr = [];//数组，存布局的坐标
	var iNow = 9;//从最后一个开始运动，第十个的标记为9
	
	page({
		id : 'div1',
		nowNum : 1,//从第几页开始
		allNum : Math.ceil(json.title.length/10),//向上取整：Math.ceil()
		callBack : function(now,all){
			var num = now*10<json.title.length ? 10 : json.title.length-(now-1)*10;//当前页有多少个方块
			var oUl = document.getElementById('ul1');
			var aLi = oUl.getElementsByTagName('li');

			if(oUl.innerHTML=='')
			{
				for(var i=0;i<num;i++)
				{
					var oLi = document.createElement('li');
					oLi.innerHTML = json.title[(now-1)*10+i];
					oUl.appendChild(oLi);
					var oImg = document.createElement('img');
					oImg.src = "img/"+((now-1)*10+i+1)+".png";
					oLi.appendChild(oImg);
				}
			

				//布局转换
				for(var i=0;i<aLi.length;i++)
				{
					arr.push([aLi[i].offsetLeft,aLi[i].offsetTop]);
					//复合形式
				}
				for(var i=0;i<aLi.length;i++)
				{
					aLi[i].style.position = 'absolute';
					aLi[i].style.left = arr[i][0] + 'px';
					aLi[i].style.top = arr[i][1] + 'px';
					aLi[i].style.margin = 0;//最后把影响定位的margin置0
				}
			}

			//ul中已经有li时，让li从最后一个开始，一个接一个运动，所谓一个一个地运动，是采用定时器，每次让一个运动。
			else{
				var timer = setInterval(function(){
					startMove(aLi[iNow],{left:300,top:440,opacity:0})
					iNow--;

					//注意inow不能一直减下去，当小于0时，关掉定时器
					if(iNow<0)
					{
						clearInterval(timer);

						iNow = num -1;//进入这里时，iNow<0,故重设，now里面存的是当前应该有多少个方块，而inow是标记：从0开始。因为运动的时候需要从最后一个开始，故这里是Num-1

						//因为li已经创建好了，所以无需再创建，只要更改它的InnerHTML就行
						for(var i=0;i<num;i++)
						{
							aLi[i].innerHTML = json.title[(now-1)*10+i];
							var oImg = document.createElement('img');
							oImg.src = "img/"+((now-1)*10+i+1)+".png";
							aLi[i].appendChild(oImg);
						}
						//再开一个定时器，一个一个展开
						var timer2 = setInterval(function(){
							startMove(aLi[iNow],{left:arr[iNow][0],top:arr[iNow][1],opacity:100});

							iNow--;
							if(iNow<0){
								clearInterval(timer2);
								iNow = num-1;//下一次
							}

						},100);
					}
				},100);
			}
			
		}
	
	});
	// 
};

function page(opt){

	if(!opt.id){return false};
	
	var obj = document.getElementById(opt.id);
	
	var nowNum = opt.nowNum || 1;
	var allNum = opt.allNum || 5;
	var callBack = opt.callBack || function(){};
	
	if( nowNum>=4 && allNum>=6 ){
	
		var oA = document.createElement('a');
		oA.href = '#1';
		oA.innerHTML = '首页';
		obj.appendChild(oA);
	
	}
	
	if(nowNum>=2){
		var oA = document.createElement('a');
		oA.href = '#' + (nowNum - 1);
		oA.innerHTML = '上一页';
		obj.appendChild(oA);
	}
	
	if(allNum<=5){
		for(var i=1;i<=allNum;i++){
			var oA = document.createElement('a');
			oA.href = '#' + i;
			if(nowNum == i){
				oA.innerHTML = i;
			}
			else{
				oA.innerHTML = '['+ i +']';
			}
			obj.appendChild(oA);
		}	
	}
	else{
	
		for(var i=1;i<=5;i++){
			var oA = document.createElement('a');
			
			
			if(nowNum == 1 || nowNum == 2){
				
				oA.href = '#' + i;
				if(nowNum == i){
					oA.innerHTML = i;
				}
				else{
					oA.innerHTML = '['+ i +']';
				}
				
			}
			else if( (allNum - nowNum) == 0 || (allNum - nowNum) == 1 ){
			
				oA.href = '#' + (allNum - 5 + i);
				
				if((allNum - nowNum) == 0 && i==5){
					oA.innerHTML = (allNum - 5 + i);
				}
				else if((allNum - nowNum) == 1 && i==4){
					oA.innerHTML = (allNum - 5 + i);
				}
				else{
					oA.innerHTML = '['+ (allNum - 5 + i) +']';
				}
			
			}
			else{
				oA.href = '#' + (nowNum - 3 + i);
				
				if(i==3){
					oA.innerHTML = (nowNum - 3 + i);
				}
				else{
					oA.innerHTML = '['+ (nowNum - 3 + i) +']';
				}
			}
			obj.appendChild(oA);
			
		}
	
	}
	
	if( (allNum - nowNum) >= 1 ){
		var oA = document.createElement('a');
		oA.href = '#' + (nowNum + 1);
		oA.innerHTML = '下一页';
		obj.appendChild(oA);
	}
	
	if( (allNum - nowNum) >= 3 && allNum>=6 ){
	
		var oA = document.createElement('a');
		oA.href = '#' + allNum;
		oA.innerHTML = '尾页';
		obj.appendChild(oA);
	
	}
	
	callBack(nowNum,allNum);
	
	var aA = obj.getElementsByTagName('a');
	
	for(var i=0;i<aA.length;i++){
		aA[i].onclick = function(){
			
			var nowNum = parseInt(this.getAttribute('href').substring(1));
			
			obj.innerHTML = '';
			
			page({
			
				id : opt.id,
				nowNum : nowNum,
				allNum : allNum,
				callBack : callBack
			
			});
			
			return false;
			
		};
	}

}
