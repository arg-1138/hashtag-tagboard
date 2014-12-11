/*
 *  jQuery Boilerplate - v3.3.2
 *  A jump-start for jQuery plugins development.
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// Create the defaults once
		var pluginName = "hashtagfeed",
			defaults = {
				gridSelector: '#grid',
				resultsTemplateSelector: '#feed_template',
				delBtnClass: '.salvattore__item__delete',
				nextButtonWrap: '#next-holder',
				nextButtonSelector: 'div.btn-next > a',
				spinnerHolder: '#spinner-holder',
				spinnerSelector: '.loading-items',
				animateOptions: {duration: 500, easing: 'easeInOutCubic'},
				lazyLoadEnabled: LAZY_LOAD
			};

		// The actual plugin constructor 
		function Plugin ( element, options ) {
			this.$element = $(element);

			this.settings = $.extend({}, defaults, options);
			this._defaults = defaults;
			this._name = pluginName;

			// SELECTORS
			this.template = $(this.settings.resultsTemplateSelector).html();
			this.$grid = $(this.settings.gridSelector);
			this.$delBtn = $(this.settings.delBtnClass);
			this.$moreButtonWrap = $(this.settings.nextButtonWrap);
			this.$moreButton = $(this.settings.nextButtonSelector);
			this.$spinnerHolder = $(this.settings.spinnerHolder);
			//this.$spinner = $(this.settings.spinnerSelector);

			this.init();
		}

		Plugin.prototype = {
			init: function () {
				this.getFeed();
				this.linkEvents();
			},
			linkEvents: function() {
				if(this.settings.lazyLoadEnabled == true){

					$.fn.scrollStopped = function(callback) {           
				        $(this).scroll(function(){
				            var self = this, $this = $(self);
				            if ($this.data('scrollTimeout')) {
				              clearTimeout($this.data('scrollTimeout'));
				            }
				            $this.data('scrollTimeout', setTimeout(callback,1000,self));
				        });
				    };
				    if(this.$spinnerHolder.find(this.settings.spinnerSelector).length > 0){
				    	console.log('still loading elements');
				    }else{
						$(window).scrollStopped(this.checkLazy.bind(this));
				    }
				}

			this.$moreButton.on('click', this.loadPrevious.bind(this));

			},
			linkRetrieveDataEvents: function(data) {
				this.linkDeleteEvent.call(this, data);
			},
			linkDeleteEvent: function(data) {
					data.find(this.settings.delBtnClass).each(function() {
						$(this).on("click", function(){

							var self = $(this).parent();
							if (confirm('Are you sure you want to delete it?')) {
								var delUrl = "http://www.nicemondays.com/proyectos/hashtag-pull/ajax-feed.php?acc=delete";
								$.ajax({
									type: "POST",
									url: "http://www.nicemondays.com/proyectos/hashtag-pull/ajax-feed.php",
									data: {id: self.data('id'), acc: 'delete'},
									dataType: "json"
								}).done(function(data) {
									if (data.success === true) {
										self.animate({ opacity: 0 }, function(){
											self.slideUp({ duration: 500, easing: 'easeInOutCubic'});
										});
									}
								});
							}

						});
					});

			},
			checkLazy: function(){
				if(this.elementInViewport(this.$moreButtonWrap)){
			    	this.loadPrevious();
				}
			},
			elementInViewport: function(el) {
			    if (typeof jQuery === "function" && el instanceof jQuery) {
			        el = el[0];
			    }
			    var rect = el.getBoundingClientRect();
			    return (
			        rect.top >= 0 &&
			        rect.left >= 0 &&
			        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
			        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
			    );
			},
			getFeed: function(){
				$.ajax({
					url: "http://www.nicemondays.com/proyectos/hashtag-pull/ajax-feed.php",
					data: {page: 1},
					dataType: "json"
				}).done(function(feed_data) {
					$.each(feed_data.results, function(i, item) {
						if(item.type == 'video'){
							item.video = true;
						}
					});
		        	this.append_feed_items.call(this, feed_data);
				}.bind(this));
			},
			loadPrevious: function(e){
				if(typeof e != 'undefined'){
					e.preventDefault();
				}
				var nP = parseInt($('#current-page').val())+1;
				var tP = parseInt($('#total-pages').val());
				if(nP<=tP){
					var $spinner = $('<p style="text-align:center" class="loading-items">').html('loading');
					this.$spinnerHolder.removeClass('invisible').prepend($spinner.fadeIn()).show();

					var str = this.$moreButton.attr('href');
					actionUrl = str.substring(0, str.indexOf('?')) + "?page=" + nP;

					
					$.ajax({
						url: "http://www.nicemondays.com/proyectos/hashtag-pull/ajax-feed.php",
						data: {page: nP},
						dataType: "json"
					}).done(function(feed_data) {
					 	$('#current-page').val(nP);
						this.$spinnerHolder.find($spinner).fadeOut(function(){
							
							this.$spinnerHolder.find($spinner).remove();

		        			this.append_feed_items(feed_data);

							var nP = parseInt($('#current-page').val());
							var tP = parseInt($('#total-pages').val());
							if(nP==tP){
								$('#next-holder').prepend($('<div/>').addClass('display-info').html('All items displayed').fadeIn());	
								this.$spinnerHolder.remove();
							}
						}.bind(this));
						
					}.bind(this));
				}

			},
			append_feed_items: function(feed_data){
				console.log('loaging more items');
				var grid = this.getSalvattoreGrid();
				var $newData = $(Mustache.to_html(this.template, feed_data));
				
				this.linkRetrieveDataEvents.call(this, $newData);

				salvattore['append_elements'](grid, $.makeArray($('<div/>').html($newData).find('article')));
			},
			getMustachedHtml: function(data) {
				return Mustache.to_html(this.template, data);
			},
			getSalvattoreGrid: function(element) {
				//return element.find('.salvattore').first()[0];
				return $('#grid').first()[0];
			},


		};

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
			this.each(function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
				}
			});

			// chain jQuery functions
			return this;
		};

})( jQuery, window, document );
