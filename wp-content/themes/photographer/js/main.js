/*
	Name: Photographer
	Description: Responsive HTML5 Template
	Version: 1.0
	Author: pixelwars
*/

(function($) { "use strict"; 
	
	
	/* DOCUMENT READY */
	$(function() {
		
		// ------------------------------
		// KEN SLIDER
		var ken = $('.ken-slider');
		if(ken.length) {
			ken.slippry({
				adaptiveHeight: false,
				captions: false,
				pager: false,
				controls: false,
				autoHover: false,
				transition: ken.data('animation'), // fade, horizontal, kenburns, false
				kenZoom: 120,
				speed: ken.data('speed') // time the transition takes (ms)
			});
		}
		// ------------------------------
		
		
		// ------------------------------
		// PHOTOWALL
		photowall();
		// ------------------------------
		
		
		// ------------------------------
		// GALLERY COLLAGE LAYOUT
		var resizeTimer = null;
		$(window).bind('resize', function() {
			// hide all the images until we resize them
			// set the element you are scaling i.e. the first child nodes of ```.Collage``` to opacity 0
			$('.pw-collage > a').css("opacity", 0);
			// set a timer to re-apply the plugin
			if (resizeTimer) clearTimeout(resizeTimer);
			resizeTimer = setTimeout(collage, 200);
		});
		// ------------------------------
		
		
		// ------------------------------
        // OWL-CAROUSEL
		var owl = $('.owl-carousel');
		if(owl.length) {
			owl.each(function(index, element) {
				//wait for images
				$(element).imagesLoaded( function() {
					
					//remove loading
					$(element).find('.loading').remove();
					
					var items = $(element).data('items');
					$(element).owlCarousel({
						loop: 				$(element).data('loop'),
						center : 			$(element).data('center'),
						mouseDrag : 		$(element).data('mouse-drag'),
						dots : 				$(element).data('dots'),
						nav : 				$(element).data('nav'),
						autoplay : 			$(element).data('autoplay'),
						autoplaySpeed : 	$(element).data('autoplay-speed'),
						autoplayTimeout : 	$(element).data('autoplay-timeout'),
						autoplayHoverPause :true,
    					//autoHeight: true,
						responsive:{
							0:		{ items: 1 },
							768:	{ items: items <= 2 ? items : 2 },
							1200:	{ items: items <= 3 ? items : 3 },
							1600:	{ items: items }
						}
					});
					
					
				});
			});	
		}
		// ------------------------------
		
		
		// ------------------------------
        // MAGNIFIC POPUP
		var mfp = $('.mfp-gallery');
		if(mfp.length) {
			mfp.each(function(index, element) {
				$(element).magnificPopup({
					  delegate: 'a',
					  type: 'image',
					  image: {
						  markup: '<div class="mfp-figure">'+
									'<div class="mfp-close"></div>'+
									'<div class="mfp-img"></div>'+
								  '</div>' +
								  '<div class="mfp-bottom-bar">'+
								    '<div class="mfp-title"></div>'+
								    '<div class="mfp-counter"></div>'+
								  '</div>', // Popup HTML markup. `.mfp-img` div will be replaced with img tag, `.mfp-close` by close button
						
						  cursor: 'mfp-zoom-out-cur', // Class that adds zoom cursor, will be added to body. Set to null to disable zoom out cursor. 
						  
						  titleSrc: 'title', // Attribute of the target element that contains caption for the slide.
						  // Or the function that should return the title. For example:
						  // titleSrc: function(item) {
						  //   return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
						  // }
						
						  verticalFit: true, // Fits image in area vertically
						
						  tError: '<a href="%url%">The image</a> could not be loaded.' // Error message
						},
						gallery: {
						  enabled:true,
						  tCounter: '<span class="mfp-counter">%curr% / %total%</span>' // markup of counter
						},
					  mainClass: 'mfp-zoom-in',
					  tLoading: '',
					  removalDelay: 300, //delay removal by X to allow out-animation
					  callbacks: {
						imageLoadComplete: function() {
						  var self = this;
						  setTimeout(function() {
							self.wrap.addClass('mfp-image-loaded');
						  }, 16);
						},
						close: function() {
						  this.wrap.removeClass('mfp-image-loaded');
						}
					  },
					  closeBtnInside: false,
					  closeOnContentClick: true,
					  midClick: true
					});
			});	
		}
		// ------------------------------
		
		
		// ------------------------------
        // HEADER MENU TOGGLE
        $('.menu-toggle').click(function(e) {
            e.stopPropagation();
            $('html').toggleClass('is-menu-toggled-on');
        });
		// ------------------------------

        
		// ------------------------------
		/* SOCIAL FEED WIDGET */
		var socialFeed = $('.social-feed');
		if(socialFeed.length) {
			socialFeed.each(function() {
				$(this).socialstream({
					socialnetwork: $(this).data("social-network"),
					limit: $(this).data("limit"),
					username: $(this).data("username")
				})
			});	
		}
		// ------------------------------
		
        
		// ------------------------------
		// FluidBox : Zoomable Images
		$('.fluidbox-gallery a').fluidbox();
		$('.entry-content > p a, .wp-caption a').each(function(index, element) {
            if($(this).attr('href').match(/\.(jpeg|jpg|gif|png)$/) != null) {
				$(this).fluidbox();
				}
        });
		if(!($('html').hasClass('no-fluidbox'))) {
			$('.gallery a').fluidbox();
			}
        // ------------------------------
        
    
		// ------------------------------
        // FULL WIDTH IMAGES
		fullWidthImages();
		// ------------------------------

		
		// ------------------------------
		// remove click delay on touch devices
		FastClick.attach(document.body);
		// ------------------------------
		

		// ------------------------------
		// TABS
		$('.tabs').each(function() {
			if(!$(this).find('.tab-titles li a.active').length) {
				$(this).find('.tab-titles li:first-child a').addClass('active');
				$(this).find('.tab-content > div:first-child').show();
			} else {
				$(this).find('.tab-content > div').eq($(this).find('.tab-titles li a.active').parent().index()).show();	
			}
		});
		
		$('.tabs .tab-titles li a').click(function() {
			if($(this).hasClass('active')) { return; }
			$(this).parent().siblings().find('a').removeClass('active');
			$(this).addClass('active');
			$(this).parents('.tabs').find('.tab-content > div').hide().eq($(this).parent().index()).show();
			return false;
		});
		// ------------------------------
		
		
		// ------------------------------
		// TOGGLES
		var toggleSpeed = 300;
		$('.toggle h4.active + .toggle-content').show();
	
		$('.toggle h4').click(function() {
			if($(this).hasClass('active')) { 
				$(this).removeClass('active');
				$(this).next('.toggle-content').stop(true,true).slideUp(toggleSpeed);
			} else {
				
				$(this).addClass('active');
				$(this).next('.toggle-content').stop(true,true).slideDown(toggleSpeed);
				
				//accordion
				if($(this).parents('.toggle-group').hasClass('accordion')) {
					$(this).parent().siblings().find('h4').removeClass('active');
					$(this).parent().siblings().find('.toggle-content').stop(true,true).slideUp(toggleSpeed);
				}
				
			}
			return false;
		});
		// ------------------------------
		
		
		
		// ------------------------------
		// RESPONSIVE VIDEOS
		if($('.media-wrap').length) {
			$(".media-wrap").fitVids();
		}
		// ------------------------------
		
		
		
		// ------------------------------
		// UNIFORM
		$("select:not([multiple]), input:checkbox, input:radio, input:file").uniform();
		var ua = navigator.userAgent.toLowerCase();
		var isAndroid = ua.indexOf("android") > -1;
		if(isAndroid) {
			$('html').addClass('android');
		}
		// ------------------------------
		
		
		
		// ------------------------------
		// FORM VALIDATION
		// comment form validation fix
		$('#commentform').addClass('validate-form');
		$('#commentform').find('input,textarea').each(function(index, element) {
            if($(this).attr('aria-required') == "true") {
				$(this).addClass('required');
			}
			if($(this).attr('name') == "email") {
				$(this).addClass('email');
			}
		});
		
		// validate form
		if($('.validate-form').length) {
			$('.validate-form').each(function() {
					$(this).validate();
				});
		}
		// ------------------------------
		


		// ------------------------------
		// GOOGLE MAP
		/*
			custom map with google api
			check out the link below for more information about api usage
			https://developers.google.com/maps/documentation/javascript/examples/marker-simple
		*/
		function initializeMap() {
			if($('.map').length) {
				var mapCanvas = $('#map-canvas');
				var myLatlng = new google.maps.LatLng(mapCanvas.data("latitude"),mapCanvas.data("longitude"));
				var mapOptions = {
					zoom: mapCanvas.data("zoom"),
					center: myLatlng
				}
				var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
				
				var marker = new google.maps.Marker({
				  position: myLatlng,
				  map: map
		  	});
			}
		  
		}
		if($('.map').length) {
			google.maps.event.addDomListener(window, 'load', initializeMap);
		}
		// ------------------------------
				
		
		
		// ------------------------------
		/* jQuery Ajax Mail Send Script */	
		var contactForm = $( '#contact-form' );
		var $submit = contactForm.find('.submit');
		
		contactForm.submit(function()
		{
			if (contactForm.valid())
			{
				$submit.addClass("active loading");
				var formValues = contactForm.serialize();
				
				$.post(contactForm.attr('action'), formValues, function(data)
				{
					if ( data == 'success' )
					{
						setTimeout(function() { 
							$submit.removeClass("loading").addClass("success"); 
							contactForm.clearForm();
						},2000);
					}
					else
					{
						$submit.removeClass("loading").addClass("error");
					}
				});
			}
			
			return false
		});

		$.fn.clearForm = function() {
		  return this.each(function() {
		    var type = this.type, tag = this.tagName.toLowerCase();
		    if (tag == 'form')
		      return $(':input',this).clearForm();
		    if (type == 'text' || type == 'password' || tag == 'textarea')
		      this.value = '';
		    else if (type == 'checkbox' || type == 'radio')
		      this.checked = false;
		    else if (tag == 'select')
		      this.selectedIndex = -1;
		  });
		};
		// ------------------------------
		
		
		
    });
    // DOCUMENT READY
	
	
	
	// WINDOW ONLOAD
	window.onload = function() {
		
		
		/* GALLERY COLLAGE LAYOUT */
		collage();
		
		// FULL WIDTH IMAGES
		fullWidthImages();
		
		
		// ------------------------------
		// Rotating Words
		var rotate_words = $('.rotate-words'),
			interval = 3000;
		if(rotate_words.length) {
			
			var next_word_index = 0;
			interval = parseInt(rotate_words.data("interval"));
			
			if(Modernizr.csstransforms3d) {
			
				rotate_words.each(function(index, element) {
					$(element).find('span').eq(0).addClass('active');
					setInterval(function(){
						next_word_index = $(element).find('.active').next().length ? $(element).find('.active').next().index() : 0;
						$(element).find('.active').addClass('rotate-out').removeClass('rotate-in active');
						$(element).find('span').eq(next_word_index).addClass('rotate-in active').removeClass('rotate-out');
					},interval);
				});
	
			}
			else {
				
				rotate_words.each(function(index, element) {
					$(element).find('span').eq(0).addClass('active').show();
					setInterval(function(){
						next_word_index = $(element).find('.active').next().length ? $(element).find('.active').next().index() : 0;
						$(element).find('.active').removeClass('active').slideUp(500);
						$(element).find('span').eq(next_word_index).addClass('active').slideDown(500);
					},interval);
				});
			}
		}
		// ------------------------------
	
	};
	// WINDOW ONLOAD	
	
	
	
	
	// ------------------------------------------------------------
	// ------------------------------------------------------------
		// FUNCTIONS
	// ------------------------------------------------------------
	// ------------------------------------------------------------
	
	
	
	// ------------------------------
	// FULL WIDTH IMAGES
	function fullWidthImages() { 
		$('.full-width-image').each(function(index, element) {
            $(element).css("min-height", $(element).find('img').height());
			$( window ).resize(function() {
			  $(element).css("min-height", $(element).find('img').height());
			});
        });
	}
	// ------------------------------
	
	
	// ------------------------------
	// GALLERY COLLAGE LAYOUT
	function collage() {
		var collage = $('.pw-collage');
		if(collage.length) {
			collage.removeClass('pw-collage-loading');
			collage.collagePlus({
				
				'targetHeight' : collage.data('row-height'),
				'effect' : collage.data('effect'),
				'allowPartialLastRow' : true
				
			});
		}
	}
	// ------------------------------
	
	
	// ------------------------------
	// PHOTOWALL - ri-grid
	function photowall() {
		var riGrid = $('.ri-grid');
		if(riGrid.length) {
			
			if($('html').hasClass('home-landing')) {
			
				riGrid.gridrotator( {
					rows : 5,
					columns : 9,
					maxStep : riGrid.data('max-step'), // 1 to 3
					interval : riGrid.data('interval'), // in ms
					
					// animation type
					// showHide || fadeInOut || slideLeft || 
					// slideRight || slideTop || slideBottom || 
					// rotateLeft || rotateRight || rotateTop || 
					// rotateBottom || scale || rotate3d || 
					// rotateLeftScale || rotateRightScale || 
					// rotateTopScale || rotateBottomScale || random
					animType : riGrid.data('animation'),
					
					w1200 : {
						rows : 6,
						columns : 7
					},
					w1024 : {
						rows : 7,
						columns : 6
					},
					w768 : {
						rows : 7,
						columns : 4
					},
					w480 : {
						rows : 7,
						columns : 3
					},
					w320 : {
						rows : 6,
						columns : 3
					}
				});
				
				
			} else {
			
				riGrid.gridrotator( {
					rows : 3,
					columns : 12,
					maxStep : riGrid.data('max-step'), // 1 to 3
					interval : riGrid.data('interval'), // in ms
					
					// animation type
					// showHide || fadeInOut || slideLeft || 
					// slideRight || slideTop || slideBottom || 
					// rotateLeft || rotateRight || rotateTop || 
					// rotateBottom || scale || rotate3d || 
					// rotateLeftScale || rotateRightScale || 
					// rotateTopScale || rotateBottomScale || random
					animType : riGrid.data('animation'),
					
					w1200 : {
						rows : 3,
						columns : 14
					},
					w1024 : {
						rows : 3,
						columns : 12
					},
					w768 : {
						rows : 3,
						columns : 8
					},
					w480 : {
						rows : 3,
						columns : 8
					},
					w320 : {
						rows : 3,
						columns : 6
					}
				});
			}// else
		}
	}
	// ------------------------------
	

})(jQuery);
