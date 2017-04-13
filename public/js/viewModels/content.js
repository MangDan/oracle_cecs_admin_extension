/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */




define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtree', 'ojs/ojcheckboxset', 'ojs/ojbutton', 'ojs/ojtoolbar', 'ojs/ojmenu', 'ojs/ojcollapsible', 'ojs/ojdialog', 'ojs/ojprogressbar', 'ojs/ojinputnumber', 'ojs/ojnavigationlist', 'ojs/ojswitch', 'promise', 'ojs/ojlistview', 'ojs/ojinputtext', 'ojs/ojinputnumber', 'ojs/ojradioset', 'ojs/ojcheckboxset', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtrain'],
        function (oj, ko, $) {
            function ContentViewModel() {
                var self = this;
                // var contentRouter = undefined;
                // Below are a subset of the ViewModel methods invoked by the ojModule binding
                // Please reference the ojModule jsDoc for additionaly available methods.

                /**
                 * Optional ViewModel method invoked when this ViewModel is about to be
                 * used for the View transition.  The application can put data fetch logic
                 * here that can return a Promise which will delay the handleAttached function
                 * call below until the Promise is resolved.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
                 * the promise is resolved
                 */
                self.handleActivated = function (info) {
                    // Now that the router for this view exist, synchronise it with the URL
                    return oj.Router.sync().
                    then(
                       null,
                       function(error) {
                          oj.Logger.error('Error during refresh: ' + error.message);
                       }
                    );
                };

                /**
                 * Optional ViewModel method invoked after the View is inserted into the
                 * document DOM.  The application can put logic that requires the DOM being
                 * attached here.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
                 */
                self.handleAttached = function (info) {
                    // Implement if needed
                };

                /**
                 * Optional ViewModel method invoked after the bindings are applied on this View. 
                 * If the current View is retrieved from cache, the bindings will not be re-applied
                 * and this callback will not be invoked.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 */
                self.handleBindingsApplied = function (info) {
                    // Implement if needed
                };

                /*
                 * Optional ViewModel method invoked after the View is removed from the
                 * document DOM.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
                 */
                self.handleDetached = function (info) {
                    // Implement if needed
                };
                
                this.dispose = function()
                {
                  // Every router is destroyed on dispose.
                  self.contentRouter.dispose();
                };
    
                var rootRouter = oj.Router.rootInstance;
                //var parentRouter = data.valueAccessor().params['ojRouter']['parentRouter'];
                self.contentRouter = rootRouter.createChildRouter('childmenu').configure({
                    'home': {
                        label: 'Home',
                        value: 'contents-modules/home',
                        isDefault: true
                    },
                    'imageupload': {
                        label: 'Image Upload',
                        value: 'contents-modules/imageupload'
                    },
                    'share': {
                        label: 'Share',
                        value: 'contents-modules/share'
                    }
                });

                // Navigation setup
                var navData = [
                    {  
                        name: 'Home', 
                        id: 'home',
                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-home-icon-24'
                    },
                    {  
                        name: 'Image Upload', 
                        id: 'imageupload',
                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-signout-icon-24'
                    },
                    {  
                        name: 'Share', 
                        id: 'share',
                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'
                    }
                ];
                
                self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});
                
                //oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();
                
                self.moduleConfig = ko.pureComputed(function() {
                    return this.contentRouter.moduleConfig;
                }, this);
                
                // Navigation
                //self.selectedMenu = ko.observable("contentUpload");
                //self.selectedContent = ko.observable("");
                var lgQuery = oj.ResponsiveUtils.getFrameworkQuery(
                        oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_UP);
                self.large = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(lgQuery);
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new ContentViewModel();
        }
);
