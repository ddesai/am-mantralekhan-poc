$(document).bind("mobileinit", function(){
    $.mobile.page.prototype.options.domCache = true;
});
function  loadPage(page){  
	try{
	   $.mobile.loading('show');
	   $.mobile.changePage(page,{role:"page",transition: "none"});   
	}catch(e)
	{}
}
function setCounter()
{
	try{
		if(navigator.onLine)
		{
			if (localStorage.getItem('AMID') != undefined) {
				$.post("http://anoopam.org/mantralekhan/submit.php",{action:'sync',mid:localStorage.getItem('AMID'),mantra:localStorage.getItem('CRCNT') },function(data) 		{
					var res=JSON.parse(data);																									  
					if(res['STATUS']=='SUCCESS')
					{
						localStorage.setItem('CRCNT',0);
						$("#total").html(res['counter']);
					}
				});
			}
		}
	}catch(e)
	{}
}
function playDhun(){
	try{
			$('.flaticon-media11').show();
			$('.flaticon-media12').hide();
			 playAudio("file:///android_asset/www/dhun1.mp3");
	}catch(e)
	{}
}
function stopDhun(){
	try{
	$('.flaticon-media12').show();
	$('.flaticon-media11').hide();
	pauseAudio();
	}catch(e)
	{}
}
function ConnectLogin()
{
			var email=$("#email").val();
			var pass=$("#pass").val();
			if(email=='' || pass=='')
			{
						navigator.notification.alert('Email and Password required','','Error');  
			}else{  			
					
						$.mobile.loading('show');
						$.post("http://anoopam.org/mantralekhan/submit.php",{action:'mlogin',email:email,pass:pass},function(data,status) {
																															 
								$.mobile.loading('hide');
								var res=JSON.parse(data);	
								if(res['STATUS']=='SUCCESS')
								{
									localStorage.setItem('AMID',res['id']);
									localStorage.setItem('AMFIRST',res['first_name']);
									localStorage.setItem('AMLAST',res['last_name']);
									localStorage.setItem('AMCOUNTER',res['counter']);
									navigator.notification.alert('Login Successful','','Success');
									 $.mobile.loading('show');
									location.href='mantralekhan.html';
								}else{
									navigator.notification.alert('Wrong email or Password','','Error');  						
								}
						});
				
			}
	
}
function Logout()
{
	try{
		 $.mobile.loading('show');
		if (localStorage.getItem('AMID') != undefined) {
			$.post("http://anoopam.org/mantralekhan/submit.php",{action:'sync',mid:localStorage.getItem('AMID'),mantra:localStorage.getItem('CRCNT') },function(data) 		{
				var res=JSON.parse(data);																									  
				if(res['STATUS']=='SUCCESS')
				{
					try{
					 localStorage.removeItem('AMID');
					 localStorage.removeItem('AMFIRST');
					 localStorage.removeItem('AMLAST');
					 localStorage.removeItem('AMCOUNTER');
					}catch(e)
					{
						alert(e);	
					}
					localStorage.setItem('CRCNT',0);
					location.href='login.html';
				}
			});
		}
	}catch(e)
	{
		alert(e);	
	}

}
function toggleMenu(){   
	try{
		$('.dropdown-menu').slideToggle('fast');
		$('body').append('<div class="menu-outer" onClick="clickMenuOuter();"></div>');
	}catch(e)
	{}
}
function clickMenuOuter(){  
	try{
		$('.dropdown-menu').hide(); 
		$('.menu-outer').remove();  
	}catch(e)
	{}
}

 function setScreen(){	
 	try{
			var height = $(window).height();			
			var width = $(window).width();			
			var ob = $('html');			
			if( width > height ) {              			
				ob.removeClass('portrait').addClass('landscape');			
			}else{			
				ob.removeClass('landscape').addClass('portrait');			
			}
 	}catch(e)
	{}
 }

 function setMantra(){
	 try{
			$('#mantra-rep').val($('#mantra').val());
			if($('#mantra').val()=='swaminarayan'){
				$('#mantra').remove();
				$('#mantra-rep').val('');
				$('.ui-mantra').prepend('<input type="password"  value="" id="mantra" onKeyUp="setMantra();" name="mantra"  class="ui-input-mantra mantra-pass"/>');
				//$('#mantra').focus();
			}
	 }catch(e)
	 {}
 }
 function setPosition(val){
	 try{
	 $('html').toggleClass('right');
	 localStorage.setItem('POSI',val);
	 }catch(e)
	 {}
 }
 function revert()
 {
    var lst=localStorage.getItem('LST'); 
	location.href='mantralekhan'+lst+'.html';
 }
$(document).on('pagebeforeshow','#settings-page' ,function(e,data){
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady(){	
		
		if(localStorage.getItem('POSI')!=undefined)
		{
			if(localStorage.getItem('POSI')=='left')
			{
				$("#leftpo").attr('checked');
			}else{
				$("#rightpo").attr('checked');
			}
		}
	}
});
$(document).on('pagebeforeshow','#mantralekhan-page' ,function(e,data){
								localStorage.setItem('LST','');									   
try
{
	
var tap=0;
var tops=0;
	setCounter(); 
	$('.charactor-btn').on("tap",function(){
										  
										  try{
		tap=tap+1;
		if(tap%2!=0)
		{
				var obj=$(this);
				var txt=$(this).removeClass('active').text();
				if($(obj).is(':last-child')){
					$('.ui-support').show();
					obj=$('.mantra-btn .charactor-btn:first-child');
					$(obj).addClass('active');																			
					$('.ui-mantra-charactor .active').next().addClass('active');						
						$('.ui-mantra-charactor .charactor-txt').animate({'opacity':'1'},200,function(){
							$('.ui-mantra-charactor .charactor-txt').removeClass('active');												
							$('.ui-support').hide();
						})													
				}
				else{
				
					if($('.ui-mantra-charactor').find('.charactor-txt.active').length==0){
						$('.ui-mantra-charactor .charactor-txt:first-child').addClass('active');
					}
					else{
						$('.ui-mantra-charactor .active').next().addClass('active');
					}					
					$(obj).next().addClass('active');					
				}
		}
										  }catch(ob){}
	});

	$('.mantrasub').on("tap",function(){
									  	try{
		tops=tops+1;
		if(tops%2==0)
		{
			var curcnt= localStorage.getItem('CRCNT');
			localStorage.setItem('CRCNT',Number(curcnt)+1);
			if (localStorage.total)
			{
			  localStorage.total=Number(localStorage.total)+1;
			}
			else
			{
			  localStorage.total=1;
			} 
			$('#total').text( Number($("#total").html()) + 1);    						   
		}
									}catch(ob){}
	});
	setScreen();			
	$(window).resize( function(){          			
		setScreen();  			
	});
	setInterval(function() {
			setCounter(); 
	},60000);
	
}catch(d)
{}
	
}); 
$(document).on('pagebeforeshow','#login-page' ,function(e,data){
		setScreen();			
		$(window).resize( function(){          			
			setScreen();  			
		});	
});
	
	function updateText(val){
		$('#realbox').val(val);
	}
	
/*	function fixedbox(){
		$('.ui-mantra-charactor').addClass('active');
	}
	
	function resetbox(){
		$('.ui-mantra-charactor').removeClass('active');		
	}*/
$(document).on('pagebeforeshow','#mantralekhan2-page' ,function(e,data){
																
		localStorage.setItem('LST','2');
							/*									
	$.mobile.loading('show');			      											   
	document.addEventListener("deviceready", onDeviceReady, false);

	function onDeviceReady(){	
	var height=$('.landscape .work-area').height()/2;
	$('.landscape .work-area').css({'margin-top':'-'+height+'px'});			
	try{
	//////////////////////////////////
		$.post("http://anoopam.org/mantralekhan2/submit.php",{action:'getcounter',mid:localStorage.getItem('AMID')},function(data) {
				var res=JSON.parse(data);	
				if(res['STATUS']=='SUCCESS')
				{
					localStorage.setItem('AMCOUNTER',res['counter']);
				}
		});															
		$("#name").html(localStorage.getItem('AMFIRST')+' '+localStorage.getItem('AMLAST'));	
		if(localStorage.getItem('CRCNT')!=undefined)
		{
			$("#total").html( Number(localStorage.getItem('AMCOUNTER'))+ Number(localStorage.getItem('CRCNT')) );
		}else{
			$("#total").html( Number(localStorage.getItem('AMCOUNTER')) );
		}
	
		 $.mobile.loading('hide');														
	
		setScreen();
		//$('#focusing').focus();			
		$(window).resize( function(){          			
			setScreen();  			
		});	
		$('#focusing').bind('copy paste cut dragenter dragover drop',function(e) { 
			 e.preventDefault(); 
		});
		setInterval(function() {
				setCounter(); 
		},60000);	   
		var str='SWAMINARAYAN';  
		$("#focusing").on("keyup", function(event) {
	   
		  var match=$(this).val();  
		  alert(match);
		  if(str.indexOf(match)>-1){
				 if(str==match){       
					var curcnt= localStorage.getItem('CRCNT');
					localStorage.setItem('CRCNT',Number(curcnt)+1);
					if (localStorage.total)
					{
					  localStorage.total=Number(localStorage.total)+1;
					}
					else
					{
					  localStorage.total=1;
					}
					$('#focusing').val(''); 
					$('#realbox').val(''); 
					$('#total').text( Number($("#total").html()) + 1);                                
				 }
			}
			else{        
				while(str.indexOf($('#focusing').val())<=-1 && $('#focusing').val()!=''){
					//$('#focusing').val($('#focusing').val().replace(/(\s+)?.$/, ''));
				}
			}					
		});
		
	//////////////////////
	}catch(e)
	{
		//alert(e);	
	}
	}
	
	*/
});
 /*
$(document).on('pagebeforeshow','#mantralekhan-page' ,function(e,data){
try{															   
	//navigator.screenOrientation.set('landscape');													   
	$.mobile.loading('show');			      											   
	document.addEventListener("deviceready", onDeviceReady, false);

	function onDeviceReady(){	
	//////////////////////////////////
	$.post("http://anoopam.org/mantralekhan2/submit.php",{action:'getcounter',mid:localStorage.getItem('AMID')},function(data) {
			var res=JSON.parse(data);	
			if(res['STATUS']=='SUCCESS')
			{
				localStorage.setItem('AMCOUNTER',res['counter']);
			}
	});

	setInterval(function() {
			setCounter(); 
    },60000);
	
	//////////////////////////////////
	$("#name").html(localStorage.getItem('AMFIRST')+' '+localStorage.getItem('AMLAST'));	
	$("#total").html(localStorage.getItem('AMCOUNTER'));
	
	 $.mobile.loading('hide');
	 ////////////////////////////
	$('#s1').click(function(e) {
		$("#mantra").val('S');
	});
    $('#w2').click(function(e) {
		if($("#mantra").val()=='S'){						
			$("#mantra").val('Sw');
		}
	});
    $('#a3').click(function(e) {
		if($("#mantra").val()=='Sw'){											
			$("#mantra").val('Swa');
		}
	});
	$('#m4').click(function(e) {
		if($("#mantra").val()=='Swa'){							
			$("#mantra").val('Swam');
		}
	});
	$('#i5').click(function(e) {
		if($("#mantra").val()=='Swam'){							
			$("#mantra").val('Swami');
		}
	});
	$('#n6').click(function(e) {
		if($("#mantra").val()=='Swami'){							
			$("#mantra").val('Swamin');
		}
	});
	$('#a7').click(function(e) {
		if($("#mantra").val()=='Swamin'){							
			$("#mantra").val('Swamina');
		}
	});
	$('#r8').click(function(e) {
		if($("#mantra").val()=='Swamina'){							
			$("#mantra").val('Swaminar');
		}
	});
	$('#a9').click(function(e) {
		if($("#mantra").val()=='Swaminar'){							
			$("#mantra").val('Swaminara');
		}
	});
	$('#y10').click(function(e) {
		if($("#mantra").val()=='Swaminara'){							 
			$("#mantra").val('Swaminaray');
		}
	});
	$('#a11').click(function(e) {
		if($("#mantra").val()=='Swaminaray'){							 
			$("#mantra").val('Swaminaraya');
		}
	});
	$('#n12').click(function(e) {
		if($("#mantra").val()=='Swaminaraya'){		
			$("#mantra").val('Swaminarayan');
			setTimeout(function(){
				////////////////////////////////////////
				var curcnt= localStorage.getItem('CRCNT');
				localStorage.setItem('CRCNT',Number(curcnt)+1);
				if (localStorage.total)
				{
				  localStorage.total=Number(localStorage.total)+1;
				}
				else
				{
				  localStorage.total=1;
				}
				$('#total').text( Number($("#total").html()) + 1);  
				////////////////////////////////////////
				
				$("#mantra").val('');
			},200);
			
		}
	});
	 ///////////////////////////
	
	}

}catch(e)
{
	alert(e);	
}
	
	
});
*/

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	if(device.version=='2.3.3'){
		$('#bykeyboard').hide();
	}else
	if(device.version=='2.3.4'){
		$('#bykeyboard').hide();
	}else
	if(device.version=='2.2.3'){
		$('#bykeyboard').hide();
	}else
	if(device.version=='2.2'){
		$('#bykeyboard').hide();
	}else
	if(device.version=='2.0'){
		$('#bykeyboard').hide();
	}else
	if(device.version=='2.0.1'){
		$('#bykeyboard').hide();
	}else
	if(device.version=='1.0'){
		$('#bykeyboard').hide();
	}else
	if(device.version=='1.1'){
		$('#bykeyboard').hide();
	}else
	if(device.version=='1.5'){
		$('#bykeyboard').hide();
	}else
	if(device.version=='1.6'){
		$('#bykeyboard').hide();
	}else
	if(device.version=='1.6'){
		$('#bykeyboard').hide();
	}else
	if(device.version=='2.3.2'){
		$('#bykeyboard').hide();
	}else
	if(device.version=='2.3.7'){
		$('#bykeyboard').hide();
	}else
	if(device.version=='2.3.0'){
		$('#bykeyboard').hide();
	}else
	if(device.version=='2.3.1'){
		$('#bykeyboard').hide();
	}else
	if(device.version=='2.3.5'){
		$('#bykeyboard').hide();
	}else
	if(device.version=='2.3.6'){
		$('#bykeyboard').hide();
	}else
	if(device.version=='2.2.2'){
		$('#bykeyboard').hide();
	}else
	if(device.version=='4.0.4'){
		$('#bykeyboard').hide();
	}
}	