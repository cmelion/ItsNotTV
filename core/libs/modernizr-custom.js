/* Modernizr 2.7.1 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-multiplebgs-opacity-cssanimations-generatedcontent-cssgradients-csstransforms-csstransforms3d-csstransitions-applicationcache-history-video-localstorage-postmessage-sessionstorage-inlinesvg-svg-svgclippaths-touch-shiv-mq-cssclasses-addtest-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-css_filters-css_mask-load
 */
;



window.Modernizr = (function( window, document, undefined ) {

    var version = '2.7.1',

    Modernizr = {},

    enableClasses = true,

    docElement = document.documentElement,

    mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,

    inputElem  ,

    smile = ':)',

    toString = {}.toString,

    prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),



    omPrefixes = 'Webkit Moz O ms',

    cssomPrefixes = omPrefixes.split(' '),

    domPrefixes = omPrefixes.toLowerCase().split(' '),

    ns = {'svg': 'http://www.w3.org/2000/svg'},

    tests = {},
    inputs = {},
    attrs = {},

    classes = [],

    slice = classes.slice,

    featureName, 


    injectElementWithStyles = function( rule, callback, nodes, testnames ) {

      var style, ret, node, docOverflow,
          div = document.createElement('div'),
                body = document.body,
                fakeBody = body || document.createElement('body');

      if ( parseInt(nodes, 10) ) {
                      while ( nodes-- ) {
              node = document.createElement('div');
              node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
              div.appendChild(node);
          }
      }

                style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
      div.id = mod;
          (body ? div : fakeBody).innerHTML += style;
      fakeBody.appendChild(div);
      if ( !body ) {
                fakeBody.style.background = '';
                fakeBody.style.overflow = 'hidden';
          docOverflow = docElement.style.overflow;
          docElement.style.overflow = 'hidden';
          docElement.appendChild(fakeBody);
      }

      ret = callback(div, rule);
        if ( !body ) {
          fakeBody.parentNode.removeChild(fakeBody);
          docElement.style.overflow = docOverflow;
      } else {
          div.parentNode.removeChild(div);
      }

      return !!ret;

    },

    testMediaQuery = function( mq ) {

      var matchMedia = window.matchMedia || window.msMatchMedia;
      if ( matchMedia ) {
        return matchMedia(mq).matches;
      }

      var bool;

      injectElementWithStyles('@media ' + mq + ' { #' + mod + ' { position: absolute; } }', function( node ) {
        bool = (window.getComputedStyle ?
                  getComputedStyle(node, null) :
                  node.currentStyle)['position'] == 'absolute';
      });

      return bool;

     },
 

    isEventSupported = (function() {

      var TAGNAMES = {
        'select': 'input', 'change': 'input',
        'submit': 'form', 'reset': 'form',
        'error': 'img', 'load': 'img', 'abort': 'img'
      };

      function isEventSupported( eventName, element ) {

        element = element || document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;

            var isSupported = eventName in element;

        if ( !isSupported ) {
                if ( !element.setAttribute ) {
            element = document.createElement('div');
          }
          if ( element.setAttribute && element.removeAttribute ) {
            element.setAttribute(eventName, '');
            isSupported = is(element[eventName], 'function');

                    if ( !is(element[eventName], 'undefined') ) {
              element[eventName] = undefined;
            }
            element.removeAttribute(eventName);
          }
        }

        element = null;
        return isSupported;
      }
      return isEventSupported;
    })(),


    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
      hasOwnProp = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function (object, property) { 
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }


    if (!Function.prototype.bind) {
      Function.prototype.bind = function bind(that) {

        var target = this;

        if (typeof target != "function") {
            throw new TypeError();
        }

        var args = slice.call(arguments, 1),
            bound = function () {

            if (this instanceof bound) {

              var F = function(){};
              F.prototype = target.prototype;
              var self = new F();

              var result = target.apply(
                  self,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return self;

            } else {

              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );

            }

        };

        return bound;
      };
    }

    function setCss( str ) {
        mStyle.cssText = str;
    }

    function setCssAll( str1, str2 ) {
        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
    }

    function is( obj, type ) {
        return typeof obj === type;
    }

    function contains( str, substr ) {
        return !!~('' + str).indexOf(substr);
    }

    function testProps( props, prefixed ) {
        for ( var i in props ) {
            var prop = props[i];
            if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
                return prefixed == 'pfx' ? prop : true;
            }
        }
        return false;
    }

    function testDOMProps( props, obj, elem ) {
        for ( var i in props ) {
            var item = obj[props[i]];
            if ( item !== undefined) {

                            if (elem === false) return props[i];

                            if (is(item, 'function')){
                                return item.bind(elem || obj);
                }

                            return item;
            }
        }
        return false;
    }

    function testPropsAll( prop, prefixed, elem ) {

        var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
            props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

            if(is(prefixed, "string") || is(prefixed, "undefined")) {
          return testProps(props, prefixed);

            } else {
          props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
          return testDOMProps(props, prefixed, elem);
        }
    }    tests['touch'] = function() {
        var bool;

        if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
          bool = true;
        } else {
          injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''), function( node ) {
            bool = node.offsetTop === 9;
          });
        }

        return bool;
    };
    tests['postmessage'] = function() {
      return !!window.postMessage;
    };
    tests['history'] = function() {
      return !!(window.history && history.pushState);
    };

    tests['multiplebgs'] = function() {
                setCss('background:url(https://),url(https://),red url(https://)');

            return (/(url\s*\(.*?){3}/).test(mStyle.background);
    };    tests['backgroundsize'] = function() {
        return testPropsAll('backgroundSize');
    };

    tests['borderimage'] = function() {
        return testPropsAll('borderImage');
    };



    tests['borderradius'] = function() {
        return testPropsAll('borderRadius');
    };

    tests['boxshadow'] = function() {
        return testPropsAll('boxShadow');
    };



    tests['opacity'] = function() {
                setCssAll('opacity:.55');

                    return (/^0.55$/).test(mStyle.opacity);
    };


    tests['cssanimations'] = function() {
        return testPropsAll('animationName');
    };    tests['cssgradients'] = function() {
        var str1 = 'background-image:',
            str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
            str3 = 'linear-gradient(left top,#9f9, white);';

        setCss(
                       (str1 + '-webkit- '.split(' ').join(str2 + str1) +
                       prefixes.join(str3 + str1)).slice(0, -str1.length)
        );

        return contains(mStyle.backgroundImage, 'gradient');
    };    tests['csstransforms'] = function() {
        return !!testPropsAll('transform');
    };


    tests['csstransforms3d'] = function() {

        var ret = !!testPropsAll('perspective');

                        if ( ret && 'webkitPerspective' in docElement.style ) {

                      injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
            ret = node.offsetLeft === 9 && node.offsetHeight === 3;
          });
        }
        return ret;
    };


    tests['csstransitions'] = function() {
        return testPropsAll('transition');
    };



    tests['fontface'] = function() {
        var bool;

        injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function( node, rule ) {
          var style = document.getElementById('smodernizr'),
              sheet = style.sheet || style.styleSheet,
              cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';

          bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;
        });

        return bool;
    };

    tests['generatedcontent'] = function() {
        var bool;

        injectElementWithStyles(['#',mod,'{font:0/0 a}#',mod,':after{content:"',smile,'";visibility:hidden;font:3px/1 a}'].join(''), function( node ) {
          bool = node.offsetHeight >= 3;
        });

        return bool;
    };
    tests['video'] = function() {
        var elem = document.createElement('video'),
            bool = false;

            try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('video/ogg; codecs="theora"')      .replace(/^no$/,'');

                            bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"') .replace(/^no$/,'');

                bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');
            }

        } catch(e) { }

        return bool;
    };



    tests['localstorage'] = function() {
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };

    tests['sessionstorage'] = function() {
        try {
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };    tests['applicationcache'] = function() {
        return !!window.applicationCache;
    };


    tests['svg'] = function() {
        return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
    };

    tests['inlinesvg'] = function() {
      var div = document.createElement('div');
      div.innerHTML = '<svg/>';
      return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
    };



    tests['svgclippaths'] = function() {
        return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')));
    };

    for ( var feature in tests ) {
        if ( hasOwnProp(tests, feature) ) {
                                    featureName  = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();

            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    }



     Modernizr.addTest = function ( feature, test ) {
       if ( typeof feature == 'object' ) {
         for ( var key in feature ) {
           if ( hasOwnProp( feature, key ) ) {
             Modernizr.addTest( key, feature[ key ] );
           }
         }
       } else {

         feature = feature.toLowerCase();

         if ( Modernizr[feature] !== undefined ) {
                                              return Modernizr;
         }

         test = typeof test == 'function' ? test() : test;

         if (typeof enableClasses !== "undefined" && enableClasses) {
           docElement.className += ' ' + (test ? '' : 'no-') + feature;
         }
         Modernizr[feature] = test;

       }

       return Modernizr; 
     };


    setCss('');
    modElem = inputElem = null;

    ;(function(window, document) {
                var version = '3.7.0';

            var options = window.html5 || {};

            var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

            var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

            var supportsHtml5Styles;

            var expando = '_html5shiv';

            var expanID = 0;

            var expandoData = {};

            var supportsUnknownElements;

        (function() {
          try {
            var a = document.createElement('a');
            a.innerHTML = '<xyz></xyz>';
                    supportsHtml5Styles = ('hidden' in a);

            supportsUnknownElements = a.childNodes.length == 1 || (function() {
                        (document.createElement)('a');
              var frag = document.createDocumentFragment();
              return (
                typeof frag.cloneNode == 'undefined' ||
                typeof frag.createDocumentFragment == 'undefined' ||
                typeof frag.createElement == 'undefined'
              );
            }());
          } catch(e) {
                    supportsHtml5Styles = true;
            supportsUnknownElements = true;
          }

        }());

            function addStyleSheet(ownerDocument, cssText) {
          var p = ownerDocument.createElement('p'),
          parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

          p.innerHTML = 'x<style>' + cssText + '</style>';
          return parent.insertBefore(p.lastChild, parent.firstChild);
        }

            function getElements() {
          var elements = html5.elements;
          return typeof elements == 'string' ? elements.split(' ') : elements;
        }

            function getExpandoData(ownerDocument) {
          var data = expandoData[ownerDocument[expando]];
          if (!data) {
            data = {};
            expanID++;
            ownerDocument[expando] = expanID;
            expandoData[expanID] = data;
          }
          return data;
        }

            function createElement(nodeName, ownerDocument, data){
          if (!ownerDocument) {
            ownerDocument = document;
          }
          if(supportsUnknownElements){
            return ownerDocument.createElement(nodeName);
          }
          if (!data) {
            data = getExpandoData(ownerDocument);
          }
          var node;

          if (data.cache[nodeName]) {
            node = data.cache[nodeName].cloneNode();
          } else if (saveClones.test(nodeName)) {
            node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
          } else {
            node = data.createElem(nodeName);
          }

                                                    return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
        }

            function createDocumentFragment(ownerDocument, data){
          if (!ownerDocument) {
            ownerDocument = document;
          }
          if(supportsUnknownElements){
            return ownerDocument.createDocumentFragment();
          }
          data = data || getExpandoData(ownerDocument);
          var clone = data.frag.cloneNode(),
          i = 0,
          elems = getElements(),
          l = elems.length;
          for(;i<l;i++){
            clone.createElement(elems[i]);
          }
          return clone;
        }

            function shivMethods(ownerDocument, data) {
          if (!data.cache) {
            data.cache = {};
            data.createElem = ownerDocument.createElement;
            data.createFrag = ownerDocument.createDocumentFragment;
            data.frag = data.createFrag();
          }


          ownerDocument.createElement = function(nodeName) {
                    if (!html5.shivMethods) {
              return data.createElem(nodeName);
            }
            return createElement(nodeName, ownerDocument, data);
          };

          ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
                                                          'var n=f.cloneNode(),c=n.createElement;' +
                                                          'h.shivMethods&&(' +
                                                                                                                getElements().join().replace(/[\w\-]+/g, function(nodeName) {
            data.createElem(nodeName);
            data.frag.createElement(nodeName);
            return 'c("' + nodeName + '")';
          }) +
            ');return n}'
                                                         )(html5, data.frag);
        }

            function shivDocument(ownerDocument) {
          if (!ownerDocument) {
            ownerDocument = document;
          }
          var data = getExpandoData(ownerDocument);

          if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
            data.hasCSS = !!addStyleSheet(ownerDocument,
                                                                                'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
                                                                                    'mark{background:#FF0;color:#000}' +
                                                                                    'template{display:none}'
                                         );
          }
          if (!supportsUnknownElements) {
            shivMethods(ownerDocument, data);
          }
          return ownerDocument;
        }

            var html5 = {

                'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',

                'version': version,

                'shivCSS': (options.shivCSS !== false),

                'supportsUnknownElements': supportsUnknownElements,

                'shivMethods': (options.shivMethods !== false),

                'type': 'default',

                'shivDocument': shivDocument,

                createElement: createElement,

                createDocumentFragment: createDocumentFragment
        };

            window.html5 = html5;

            shivDocument(document);

    }(this, document));

    Modernizr._version      = version;

    Modernizr._prefixes     = prefixes;
    Modernizr._domPrefixes  = domPrefixes;
    Modernizr._cssomPrefixes  = cssomPrefixes;

    Modernizr.mq            = testMediaQuery;

    Modernizr.hasEvent      = isEventSupported;

    Modernizr.testProp      = function(prop){
        return testProps([prop]);
    };

    Modernizr.testAllProps  = testPropsAll;


    Modernizr.testStyles    = injectElementWithStyles;    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +

                                                    (enableClasses ? ' js ' + classes.join(' ') : '');

    return Modernizr;

})(this, this.document);

// yepnope.js
// Version - 1.5.4pre
//
// by
// Alex Sexton - @SlexAxton - AlexSexton[at]gmail.com
// Ralph Holzmann - @ralphholzmann - ralphholzmann[at]gmail.com
//
// http://yepnopejs.com/
// https://github.com/SlexAxton/yepnope.js/
//
// Tri-license - WTFPL | MIT | BSD
//
// Please minify before use.
// Also available as Modernizr.load via the Modernizr Project
//
( function ( window, doc, undef ) {

    var docElement            = doc.documentElement,
        sTimeout              = window.setTimeout,
        firstScript           = doc.getElementsByTagName( "script" )[ 0 ],
        toString              = {}.toString,
        execStack             = [],
        started               = 0,
        noop                  = function () {},
    // Before you get mad about browser sniffs, please read:
    // https://github.com/Modernizr/Modernizr/wiki/Undetectables
    // If you have a better solution, we are actively looking to solve the problem
        isGecko               = ( "MozAppearance" in docElement.style ),
        isGeckoLTE18          = isGecko && !! doc.createRange().compareNode,
        insBeforeObj          = isGeckoLTE18 ? docElement : firstScript.parentNode,
    // Thanks to @jdalton for showing us this opera detection (by way of @kangax) (and probably @miketaylr too, or whatever...)
        isOpera               = window.opera && toString.call( window.opera ) == "[object Opera]",
        isIE                  = !! doc.attachEvent && !isOpera,
    // isOlderWebkit fix for #95 - https://github.com/SlexAxton/yepnope.js/issues/95
        isOlderWebkit		  = ( 'webkitAppearance' in docElement.style ) && !( 'async' in doc.createElement('script') ),
        strJsElem             = isGecko ? "object" : (isIE || isOlderWebkit)  ? "script" : "img",
        strCssElem            = isIE ? "script" : (isOlderWebkit) ? "img" : strJsElem,
        isArray               = Array.isArray || function ( obj ) {
            return toString.call( obj ) == "[object Array]";
        },
        isObject              = function ( obj ) {
            return Object(obj) === obj;
        },
        isString              = function ( s ) {
            return typeof s == "string";
        },
        isFunction            = function ( fn ) {
            return toString.call( fn ) == "[object Function]";
        },
        readFirstScript       = function() {
            if (!firstScript || !firstScript.parentNode) {
                firstScript = doc.getElementsByTagName( "script" )[ 0 ];
            }
        },
        globalFilters         = [],
        scriptCache           = {},
        prefixes              = {
            // key value pair timeout options
            timeout : function( resourceObj, prefix_parts ) {
                if ( prefix_parts.length ) {
                    resourceObj['timeout'] = prefix_parts[ 0 ];
                }
                return resourceObj;
            }
        },
        handler,
        yepnope;

    /* Loader helper functions */
    function isFileReady ( readyState ) {
        // Check to see if any of the ways a file can be ready are available as properties on the file's element
        return ( ! readyState || readyState == "loaded" || readyState == "complete" || readyState == "uninitialized" );
    }


    // Takes a preloaded js obj (changes in different browsers) and injects it into the head
    // in the appropriate order
    function injectJs ( src, cb, attrs, timeout, /* internal use */ err, internal ) {

        var script = doc.createElement( "script" ),
            done, i;

        timeout = timeout || yepnope['errorTimeout'];

        script.src = src;

        // Add our extra attributes to the script element
        for ( i in attrs ) {
            script.setAttribute( i, attrs[ i ] );
        }

        cb = internal ? executeStack : ( cb || noop );

        // Bind to load events
        script.onreadystatechange = script.onload = function () {

            if ( ! done && isFileReady( script.readyState ) ) {

                // Set done to prevent this function from being called twice.
                done = 1;
                cb();

                // Handle memory leak in IE
                script.onload = script.onreadystatechange = null;
            }
        };

        // 404 Fallback
        sTimeout(function () {
            if ( ! done ) {
                done = 1;
                // Might as well pass in an error-state if we fire the 404 fallback
                cb(1);
            }
        }, timeout );

        // Inject script into to document
        // or immediately callback if we know there
        // was previously a timeout error
        readFirstScript();
        err ? script.onload() : firstScript.parentNode.insertBefore( script, firstScript );
    }

    // Takes a preloaded css obj (changes in different browsers) and injects it into the head
    function injectCss ( href, cb, attrs, timeout, /* Internal use */ err, internal ) {

        // Create stylesheet link
        var link = doc.createElement( "link" ),
            done, i;

        timeout = timeout || yepnope['errorTimeout'];

        cb = internal ? executeStack : ( cb || noop );

        // Add attributes
        link.href = href;
        link.rel  = "stylesheet";
        link.type = "text/css";

        // Add our extra attributes to the link element
        for ( i in attrs ) {
            link.setAttribute( i, attrs[ i ] );
        }

        if ( ! err ) {
            readFirstScript();
            firstScript.parentNode.insertBefore( link, firstScript );
            sTimeout(cb, 0);
        }
    }

    function executeStack ( ) {
        // shift an element off of the stack
        var i   = execStack.shift();
        started = 1;

        // if a is truthy and the first item in the stack has an src
        if ( i ) {
            // if it's a script, inject it into the head with no type attribute
            if ( i['t'] ) {
                // Inject after a timeout so FF has time to be a jerk about it and
                // not double load (ignore the cache)
                sTimeout( function () {
                    (i['t'] == "c" ?  yepnope['injectCss'] : yepnope['injectJs'])( i['s'], 0, i['a'], i['x'], i['e'], 1 );
                }, 0 );
            }
            // Otherwise, just call the function and potentially run the stack
            else {
                i();
                executeStack();
            }
        }
        else {
            // just reset out of recursive mode
            started = 0;
        }
    }

    function preloadFile ( elem, url, type, splicePoint, dontExec, attrObj, timeout ) {

        timeout = timeout || yepnope['errorTimeout'];

        // Create appropriate element for browser and type
        var preloadElem = doc.createElement( elem ),
            done        = 0,
            firstFlag   = 0,
            stackObject = {
                "t": type,     // type
                "s": url,      // src
                //r: 0,        // ready
                "e": dontExec,// set to true if we don't want to reinject
                "a": attrObj,
                "x": timeout
            };

        // The first time (common-case)
        if ( scriptCache[ url ] === 1 ) {
            firstFlag = 1;
            scriptCache[ url ] = [];
        }

        function onload ( first ) {
            // If the script/css file is loaded
            if ( ! done && isFileReady( preloadElem.readyState ) ) {

                // Set done to prevent this function from being called twice.
                stackObject['r'] = done = 1;

                ! started && executeStack();

                if ( first ) {
                    if ( elem != "img" ) {
                        sTimeout(function(){ insBeforeObj.removeChild( preloadElem ) }, 50);
                    }

                    for ( var i in scriptCache[ url ] ) {
                        if ( scriptCache[ url ].hasOwnProperty( i ) ) {
                            scriptCache[ url ][ i ].onload();
                        }
                    }

                    // Handle memory leak in IE
                    preloadElem.onload = preloadElem.onreadystatechange = null;
                }
            }
        }


        // Setting url to data for objects or src for img/scripts
        if ( elem == "object" ) {
            preloadElem.data = url;

            // Setting the type attribute to stop Firefox complaining about the mimetype when running locally.
            // The type doesn't matter as long as it's real, thus text/css instead of text/javascript.
            preloadElem.setAttribute("type", "text/css");
        } else {
            preloadElem.src = url;

            // Setting bogus script type to allow the script to be cached
            preloadElem.type = elem;
        }

        // Don't let it show up visually
        preloadElem.width = preloadElem.height = "0";

        // Attach handlers for all browsers
        preloadElem.onerror = preloadElem.onload = preloadElem.onreadystatechange = function(){
            onload.call(this, firstFlag);
        };
        // inject the element into the stack depending on if it's
        // in the middle of other scripts or not
        execStack.splice( splicePoint, 0, stackObject );

        // The only place these can't go is in the <head> element, since objects won't load in there
        // so we have two options - insert before the head element (which is hard to assume) - or
        // insertBefore technically takes null/undefined as a second param and it will insert the element into
        // the parent last. We try the head, and it automatically falls back to undefined.
        if ( elem != "img" ) {
            // If it's the first time, or we've already loaded it all the way through
            if ( firstFlag || scriptCache[ url ] === 2 ) {
                readFirstScript();
                insBeforeObj.insertBefore( preloadElem, isGeckoLTE18 ? null : firstScript );

                // If something fails, and onerror doesn't fire,
                // continue after a timeout.
                sTimeout( onload, timeout );
            }
            else {
                // instead of injecting, just hold on to it
                scriptCache[ url ].push( preloadElem );
            }
        }
    }

    function load ( resource, type, dontExec, attrObj, timeout ) {
        // If this method gets hit multiple times, we should flag
        // that the execution of other threads should halt.
        started = 0;

        // We'll do 'j' for js and 'c' for css, yay for unreadable minification tactics
        type = type || "j";
        if ( isString( resource ) ) {
            // if the resource passed in here is a string, preload the file
            preloadFile( type == "c" ? strCssElem : strJsElem, resource, type, this['i']++, dontExec, attrObj, timeout );
        } else {
            // Otherwise it's a callback function and we can splice it into the stack to run
            execStack.splice( this['i']++, 0, resource );
            execStack.length == 1 && executeStack();
        }

        // OMG is this jQueries? For chaining...
        return this;
    }

    // return the yepnope object with a fresh loader attached
    function getYepnope () {
        var y = yepnope;
        y['loader'] = {
            "load": load,
            "i" : 0
        };
        return y;
    }

    /* End loader helper functions */
    // Yepnope Function
    yepnope = function ( needs ) {

        var i,
            need,
        // start the chain as a plain instance
            chain = this['yepnope']['loader'];

        function satisfyPrefixes ( url ) {
            // split all prefixes out
            var parts   = url.split( "!" ),
                gLen    = globalFilters.length,
                origUrl = parts.pop(),
                pLen    = parts.length,
                res     = {
                    "url"      : origUrl,
                    // keep this one static for callback variable consistency
                    "origUrl"  : origUrl,
                    "prefixes" : parts
                },
                mFunc,
                j,
                prefix_parts;

            // loop through prefixes
            // if there are none, this automatically gets skipped
            for ( j = 0; j < pLen; j++ ) {
                prefix_parts = parts[ j ].split( '=' );
                mFunc = prefixes[ prefix_parts.shift() ];
                if ( mFunc ) {
                    res = mFunc( res, prefix_parts );
                }
            }

            // Go through our global filters
            for ( j = 0; j < gLen; j++ ) {
                res = globalFilters[ j ]( res );
            }

            // return the final url
            return res;
        }

        function getExtension ( url ) {
            //The extension is always the last characters before the ? and after a period.
            //The previous method was not accounting for the possibility of a period in the query string.
            var b = url.split('?')[0];
            return b.substr(b.lastIndexOf('.')+1);
        }

        function loadScriptOrStyle ( input, callback, chain, index, testResult ) {
            // run through our set of prefixes
            var resource     = satisfyPrefixes( input ),
                autoCallback = resource['autoCallback'],
                extension    = getExtension( resource['url'] );

            // if no object is returned or the url is empty/0 just exit the load
            if ( resource['bypass'] ) {
                return;
            }

            // Determine callback, if any
            if ( callback ) {
                callback = isFunction( callback ) ?
                    callback :
                    callback[ input ] ||
                        callback[ index ] ||
                        callback[ ( input.split( "/" ).pop().split( "?" )[ 0 ] ) ];
            }

            // if someone is overriding all normal functionality
            if ( resource['instead'] ) {
                return resource['instead']( input, callback, chain, index, testResult );
            }
            else {
                // Handle if we've already had this url and it's completed loaded already
                if ( scriptCache[ resource['url'] ] && resource['reexecute'] !== true) {
                    // don't let this execute again
                    resource['noexec'] = true;
                }
                else {
                    scriptCache[ resource['url'] ] = 1;
                }

                // Throw this into the queue
                input && chain.load( resource['url'], ( ( resource['forceCSS'] || ( ! resource['forceJS'] && "css" == getExtension( resource['url'] ) ) ) ) ? "c" : undef, resource['noexec'], resource['attrs'], resource['timeout'] );

                // If we have a callback, we'll start the chain over
                if ( isFunction( callback ) || isFunction( autoCallback ) ) {
                    // Call getJS with our current stack of things
                    chain['load']( function () {
                        // Hijack yepnope and restart index counter
                        getYepnope();
                        // Call our callbacks with this set of data
                        callback && callback( resource['origUrl'], testResult, index );
                        autoCallback && autoCallback( resource['origUrl'], testResult, index );

                        // Override this to just a boolean positive
                        scriptCache[ resource['url'] ] = 2;
                    } );
                }
            }
        }

        function loadFromTestObject ( testObject, chain ) {
            var testResult = !! testObject['test'],
                group      = testResult ? testObject['yep'] : testObject['nope'],
                always     = testObject['load'] || testObject['both'],
                callback   = testObject['callback'] || noop,
                cbRef      = callback,
                complete   = testObject['complete'] || noop,
                needGroupSize,
                callbackKey;

            // Reusable function for dealing with the different input types
            // NOTE:: relies on closures to keep 'chain' up to date, a bit confusing, but
            // much smaller than the functional equivalent in this case.
            function handleGroup ( needGroup, moreToCome ) {
                if ( '' !== needGroup && ! needGroup ) {
                    // Call the complete callback when there's nothing to load.
                    ! moreToCome && complete();
                }
                // If it's a string
                else if ( isString( needGroup ) ) {
                    // if it's a string, it's the last
                    if ( !moreToCome ) {
                        // Add in the complete callback to go at the end
                        callback = function () {
                            var args = [].slice.call( arguments );
                            cbRef.apply( this, args );
                            complete();
                        };
                    }
                    // Just load the script of style
                    loadScriptOrStyle( needGroup, callback, chain, 0, testResult );
                }
                // See if we have an object. Doesn't matter if it's an array or a key/val hash
                // Note:: order cannot be guaranteed on an key value object with multiple elements
                // since the for-in does not preserve order. Arrays _should_ go in order though.
                else if ( isObject( needGroup ) ) {
                    // I hate this, but idk another way for objects.
                    needGroupSize = (function(){
                        var count = 0, i
                        for (i in needGroup ) {
                            if ( needGroup.hasOwnProperty( i ) ) {
                                count++;
                            }
                        }
                        return count;
                    })();

                    for ( callbackKey in needGroup ) {
                        // Safari 2 does not have hasOwnProperty, but not worth the bytes for a shim
                        // patch if needed. Kangax has a nice shim for it. Or just remove the check
                        // and promise not to extend the object prototype.
                        if ( needGroup.hasOwnProperty( callbackKey ) ) {
                            // Find the last added resource, and append to it's callback.
                            if ( ! moreToCome && ! ( --needGroupSize ) ) {
                                // If this is an object full of callbacks
                                if ( ! isFunction( callback ) ) {
                                    // Add in the complete callback to go at the end
                                    callback[ callbackKey ] = (function( innerCb ) {
                                        return function () {
                                            var args = [].slice.call( arguments );
                                            innerCb && innerCb.apply( this, args );
                                            complete();
                                        };
                                    })( cbRef[ callbackKey ] );
                                }
                                // If this is just a single callback
                                else {
                                    callback = function () {
                                        var args = [].slice.call( arguments );
                                        cbRef.apply( this, args );
                                        complete();
                                    };
                                }
                            }
                            loadScriptOrStyle( needGroup[ callbackKey ], callback, chain, callbackKey, testResult );
                        }
                    }
                }
            }

            // figure out what this group should do
            handleGroup( group, !!always || !!testObject['complete']);

            // Run our loader on the load/both group too
            // the always stuff always loads second.
            always && handleGroup( always );

            // If complete callback is used without loading anything
            !always && !!testObject['complete'] && handleGroup('');

        }

        // Someone just decides to load a single script or css file as a string
        if ( isString( needs ) ) {
            loadScriptOrStyle( needs, 0, chain, 0 );
        }
        // Normal case is likely an array of different types of loading options
        else if ( isArray( needs ) ) {
            // go through the list of needs
            for( i = 0; i < needs.length; i++ ) {
                need = needs[ i ];

                // if it's a string, just load it
                if ( isString( need ) ) {
                    loadScriptOrStyle( need, 0, chain, 0 );
                }
                // if it's an array, call our function recursively
                else if ( isArray( need ) ) {
                    yepnope( need );
                }
                // if it's an object, use our modernizr logic to win
                else if ( isObject( need ) ) {
                    loadFromTestObject( need, chain );
                }
            }
        }
        // Allow a single object to be passed in
        else if ( isObject( needs ) ) {
            loadFromTestObject( needs, chain );
        }
    };

    // This publicly exposed function is for allowing
    // you to add functionality based on prefixes on the
    // string files you add. 'css!' is a builtin prefix
    //
    // The arguments are the prefix (not including the !) as a string
    // and
    // A callback function. This function is passed a resource object
    // that can be manipulated and then returned. (like middleware. har.)
    //
    // Examples of this can be seen in the officially supported ie prefix
    yepnope['addPrefix'] = function ( prefix, callback ) {
        prefixes[ prefix ] = callback;
    };

    // A filter is a global function that every resource
    // object that passes through yepnope will see. You can
    // of course conditionally choose to modify the resource objects
    // or just pass them along. The filter function takes the resource
    // object and is expected to return one.
    //
    // The best example of a filter is the 'autoprotocol' officially
    // supported filter
    yepnope['addFilter'] = function ( filter ) {
        globalFilters.push( filter );
    };

    // Default error timeout to 10sec - modify to alter
    yepnope['errorTimeout'] = 1e4;

    // Webreflection readystate hack
    // safe for jQuery 1.4+ ( i.e. don't use yepnope with jQuery 1.3.2 )
    // if the readyState is null and we have a listener
    if ( doc.readyState == null && doc.addEventListener ) {
        // set the ready state to loading
        doc.readyState = "loading";
        // call the listener
        doc.addEventListener( "DOMContentLoaded", handler = function () {
            // Remove the listener
            doc.removeEventListener( "DOMContentLoaded", handler, 0 );
            // Set it to ready
            doc.readyState = "complete";
        }, 0 );
    }

    // Attach loader &
    // Leak it
    window['yepnope'] = getYepnope();

    // Exposing executeStack to better facilitate plugins
    window['yepnope']['executeStack'] = executeStack;
    window['yepnope']['injectJs'] = injectJs;
    window['yepnope']['injectCss'] = injectCss;

})( this, document );

Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0));};
// https://github.com/Modernizr/Modernizr/issues/615
// documentMode is needed for false positives in oldIE, please see issue above
Modernizr.addTest('cssfilters', function() {
    var el = document.createElement('div');
    el.style.cssText = Modernizr._prefixes.join('filter' + ':blur(2px); ');
    return !!el.style.length && ((document.documentMode === undefined || document.documentMode > 9));
});// this tests passes for webkit's proprietary `-webkit-mask` feature
//   www.webkit.org/blog/181/css-masks/
//   developer.apple.com/library/safari/#documentation/InternetWeb/Conceptual/SafariVisualEffectsProgGuide/Masks/Masks.html

// it does not pass mozilla's implementation of `mask` for SVG

//   developer.mozilla.org/en/CSS/mask
//   developer.mozilla.org/En/Applying_SVG_effects_to_HTML_content

// Can combine with clippaths for awesomeness: http://generic.cx/for/webkit/test.html

Modernizr.addTest('cssmask', Modernizr.testAllProps('maskRepeat'));

// Adding a simple namespace function to Modernizr as a convenience (for now)
//Convenience method to build namespaced objects or reuse existing object/namespaces
Modernizr.namespace = function namespace(namespaceString) {
    console.log(namespaceString);
    var parts = namespaceString.split('.'),
        parent = window,
        currentPart = '';

    for(var i = 0, length = parts.length; i < length; i++) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
    }

    return parent;
};

/**
 * JSONfn - javascript plugin to stringify, parse and clone objects with methods.
 *
 * Version - 0.4.00.beta
 * Copyright (c) 2012 - 2013 Vadim Kiryukhin
 * vkiryukhin @ gmail.com
 * http://www.eslinstructor.net/jsonfn/
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 *   USAGE:
 *
 *        JSONfn.stringify(obj);
 *        JSONfn.parse(str[, date2obj]);
 *		 JSONfn.clone(obj[, date2obj]);
 *
 *        @obj      -  Object;
 *		 @str      -  String, which is returned by JSONfn.stringify() function;
 *		 @date2obj - Boolean (optional); if true (or evaluates to true), date string in ISO8061 format
 *					 is converted into a Date object; therwise, it is left as a String.
 */

// Create a JSONfn object only if it does not already exist.

var NSfn;
if (!NSfn) {
    NSfn = {};
}

// Create methods in a closure to avoid creating global variables.

(function () {

    NSfn.namespace = function(namespaceString){
        console.log("namespace",namespaceString);
        var parts = namespaceString.split('.'),
            parent = window,
            currentPart = '';

        for(var i = 0, length = parts.length; i < length; i++) {
            currentPart = parts[i];
            parent[currentPart] = parent[currentPart] || {};
            parent = parent[currentPart];
        }

        return parent;
    };


}());