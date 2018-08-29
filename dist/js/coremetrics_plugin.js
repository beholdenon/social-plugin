(function($) {

    // whether or not connection to coremetrics library is succesful
    var coremetrics = false;

    // env either production or dev
    var env = window.ENV_CONFIG || 'dev';

    // get current host
    const HOST = window.location.host;

    // production urls
    const PRODUCTION_URLS = [
        'fashion.bloomingdales.com',
        'www.bloomingdales.com',
        'm.bloomingdales.com'
    ];

    $.extend($, {
        // create instance
        coremetrics: function(options) {
            var defaults = {
                // defeault cat id
                category_id: '',

                // default page id's for onLoad tags
                page_paths: {},

                // control whether or not onLoad page tags fire
                call_page_tags: true,

                // use html attributes for element tags
                use_attribute_tags: true
            }

            // handle defaults and user settings
            options = $.extend(defaults, options);

            // init called when plugin instance is created 
            function init() {
                // check to see if coremetric library connected
                coremetrics = checkForCoremetrics();
                if(coremetrics) {
                    log("Coremetrics Initiated");

                    // intial coremetrics setup
                    initEnvironment();

                    // listen for html elements with coremetrics attribute tags
                    initAttributeListener();

                    // call on load page event
                    initPageLoadCall();
                }
                else {
                    // could not connect to coremetrics
                    log("ERROR: Could not find coremetrics library (from init method)");
                }
            }

            // test connection to bloomies and  coremetrics
            function checkForCoremetrics() {
                try {
                    if(window.BLOOMIES && window.BLOOMIES.coremetrics) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                catch (e) {
                    log("ERROR: Could not find coremetrics library (from checkForCoremetrics method): " + e);
                    return false;
                }
            }

            // setup dev or production environment
            function initEnvironment() {
                window.BLOOMIES.coremetrics.pageViewExploreAttributes = new window.BLOOMIES.coremetrics.exploreAttributes();
                if (env === 'dev') {
                    return cmSetTest();
                }
                else if (env === 'production') {
                    if (PRODUCTION_URLS.indexOf(path) >= 0) {
                        return cmSetProduction();
                    }
                    else {
                        return cmSetTest();
                    }
                }
                else {
                    throw 'ERROR: Unidentified env variable (from initEnvironment method)';
                }
            }

            // setup
            function initAttributeListener() {
                if(options.use_attribute_tags) {
                    $('[coremetricTag]').click(function() {
                        fireTag({
                            type: 'element',
                            id: $( this ).attr( "coremetricTag" ),
                            cat: options.category_id
                        });
                    });
                }
            }

            // setup page id's firing on page load
            function initPageLoadCall() {
                if(options.page_paths != {} && options.call_page_tags) {
                    var page = options.page_paths[path()];
                    if(page != undefined) {
                       fireTag({
                            type: "page",
                            id: page,
                            cat: options.category_id
                        });
                    }
                }
            }

            // logger
            function log(msg) {
                if (window.console && PRODUCTION_URLS.indexOf(HOST) === -1) {
                    console.log(msg);
                }
            }

            // method to fire tags (cat is optional)
            function fireTag(params) {
                if(coremetrics) {
                    if(params) {
                        var cat = params.cat || options.category_id;
                        var id = params.id;
                        if(id) {
                            switch(params.type) {
                                case "element":
                                    cmCreatePageElementTag(id, cat);
                                break;
                                default:
                                    cmCreatePageviewTag(id, cat);
                            }
                        }
                        else {
                            log("ERROR: No id specified (from fireTag Method)");
                        }
                    }
                    else {
                        log("ERROR: Parameters not set (from fireTag Method)");
                    }
                }
                else {
                    log("ERROR: Coremetrics not found (from fireTag Method)");
                }
            }

            // call page view tag 
            function cmCreatePageviewTag(id, cat) {
                try {
                    window.BLOOMIES.coremetrics.cmCreatePageviewTag(id, cat, '', '');
                    log("Coremetrics Page: Category: " + cat + " ID: " + id);
                } catch (e) {
                    log("cmCreatePageviewTag Error: " + e);
                }
            }

            // call element tag
            function cmCreatePageElementTag(id, cat) {
                try {
                    window.BLOOMIES.coremetrics.cmCreatePageElementTag(id, cat);
                    log("Coremetrics Element: Category: " + cat + " ID: " + id);
                } catch (e) {
                    log("cmCreatePageElementTag Error: " + e);
                }
            }

            // return current directory
            function path() {
                var urlArr = window.location.pathname.split("/");
                if( urlArr[urlArr.length - 1] === "" ) {
                    return urlArr[urlArr.length - 2];
                }
                else {
                    return urlArr[urlArr.length - 1];
                }
                return window.location.pathname;
            }

            // init
            init();

            // public methods
            return {
                init: function() {
                    init();
                },
                fire: function(params) {
                    fireTag(params);
                },
                path: function() {
                    return path();
                },
                category_id: function(val) {
                    if(val) {
                        options.category_id = val;
                    }
                    else {
                        return options.category_id;
                    }
                },
                checkForCormetrics: function () {
                    return coremetrics();
                }
            };
        }
    });
})(jQuery);