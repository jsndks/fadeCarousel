(function($) {
	$.fn.extend({
		carousel: function(options) {
		
			var defaultVals = {
				width: '500px',
				height: '300px',
				hangTime: 5000,
				transitionTime: 1000,
				transition: 'fade',
				thumbs: 'true'
			};
			
			var options = $.extend(defaultVals, options);
			return $(this).each(function() {
				var o = options;
				var obj = $(this);
				
				//Dimensions
				obj.find('.window').css({'width': o.width, 'height': o.height});
				
				//Pagination
				var pagNum = 1;
				obj.find('.paginator').append('<ol></ol>');
				
				obj
					.find('.window img')
					.each(function() {
						if(o.thumbs == true) {
							$(this).clone().appendTo($(this).parent('div').siblings('.paginator').find('ol')).css('width', '50px').wrap('<li rel="'+ pagNum +'"><a href="#"></a></li>');
						} else {
							obj.find('.paginator').find('ol').append('<li rel="'+ pagNum +'"><a href="#">'+ pagNum +'</a></li>');
						}
						$(this).attr('id', 'img'+ pagNum)
						pagNum++;
					})
				;
				
				//Set active slide & paginator
				obj
					.find('.window img:first')
					.addClass('active')
					.css('z-index', '2')
					.end()
					.find('.paginator li a:first')
					.addClass('active')
				;
				
				//Triggers
				obj
					.find('.paginator li a')
					.click(function(e) {
						e.preventDefault();
						clearInterval(play);
						slideNum = $(this).parent('li').attr('rel');
						/* changeSlide(slideNum); */
						changeSlide(slideNum);
						play = setInterval(changeSlideAuto, o.hangTime);
					})
				;
				
				//ChangeSlide
				var changeSlide = function(slideNum) {
					var activeSlide = obj.find('.window .active');
					var newSlide = obj.find('.window #img'+slideNum);
					var activePagi = obj.find('.paginator .active');
					var newePagi = obj.find('.paginator li[rel*="'+slideNum+'"]');
					
					if(newSlide.attr('class') != 'active') {
						newSlide.stop().addClass('active').css({'opacity': '0', 'z-index': '2'}).animate({'opacity': '1.0'}, o.transitionTime)
						newePagi.stop().find('a').addClass('active');
						activeSlide.removeClass('active').animate({'opacity': '0'}, o.transitionTime)
						activePagi.stop().removeClass('active');
					}
				}
				
				//ChangeSlide - Auto
				var changeSlideAuto = function() {
					var activeSlide = obj.find('.window .active');
					var newSlide = activeSlide.next().length ? activeSlide.next('img') : obj.find('.window img:first');
					var activePagi = obj.find('.paginator .active');
					var newePagi = activePagi.parent('li').next('li').length ? activePagi.parent('li').next('li').find('a') : obj.find('.paginator li:first').find('a');
					
					newSlide.stop().addClass('active').css({'opacity': '0', 'z-index': '2'}).animate({'opacity': '1.0'}, o.transitionTime)
					newePagi.stop().addClass('active');
					activeSlide.removeClass('active').animate({'opacity': '0'}, o.transitionTime)
					activePagi.stop().removeClass('active');
				}
				
				var play = setInterval(changeSlideAuto, o.hangTime);
				
			});
		}
	});
})(jQuery);