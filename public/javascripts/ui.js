KISSY.add("stars/ui", function(){

    var UI = function(){ }

    S.augment(UI, function(){
        onResize : function(ev){
            this.sky.attr("height", Dom.viewportHeight()).attr("width", Dom.viewportWidth());
        },
        init : function(){
            this.sky = S.one("#sky");

            Event.on(window,"resize",onResize, this);
            this.onResize();
        }
    });

    return UI;
});
