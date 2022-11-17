/*-------------------------------------------------------------------------

	Theme Name: EGO - html - v.1
	
	For any questions concerning this theme please refer to documention or
	our forum at support.udfrance.com.

/*------------------------------------------------------------------------

//GENERAL FUNCTONS ///////////////////////////////////////////////////////

-------------------------------------------------------------------------*/

$(document).ready(function(){
	
	/*vars used throughout*/
	var wh,
		scrollSpeed = 1000,
		parallaxSpeedFactor = 0.6,
		scrollEase ='easeOutExpo',
		targetSection,
		sectionLink = 'a.navigateTo',
		menuLink = $('ul.navigation li a'),
	 	section = $('.section'),
		toggleMenu =$('.mobileMenuToggle'),
		foliothumb = $('.folio-thumb'),
		thumbW,
		thumbH,
		thumbCaption,
		target,
		hoverSpeed=500,
		hoverEase='easeOutExpo';


	//INIT --------------------------------------------------------------------------------/
	
	
	if(isMobile == true){
	
		$('.header').addClass('mobileHeader');	//add mobile header class
		
		//Clone header
		$('.header').clone().prependTo('.page');
		
		//Set section links
		$('.page').each(function() {
		 var curr_sec=$(this).attr('id');
		 $(this).children('.header').children('.inner').children('.navigation').children('li').each(function() {
		  if($(this).children('a').attr('href').substring(1)==curr_sec) {
		   	$(this).children('a').addClass('active');
		  }
		 });
		});
	
	}else{
		
		$('.page').addClass('desktop');
		$('.teaser').addClass('fixed');

	}
	
	
		
	
	
			
	//PARALLAX ----------------------------------------------------------------------------/
	
	
	$(window).bind('load', function() { 
								  
		parallaxInit();						  
		
	});

	function parallaxInit(){
		
		if(isMobile == true) return false;

		$('#teaser-1').parallax();
		$('#teaser-2').parallax();
		$('#teaser-3').parallax();		
		/*add as necessary*/
		
	}
	
	
	//HOMEPAGE SPECIFIC -----------------------------------------------------------------/
	
	
	function sliderHeight(){
		
		wh = $(window).height();
		$('#homepage').css({height:wh});
	
	}
	
	sliderHeight();	

	var lH = $('.logo-homepage').height();
	var	lW = $('.logo-homepage').width();
	
	$('.logo-homepage').hover(function() {
		if(isMobile == true) return false;
		$(this).animate({width:lH+50,height:lW+50,marginLeft:-((lH+50)/2),marginTop:-((lW+50)/2)},{queue:false});
	},
	function() {
		if(isMobile == true) return false;
		$(this).animate({width:lH,height:lW,marginLeft:-lH/2,marginTop:-lW/2},{queue:false});
	});

	//PAGE SPECIFIC ---------------------------------------------------------------------/
		
	
		/*page scrolling
		-------------------*/
		
		$(document).on('click', sectionLink, function(event) { 

			//kill slider timer
			$.fn.epicSlider.killTimer();

			//get current
			targetSection = $(this).attr('href');
			
			//Set doc title
			document.title = 'Preseed:' + ( targetSection.replace( /[_\-\#\!\.\/]/g, ' ' ));

			//prevent click if active
			//if($(this).hasClass('active')) return false;
				
			//get pos of target section
			var targetOffset = $(targetSection).offset().top+1;

			//scroll			 
			$('html,body').animate({scrollTop: targetOffset}, scrollSpeed, scrollEase, function() {

					//set hash
					//window.location.hash = targetSection

			 });
			
			return false;
			//event.preventDefault();
		
		});
		
		

		/*nav handling
		-------------------*/
		
		$(function(){	   
				   
			if(isMobile == true) return false;	   

			section.waypoint({
						  
				handler: function(event, direction) {
				
					var activeSection = $(this);
					
					if (direction === "up") {
						
						activeSection = activeSection.prev();
						
					}

					var activeMenuLink = $('ul.navigation li a[href=#' + activeSection.attr('id') + ']');
					
					menuLink.removeClass('active');
					activeMenuLink.addClass('active');
					
					
					//position header for mobile - solves fixed position issue
					var targetOffset = $(activeSection).offset().top;
					if(isMobile == true && $(window).scrollTop() >= wh) $('.header').css({top:targetOffset,display:'none'}).fadeIn();
					
		
				},
				
				offset: '35%'			//when it should switch on consecutive page
				
			});
	
		});
	
		/*nav reveal
		-------------------*/

		 $(window).bind('scroll', function(){
			
			   headerReveal();
			   
		}); 
	 
	 
		function headerReveal(){
			
			 if(isMobile == true) return false;	

			if ($(window).scrollTop() >= wh){
	 
					if(!$('.header').is(':animated')) {
						
						$('.header').stop(true,true).slideDown();
						/*push elements out of view when scrolling*/
						if(isMobile != true) $('.epic-graphic, .epic-caption,#epic-navigation').css({position:'absolute'});	  
					}
			}else{
					if(!$('.header').is(':animated')) {	
					
						$('.header').stop(true,true).slideUp();
						$('ul.navigation').fadeOut();
						toggleMenu.removeClass('open');
						if(isMobile != true) $('.epic-graphic, .epic-caption,#epic-navigation').css({position:'fixed'});
						
					}
								  
			} 
	
		 }

		
	//ROLLOVER SPECIFIC ---------------------------------------------------------------------/
		
	
		/*folio
		-------------------*/
		
		foliothumb.on({

		 mouseenter: function () {
	
	 
			 //check if device is mobile 
			 //or within an inactive filter category
			 //or if its video content in which case do nothing
			 if(isMobile == true) return false;
			 
			 thumbW = foliothumb.find('a').find('img').width();
			 thumbH = foliothumb.find('a').find('img').height();
			 
			//get refrences needed
		 	thumbCaption = $(this).find('a').attr('title');
			
			//add rolloverscreen
			if(!$(this).find('a').find('div').hasClass('folio-thumb-rollover')) $(this).find('a').append('<div class="folio-thumb-rollover"></div>');
			
			
			//set it to the image size and fade in
			hoverScreen = $('.folio-thumb-rollover')
			hoverScreen.css({width:thumbW,height:thumbH});

			
			//make sure caption is filled out
			if (typeof thumbCaption !== 'undefined' && thumbCaption !== false && $(this).find(hoverScreen).is(':empty')) {
				
				//construct rollover & animate
   				$(this).find(hoverScreen).append('<div class="thumbInfo">'+thumbCaption+'</div>');
				target = $(this).find(hoverScreen);
				target.stop().animate({opacity:1},hoverSpeed, hoverEase);
			}
			
		}, 
		
		  mouseleave: function () {
		
			if(isMobile == true) return false;
			
			//animate out
			$(this).find(hoverScreen).animate({opacity:0},hoverSpeed,'linear',function(){
	
					//delete rollover
				   $(this).remove();
				
			});
			
		
		 }
	
	  });
		
	
	
		
	 //WINDOW EVENTS ---------------------------------------------------------------------/	
	 
	 
	 $(window).bind('resize',function() {
		
		//Update slider height
	 	sliderHeight();
		
	});	
		
	
					
		

});