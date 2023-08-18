const testLibs = function () {
    console.log( "jQuery.js => " , jQuery);
    console.log( "Vue.js => " , Vue);
    console.log( "Cookies.js => " , Cookies);
    console.log( "Store.js => " , store);
    console.log( "Underscore.js => " , _);
}

;(function ($, Vue , window , document) {

    window.COMPONENT_REGISTERED = [];
    window.COMPONENT_STYLE_ID   = 'j-style-component';

    const initStyle = function () {
        $("body").after(`
            <style id="${window.COMPONENT_STYLE_ID}"></style>
        `);
        
        $("head").append(`
            <style>
            .j-component, [data-template] { display:none; }
            .no-div { margin:0;padding:0; }
            </style>
        `);
    }

    const requiredLibs =  function() {
        // set required libraries
        const required = ["Cookies","store","_","jQuery","Vue"];

        // throw error when required libs is not found
        // first thing first, we need to verify does vue js is loaded
        required.forEach(function (item) {
            if ( typeof(window[item]) === 'undefined' ) {
                throw new Error( item + " is required for this libraries");
            } 
        });
    }

    const uuidCrypto = function () {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 42).toString(16)
        );
    }

    const randomId = function (length) {
        return Math.random().toString(36).substring(2, length+2);
    }

    const randomDateNow = function () {
        return Date.now();
    }

    // when one of the required libraries is not found then don't return  
    requiredLibs();
    initStyle();

    // ====================== START FOR JVUE INIT ===============================

    // here is the initial combine jquery and vue js 
    var pluginName = 'App',
        defaultOptions = {
            id        : false ,
            props     : [] , 
            data      : function() { return{} } , 
            mount     : function() {},
            mounted   : function() {} , 
            create    : function() {} , 
            created   : function() {} , 
            update    : function() {} , 
            updated   : function() {} ,
            destroy   : function() {} , 
            destroyed : function() {} ,
            methods   : {} , 
            watch     : {} 
        };

    // call the jquery vue js 
    var jqVue = function (options) {
        this.options  = $.extend(defaultOptions , options);
        this.randomId = randomDateNow();
    }

    jqVue.prototype = {

        /**
         * Set the element 
         */
        setElement : function () {

            // element property must be string and id not class 
            if ( typeof(this.options.id) !== 'string'
                && false !== this.options.id ) {
                throw new Error("The element propertyshould be string.");
            }

            // set the element of id 
            this.id = "#" + this.options.id;

            // set the body id 
            if ( false === this.options.id ) this.setBodyID();
        },

        // set the id name as body 
        setBodyID : function () {
            // set the element of id 
            this.uuid = "elm_" + this.randomId;

            $("body").wrapInner(
                `<div id="${this.uuid}"></div>`
            );

            // set the ID 
            this.id = "#" + this.uuid;
        },

        // injecting the default style
        setTheStyles : function () {
            $("head").append(`
                <style>
                    ${this.id} { margin: 0 !important; padding:0 !important; }
                </style>
            `);
        },

        // init vue peroperties 
        __initVueProperties : function () {
            let self    = this;
            let options = this.options;

            var prepare = {
                el              : self.id , 
                props           : options.props , 
                data            : options.data , 
                beforeMount     : options.mount , 
                mounted         : options.mounted , 
                beforeCreate    : options.create , 
                created         : options.created , 
                beforeUpdate    : options.update , 
                updated         : options.updated , 
                beforeDestroy   : options.destroy , 
                destroyed       : options.destroyed , 
                methods         : options.methods , 
                watch           : options.watch
            };

            return prepare;
        },

        // find selector first and start!s
        __findAndStart : function () {
            this.trying = 0;
            
            var findOut = setInterval(function () {
                var selector = $(this.id);
                if ( selector.length === 1 ) {
                    this.__startToDefineVue();
                    clearTimeout(findOut);
                }
                if ( this.trying >= 2 ) {
                    clearInterval(findOut);
                }
                this.trying += 1;
            }.bind(this) , 200);

        },

        // define vue js 
        __startToDefineVue : function () {
            this.vue = new Vue(this.prepare);
        }, 

        __init__ : function () {
            // set the element body with id="body"
            this.setTheStyles();
            this.setElement();

            // set the preparation
            this.prepare = this.__initVueProperties();

            // start to define in this function 
            this.__findAndStart();
        },

        // set the callback return after call 
        callbackReturn : function () {
            let self = this;

            return {
                getInstance : function () {
                    return self.vue;
                },

                debug : function () {
                    testLibs();
                    console.log( "Vue Prepare => " , self.prepare);
                }
            }
        }
    }   

    $[pluginName] = function (options) {
        var start = new jqVue(options);
        start.__init__();

        return start.callbackReturn();
    }

    // ====================== END FOR JVUE INIT ===============================
    

    // ====================== START FOR JVUE INIT ===============================

    var pluginNameComponent = "registerComponent";

    // set the default options component
    const defaultOptionsComponent = function () {
        return {
            name      : '',
            props     : [] , 
            data      : {} , 
            setup     : function() {},
            mount     : function() {},
            mounted   : function() {} , 
            create    : function() {} , 
            created   : function() {} , 
            update    : function() {} , 
            updated   : function() {} ,
            destroy   : function() {} , 
            destroyed : function() {} ,
            methods   : {} , 
            computed  : {} , 
            watch     : {} ,
            templateName : '' , 
            template  : `` , // html 
            style     : `` // html
        };
    }

    // define for the starter 
    var jqVueComponent = function (options) {
        // console.log( "Beforeextend" , options);
        // console.log( "DefaultOptions" , defaultOptionsComponent());
        // console.log( "Afterextend" , this.options);

        this.options = _.extend(defaultOptionsComponent(),options);
    }

    // set the function to the class
    jqVueComponent.prototype = {

        // validate the component name 
        __validateComponentName : function () {
            // alert(1);
            var name  = this.options.name;

            // set component name as global 
            this.componentName = '';

            if ( typeof(name) !== 'string' ) {
                throw new Error("Component name should be string");
            }

            if ( typeof(name) === 'string' 
                && name.length < 1 ) {
                throw new Error("Component name cannot be empty");
            }

            if ( typeof(name) === 'string' 
                && name.length > 0 ) {
                this.componentName = name;
            }

            var doesExists = window.COMPONENT_REGISTERED.includes(name);
            if ( doesExists === true ) {
                throw new Error("Component " + name + " is already registered.");
            }

            // set global component registered
            window.COMPONENT_REGISTERED.push(name);
        },
        
        // define vue js 
        __startToDefineVue : function () {
            // set the template and handling the template 
            this.__setTemplate();
            this.__setMethods();
            this.__setData(); // set the data

            this.prepare = this.__initVueProperties();
            this.component = Vue.component(this.componentName , this.prepare);
        }, 

        /**
         * Push the style 
         */
        __pushStyles : function () {
            var id = window.COMPONENT_STYLE_ID;
            $("#" + id).append(this.options.style);
        },

        __setTemplate : function () {

            function __wrapTemplate( template ) {
                return `<div :id="_uuid" class="no-div" v-if="isComponentCreated_">
                    ${template}
                </div>`;
            }

            // Priority to get template is from templateName property
            // Validate if template name is not empty and the element is found 

            // console.log(this.options);
            var htmlContent        = '';
            var isValidTemplate    = false; // ?
            var templateLength     = (typeof(this.options.template)) === 'string' ? this.options.template.length : 0;
            var templateNameLength = (typeof(this.options.templateName)) === 'string' ? this.options.templateName.length : 0;

            // console.log("template " + this.componentName + " => " , this.options.template);
            // console.log( "templateName "  + this.componentName + " => " , this.options.templateName);
            // console.log( `${this.componentName} => ` , templateLength);
            // console.log(`${this.componentName} => ` , templateNameLength);

            if ( templateNameLength > 0  ) {
                var templateName      = this.options.templateName;
                var $templateElement  = $(`[data-template='${templateName}']`);
                
                if ( $templateElement.length > 0 ) {
                    htmlContent   = $templateElement.html();

                    var templateContentLength = (typeof(htmlContent)) === 'string' ? htmlContent.length : 0;
                    isValidTemplate = (templateContentLength > 0);

                    $templateElement.remove();
                }
            }

            // if template name is valid 
            if ( isValidTemplate === true ) {
                this.options.template = __wrapTemplate(htmlContent);
            } else {
                // set default template
                this.options.template = __wrapTemplate(this.options.template);
            }
        },

        // set the methods
        __setMethods : function () {
            this.methods = this.options.methods;
            if ( typeof(this.options.methods) === 'function' ) {
                this.methods = this.options.methods.apply();
            }
        },

        // set the computed 
        __setComputed : function () {
            this.computed = this.options.computed;
            if ( typeof(this.options.computed) === 'function' ) {
                this.computed = this.options.computed.apply();
            }
        },

        // set fetch the data 
        __defaultData : function () {
            return {
                isComponentCreated_ : false ,
                _uuid     : ''
            };
        },
        
        // set the data
        __setData : function () {
            let optionData = this.options.data;

            var data = {};
            if ( typeof( optionData ) === 'function' ) {
                data = optionData.apply();
                if ( typeof(data) === 'object' ) {
                    optionData = data;
                }
            }

            data = $.extend(this.__defaultData() , optionData);
            this.data = function () {
                return data;
            }
        },

        // init vue peroperties 
        __initVueProperties : function () {
            let self    = this;
            let options = this.options;

            // when element is created
            const whenCreated = function () {
                if ( typeof(options.created) === 'function' ) {
                    options.created.apply(this);
                }

                this._uuid = "jqvid-" + randomId(10);
                this.$nextTick(function () {
                    this.isComponentCreated_ = true;
                });
            }

            var prepare = {
                props           : options.props , 
                data            : self.data , 
                beforeMount     : options.mount , 
                mounted         : options.mounted , 
                setup           : options.setup,
                beforeCreate    : options.create , 
                created         : whenCreated , 
                beforeUpdate    : options.update , 
                updated         : options.updated , 
                beforeDestroy   : options.destroy , 
                destroyed       : options.destroyed , 
                methods         : self.methods , 
                watch           : options.watch , 
                template        : options.template,
                computed        : self.computed
            };

            return prepare;
        },

        __reset__ : function () {
            this.options = defaultOptionsComponent;
        },

        __init__ : function () {
            this.__validateComponentName(); // 1
            this.__pushStyles();
            this.__startToDefineVue();
            this.__reset__();
        },

        // set the callback return after call 
        callbackReturn : function () {
            let self = this;

            return {
                getInstance : function () {
                    return self.component;
                },

                debug : function () {
                    testLibs();
                    console.log( "Vue Prepare => " , self.prepare);
                }
            }
        }

    }

    // init for vue components
    const initVueComponents = function (options) {
        // start the components 
        var start = new jqVueComponent(options);
        start.__init__();
        let result = start.callbackReturn();
        return result;
    }

    $[pluginNameComponent]     = initVueComponents;

    // ================= END FOR COMPONENTS =====================

    

})(jQuery, Vue, window , document);