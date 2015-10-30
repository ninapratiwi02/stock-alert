(function (global) {
    'use strict';

    var app = global.app = global.app || {};
    
    app.everlive = new Everlive({
        apiKey: app.config.everlive.apiKey,
        scheme: app.config.everlive.scheme
    });
        
    var fixViewResize = function () {
        
        if (device.platform === 'iOS') {
            setTimeout(function() {
                $(document.body).height(window.innerHeight);
            }, 10);
        }
    };

    var onDeviceReady = function() {

        navigator.splashscreen.hide();
        
        if (!app.isKeySet(app.config.everlive.apiKey)) {
            $(app.config.views.init).hide();
            $('#pushApp').addClass('noapikey-scrn').html(app.constants.NO_API_KEY_MESSAGE);
            return;
        }
        
        fixViewResize();

        var os = kendo.support.mobileOS,
        	statusBarStyle = os.ios && os.flatVersion >= 700 ? 'black-translucent' : 'black';

        app.mobile = new kendo.mobile.Application(document.body, {
            transition: 'slide',
            statusBarStyle: statusBarStyle,
            skin: 'flat'
        });
    };

    document.addEventListener('deviceready', onDeviceReady, false);

    document.addEventListener('orientationchange', fixViewResize);

	function loadMainPageWithActionButton() {
	var payload = {
		'title': 'Demo 4',
		'label': {
			'value': 'Generated @ ' + new Date().toUTCString(),
			'color': '#FFA500',
			'font': { // optional
				'size': 11
			}
		},
		'actionButton': {
			'title': {
				'value': 'Refresh!',
				'color': '#CCCCCC',
				'font': {
					'size': 17
				}
			},
			'color': '#FFFFFF',
			'callback': 'loadMainPageWithActionButton' // reload this page
		}
	};
	applewatch.loadAppMain(payload);
	}
	
}(window));