/**
 * Controls: Image Local plugin
 * @author Nikolai Ivanov @mraiur
 * @skeleton based on jWYSIWYG-Image plugin
 * Depends on jWYSIWYG
 */
(function ($) {
    "use strict";

    if (undefined === $.wysiwyg) {
        throw "wysiwyg.local.image.js depends on $.wysiwyg";
    }

    if (!$.wysiwyg.controls) {
        $.wysiwyg.controls = {};
    }

    /*
     * Wysiwyg namespace: public properties and methods
     */
    $.wysiwyg.controls.image = {
        groupIndex: 6,
        visible: true,
        exec: function () {
            $.wysiwyg.controls.image.init(this);
        },
        tags: ["img"],
        tooltip: "Insert image",

        init: function (Wysiwyg) {
            var self = this, elements, adialog, dialog, formImageHtml, regexp, dialogReplacements, key, translation,
                config = $.extend({

                }, Wysiwyg.options.imagesConfig),
                img = {
                    alt: "",
                    self: Wysiwyg.dom ? Wysiwyg.dom.getElement("img") : null, // link to element node
                    src: "http://",
                    title: ""
                };

            dialogReplacements = {
                legend  : "Insert Image",
                preview : "Preview",
                
                title   : "Title",
                description : "Description",
                width   : "Width",
                height  : "Height",
                original : "Original W x H",
                "float" : "Float",
                floatNone : "None",
                floatLeft : "Left",
                floatRight : "Right",
                submit  : "Insert Image",
                reset   : "Cancel",
                fileManagerIcon : "Select file from server"
            };

            formImageHtml = '<form  id="wysiwyg-local-addImage">'+
                '<div class="wysiwyg-system-image"><div class="grouped-list"></div>'+
                '<div class="expanded-list"></div></div>'+
                ''+
                ''+
                ''+
                '</form>';
            
            if ($.wysiwyg.fileManager && $.wysiwyg.fileManager.ready) {
                // Add the File Manager icon:
                //formImageHtml += '<div class="wysiwyg-fileManager" title="{fileManagerIcon}"/>';
            }
            
            adialog = new $.wysiwyg.dialog(Wysiwyg, {
                "title"   : dialogReplacements.legend,
                "content" : formImageHtml,
                "width" : '800px',
                "height" : '600px'
            });

            $(adialog).bind("afterOpen", function (e, dialog) {
                
                $.getJSON(config.groupUrl, function(data){
                    var i = 0,
                        dataLength = data.length,
                        list = $("#wysiwyg-local-addImage .grouped-list"),
                        row, html;

                    for (; i <dataLength; i++) {
                        
                        html = '';
                        if(data[i].title){
                            html += '<div class="title">'+data[i].title+'</div>';
                        }

                        if(data[i].url){
                            html+= '<div class="image"><img src="'+data[i].url+'" border="0" alt="" /></div>';
                        }

                        row = $('<div></div>')
                            .html(html)
                            .addClass('file')
                            .bind('click', {
                                config: config,
                                Wysiwyg: Wysiwyg,
                                info: data[i],
                                self: self
                            }, self.loadExpanded);

                        list.append(row);
                    }
                });
            });

            adialog.open();
            
            $(Wysiwyg.editorDoc).trigger("editorRefresh.wysiwyg");
        },

        processInsert: function (e) {
            var data = e.data,
                image = "<img src='"+data.info.url+"' alt='' border='0'/>";
            data.Wysiwyg.insertHtml(image);
        },

        loadExpanded: function(e){
            var params = e.data,
                info = params.info,
                config = params.config,
                list = $("#wysiwyg-local-addImage .expanded-list"),
                row, html;
            
            list.empty();

            $.getJSON(config.expandUrl, { id : info.id}, function(data){

                var i = 0,
                    dataLength = data.length;
                
                for (; i < dataLength; i++) {
                    html = '';

                    if(data[i].title){
                        html += '<div class="title">'+data[i].title+'</div>';
                    }

                    if(data[i].url){
                        html+= '<div class="image"><img src="'+data[i].url+'" border="0" alt="" /></div>';
                    }

                    row = $('<div></div>')
                        .html(html)
                        .addClass('file')
                        .bind('click', {
                            info : data[i],
                            Wysiwyg: params.Wysiwyg
                        }, params.self.processInsert);

                    list.append(row);
                }
            });
        }
    };

    $.wysiwyg.insertImage = function (object, url, attributes) {
        return object.each(function () {
            var Wysiwyg = $(this).data("wysiwyg"),
                image,
                attribute;

            if (!Wysiwyg) {
                return this;
            }

            if (!url || url.length === 0) {
                return this;
            }

            if ($.browser.msie) {
                Wysiwyg.ui.focus();
            }

            if (attributes) {
                Wysiwyg.editorDoc.execCommand("insertImage", false, "#jwysiwyg#");
                image = Wysiwyg.getElementByAttributeValue("img", "src", "#jwysiwyg#");

                if (image) {
                    image.src = url;

                    for (attribute in attributes) {
                        if (attributes.hasOwnProperty(attribute)) {
                            image.setAttribute(attribute, attributes[attribute]);
                        }
                    }
                }
            } else {
                Wysiwyg.editorDoc.execCommand("insertImage", false, url);
            }

            Wysiwyg.saveContent();

            $(Wysiwyg.editorDoc).trigger("editorRefresh.wysiwyg");

            return this;
        });
    };
})(jQuery);
