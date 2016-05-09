1.当鼠标移动到按键上时，按键的样式变为“active”,移除则将样式清空

2.按键后：
（1）将输入中的空格去掉
（2）判断输入是什么：
     输入是“=”：	
	oInput.value=calc(parseInt(sNum1), parseInt(oInput.value), sOpr);
			
	sNum1='';
	sOpr='';
	bNeedClear=true;

     输入是“+”“-”“*”“/”：
	if(sNum1.length!=0)
	{
		oInput.value=calc(parseInt(sNum1), parseInt(oInput.value), sOpr);//先把前面的结果显示出来
	}

	sNum1=oInput.value;
	sOpr=sHtml;
	bNeedClear=true;
    输入是C：
    输入是数字：
	
    有一点要说明：若在输入数字前已有“=”、“+”“-”“*”“/”之一的话，
    则为了显示效果，直接在输入框中显示按键的值，这就需要一个bNeedClear,
    其他时候，输入数字，则可连续在输入框中显示值

 
