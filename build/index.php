<?php include('config.php'); ?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>Hashtag Pull</title>
		<meta name="description" content="Pulls twitter and vine posts with a certain hashtag.">
		<meta name="viewport" content="width=1000">
				
		<!-- styles -->
		<link rel="stylesheet" href="css/main.css">
	</head>
	<body>

		<div class="container">
			<div data-columns class="feed salvattore" id="grid"></div>

			<div id="next-holder" class="spinner-holder">
				<div id="spinner-holder" class="spinner-holder"></div>
		    	<div class="btn-next">
		    		<a rel="next" href="/ajax-feed.php?page=2">Next </a>
		    	</div>		
			</div>

			<input type="text" style="display: none;" autocomplete="off" value="1" id="current-page"/>
			<input type="text" style="display: none;" autocomplete="off" value="10" id="total-pages"/>
		</div>

		<script type="text/javascript">
		var LAZY_LOAD = <?php echo LAZY_LOAD?>;
		</script>

		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
		<script src="js/main.js"></script>



		<script id="feed_template" type="text/template">
			{{#results}}
				<article class="salvattore__item" data-id="{{id}}">
				
					{{#video}}
						{{#media_url_https}}
							<video width="100%" height="100%" controls poster="{{media_url}}">
		                        <source src="{{media_url_https}}" type="video/mp4">
		                        Your browser does not support the video tag.
		                    </video>
						{{/media_url_https}}
					{{/video}}
					{{^video}}
						{{#media_url}}
							<a href="{{post_url}}" target="_blank"><img src="{{media_url}}" alt=""></a>
						{{/media_url}}
					{{/video}}

					<p class="salvattore__item__user"><span class="name"><i class="fa fa-{{source}}"></i> {{name}}</span> <span class="screen_name">@{{screen_name}}</span></p>
					<p class="salvattore__item__text"><a href="{{post_url}}" target="_blank">{{text}}</a></p>
					{{#admin}}
						<button class="btn salvattore__item__delete">&times;</button>
					{{/admin}}
				</article>
			{{/results}}
		</script>

	</body>
</html>
