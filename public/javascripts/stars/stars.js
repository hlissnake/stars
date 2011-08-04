KISSY.add("stars/stars",function(S){
    /**
     * 绘制星空
     */
    function Stars(core, layer){
        this.core = core;
        this.canvas = layer[0];
    }

    S.augment(Stars,{
        draw : function(){
            var stars = this.core.getStars();
            var length = stars.length;
            var ctx = this.canvas.getContext("2d");
            var width = this.canvas.width;
            var height = this.canvas.height;
            var i, star;
            ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
            ctx.beginPath();
            for(i = 0; i< length; i++){
                star = stars[i];
                ctx.arc(width*star.x,height*star.y, .6, 0, 2*Math.PI, true);
            }
            ctx.fillStyle = "#fff";
            ctx.fill();
        }
    });
    return Stars;
});
