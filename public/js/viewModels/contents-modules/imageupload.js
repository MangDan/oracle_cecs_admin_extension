/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */




define(['ojs/ojcore', 'knockout', 'jquery'],
        function (oj, ko, $) {
            function ContentUploadViewModel() {
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
                
                self.treeOptionChange = function (event, ui) {
                    if (ui.option === "selection") {
                        // show selected nodes
                        //var folderId = _arrayToStr(ui.value);
                        //var folderName = ui.value[0].textContent.trim();
                        //$("#result_content").html("<label> id = " + folderId + "</label>");
                        //$("#jsonInputParameters").val("{\"parentID\":\"" + folderId + "\",\"duplicateResolution\":\"TimeStampSuffix\"}");
                        //$("#contentFolderName").text($("#tree").ojTree("getText", ui.value));
                    }
                };
                
                self.treeExpand = function(event, ui) {
                    console.log("treeExpand...");
                };
                
                self.getHeaders = function () {
                    var headers = {'Authorization': sessionStorage.getItem("authInfo")};

                    return headers;
                };

                self.loadNode = function (node)
                {
                    if (node === -1) {
                        // Requesting node data for Tree.
                        //return "cookbook/dataCollections/tree/treeLazyLoadAjax/json/root.json" ;
                        return sessionStorage.getItem("serverURL") + "/documents/api/1.1/folders/items";
                    } else {
                        // Requesting node data for a particular node
                        //return "cookbook/dataCollections/tree/treeLazyLoadAjax/json/" + node.attr("id") + ".json";
                        return sessionStorage.getItem("serverURL") + "/documents/api/1.1/folders/" + node.attr("id") + "/items";
                    }
                };

                self.loadSuccess = function (data, status, obj)
                {
                    return convertData(data);
                    // Data successfully retrieved.  Can optionally transform
                    // it and return it here if required.
                };

                self.loadError = function (reason, feedback, obj)
                {
                    console.log(reason);
                    console.log(feedback);
                    console.log(obj);
                    
                    $("#tree").html("<div class=\"oj-messaging-inline-container\" id=\"ui-id-31\" aria-live=\"polite\"><div class=\"oj-message oj-message-error\"><span class=\"oj-component-icon oj-message-status-icon oj-message-error-icon\" title=\"Error\" role=\"img\"></span><span class=\"oj-message-content\"><div class=\"oj-message-summary\">Ajax error:</div><div class=\"oj-message-detail\"><span>Please check CECS service configuration.</span></div></span></div></div>");
                    //return "Ajax error.  Look at reason and feedback.message";
                };
                
                self.selectFolderContextMenu = function(event, ui)
                {
                   self.menuId = ui.item.attr("id") ;     //  get menu id
                   console.log("menu id=" + self.menuId +"  node id=" + self.nodeId);
                   
                   if(self.menuId === 'createFolderMenu')
                        openCreateFolderDialog();
                    else if(self.menuId === 'deleteContentMenu')
                        openDeleteContentDialog();
                    else if(self.menuId === 'uploadContentMenu')
                        openUploadDialog();
                    else return;
                };

                self.setNode = function(id)
                {
                  self.nodeId = id ;
                };
                
                self.setActiveContextNode = function(event, ui) {
                    self.setNode(ui.item[0].id) ;
                };
        
                function openUploadDialog (data, event){
                    var dialog_message = "";
                    var fileName = $("#fileName").text();
                    var fileSize = $("#fileSize").text();
                    //var folderName = $("#contentFolderName").text();

                    if (fileName === '') {
                        dialog_message = "Please select an image";
                        $("#uploadButton").ojButton({"disabled": true});
                    } else {
                        
                        //Do you want to upload the aaa file to aaa?
                        dialog_message = "Do you want to upload " + fileName + "(" + fileSize + ") image to Content Cloud";
                        $("#uploadButton").ojButton({"disabled": false});
                    }

                    $("#dialog_message").text(dialog_message);
                    $("#dialog_upload").ojDialog("open");
                };
                
                self.clickUploadBtn = function(data, event){
                    //this.disabled = true;
                    $("#uploadButton").ojButton({"disabled": true});
                    var m_title = $("#m_title").val();
                    var m_keyword = $("#m_keyword").val();
                    var m_security = $("#m_security").val();

                    $("#metadataValues").val("{\"collection\":\"Imaging_Metadata\",\"01_Title\":\"" + m_title + "\",\"02_Security\":\"" + m_security + "\",\"03_Keyword\":\"" + m_keyword + "\"}");
                    content_upload();
                };
                
                self.clickCancelBtn = function(data, event){
                    $("#dialog_upload").ojDialog("close");
                };
                
                self.clickCreateFolderBtn = function(data, event) {
                    createFolder(self.nodeId);
                };
                
                self.clickCancelCreateFolderBtn  = function(data, event) {
                    $("#dialog_create_folder").ojDialog("close");
                };
                
                self.clickDeleteContentBtn = function(data, event) {
                    deleteContent(self.nodeId);
                };
                
                self.clickCancelDeleteContentBtn  = function(data, event) {
                    $("#dialog_delete_content").ojDialog("close");
                };
                
                self.createFolderName = ko.observable();
                
                self.changePrimaryFile = function(data, event) {
                    //ko.utils.arrayForEach(event.target.files,  function(file) {
                    //});
                    
                    readURL(event.target);
                    //console.log(this.files[0]);

                    var fileName = event.target.files[0].name;
                    var fileSize = event.target.files[0].size;

                    $("#fileName").text(fileName);
                    $("#fileSize").text(fileSize);

                    $("#preview_initial_message").css('display', 'none');
                    $("#preview").css('display', '');
                };
                
                self.toolbarClassNames = ko.observableArray([]);

                self.toolbarClasses = ko.computed(function () {
                    return this.toolbarClassNames().join(" ");
                }, this);

                self.menuItemSelect = function (event, ui) {
                    //self.selectedMenuItem(ui.item.children("a").text());
                    console.log(ui.item.children("a").text());

                    if (ui.item.children("a").text() == 'Open') {
                        $("input:file").click();
                    } else if (ui.item.children("a").text() == 'Reload Whole Content Cloud Node') {
                        $("#tree").ojTree("refresh", "-1");
                    }
                };
                
                //application/msword
                //application/mspowerpoint
                self.getTypes = function () {
                    return {
                        "types": {
                            "empFolder": {
                                "image": "../../css/libs/oj/v2.3.0/alta/images/hier_folderclose_16_mono.png"
                            },
                            "image/jpeg": {
                                "image": "../../images/springBoard/nodetypes.png",
                                "position": "-1px 0px"
                            },
                            "image/png": {
                                "image": "../../images/springBoard/nodetypes.png",
                                "position": "-1px 0px"
                            },
                            "application/pdf": {
                                "image": "../../images/springBoard/nodetypes.png",
                                "position": "-18px 0px"
                            },
                            "text/html": {
                                "image": "../../images/springBoard/nodetypes.png",
                                "position": "-35px 0px",
                                "select": function (node) {
                                    return false;
                                },
                                "move": function (node) {
                                    return false;
                                }
                            }
                        }
                    };
                };
                
                function content_upload() {
                    //console.log(getHeaders());
                    $("#jsonInputParameters").val("{\"parentID\":\"" + self.nodeId + "\",\"duplicateResolution\":\"TimeStampSuffix\"}");
                    var formData = new FormData($('#f_content_upload')[0]);
                    //console.log(formData);
                    $.ajax({
                        url: sessionStorage.getItem("serverURL")+ '/documents/api/1.1/files/data',
                        type: 'POST',
                        headers: {
                            "Authorization": sessionStorage.getItem("authInfo")
                        },
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        beforeSend: function (data) {
                            $("#progressbar1").css("display", "");
                        },
                        //progressbar1
                        success: function (data) {
                            assignValuesToMetadataCollection(data.id);
                        },
                        error: function (request, status, error) {
                            $("#dialog_upload").ojDialog("close");
                            $("#uploadButton").ojButton({"disabled": false});
                            $("#progressbar1").css("display", "none");
                            console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                        }
                    });
                };
            
                function assignValuesToMetadataCollection(fileId) {
                    $.ajax({
                        url: sessionStorage.getItem("serverURL") + "/documents/api/1.1/files/" + fileId + "/metadata",
                        type: 'POST',
                        headers: {
                            "Authorization": sessionStorage.getItem("authInfo")
                        },
                        data: $("#metadataValues").val(),
                        //accept: "application/json",
                        //cache: false,
                        //contentType:"application/json; charset=UTF-8",
                        //dataType:"json",
                        //progressbar1
                        success: function (data) {
                            $("#dialog_upload").ojDialog("close");
                            $("#uploadButton").ojButton({"disabled": false});
                            $("#tree").ojTree("refresh", "-1");
                            $("#progressbar1").css("display", "none");
                        },
                        error: function (request, status, error) {
                            $("#dialog_upload").ojDialog("close");
                            $("#uploadButton").ojButton({"disabled": false});
                            $("#progressbar1").css("display", "none");
                            console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                        }
                    });
                };
                
                function openCreateFolderDialog() {
                    $("#dialog_create_folder").ojDialog("open");
                };
                
                self.validateCreateFolderMsg = ko.observable();
                
                function createFolder() {
                    //self.nodeId
                    console.log(self.createFolderName() + "/" +self.nodeId);
                    
                    if(self.createFolderName() === undefined || self.createFolderName() === '') {
                        self.validateCreateFolderMsg([{summary: 'Value is required.', detail: 'You must enter a folder name.', severity: oj.Message.SEVERITY_TYPE['ERROR']}]);
                        return;
                    }
                    
                    $.ajax({
                        url: sessionStorage.getItem("serverURL")+ '/documents/api/1.1/folders/'+self.nodeId,
                        type: 'POST',
                        headers: {
                            "Authorization": sessionStorage.getItem("authInfo")
                        },
                        data: JSON.stringify({"name": self.createFolderName(),"description": ""}),
                        cache: false,
                        //contentType: "application/json",
                        //progressbar1
                        success: function (data) {
                            $("#dialog_create_folder").ojDialog("close");
                            $("#tree").ojTree("refresh", "-1");
                        },
                        error: function (request, status, error) {
                            $("#dialog_create_folder").ojDialog("close");
                            console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                        }
                    });
                };

                function openDeleteContentDialog() {
                    $("#dialog_delete_content").ojDialog("open");
                };

                function deleteContent() {
                    
                    $.ajax({
                        url: sessionStorage.getItem("serverURL")+ '/documents/api/1.1/'+(self.nodeId.startsWith("D") === true ? 'files' : 'folders')+'/'+self.nodeId,
                        type: 'DELETE',
                        headers: {
                            "Authorization": sessionStorage.getItem("authInfo")
                        },
                        cache: false,
                        //contentType: "application/json",
                        //progressbar1
                        success: function (data) {
                            $("#dialog_delete_content").ojDialog("close");
                            $("#tree").ojTree("refresh", "-1");
                        },
                        error: function (request, status, error) {
                            $("#dialog_delete_content").ojDialog("close");
                            console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                        }
                    });
                };
                
                // Convert a jQuery list of html element nodes to string containing node id's.
                function _arrayToStr(arr)
                {
                    var s = "";
                    $.each(arr, function (i, val)
                    {
                        if (i) {
                            s += ", ";
                        }
                        s += $(arr[i]).attr("id");
                    });

                    return s;
                };

                // convert fancy tree data
                function convertData (data) {
                    //console.log(JSON.stringify(data));
                    var convertedData = [];
                    if (data.count > 0) {
                        for (var item = 0; item < data.items.length; item++) {
                            //item.name
                            //item.id
                            //item.type // folder
                            //childItemsCount
                            //(data.items[item].childItemsCount > 0 ? true : false)
                            var convertedItem = {};

                            convertedItem['title'] = data.items[item].name;
                            convertedItem['attr'] = {"id": data.items[item].id, "type": getType(data.items[item])};

                            if (data.items[item].childItemsCount > 0)
                                convertedItem['children'] = [];

                            convertedData.push(convertedItem);

                            //source.push({"title":"test", "key":"test", "folder": true, "lzay":true});

                        }
                    }

                    //console.log(JSON.stringify(convertedData));
                    return convertedData;
                };

                function getType (item) {
                    //console.log("item.type : " + item.type);
                    //console.log("item.mimeType : " + item.mimeType);
                    var type = "";

                    if (item.type == 'folder') {
                        if (item.childItemsCount == 0)
                            type = 'empFolder';
                    } else
                        type = item.mimeType;

                    return type;
                }

                function readURL (input) {
                    if (input.files && input.files[0]) {
                        var reader = new FileReader();

                        reader.onload = function (e) {
                            $('#previewImg').attr('src', e.target.result);
                        }

                        reader.readAsDataURL(input.files[0]);
                    }
                };
            };
            
            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new ContentUploadViewModel();
        }
);
