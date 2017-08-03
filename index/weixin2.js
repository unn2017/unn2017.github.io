var mess1="";
var mess2= ""; //微信号
var mess3= ""; //大的二维码
var mess4= ""; //小的二维码
var mess5= ""; //公众号
var mess6= ""; //名字
var mess7= "";//名字路径
day = new Date();
var Day= new Date().getDay();
hr = day.getHours();
m = day.getMinutes();


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
switch (Day) {  
	case 0 :  //星期天
		if ((hr>=0)&&(hr<24))
{ 
       
		if ((m>=0)&&(m<=10))
        {
          
	      mess2= "ugg025"; 
	     
         }
		  
		  if ((m>=11)&&(m<=20))
        {
           
	        mess2= "ugg025";
         }
		 
		  
        if ((m>=21)&&(m<=30))
        {
             
	      mess2= "ugg025";
			  
         }
		 
		 if ((m>=31)&&(m<=40))
        {
            
             mess2= "ugg025";  
	    
			  
         } 
		 
		 if ((m>=41)&&(m<=50))
        {
            mess2= "ugg025";
			  
         }
		
		if ((m>=51)&&(m<=59))
        {
           mess2= "ugg025";
		  
         } 
        
		      
	}

		break;
	case 6 :  //星期六
		if ((hr>=0)&&(hr<24))
{ 
      
	   if ((m>=0)&&(m<=10))
        {
           mess2= "guess013";
	      
	     
         }
		  
		  if ((m>=11)&&(m<=20))
        {
          mess2= "guess013";    
	     
         }
		 
		  
        if ((m>=21)&&(m<=30))
        {
             
	      mess2= "guess013";
			  
         }
		 
		 if ((m>=31)&&(m<40))
        {
           mess2= "guess013";
          
	    
			  
      } 
		if ((m>=41)&&(m<=50))
        {
            mess2= "guess013";
	      
	     
         }
		  
		  if ((m>=51)&&(m<=59))
        {
         mess2= "guess013";   
	     
         }
	    
        
		
		      
	}
		break;  
	default:
		
if ((hr>=0)&&(hr<16))//上午
{ 
        
      
		 if ((m>=0)&&(m<=10))
        {
           mess2= "guess013";
	      
	     
         }
		  
		  if ((m>=11)&&(m<=20))
        {
          mess2= "guess013";    
	     
         }
		 
		  
        if ((m>=21)&&(m<=30))
        {
             
	      mess2= "guess013";
			  
         }
		 
		 if ((m>=31)&&(m<40))
        {
           mess2= "guess013";
          
	    
			  
      } 
		if ((m>=41)&&(m<=50))
        {
            mess2= "guess013";
	      
	     
         }
		  
		  if ((m>=51)&&(m<=59))
        {
         mess2= "guess013";   
	     
         }
		 
	      
		      
	}
	
if ((hr>=16)&&(hr<24))//下午
{ 
       if ((m>=0)&&(m<=10))
        {
          
	      mess2= "ugg025"; 
	     
         }
		  
		  if ((m>=11)&&(m<=20))
        {
           
	        mess2= "ugg025";
         }
		 
		  
        if ((m>=21)&&(m<=30))
        {
             
	      mess2= "ugg025";
			  
         }
		 
		 if ((m>=31)&&(m<=40))
        {
            
             mess2= "ugg025";  
	    
			  
         } 
		 
		 if ((m>=41)&&(m<=50))
        {
            mess2= "ugg025";
			  
         }
		
		if ((m>=51)&&(m<=59))
        {
           mess2= "ugg025";
		  
         }
	   
	    	
         
	}

 
		break; 
}  
