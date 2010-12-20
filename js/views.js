// Use underscore templating with {{ ... }} form

_.templateSettings = {
      interpolate : /\{\{(.+?)\}\}/g
};

var Editor = {
    selection: null,
    constructors: new Backbone.Collection(),
}

var Constructor = Backbone.Model.extend({
    templateString: null,

    initialize: function() {
        _.bindAll(this, "withPlaceholder");
    },

    withPlaceholder: function(args) {
        var mml = _.template(this.templateString)({
            a: '▮',
            b: '▯',
        });

        // Wrap in MathML <math> ... </math>
        if(args && args.wrap) {
            var btn_el = $("#mml_template").tmpl({
                contents: mml,
            });
            return btn_el;
        }

        // Otherwise return the naked MathML string
        return mml;
    }
})

var select = function(selector, exclusive) {
    var el = $(selector);

    if(exclusive && Editor.selection) {
        Editor.selection.removeClass('selected');
        Editor.selection = null;
    }

    if (el.hasClass('selected')) {
        el.removeClass('selected');
        Editor.selection = null;
    } else {
        el.addClass('selected');
        Editor.selection = el;
    }
}

var move_left = function() {
    if(Editor.selection) {
        var prev = Editor.selection.prev();
        if(prev) {
            select(Editor.selection.prev(), true); 
        }
    }
}

var move_right = function() {
    if(Editor.selection) {
        var next = Editor.selection.next();
        if(next) {
            select(Editor.selection.next(), true); 
        }
    }
}

var move_up = function() {
    if(Editor.selection) {
        var parent = Editor.selection.parent();
        if(parent.isMath()) {
            select(parent, true); 
        }
    }
}

var remove = function() {
    if(Editor.selection) {
        Editor.selection.replaceWith('<mi>▮</mi>');
    }
}

var ConstructorButton = Backbone.View.extend({

    tagName: 'button',

    events: {
        "click" :   "substitute",
    },

    initialize: function() {
        _.bindAll(this, "render");
    },

    render: function() {
        $(this.el).html(this.model.withPlaceholder({wrap: true}));
        return this;
    },

    substitute: function(e) {
        // Add more advanced functionality later..
        var mml = this.model.withPlaceholder();

        if(Editor.selection) {
            Editor.selection.replaceWith(mml);
        }
    },
    
});

var CategoryView = Backbone.View.extend({
    
    constructors: null,

    // See: <script id="category" type="text/x-jquery-tmpl">
    template: '#category',
    
    initialize: function() {
        this.constructors = new Backbone.Collection();
        _.bindAll(this, "render");
    },

    render: function() {
        this.el = $(this.template).tmpl({
            name: this.options.name,
        }).appendTo("#palette");

        var $cs = this.$('.constructors');

        this.constructors.each(function(cst) {
            var btn = new ConstructorButton({
                model: cst,
            }).render();

            $cs.append(btn.el); 
        });

        return this;
    },

    addConstructor: function(cst) {
        this.constructors.add(cst);
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
        // The specification dictionary contains:
        // name, category, template, hotkey
        var el = templates[el];

        var cst = new Constructor(el);
        cst.templateString = el.template;

        // If we already have the category init'd
        if(categories[el.category]) {
            categories[el.category].addConstructor(cst);
            Editor.constructors.add(cst);
        // ... otherwise build it
        } else {
            categories[el.category] = new CategoryView({name: el.category});
            categories[el.category].addConstructor(cst);
            Editor.constructors.add(cst);
        }
    }

    console.log(categories);

    for(var cat in categories) {
        cat = categories[cat];
        cat.render();
    }
}
