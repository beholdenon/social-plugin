!function(e){var t=!1,r=window.ENV_CONFIG||"dev";const i=window.location.host,o=["fashion.bloomingdales.com","www.bloomingdales.com","m.bloomingdales.com"];e.extend(e,{coremetrics:function(n){function c(){(t=function(){try{return!(!window.BLOOMIES||!window.BLOOMIES.coremetrics)}catch(e){return a("ERROR: Could not find coremetrics library (from checkForCoremetrics method): "+e),!1}}())?(a("Coremetrics Initiated"),function(){if(window.BLOOMIES.coremetrics.pageViewExploreAttributes=new window.BLOOMIES.coremetrics.exploreAttributes,"dev"===r)return cmSetTest();if("production"===r)return o.indexOf(m)>=0?cmSetProduction():cmSetTest();throw"ERROR: Unidentified env variable (from initEnvironment method)"}(),n.use_attribute_tags&&e("[coremetricTag]").click(function(){d({type:"element",id:e(this).attr("coremetricTag"),cat:n.category_id})}),function(){if(n.page_paths!={}&&n.call_page_tags){var e=n.page_paths[m()];null!=e&&d({type:"page",id:e,cat:n.category_id})}}()):a("ERROR: Could not find coremetrics library (from init method)")}function a(e){window.console&&-1===o.indexOf(i)&&console.log(e)}function d(e){if(t)if(e){var r=e.cat||n.category_id,i=e.id;if(i)switch(e.type){case"element":!function(e,t){try{window.BLOOMIES.coremetrics.cmCreatePageElementTag(e,t),a("Coremetrics Element: Category: "+t+" ID: "+e)}catch(e){a("cmCreatePageElementTag Error: "+e)}}(i,r);break;default:!function(e,t){try{window.BLOOMIES.coremetrics.cmCreatePageviewTag(e,t,"",""),a("Coremetrics Page: Category: "+t+" ID: "+e)}catch(e){a("cmCreatePageviewTag Error: "+e)}}(i,r)}else a("ERROR: No id specified (from fireTag Method)")}else a("ERROR: Parameters not set (from fireTag Method)");else a("ERROR: Coremetrics not found (from fireTag Method)")}function m(){var e=window.location.pathname.split("/");return""===e[e.length-1]?e[e.length-2]:e[e.length-1]}return n=e.extend({category_id:"",page_paths:{},call_page_tags:!0,use_attribute_tags:!0},n),c(),{init:function(){c()},fire:function(e){d(e)},path:function(){return m()},category_id:function(e){if(!e)return n.category_id;n.category_id=e},checkForCormetrics:function(){return t()}}}})}(jQuery);