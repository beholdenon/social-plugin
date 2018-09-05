window.bl = window.bl || {};

(function(ns) {
  
    //plugin defaults
    var options = {
        // defeault cat id
        shareURL: 'http://' + window.location.host + window.location.pathname,
        follow_urls: {
            facebook: "https://www.facebook.com/Bloomingdales",
            twitter: "https://twitter.com/BLOOMINGDALES",
            pinterest: "https://www.pinterest.com/bloomingdales/",
            instagram: "https://www.instagram.com/bloomingdales/",
            snapchat: "https://www.snapchat.com/add/bloomingdales"
        },
        facebook: {
            title: "",
            description: ""
        },
        twitter: {
            title: ""
        },
        pinterest: {
            title: "",
            description: "",
            image: ""
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
        initSnapchat();
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

        // get elements with social attribute value
        el = document.querySelectorAll('[social="follow-fb"]');

        // loop through elements and set the href attribute
        forEach(el, function (index, value) {
            value.setAttribute("href", options.follow_urls.facebook);
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

        // get elements with social attribute value
        el = document.querySelectorAll('[social="follow-twitter"]');

        // loop through elements and set the href attribute
        forEach(el, function (index, value) {
            value.setAttribute("href", options.follow_urls.twitter);
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

        // get elements with social attribute value
        el = document.querySelectorAll('[social="follow-pinterest"]');

        // loop through elements and set the href attribute
        forEach(el, function (index, value) {
            value.setAttribute("href", options.follow_urls.pinterest);
        });

    }
    function initInstagram() {
        // get elements with social attribute value
        var el = document.querySelectorAll('[social="follow-instagram"]');

        // loop through elements and add a click event listener
        forEach(el, function (index, value) {
            value.addEventListener("click", function(e){
                popup(e, options.follow_urls.instagram);
            });
        });
    }
    function initSnapchat() {
        // get elements with social attribute value
        var el = document.querySelectorAll('[social="follow-snapchat"]');

        // loop through elements and set the href attribute
        forEach(el, function (index, value) {
            value.setAttribute("href", options.follow_urls.snapchat);
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