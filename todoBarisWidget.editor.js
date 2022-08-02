todoBarisWidget = todoBarisWidget.extend({
    /*
     * Config to define Widget Properties
     */
    propertiesConfig: [{
        headerTitle: {"zh_CN":"自定义参数示例", "en_US": "custom param demo"},
        type: "customParam",
        accordion: true,
        accordionState: "close",
        config: [{
            "label":{"zh_CN":"参数 a", "en_US": "param a "},
            "name": "parama",
            "type": "text",
            "value": ""
        }, {
            "label": {"zh_CN":"参数 b", "en_US": "param b"},
            "name": "paramb",
            "type": "checkbox",
            "value": ""
        }, {
            "name": "paramc",
            "label": {"zh_CN":"参数 c", "en_US": "param c"},
            "type": "select",
            "options": [{
                "label": "hidden",
                "value": "hidden",
                "selected": true
            }, {
                "label": "show",
                "value": "show"
            }]
        }]
    }],

    /*
     * Triggered when the user Creates a new widget and used to initialize the widget properties
     */
    create: function (cbk) {
        if (cbk) {
            this._super();
            cbk();
        }
    }
});

var params = {};
params.hasMultipleItems = false;
params.hasAreaSpecificEvents = false;
Studio.registerWidget("todoBarisWidget", "", params);