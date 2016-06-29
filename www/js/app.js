!function(e){"use strict";var a=e.module("Localizando.Services.Message",[]);a.factory("Message",function(){var e=window.alert;return navigator.notification&&(e=navigator.notification.alert),{notification:function(a){e(a,null,"Localizando App","OK")}}})}(angular),function(e){"use strict";var a=e.module("Localizando.Services.Maps",[]);a.factory("Maps",function(){var a="https://maps.googleapis.com/maps/api/staticmap?",n={isEnabled:function(){return!!google},isSupported:function(){return!!navigator.geolocation},directionsService:function(){return n._directionsService||(n._directionsService=new google.maps.DirectionsService),n._directionsService},directionsDisplay:function(){return n._directionsDisplay||(n._directionsDisplay=new google.maps.DirectionsRenderer),n._directionsDisplay},geocode:function(){return n._geocode||(n._geocode=new google.maps.Geocoder),n._geocode},location:function(e,a){var t={address:e+", Brasil",region:"BR"};n.geocode().geocode(t,function(e,n){n==google.maps.GeocoderStatus.OK?e[0]&&a(e[0].geometry.location):a()})},staticMap:function(e,n){return a+"center="+e+"&zoom=17&size=400x200&maptype=roadmap&markers=color:purple%7C"+n.lat()+","+n.lng()},createMap:function(e,a){return new google.maps.Map(a,{zoom:16,center:e,mapTypeId:google.maps.MapTypeId.ROADMAP})},getCurrentPosition:function(a,n){e.extend({timeout:15e3,enableHighAccuracy:!1},n);return navigator.geolocation.getCurrentPosition(function(e){var n=new google.maps.LatLng(e.coords.latitude,e.coords.longitude);a(n)})},watch:function(e){var a={timeout:3e3,enableHighAccuracy:!1},n=navigator.geolocation.watchPosition(a);return n.then(null,function(){alert("Falha ao tentar usar geolocalização")},function(a){var n=new google.maps.LatLng(a.coords.latitude,a.coords.longitude);e(a,n)}),n},route:function(e,a,t,i,o){n.geocode().geocode({location:e},function(e,r){if(r==google.maps.GeocoderStatus.OK){var c=e[0].formatted_address,s={origin:c,destination:a,travelMode:google.maps.TravelMode.DRIVING};n.directionsService().route(s,function(e,a){a==google.maps.DirectionsStatus.OK&&(n.directionsDisplay().setMap(t),i&&n.directionsDisplay().setPanel(i),n.directionsDisplay().setDirections(e)),o()})}})}};return n})}(angular),function(e,a){"use strict";var n=e.module("Localizando.Services.Loader",[]);n.factory("Loader",function(){var n=a.loader.prototype.options;return{show:function(t){a.loading("show",e.extend({textVisible:n.textVisible,theme:n.theme,html:n.html,text:n.text,textonly:!1},t))},hide:function(){a.loading("hide")}}})}(angular,$.mobile),function(e){"use strict";var a=e.module("Localizando.Services.Listview",[]);a.factory("Listview",function(){return{watch:function(e){var a=e.scope,n=e.element,t=(e.attrs,e.sorted,e.listviewConfig||{}),i=e.bind,o=n.find("[data-role=listview]");return o&&o.listview(t).listview("refresh"),i&&o&&a.$watchCollection(i,function(e){setTimeout(function(){e&&(o.listview("refresh"),a.$digest())},100)}),o}}})}(angular),function(e){"use strict";var a=e.module("Localizando.Services.Paths",[]);a.factory("Paths",function(){var e="http://localizandoapp.com.br/mobile/";return{getApiPath:function(){return e},openWindow:function(e){window.open(e,"_system")}}})}(angular),function(e,a){"use strict";var n=e.module("Localizando.Services.Navigate",[]);n.factory("Navigate",["Message",function(n){function t(){try{return navigator.connection?"none"===navigator.connection.type:!navigator.onLine}catch(e){return!0}}var i="#home";return{to:function(o,r){var c=e.extend({transition:"slide",reverse:!1,changeHash:!0,reloadPage:!1,isOffline:!1,timeout:100},r);return t()&&!c.isOffline?n.notification("Conexão com a internet indisponivel."):(i=o,setTimeout(function(){a.changePage(o,c)},c.timeout),void 0)},currentPage:function(){return i}}}])}(angular,$.mobile),function(e){"use strict";var a=e.module("Localizando.Filter.EscapeEspecialChar",[]);a.filter("escapeEspecialChar",function(){return function(a){return!e.isUndefined(a)&&e.isString(a)?a.latinEscape():a}})}(angular),function(e){"use strict";var a=e.module("Localizando.Services.Reader",[]);a.factory("Reader",["$q","$http","Store",function(a,n,t){var i=function(a,n){var i=this;i.scope=a,i.transformResponse=function(a){return e.isArray(a)?(t.setValues(i.scope,a),a.map(n)):(t.set(i.scope,a),n(a))},i.onSuccess=function(e){return function(a){a.data.success?e.resolve(i.transformResponse(a.data.data)):e.reject(a.data.message)}},i.onError=function(e){return function(a){e.reject(a||"Falha na requisicao.")}}};return i}])}(angular),function(e){"use strict";var a=e.module("Localizando.Services.Categorias",[]);a.factory("CategoriasService",["$q","$http","Reader","Categoria",function(e,a,n,t){function i(){var n=e.defer();return a.get("categorias/get").then(r.onSuccess(n),r.onError(n)),n.promise}function o(n){var t=e.defer();return a.get("categorias/find/"+n).then(r.onSuccess(t),r.onError(t)),t.promise}var r=new n("categorias",function(e){return new t(e)});return{query:i,get:o}}])}(angular),function(e){"use strict";var a=e.module("Localizando.Services.Anunciantes",[]);a.factory("AnunciantesService",["$q","$http","Anunciante",function(a,n,t){function i(e){return new t(e)}function o(a){return e.isArray(a)?a.map(i):i(a)}function r(e){var t=a.defer();return n.get("anunciantes/get?categoriaId="+e).then(function(e){e.data.success?t.resolve(o(e.data.data)):t.reject(e.data.message||"Falha na requisicao.")},function(e){t.reject(e)}),t.promise}function c(e){var t=a.defer();return n.get("anunciantes/find/"+e).then(function(e){e.data.success?t.resolve(o(e.data.data)):t.reject(e.data.message||"Falha na requisicao.")},function(e){t.reject(e)}),t.promise}function s(e){var t=a.defer();return n.get("anunciantes/banners/"+e).then(function(e){e.data.success?t.resolve(e.data.data):t.reject(e.data.message||"Falha na requisicao.")},function(e){t.reject(e)}),t.promise}function u(e){var t=a.defer();return n.get("anunciantes/GetBannerPrincipal/"+e).then(function(e){e.data.success?t.resolve(e.data.data):t.reject(e.data.message||"Falha na requisicao.")},function(e){t.reject(e)}),t.promise}function l(e){var t=a.defer();return n.get("anunciantes/GetBanner/"+e).then(function(e){e.data.success?t.resolve(e.data.data):t.reject(e.data.message||"Falha na requisicao.")},function(e){t.reject(e)}),t.promise}return{query:r,banners:s,banner:l,bannerPrincipal:u,find:c}}])}(angular),function(e){"use strict";var a=e.module("Localizando.Services.Store",[]);a.factory("Store",function(){var a={getValues:function(e){return JSON.parse(localStorage.getItem("localizando:"+e))||[]},setValues:function(a,n){n=e.isArray(n)?n:[n],localStorage.setItem("localizando:"+a,JSON.stringify(n))},get:function(e,n,t){return a.getValues(n).filter(function(a){return a.Id==e})[0]||t},set:function(e,n){var t=n.Id,i=a.getValues(e),o=i.filter(function(e){return e.Id==t})[0]||n,r=i.indexOf(o);-1!=r&&(i[r]=n),a.setValues(i)}};return a})}(angular),function(e){"use strict";var a=e.module("Localizando.Services.Localizando",[]);a.factory("Localizando",function(){function e(){return a=a||{categorias:[],anunciantes:[],categoria:{},anunciante:{}}}var a=null;return{getCategorias:function(){return e().categorias||[]},setCategorias:function(n){return e().categorias=n||[],a},getAnunciantes:function(){return e().anunciantes||[]},setAnunciantes:function(n){return e().anunciantes=n||[],a},setCategoria:function(n){return e().categoria=n,a},setAnunciante:function(n){return e().anunciante=n,a},clearCategoria:function(){return e().categoria={},a},clearAnunciante:function(){return e().anunciante={},a},getMenus:function(){return e().categorias.filter(function(e){return e.IsMenu})}}})}(angular),function(e){"use strict";return}(angular),function(){var e={};e.caracters={Á:"A",Ă:"A",Ắ:"A",Ặ:"A",Ằ:"A",Ẳ:"A",Ẵ:"A",Ǎ:"A",Â:"A",Ấ:"A",Ậ:"A",Ầ:"A",Ẩ:"A",Ẫ:"A",Ä:"A",Ǟ:"A",Ȧ:"A",Ǡ:"A",Ạ:"A",Ȁ:"A",À:"A",Ả:"A",Ȃ:"A",Ā:"A",Ą:"A",Å:"A",Ǻ:"A",Ḁ:"A",Ⱥ:"A",Ã:"A",Ꜳ:"AA",Æ:"AE",Ǽ:"AE",Ǣ:"AE",Ꜵ:"AO",Ꜷ:"AU",Ꜹ:"AV",Ꜻ:"AV",Ꜽ:"AY",Ḃ:"B",Ḅ:"B",Ɓ:"B",Ḇ:"B",Ƀ:"B",Ƃ:"B",Ć:"C",Č:"C",Ç:"C",Ḉ:"C",Ĉ:"C",Ċ:"C",Ƈ:"C",Ȼ:"C",Ď:"D",Ḑ:"D",Ḓ:"D",Ḋ:"D",Ḍ:"D",Ɗ:"D",Ḏ:"D",ǲ:"D",ǅ:"D",Đ:"D",Ƌ:"D",Ǳ:"DZ",Ǆ:"DZ",É:"E",Ĕ:"E",Ě:"E",Ȩ:"E",Ḝ:"E",Ê:"E",Ế:"E",Ệ:"E",Ề:"E",Ể:"E",Ễ:"E",Ḙ:"E",Ë:"E",Ė:"E",Ẹ:"E",Ȅ:"E",È:"E",Ẻ:"E",Ȇ:"E",Ē:"E",Ḗ:"E",Ḕ:"E",Ę:"E",Ɇ:"E",Ẽ:"E",Ḛ:"E",Ꝫ:"ET",Ḟ:"F",Ƒ:"F",Ǵ:"G",Ğ:"G",Ǧ:"G",Ģ:"G",Ĝ:"G",Ġ:"G",Ɠ:"G",Ḡ:"G",Ǥ:"G",Ḫ:"H",Ȟ:"H",Ḩ:"H",Ĥ:"H",Ⱨ:"H",Ḧ:"H",Ḣ:"H",Ḥ:"H",Ħ:"H",Í:"I",Ĭ:"I",Ǐ:"I",Î:"I",Ï:"I",Ḯ:"I",İ:"I",Ị:"I",Ȉ:"I",Ì:"I",Ỉ:"I",Ȋ:"I",Ī:"I",Į:"I",Ɨ:"I",Ĩ:"I",Ḭ:"I",Ꝺ:"D",Ꝼ:"F",Ᵹ:"G",Ꞃ:"R",Ꞅ:"S",Ꞇ:"T",Ꝭ:"IS",Ĵ:"J",Ɉ:"J",Ḱ:"K",Ǩ:"K",Ķ:"K",Ⱪ:"K",Ꝃ:"K",Ḳ:"K",Ƙ:"K",Ḵ:"K",Ꝁ:"K",Ꝅ:"K",Ĺ:"L",Ƚ:"L",Ľ:"L",Ļ:"L",Ḽ:"L",Ḷ:"L",Ḹ:"L",Ⱡ:"L",Ꝉ:"L",Ḻ:"L",Ŀ:"L",Ɫ:"L",ǈ:"L",Ł:"L",Ǉ:"LJ",Ḿ:"M",Ṁ:"M",Ṃ:"M",Ɱ:"M",Ń:"N",Ň:"N",Ņ:"N",Ṋ:"N",Ṅ:"N",Ṇ:"N",Ǹ:"N",Ɲ:"N",Ṉ:"N",Ƞ:"N",ǋ:"N",Ñ:"N",Ǌ:"NJ",Ó:"O",Ŏ:"O",Ǒ:"O",Ô:"O",Ố:"O",Ộ:"O",Ồ:"O",Ổ:"O",Ỗ:"O",Ö:"O",Ȫ:"O",Ȯ:"O",Ȱ:"O",Ọ:"O",Ő:"O",Ȍ:"O",Ò:"O",Ỏ:"O",Ơ:"O",Ớ:"O",Ợ:"O",Ờ:"O",Ở:"O",Ỡ:"O",Ȏ:"O",Ꝋ:"O",Ꝍ:"O",Ō:"O",Ṓ:"O",Ṑ:"O",Ɵ:"O",Ǫ:"O",Ǭ:"O",Ø:"O",Ǿ:"O",Õ:"O",Ṍ:"O",Ṏ:"O",Ȭ:"O",Ƣ:"OI",Ꝏ:"OO",Ɛ:"E",Ɔ:"O",Ȣ:"OU",Ṕ:"P",Ṗ:"P",Ꝓ:"P",Ƥ:"P",Ꝕ:"P",Ᵽ:"P",Ꝑ:"P",Ꝙ:"Q",Ꝗ:"Q",Ŕ:"R",Ř:"R",Ŗ:"R",Ṙ:"R",Ṛ:"R",Ṝ:"R",Ȑ:"R",Ȓ:"R",Ṟ:"R",Ɍ:"R",Ɽ:"R",Ꜿ:"C",Ǝ:"E",Ś:"S",Ṥ:"S",Š:"S",Ṧ:"S",Ş:"S",Ŝ:"S",Ș:"S",Ṡ:"S",Ṣ:"S",Ṩ:"S",Ť:"T",Ţ:"T",Ṱ:"T",Ț:"T",Ⱦ:"T",Ṫ:"T",Ṭ:"T",Ƭ:"T",Ṯ:"T",Ʈ:"T",Ŧ:"T",Ɐ:"A",Ꞁ:"L",Ɯ:"M",Ʌ:"V",Ꜩ:"TZ",Ú:"U",Ŭ:"U",Ǔ:"U",Û:"U",Ṷ:"U",Ü:"U",Ǘ:"U",Ǚ:"U",Ǜ:"U",Ǖ:"U",Ṳ:"U",Ụ:"U",Ű:"U",Ȕ:"U",Ù:"U",Ủ:"U",Ư:"U",Ứ:"U",Ự:"U",Ừ:"U",Ử:"U",Ữ:"U",Ȗ:"U",Ū:"U",Ṻ:"U",Ų:"U",Ů:"U",Ũ:"U",Ṹ:"U",Ṵ:"U",Ꝟ:"V",Ṿ:"V",Ʋ:"V",Ṽ:"V",Ꝡ:"VY",Ẃ:"W",Ŵ:"W",Ẅ:"W",Ẇ:"W",Ẉ:"W",Ẁ:"W",Ⱳ:"W",Ẍ:"X",Ẋ:"X",Ý:"Y",Ŷ:"Y",Ÿ:"Y",Ẏ:"Y",Ỵ:"Y",Ỳ:"Y",Ƴ:"Y",Ỷ:"Y",Ỿ:"Y",Ȳ:"Y",Ɏ:"Y",Ỹ:"Y",Ź:"Z",Ž:"Z",Ẑ:"Z",Ⱬ:"Z",Ż:"Z",Ẓ:"Z",Ȥ:"Z",Ẕ:"Z",Ƶ:"Z",Ĳ:"IJ",Œ:"OE",ᴀ:"A",ᴁ:"AE",ʙ:"B",ᴃ:"B",ᴄ:"C",ᴅ:"D",ᴇ:"E",ꜰ:"F",ɢ:"G",ʛ:"G",ʜ:"H",ɪ:"I",ʁ:"R",ᴊ:"J",ᴋ:"K",ʟ:"L",ᴌ:"L",ᴍ:"M",ɴ:"N",ᴏ:"O",ɶ:"OE",ᴐ:"O",ᴕ:"OU",ᴘ:"P",ʀ:"R",ᴎ:"N",ᴙ:"R",ꜱ:"S",ᴛ:"T",ⱻ:"E",ᴚ:"R",ᴜ:"U",ᴠ:"V",ᴡ:"W",ʏ:"Y",ᴢ:"Z",á:"a",ă:"a",ắ:"a",ặ:"a",ằ:"a",ẳ:"a",ẵ:"a",ǎ:"a",â:"a",ấ:"a",ậ:"a",ầ:"a",ẩ:"a",ẫ:"a",ä:"a",ǟ:"a",ȧ:"a",ǡ:"a",ạ:"a",ȁ:"a",à:"a",ả:"a",ȃ:"a",ā:"a",ą:"a",ᶏ:"a",ẚ:"a",å:"a",ǻ:"a",ḁ:"a",ⱥ:"a",ã:"a",ꜳ:"aa",æ:"ae",ǽ:"ae",ǣ:"ae",ꜵ:"ao",ꜷ:"au",ꜹ:"av",ꜻ:"av",ꜽ:"ay",ḃ:"b",ḅ:"b",ɓ:"b",ḇ:"b",ᵬ:"b",ᶀ:"b",ƀ:"b",ƃ:"b",ɵ:"o",ć:"c",č:"c",ç:"c",ḉ:"c",ĉ:"c",ɕ:"c",ċ:"c",ƈ:"c",ȼ:"c",ď:"d",ḑ:"d",ḓ:"d",ȡ:"d",ḋ:"d",ḍ:"d",ɗ:"d",ᶑ:"d",ḏ:"d",ᵭ:"d",ᶁ:"d",đ:"d",ɖ:"d",ƌ:"d",ı:"i",ȷ:"j",ɟ:"j",ʄ:"j",ǳ:"dz",ǆ:"dz",é:"e",ĕ:"e",ě:"e",ȩ:"e",ḝ:"e",ê:"e",ế:"e",ệ:"e",ề:"e",ể:"e",ễ:"e",ḙ:"e",ë:"e",ė:"e",ẹ:"e",ȅ:"e",è:"e",ẻ:"e",ȇ:"e",ē:"e",ḗ:"e",ḕ:"e",ⱸ:"e",ę:"e",ᶒ:"e",ɇ:"e",ẽ:"e",ḛ:"e",ꝫ:"et",ḟ:"f",ƒ:"f",ᵮ:"f",ᶂ:"f",ǵ:"g",ğ:"g",ǧ:"g",ģ:"g",ĝ:"g",ġ:"g",ɠ:"g",ḡ:"g",ᶃ:"g",ǥ:"g",ḫ:"h",ȟ:"h",ḩ:"h",ĥ:"h",ⱨ:"h",ḧ:"h",ḣ:"h",ḥ:"h",ɦ:"h",ẖ:"h",ħ:"h",ƕ:"hv",í:"i",ĭ:"i",ǐ:"i",î:"i",ï:"i",ḯ:"i",ị:"i",ȉ:"i",ì:"i",ỉ:"i",ȋ:"i",ī:"i",į:"i",ᶖ:"i",ɨ:"i",ĩ:"i",ḭ:"i",ꝺ:"d",ꝼ:"f",ᵹ:"g",ꞃ:"r",ꞅ:"s",ꞇ:"t",ꝭ:"is",ǰ:"j",ĵ:"j",ʝ:"j",ɉ:"j",ḱ:"k",ǩ:"k",ķ:"k",ⱪ:"k",ꝃ:"k",ḳ:"k",ƙ:"k",ḵ:"k",ᶄ:"k",ꝁ:"k",ꝅ:"k",ĺ:"l",ƚ:"l",ɬ:"l",ľ:"l",ļ:"l",ḽ:"l",ȴ:"l",ḷ:"l",ḹ:"l",ⱡ:"l",ꝉ:"l",ḻ:"l",ŀ:"l",ɫ:"l",ᶅ:"l",ɭ:"l",ł:"l",ǉ:"lj",ſ:"s",ẜ:"s",ẛ:"s",ẝ:"s",ḿ:"m",ṁ:"m",ṃ:"m",ɱ:"m",ᵯ:"m",ᶆ:"m",ń:"n",ň:"n",ņ:"n",ṋ:"n",ȵ:"n",ṅ:"n",ṇ:"n",ǹ:"n",ɲ:"n",ṉ:"n",ƞ:"n",ᵰ:"n",ᶇ:"n",ɳ:"n",ñ:"n",ǌ:"nj",ó:"o",ŏ:"o",ǒ:"o",ô:"o",ố:"o",ộ:"o",ồ:"o",ổ:"o",ỗ:"o",ö:"o",ȫ:"o",ȯ:"o",ȱ:"o",ọ:"o",ő:"o",ȍ:"o",ò:"o",ỏ:"o",ơ:"o",ớ:"o",ợ:"o",ờ:"o",ở:"o",ỡ:"o",ȏ:"o",ꝋ:"o",ꝍ:"o",ⱺ:"o",ō:"o",ṓ:"o",ṑ:"o",ǫ:"o",ǭ:"o",ø:"o",ǿ:"o",õ:"o",ṍ:"o",ṏ:"o",ȭ:"o",ƣ:"oi",ꝏ:"oo",ɛ:"e",ᶓ:"e",ɔ:"o",ᶗ:"o",ȣ:"ou",ṕ:"p",ṗ:"p",ꝓ:"p",ƥ:"p",ᵱ:"p",ᶈ:"p",ꝕ:"p",ᵽ:"p",ꝑ:"p",ꝙ:"q",ʠ:"q",ɋ:"q",ꝗ:"q",ŕ:"r",ř:"r",ŗ:"r",ṙ:"r",ṛ:"r",ṝ:"r",ȑ:"r",ɾ:"r",ᵳ:"r",ȓ:"r",ṟ:"r",ɼ:"r",ᵲ:"r",ᶉ:"r",ɍ:"r",ɽ:"r",ↄ:"c",ꜿ:"c",ɘ:"e",ɿ:"r",ś:"s",ṥ:"s",š:"s",ṧ:"s",ş:"s",ŝ:"s",ș:"s",ṡ:"s",ṣ:"s",ṩ:"s",ʂ:"s",ᵴ:"s",ᶊ:"s",ȿ:"s",ɡ:"g",ᴑ:"o",ᴓ:"o",ᴝ:"u",ť:"t",ţ:"t",ṱ:"t",ț:"t",ȶ:"t",ẗ:"t",ⱦ:"t",ṫ:"t",ṭ:"t",ƭ:"t",ṯ:"t",ᵵ:"t",ƫ:"t",ʈ:"t",ŧ:"t",ᵺ:"th",ɐ:"a",ᴂ:"ae",ǝ:"e",ᵷ:"g",ɥ:"h",ʮ:"h",ʯ:"h",ᴉ:"i",ʞ:"k",ꞁ:"l",ɯ:"m",ɰ:"m",ᴔ:"oe",ɹ:"r",ɻ:"r",ɺ:"r",ⱹ:"r",ʇ:"t",ʌ:"v",ʍ:"w",ʎ:"y",ꜩ:"tz",ú:"u",ŭ:"u",ǔ:"u",û:"u",ṷ:"u",ü:"u",ǘ:"u",ǚ:"u",ǜ:"u",ǖ:"u",ṳ:"u",ụ:"u",ű:"u",ȕ:"u",ù:"u",ủ:"u",ư:"u",ứ:"u",ự:"u",ừ:"u",ử:"u",ữ:"u",ȗ:"u",ū:"u",ṻ:"u",ų:"u",ᶙ:"u",ů:"u",ũ:"u",ṹ:"u",ṵ:"u",ᵫ:"ue",ꝸ:"um",ⱴ:"v",ꝟ:"v",ṿ:"v",ʋ:"v",ᶌ:"v",ⱱ:"v",ṽ:"v",ꝡ:"vy",ẃ:"w",ŵ:"w",ẅ:"w",ẇ:"w",ẉ:"w",ẁ:"w",ⱳ:"w",ẘ:"w",ẍ:"x",ẋ:"x",ᶍ:"x",ý:"y",ŷ:"y",ÿ:"y",ẏ:"y",ỵ:"y",ỳ:"y",ƴ:"y",ỷ:"y",ỿ:"y",ȳ:"y",ẙ:"y",ɏ:"y",ỹ:"y",ź:"z",ž:"z",ẑ:"z",ʑ:"z",ⱬ:"z",ż:"z",ẓ:"z",ȥ:"z",ẕ:"z",ᵶ:"z",ᶎ:"z",ʐ:"z",ƶ:"z",ɀ:"z",ﬀ:"ff",ﬃ:"ffi",ﬄ:"ffl",ﬁ:"fi",ﬂ:"fl",ĳ:"ij",œ:"oe",ﬆ:"st",ₐ:"a",ₑ:"e",ᵢ:"i",ⱼ:"j",ₒ:"o",ᵣ:"r",ᵤ:"u",ᵥ:"v",ₓ:"x"},String.prototype.latinEscape=function(){return this.replace(/[^A-Za-z0-9\[\] ]/g,function(a){return e.caracters[a]||a})},String.prototype.isLatin=function(){return this==this.latinEscape()}}(),function(e){"use strict";var a=e.module("Localizando.Models.ModelBase",[]);a.factory("ModelBase",function(){return{extend:function(a,n){return e.extend(a,n)}}})}(angular),function(e){"use strict";var a=e.module("Localizando.Models.Categoria",[]);a.factory("Categoria",["ModelBase",function(e){var a=function(a){return e.extend({Id:null,Nome:null,Icone:null,IsMenu:null,Hash:null,KeyWords:null,Quant:null,Anunciantes:null},a)};return a}])}(angular),function(e){"use strict";var a=e.module("Localizando.Models.Anunciante",[]);a.factory("Anunciante",["ModelBase",function(e){var a=function(a){return e.extend({Id:null,Nome:null,Icone:null,Banner:null,Banners:null,Descricao:null,Endereco:null,Contato:null,Facebook:null,Twitter:null,Instagran:null,KeyWords:null,Hash:null,Categorias:null},a)};return a}])}(angular),function(e){"use strict";var a=e.module("Localizando.Interceptors.UrlResolver",["Localizando.Services.Paths"]);a.factory("UrlResolver",["$templateCache","Paths",function(e,a){return{request:function(n){return n.cache=e,-1==n.url.indexOf(".html")&&(n.url=a.getApiPath()+n.url),n}}}])}(angular),function(e){"use strict";var a=e.module("Localizando.Directives.Settings",[]);a.directive("settings",["$log","$document",function(){return{restrict:"AE",templateUrl:"settings.html",link:function(){e.element("#settings").css("display","block")}}}])}(angular),function(e){"use strict";var a=e.module("Localizando.Directives.Search",[]);a.directive("search",["Loader","Listview",function(e,a){return{restrict:"AE",templateUrl:"search.html",link:function(n,t,i){n.searchItems=[];var o=a.watch({scope:n,element:t,attrs:i,bind:"searchItems"});t.find("[data-type=search]").on("keydown change",function(){var a=this,i=a.value.latinEscape()||a.value;if(i&&i.length>1&&n.categorias){e.show();var r=n.categorias.filter(function(e){for(var a in e.Palavras)if(-1!=e.Palavras[a].toLowerCase().indexOf(i.toLowerCase()))return!0;return-1!=e.Nome.toLowerCase().indexOf(i.toLowerCase())}).map(function(e){return{descricao:e.Nome,icone:e.Icone,quantidade:e.Quant,keys:e.Palavras,onItemClick:function(){n.setCategoria(e)}}}),c=(n.anunciantes||[]).filter(function(e){return-1!=e.Nome.toLowerCase().indexOf(i.toLowerCase())}).map(function(e){return{descricao:e.Nome,icone:e.Icone,quantidade:1,onItemClick:function(){n.setAnunciante(e)}}});e.hide(),n.searchItems=Array.prototype.concat(r,c)}else n.searchItems=[];n.$digest(),t.animate({}),o.listview("refresh")})}}}])}(angular),function(e){"use strict";var a=e.module("Localizando.Directives.Registro",[]);a.directive("registro",["$log",function(){return{restrict:"AE",templateUrl:"registro.html",link:function(e){e.form={categorias:[]},e.$watch("categorias",function(a){e.form.categorias=(a||[]).map(function(e){return{Id:e.Id,Nome:e.Nome,Icone:e.Icone}})})}}}])}(angular),function(e){"use strict";var a=e.module("Localizando.Directives.PageHeader",[]);a.directive("pageHeader",function(){return{restrict:"AE",templateUrl:"header.html"}})}(angular),function(e){"use strict";var a=e.module("Localizando.Directives.PageFooter",[]);a.directive("pageFooter",["Navigate",function(){return{restrict:"AE",templateUrl:"footer.html",link:function(a,n){var t=n.find("#navigate-buttons");setInterval(function(){var e="#home"==location.hash||""==location.hash;t.css("display",e?"none":"block")},100);var i=e.element("#settings").panel().page();a.openSettings=function(){i.panel("open")}}}}])}(angular),function(e){"use strict";var a=e.module("Localizando.Directives.Mapa",[]);a.directive("mapa",["$log","$document","Maps",function(e,a,n){return{restrict:"AE",templateUrl:"mapa.html",link:function(e,a){n.getCurrentPosition(function(t){var i=n.createMap(t,a.find("#mapa"));e.$watch("anunciante.Endereco",function(e,a){e!==a&&n.route(t,e,i)})})}}}])}(angular),function(e){"use strict";var a=e.module("Localizando.Directives.Home",[]);a.directive("home",function(){return{restrict:"AE",templateUrl:"home.html",link:function(e,a){var n=a.find("[data-role=listview]").listview();n.listview("refresh"),e.$watchCollection("categorias",function(){n.listview("refresh")})}}})}(angular),function(e){"use strict";var a=e.module("Localizando.Directives.Galeria",[]);a.directive("galeria",function(){return{restrict:"AE",templateUrl:"galeria.html",scope:{images:"="},link:function(e,a){var n=a.find("#galeria-popup").popup();e.selectImage=function(a){e.selectedIndex=a,n.popup("open",{transition:"pop"})},e.$watch("images",function(a,n){a!==n&&delete e.selectedImage}),e.$watch("selectedIndex",function(a){a>=0&&(e.selectedImage=e.images[a].image)}),e.prev=function(){0==e.selectedIndex?e.selectedIndex=e.images.length-1:e.selectedIndex--},e.next=function(){e.selectedIndex==e.images.length-1?e.selectedIndex=0:e.selectedIndex++}}}})}(angular),function(e){"use strict";var a=e.module("Localizando.Directives.Categorias",[]);a.directive("categorias",["Listview",function(e){return{restrict:"AE",templateUrl:"categorias.html",link:function(a,n,t){e.watch({scope:a,element:n,attrs:t,bind:"categorias",listviewConfig:{autodividers:!0,autodividersSelector:function(e){var a=e.text().trim();return a.substring(0,1).toUpperCase()}},sorted:!0})}}}])}(angular),function(e){"use strict";var a=e.module("Localizando.Directives.BrowseApp",[]);a.directive("browseApp",["Paths","Loader",function(){return{restrict:"E",template:'<a data-ng-if="link" data-ng-click="open(link)"><span></span><img alt="app" ng-src="{{icon}}" class="icone_rede_social"/></a>',scope:{link:"=",icon:"@"},link:function(e){e.open=function(e){window.open(e,"_blank","location=yes")}}}}])}(angular),function(e){"use strict";var a=e.module("Localizando.Directives.Anunciantes",[]);a.directive("anunciantes",["Listview",function(e){return{restrict:"AE",templateUrl:"anunciantes.html",link:function(a,n,t){e.watch({scope:a,element:n,attrs:t,bind:"anunciantes"})}}}])}(angular),function(e){"use strict";var a=e.module("Localizando.Directives.Anunciante",[]);a.directive("anunciante",["Paths","Navigate",function(e){return{restrict:"AE",templateUrl:"anunciante.html",link:function(a){a.openWindow=e.openWindow}}}])}(angular),function(e){"use strict";var a=e.module("Localizando.Controllers.Mapa",[]);a.controller("MapaController","$scope","$cordovaGeolocation",function(e,a){var n={timeout:1e4,enableHighAccuracy:!1};a.getCurrentPosition(n).then(function(a){var n=new google.maps.LatLng(a.coords.latitude,a.coords.longitude),t={center:n,zoom:15,mapTypeId:google.maps.MapTypeId.ROADMAP};e.map=new google.maps.Map(document.getElementById("mapa"),t)},function(){console.log("Could not get location")})})}(angular),function(e){"use strict";var a=e.module("Localizando.Controllers.Main",[]);a.controller("MainController",["$scope","Loader","Navigate","Maps","Message","CategoriasService","AnunciantesService",function(a,n,t,i,o,r,c){function s(){n.show(),u(function(t){a.menus=t.filter(function(e){return e.IsMenu}),a.categorias.forEach(function(n,t){n.Icone=d,r.get(n.Id).then(function(n){e.copy(n,a.categorias[t])})}),n.hide()},function(){n.hide(),o.notification("Falha na tentativa de comunicação com servidor.\nPor favor verifique a sua conexão de internet.")})}function u(e,n){r.query().then(function(n){a.categorias=n,e(n)},function(){a.categorias=[],n()})}function l(){setTimeout(function(){try{var e=a.selectedCategoria.Id;a.categorias.forEach(function(a){a.Id!==e&&a.Anunciantes&&a.Anunciantes.forEach(function(e){(e.Banners||[]).forEach(function(e){delete e.image})})})}catch(n){console.error("Falha ao limpar",n)}},100)}var d="images/localizando-loader-laranja.gif";a.categorias=[],a.reload=function(){t.to("#home"),s()},window.cordova?document.addEventListener("deviceready",s,!1):s(),a.registrar=function(){a.registro={},t.to("#registro")},a.visualizar=function(e){var n=e.Categorias[0].Id,t=a.categorias.filter(function(e){return e.Id==n})[0]||{};e.Icone=t.Icone,a.setAnunciante(e)},a.setCategoria=function(e){a.selectedCategoria=e,a.selectedCategoria.Anunciantes?(a.anunciantes=a.selectedCategoria.Anunciantes,a.loadAnunciantes(a.selectedCategoria.Anunciantes),t.to("#anunciantes")):(n.show(),c.query(e.Id).then(function(n){a.loadAnunciantes(n),a.anunciantes=e.Anunciantes=n}).finally(function(){t.to("#anunciantes"),n.hide()})),l()},a.loadAnunciante=function(a){a&&a.Icone!=d&&(a.Icone=d,c.find(a.Id).then(function(n){e.copy(n,a)}))},a.loadAnunciantes=function(a){a.filter(function(e){return!e.Icone||e.Icone==d}).forEach(function(n,t){n.Icone=d,c.find(n.Id).then(function(n){e.copy(n,a[t])},function(){delete a[t]})})},a.setAnunciante=function(e){a.anunciante=e,n.show(),a.loadStaticMap(),a.loadBannerPrincipal(function(){a.loadBanners(),n.hide(),t.to("#anunciante")})},a.loadBannerPrincipal=function(e){a.anunciante.Banner?e():c.bannerPrincipal(a.anunciante.Id).then(function(n){a.anunciante.Banner=n,e()})},a.loadBanners=function(){(a.anunciante.Banners||[]).forEach(function(e){e.image=d,c.banner(e.Id).then(function(a){e.image=a})})},a.categoriasOf=function(e){var n=[];if(e){var t=(e.Categorias||[]).map(function(e){return e.Id});n=a.categorias.filter(function(e){return-1!=t.indexOf(e.Id)})}return n},a.loadStaticMap=function(){if(!a.anunciante.map){a.anunciante.map="images/mapa.jpg";var e=a.anunciante.Endereco;i.location(e,function(n){n&&(a.anunciante.map=i.staticMap(e,n))})}},a.setMapa=function(e){return i.isSupported()?i.isEnabled()?(t.to("#mapa"),n.show(),i.getCurrentPosition(function(a){var t=i.createMap(a,document.getElementById("mapa"));i.route(a,e.Endereco,t,null,function(){n.hide()})},function(e){var a="";switch(e.code){case e.PERMISSION_DENIED:a="O usuario não possui permissão para usar geolocalização.";break;case e.POSITION_UNAVAILABLE:a="Informação indisponivel";break;case e.TIMEOUT:a="O tempo para recuperar a posição foi ultrapassado.";break;case e.UNKNOWN_ERROR:a="Aconteceu um erro desconhecido."}o.notification(a)}),void 0):(o.notification("O serviço do google maps não está disponivel."),void 0):(o.notification("Geolocalização não é suportado pelo seu dispositivo."),void 0)}}])}(angular),function(e){"use strict";var a=e.module("Localizando.Controllers.Home",[]);a.controller("HomeController",["$scope","Loader","Navigate","CategoriasService","AnunciantesService",function(e,a,n,t,i){function o(e,a){return JSON.parse(localStorage.getItem("localizando:"+e))||a}function r(e,a){return localStorage.setItem("localizando:"+e,JSON.stringify(a)),this}function c(){e.menus=o("menus",[]),t.menu().then(function(a){e.menus=a,r("menus",a)}).finally(function(){a.hide()})}function s(a){return e.categorias?e.categorias.filter(function(e){return e.Id==a})[0]:null}function u(a){a.Anunciantes||i.query(a.Id).then(function(n){e.anunciantes=a.Anunciantes=n})}c(),e.isHome=function(){return""==document.location.hash},e.showAllCategorias=function(){a.show(),t.query().then(function(a){e.categorias=a,r("categorias",a)},function(){e.categorias=o("categorias",[])}).finally(function(){a.hide(),n.to("#categorias")})},e.setCategoria=function(i){if(e.selectedCategoria=s(i),n.to("#anunciantes"),e.selectedCategoria&&!e.selectedCategoria.Icone){a.show();var o=e.categorias.indexOf(e.selectedCategoria);t.get(i).then(function(a){e.categorias[o]=a,e.selectedCategoria=a,u(e.selectedCategoria)}).finally(function(){a.hide()})}},e.setAnunciante=function(a){e.selectedAnunciante=a},e.categoriasOf=function(a){var n=a.Categorias.map(function(e){return e.Id});return e.categorias.filter(function(e){return-1!=n.indexOf(e.Id)})},e.searchItems=[]}])}(angular),function(e){"use strict";var a=e.module("Localizando.Controllers.Categorias",[]);a.controller("Categorias",["$scope","$cordovaGeolocation","Loader","Navigate","Maps","CategoriasService","AnunciantesService",function(a,n,t,i,o,r,c){a.setCategoria=function(e){a.selectedCategoria=e,a.selectedCategoria.Anunciantes?(a.anunciantes=a.selectedCategoria.Anunciantes,a.loadAnunciantes(a.selectedCategoria.Anunciantes),i.to("#anunciantes")):(t.show(),c.query(e.Id).then(function(n){a.loadAnunciantes(n),a.anunciantes=e.Anunciantes=n}).finally(function(){i.to("#anunciantes"),t.hide()}))},a.loadAnunciante=function(a){a&&a.Icone!=defaultIcon&&(a.Icone=defaultIcon,c.find(a.Id).then(function(n){e.copy(n,a)}))},a.loadAnunciantes=function(a){a.filter(function(e){return!e.Icone||e.Icone==defaultIcon}).forEach(function(n,t){n.Icone=defaultIcon,c.find(n.Id).then(function(n){e.copy(n,a[t])},function(){delete a[t]})})}}])}(angular),function(e){var a=e.module("Localizando.Services",["Localizando.Services.Paths","Localizando.Services.Loader","Localizando.Services.Navigate","Localizando.Services.Listview","Localizando.Services.Message","Localizando.Services.Maps","Localizando.Models.ModelBase","Localizando.Models.Categoria","Localizando.Models.Anunciante","Localizando.Filter.EscapeEspecialChar","Localizando.Services.Store","Localizando.Services.Reader","Localizando.Services.Categorias","Localizando.Services.Anunciantes"]);a.run(["$log",function(e){e.debug("run module %s(%s)",a.name,a.requires.join(", "))}])}(angular),function(e){e.page.prototype.options.theme="a",e.loader.prototype.options.theme="b",e.loader.prototype.options.text="Carregando...",e.loader.prototype.options.textVisible=!0,e.pageLoadErrorMessage="Não foi possivel carregar a página",e.pageLoadErrorMessageTheme="b",e.defaultPageTransition="slide",e.defaultDialogTransition="pop",e.transitionFallbacks.slideout="slide",e.ajaxEnabled=!1,$(document).on("swipeleft swiperight","article",function(a){var n=e.activePage,t="swiperight"===a.type,i=t?"prev":"next",o=n[i]('article[data-role="page"]');o.length>0&&e.changePage(o,{transition:"slide",reverse:t})})}($.mobile),function(e){var a=e.module("Localizando.Interceptors",["Localizando.Interceptors.UrlResolver"]);a.config(["$httpProvider",function(e){e.interceptors.push("UrlResolver")}]),a.run(["$log",function(e){e.debug("run module %s(%s)",a.name,a.requires.join(", "))}])}(angular),function(e){var a=e.module("Localizando.Directives",["Localizando.Directives.PageHeader","Localizando.Directives.PageFooter","Localizando.Directives.Search","Localizando.Directives.Galeria","Localizando.Directives.BrowseApp","Localizando.Directives.Settings","Localizando.Directives.Registro","Localizando.Directives.Home","Localizando.Directives.Categorias","Localizando.Directives.Anunciantes","Localizando.Directives.Anunciante"]);a.run(["$log",function(e){e.debug("run module %s(%s)",a.name,a.requires.join(", "))}])}(angular),function(e){var a=e.module("Localizando.Controllers",["Localizando.Controllers.Main"]);a.run(["$log",function(e){e.debug("run module %s(%s)",a.name,a.requires.join(", "))}])}(angular),function(e){"use strict";var a=e.module("Localizando",["Localizando.Directives","Localizando.Services","Localizando.Controllers","Localizando.Interceptors"]);a.config(["$compileProvider","$logProvider","$httpProvider",function(e,a,n){e.debugInfoEnabled(!1),a.debugEnabled(!1),n.defaults.headers.common["Content-Type"]="application/json",n.defaults.headers.common.Accept="application/json",n.defaults.timeout=3e4}]),a.run(["$log","Navigate",function(e,n){e.debug("run module %s(%s)",a.name,a.requires.join(", ")),localStorage&&!localStorage.getItem("comoFunciona")?(localStorage.setItem("comoFunciona",1),n.to("#comoFunciona1",{isOffline:!0})):n.to("#home")}])}(angular),angular.module("Localizando").run(["$templateCache",function(e){e.put("anunciante.html",'<div role="main" class="ui-content"><div data-role="content" id="conteudo"><div id="banner"><div data-ng-if="anunciante.Banner" id="banner_principal"><img data-ng-src="{{anunciante.Banner}}"></div><div data-ng-if="!anunciante.Banner" id="banner_icone"><img data-ng-src="{{anunciante.Icone}}" width="60" height="60"></div><h1>{{anunciante.Nome}}</h1></div><br><ul class="menu-anunciante"><li data-ng-repeat="categoria in categoriasOf(anunciante)"><a href="#" data-ng-click="setCategoria(categoria)"><img alt="{{categoria.Nome}}" data-ng-src="{{categoria.Icone}}"></a></li></ul><div data-role="content" id="conteudoOR"><div class="contato"><p class="cont">Contato: {{anunciante.Contato}}</p><browse-app link="anunciante.Facebook" icon="images/fb.png"></browse-app><browse-app link="anunciante.Instagran" icon="images/in.png"></browse-app><browse-app link="anunciante.Twitter" icon="images/tw.png"></browse-app><p class="desc"></p><blockquote>{{anunciante.Descricao}}</blockquote><p></p><br></div></div><h2 data-ng-if="anunciante.Endereco">Visualizar no mapa</h2><button data-icon="location" data-ng-click="setMapa(anunciante)"><img id="img-mapa" alt="mapa" data-ng-src="{{anunciante.map}}"></button><div data-galeria data-images="anunciante.Banners"></div></div></div>'),e.put("anunciantes.html",'<div role="main" class="ui-content"><div><h1>Anunciantes de {{selectedCategoria.Nome}}<h1><img alt="." data-ng-src="{{selectedCategoria.Icone}}" width="60" height="60"></h1></h1></div><ul data-role="listview" data-filter="true" data-filter-placeholder="Digite o que esta procurando..." data-inset="true"><li data-ng-repeat="anunciante in anunciantes"><a href="#" data-ng-click="setAnunciante(anunciante)"><img alt="" data-ng-src="{{anunciante.Icone}}"><h3>{{anunciante.Nome}}</h3><p>{{anunciante.Endereco}}</p></a></li><li><a href="#" data-ng-click="showAllCategorias()"><h3>Todas as categorias</h3></a></li></ul></div>'),e.put("categorias.html",'<div role="main" class="ui-content"><ul data-role="listview" data-filter="true" data-filter-placeholder="Digite o que esta procurando..." data-inset="true"><li ng-repeat="categoria in categorias | orderBy: \'Nome[0]\'"><a href="#" data-ng-click="setCategoria(categoria)"><img alt="" data-ng-src="{{categoria.Icone}}" width="50" height="50"> {{categoria.Nome}} <span class="ui-li-count">{{categoria.Quant}}</span></a><p class="hidden-keys">{{(categoria.Palavras||[]).join(\',\') | escapeEspecialChar}}, {{categoria.Nome | escapeEspecialChar}}</p></li></ul></div>'),e.put("footer.html",'<div data-role="footer" data-position="fixed" class="rodape ui-footer ui-bar-inherit ui-footer-fixed slideup"><div data-role="navbar" class="ui-navbar" role="navigation"><div id="navigate-buttons"><a class="ui-btn ui-btn-left ui-alt-icon ui-nodisc-icon ui-btn-icon-notext ui-icon-back" href="#" data-role="button" data-icon="back" data-rel="back" data-iconpos="notext"></a> <a class="ui-btn ui-btn-left ui-alt-icon ui-nodisc-icon ui-btn-icon-notext ui-icon-home" style="margin-left:50px;float:left" href="#home" data-role="button" data-icon="home" data-iconpos="notext"></a></div><div class="logoT"><img src="images/localizando.png"></div><a href="#" data-ng-click="openSettings()" class="ui-btn ui-btn-right ui-alt-icon ui-nodisc-icon ui-btn-icon-notext ui-icon-bars" data-role="button" data-icon="bars" data-iconpos="notext"></a></div></div>'),e.put("galeria.html",'<div><h2 data-ng-if="images">Galeria</h2><div data-ng-repeat="image in images track by $index"><a href="#" class="popphoto" data-ng-click="selectImage($index)"><img data-ng-src="{{image.image}}" alt="."></a></div><div id="galeria-popup" data-role="popup" data-arrow="b" data-corners="true" class="ui-header"><div data-role="header" data-theme="a"><h1>Galeria</h1><div data-role="navbar" class="ui-navbar"><a data-ng-click="next()" href="#" class="ui-btn ui-btn-left ui-icon-carat-r ui-btn-icon-notext ui-corner-all"></a></div></div><div role="main"><a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Fechar</a> <img class="popphoto" ng-src="{{selectedImage}}" alt="."></div></div></div>'),e.put("header.html",'<div data-role="header"></div>'),e.put("home.html",'<div role="main" class="ui-content"><div data-role="content"><div search></div><nav><ul class="menu"><li ng-repeat="menu in menus"><a href="#" data-ng-click="setCategoria(menu)"><img alt="." data-ng-src="{{menu.Icone}}" width="120" height="120"> {{menu.Nome}}</a></li></ul></nav><a href="#categorias" class="ui-btn ui-corner-all all-categorias" data-icon="bullets">Todas as categorias</a></div></div>'),e.put("mapa.html",'<div role="main" class="ui-content"><input data-ng-model="endereco" value="{{anunciante.Endereco}}" style="display: none"><div id="mapa"></div></div>'),e.put("registro.html",'<div role="main" class="ui-content"><form name="registroForm" novalidate><p>Registrar seu négocio.</p><fieldset data-role="fieldcontain"><label for="registro_Nome" class="ui-hidden-accessible">Nome</label><input type="text" id="registro_Nome" name="registro.Nome" data-ng-model="registro.Nome" placeholder="Nome" autofocus required><p ng-show="registroForm.registro_Nome.$invalid && !registroForm.registro_Nome.$pristine" class="help-block">* Obrigatorio.</p><p>{{registroForm.registro_Nome | json}}</p></fieldset><label for="registro_Endereco" class="ui-hidden-accessible">Endereco</label><input type="text" id="registro_Endereco" data-ng-model="registro.Endereco" placeholder="Endereco" required><label for="registro_Contato" class="ui-hidden-accessible">Contato</label><input type="tel" id="registro_Contato" data-ng-model="registro.Contato" placeholder="Contato" required><label for="registro_Facebook" class="ui-hidden-accessible">Facebook</label><input type="text" id="registro_Facebook" data-ng-model="registro.Facebook" placeholder="Facebook"><label for="registro_Twitter" class="ui-hidden-accessible">Twitter</label><input type="text" id="registro_Twitter" data-ng-model="registro.Twitter" placeholder="Twitter"><label for="registro_Instagran" class="ui-hidden-accessible">Instagran</label><input type="text" id="registro_Instagran" data-ng-model="registro.Instagran" placeholder="Instagran"><label for="registro_Categorias" class="select">Categorias</label><select id="registro_Categorias" multiple="multiple" data-native-menu="false" data-icon="grid" data-iconpos="left" ng-options="categoria as categoria.Nome for categoria in form.categorias track by categoria.Id" ng-model="registro.Categorias" required></select><button data-ng-click="registroForm.$valid && visualizar(registro)">Visualizar</button><textarea>{{registroForm | json}}</textarea><textarea>{{registro | json}}</textarea></form></div>'),e.put("search.html",'<ul data-role="listview" data-filter="true" data-filter-placeholder="Digite o que esta procurando..." data-inset="true"><li ng-repeat="item in searchItems"><a href="#" data-ng-click="item.onItemClick()"><img alt="" data-ng-src="{{item.icone}}" width="48" height="48"><pre>{{item.descricao}}</pre><span class="ui-li-count">{{item.quantidade}}</span><p class="hidden-keys">{{item.keys.join(\',\') | escapeEspecialChar}}, {{item.descricao | escapeEspecialChar}}</p></a></li></ul>'),e.put("settings.html",'<div><ul data-role="listview" data-inset="true"><li><a href="#categorias" class="ui-icon-bar">Todas as Categorias</a></li><li><a href="#comoFunciona1" class="ui-icon-info">Como Funciona</a></li><li><a href="#" class="ui-icon-refresh" data-ng-click="reload()">Atualizar registros</a></li><li><a href="#" data-rel="close" class="ui-icon-delete">Fechar</a></li></ul></div>')
}]);