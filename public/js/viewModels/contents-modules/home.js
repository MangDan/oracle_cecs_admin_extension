/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery'],
        function (oj, ko, $) {

            function AboutViewModel() {
                var self = this;
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
                    // Implement if needed
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
                //User can not be authorized. provide login detail
                self.validateMsg1 = ko.observable();
                self.validateMsg2 = ko.observable();
                self.validateMsg3 = ko.observable();
                self.validateMsg4 = ko.observable();
                
                self.serverURL = ko.observable(sessionStorage.getItem("serverURL"));
                self.username = ko.observable(sessionStorage.getItem("username"));
                self.password = ko.observable(sessionStorage.getItem("password"));
                self.authInfo = ko.pureComputed(function() {
                    if((self.username() !== null && self.username() !== '') && (self.password() !== null && self.password() !== '')) {
                        return "Basic " + btoa(self.username() + ":" + self.password());
                    } else {
                        return null;
                    }
                });
                
                self.settings_message = ko.pureComputed(function() {
                    console.log("settings_message");
                    console.log(self.serverURL());
                    console.log(self.authInfo());
                    if((self.serverURL() !== '' && self.serverURL() !== null) && self.authInfo() !== '' && self.authInfo() !== null) {
                        return "Settings are stored in the session storage.";
                    } else {
                        return "Require url and login detail";
                    }
                });
                
                this.connectionSubmit = function (data, event) {
                    
                    if (typeof (Storage) !== "undefined") {
                        sessionStorage.clear();
                        
                        if(this.serverURL() !== null && this.serverURL() !== '')
                            sessionStorage.setItem("serverURL", this.serverURL());
                        else
                            this.validateMsg1([{summary: 'Value is required.', detail: 'You must enter CECS URL value.', severity: oj.Message.SEVERITY_TYPE['ERROR']}]);
                            
                        if(this.username() !== null && this.username() !== '')
                            sessionStorage.setItem("username", this.username());
                        else
                            this.validateMsg2([{summary: 'Value is required.', detail: 'You must enter username value.', severity: oj.Message.SEVERITY_TYPE['ERROR']}]);
                            
                        if(this.password() !== null && this.password() !== '')
                            sessionStorage.setItem("password", this.password());
                        else
                            this.validateMsg3([{summary: 'Value is required.', detail: 'You must enter password value.', severity: oj.Message.SEVERITY_TYPE['ERROR']}]);
                            
                        if(this.authInfo() !== null && this.authInfo() !== '')
                            sessionStorage.setItem("authInfo", this.authInfo());
                        else
                            this.validateMsg4([{summary: 'Value is required.', detail: 'You must enter token value.', severity: oj.Message.SEVERITY_TYPE['ERROR']}]);
                        
                        console.log(sessionStorage);
                    } else {
                       console.log("Sorry! No Web Storage support..");
                    }
                };
                

            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new AboutViewModel();
        }
);
