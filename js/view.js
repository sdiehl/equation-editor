var CategoryView = Backbone.View.extend({
    tagName: 'div',
    
    initialize: function() {
        _.bindAll(this, "render");
    },

    render: function() {
        $(this.el).html(
            $.tmpl(this.template, {
                  name: this.name,
                  button: this.buttons, 
            })
        );
        return this;
    }
});
