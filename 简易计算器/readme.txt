1.������ƶ���������ʱ����������ʽ��Ϊ��active��,�Ƴ�����ʽ���

2.������
��1���������еĿո�ȥ��
��2���ж�������ʲô��
     �����ǡ�=����	
	oInput.value=calc(parseInt(sNum1), parseInt(oInput.value), sOpr);
			
	sNum1='';
	sOpr='';
	bNeedClear=true;

     �����ǡ�+����-����*����/����
	if(sNum1.length!=0)
	{
		oInput.value=calc(parseInt(sNum1), parseInt(oInput.value), sOpr);//�Ȱ�ǰ��Ľ����ʾ����
	}

	sNum1=oInput.value;
	sOpr=sHtml;
	bNeedClear=true;
    ������C��
    ���������֣�
	
    ��һ��Ҫ˵����������������ǰ���С�=������+����-����*����/��֮һ�Ļ���
    ��Ϊ����ʾЧ����ֱ�������������ʾ������ֵ�������Ҫһ��bNeedClear,
    ����ʱ���������֣�������������������ʾֵ

 
