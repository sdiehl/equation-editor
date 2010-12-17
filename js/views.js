var ConstructorButton = Backbone.View.extend({

    templateString: null,

    render: function() {

        var mml = this.templateString;
        mml_string = $.tmpl(mml, {
            a: '▮',
            b: '▯',
        });

        console.log(mml_string);

        this.el = $("#mml_template").tmpl({
            contents: mml_string.html(),
        });
        return this.el;
    },
    
});

var CategoryView = Backbone.View.extend({
    
    buttons: null,

    // See: <script id="category" type="text/x-jquery-tmpl">
    template: '#category',
    
    initialize: function() {
        this.buttons = new Backbone.Collection();
        _.bindAll(this, "render");
    },

    render: function() {
        this.el = $(this.template).tmpl({
            name: this.options.name,
            buttons: this.buttons.map(function(btn) {
                var b = btn.attributes['el'][0];
                return (new XMLSerializer().serializeToString(b));
            }),
        }).appendTo("#palette");
        return this;
    },

    addButton: function(button) {
        this.buttons.add(button);
    },
});

var PanelView = Backbone.View.extend({
    categories: null,

    initialize: function() {
        this.categories = new Backbone.Collection();
        _.bindAll(this, "render");
    },

})

function init_palettes() {
    var categories = {};

    for(var el in templates) {
        var el = templates[el];

        var btn = new ConstructorButton(el);
        btn.templateString = el.template;
        btn.render();

        // If we already have the category init'd
        if(categories[el.category]) {
            categories[el.category].addButton(btn);
        // ... otherwise build it
        } else {
            categories[el.category] = new CategoryView({name: el.category});
            categories[el.category].addButton(btn);
        }
    }

    for(var cat in categories) {
        cat = categories[cat];
        cat.render();
    }
}
