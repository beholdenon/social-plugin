window.bl = window.bl || {};

(function(ns) {
  
    //plugin defaults
    var options = {
        // defeault cat id
        shareURL: 'http://' + window.location.host + window.location.pathname,
        facebook: {
            title: "",
            description: ""
        },
        twitter: {
            title: ""
        },
        pinterest: {
            title: "",
            image: ""
        },
        instagram: {
            url: "https://www.instagram.com/bloomingdales/"
        }
    };

    // private method to combine defaults and options
    function extend(a, b){
        for(var key in b)
        if(b.hasOwnProperty(key))
        a[key] = b[key];
        return a;
    }
    // init called when plugin instance is created 
    function init() {
        initFacebook();
        initTwitter();
        initPinterest();
        initInstagram();
    }
    function initFacebook() {
        var url = 'https://www.facebook.com/sharer/sharer.php';
        url += '?u=' + encodeURIComponent(options.shareURL);
        url += '&quote=' + encodeURIComponent(options.facebook.title + " " + options.facebook.description);

        // get elements with social attribute value
        var el = document.querySelectorAll('[social="share-fb"]');

        // loop through elements and set the href attribute
        forEach(el, function (index, value) {
            value.setAttribute("href", url);
        });
    }
    function initTwitter() {
        var url = 'http://twitter.com/intent/tweet?source=webclient&text=';
        url += encodeURIComponent(options.twitter.title);
        url += encodeURIComponent(" " + options.shareURL);

        // get elements with social attribute value
        var el = document.querySelectorAll('[social="share-twitter"]');

        // loop through elements and set the href attribute
        forEach(el, function (index, value) {
            value.setAttribute("href", url);
        });

    }
    function initPinterest() {
        var url = 'http://pinterest.com/pin/create/button/?';
        url += 'url=' + encodeURIComponent(options.shareURL);
        url += '&media=' + encodeURIComponent(options.pinterest.image);
        url += '&description=' + encodeURIComponent(options.pinterest.title);

        // get elements with social attribute value
        var el = document.querySelectorAll('[social="share-pinterest"]');

        // loop through elements and set the href attribute
        forEach(el, function (index, value) {
            value.setAttribute("href", url);
        });

    }
    function initInstagram() {
        // get elements with social attribute value
        var el = document.querySelectorAll('[social="share-instagram"]');

        // loop through elements and add a click event listener
        forEach(el, function (index, value) {
            value.addEventListener("click", function(e){
                popup(e, options.instagram.url);
            });
        });
    }

    // popup method
    function popup(e, href, intWidth, intHeight, blnResize) {
        e.preventDefault();
        intWidth = intWidth || '500';
        intHeight = intHeight || '400';
        var strResize = (blnResize ? 'yes' : 'no');
        var strParam = 'width=' + intWidth + ',height=' + intHeight + ',resizable=' + strResize;
        var objWindow = window.open(href, 'Social Share', strParam).focus();
    }

    // logger
    function log(msg) {
        if (window.console && PRODUCTION_URLS.indexOf(host) === -1) {
            console.log(msg);
        }
    }

    // forEach method, could be shipped as part of an Object Literal/Module
    var forEach = function (array, callback, scope) {
        for (var i = 0; i < array.length; i++) {
            callback.call(scope, i, array[i]); // passes back stuff we need
        }
    };

    // public methods
    ns.init = function(settings) {
        options = extend(options, settings);
        init();
    };
})(window.bl.social = window.bl.social || {});