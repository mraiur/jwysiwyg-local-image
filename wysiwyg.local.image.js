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
                '<div class="wysiwyg-system-image"><div class="grouped-list">1</div>'+
                '<div class="expanded-list">2</div></div>'+
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
                
            });

            adialog.open();
            
            $(Wysiwyg.editorDoc).trigger("editorRefresh.wysiwyg");
        },

        processInsert: function (context, Wysiwyg, img) {
           
        },

        makeForm: function (form, img) {
           
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
