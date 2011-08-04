KISSY.add("stars/ui", function(S, Core, Stars){
    var Dom = S.DOM,
        Event = S.Event;

    var UI = function(){
    }

    S.augment(UI, {
        onResize : function(ev){
            var vh = Dom.viewportHeight(),
                vw = Dom.viewportWidth();
            this.layerstars.attr("height", vh).attr("width", vw);
            this.layerlines.attr("height", vh).attr("width", vw);
            this.stars.draw();
        },
        init : function(){
            this.layerstars = S.one("<canvas class='sky'>");
            this.layerlines = S.one("<canvas class='layer'>");

            this.container = S.one("#sky");
            this.core = new Core();
            this.stars = new Stars(this.core,this.layerstars);
            this.stars.draw();
            this.onResize();
            this.container.append(this.layerstars).append(this.layerlines);
            Event.on(window,"resize",this.onResize, this);
        }
    });

    return UI;
}, {
    requires : ["stars/core", "stars/stars"]
});
