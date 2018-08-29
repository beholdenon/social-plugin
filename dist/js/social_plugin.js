window.bl = window.bl || {};

(function(ns) {
  
    // private variables

    //plugin defaults
    var options = {
        // defeault cat id
        baseURL: 'http://' + window.location.host + window.location.pathname,
        baseAssetsURL: 'http://' + window.location.host + window.location.pathname,
        facebook: {
            attribute: "social-share-fb",
            title: "",
            description: "",
            image: ""
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

    // initial build
    function share() {

    }
    function initFacebook() {
        var url = 'https://www.facebook.com/sharer/sharer.php';
        url += '?u=' + encodeURIComponent(options.baseURL);
        url += '&quote=' + encodeURIComponent(options.facebook.title + " " + options.facebook.description);

        $("[social=share-fb]").each(function(index) {
            $(this).attr("href", url);
        });

    }
    function initTwitter() {
        var url = 'http://twitter.com/intent/tweet?source=webclient&text=';
        url += encodeURIComponent(options.twitter.title);
        url += encodeURIComponent(" " + options.baseURL);

        $("[social=share-twitter]").each(function(index) {
            $(this).attr("href", url);
        });

    }
    function initPinterest() {
        var url = 'http://pinterest.com/pin/create/button/?';
        url += 'url=' + encodeURIComponent(options.baseURL);
        url += '&media=' + encodeURIComponent(options.baseAssetsURL + options.pinterest.image);
        url += '&description=' + encodeURIComponent(options.pinterest.title);

        $("[social=share-pinterest]").each(function(index) {
            $(this).attr("href", url);
        });

    }
    function initInstagram() {
        $("[social=share-instagram]").each(function(index) {
            $(this).on('click', function (e) {
                popup(e, options.instagram.url);
            });
        });
    }

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


    // public methods
    ns.init = function(settings) {
        options = extend(options, settings);
        init();
    };
})(window.bl.social = window.bl.social || {});