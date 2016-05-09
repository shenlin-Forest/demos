var sNum1='';
var sOpr='';

var bNeedClear=false;	//是否需要清除输入框中已有的内容

function calc(iNum1, iNum2, sOpr)
{
	var iResult=0;
	switch(sOpr)
	{
		case '×':
			iResult=iNum1*iNum2;
			break;
		case '+':
			iResult=iNum1+iNum2;
			break;
		case '-':
			iResult=iNum1-iNum2;
			break;
		case '÷':
			iResult=iNum1/iNum2;
			break;
		default:
			iResult=iNum2;
	}
	
	return iResult;
}

function doInput()
{
	var oInput=document.getElementById('input1');
	var sHtml=this.innerHTML.replace(' ','');//去掉输入的空格
	
	switch(sHtml)
	{
		case '=':
			oInput.value=calc(parseInt(sNum1), parseInt(oInput.value), sOpr);
			
			sNum1='';
			sOpr='';
			bNeedClear=true;//下次再输入数字，就要先清空输入框，即直接把点击的数字输入到输入框
			break;
		case '+':
		case '-':
		case '×':
		case '÷':
			
			if(sNum1.length!=0)
			{
				oInput.value=calc(parseInt(sNum1), parseInt(oInput.value), sOpr);//先把前面的结果显示出来
			}

			sNum1=oInput.value;
			sOpr=sHtml;
			bNeedClear=true;

			break;

		case 'C':
			oInput.value='0';
			sNum1='';
			sOpr='';
			break;

		default:	//数字
			//为了显示的效果： 若是需要清空输入框的，则直接把输入框赋为当前点击的数字
			if(bNeedClear) 
			{
				oInput.value=parseInt(sHtml, 10);
				bNeedClear=false;//下次再输入数字，就进入下一句，也可连续输入多个数字
			}
			else
			{
				oInput.value=parseInt(oInput.value+sHtml, 10);//可连续输入多个数字
			}
			break;
	}
}

window.onload=function ()
{
	var aLi=document.getElementsByTagName('li');
	var i=0;
	
	for(i=0;i<aLi.length;i++)
	{
		aLi[i].onmouseover=function ()
		{
			this.className='active';
		};
		
		aLi[i].onmouseout=function ()
		{
			this.className='';
		};

		aLi[i].onmousedown=doInput;
	}
};