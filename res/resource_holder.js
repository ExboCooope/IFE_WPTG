/**
 * Created by Exbo on 2016/1/16.
 */

function loadItemSystem(){
    stgCreateImageTexture("item_tex", "res/Item.png");
    renderCreate2DTemplateA1("item0","item_tex",0,0,16,16,19,0,0,1);
    renderCreate2DTemplateA1("item1","item_tex",2,21,12,12,19,0,0,1);
    stgLoadSE("se_item","se/se_item00.wav").ready=1;
}









function EnemyFairyHolder(base,tx,ty,tw,th){
    this._lastx=0;
    this._lasty=0;
    this._last_anime=0;
    this._last_anime_frame=0;
    this._last_anime_id=0;
    this._enemy=base;
    this._tx=tx;
    this._ty=ty;
    this.render=new StgRender("sprite_shader");
    renderCreate2DTemplateA1("fairy"+tx+ty,"fairy_red",tx,ty,tw,th,tw,0,0,1);
    renderApply2DTemplate(this.render,"fairy"+tx+ty,0);
    this.layer=stg_const.LAYER_ENEMY;
    this.pos= [base.pos[0],base.pos[1],0];
}

EnemyFairyHolder.prototype.script=function(){
    var e=this._enemy;
    if(e.remove){
        stgDeleteSelf();
    }else{
        this.pos[0]= e.pos[0];
        this.pos[1]= e.pos[1];
        var a=0;
        if(this.pos[0]<this._lastx-1){
            a=1;
        }else if(this.pos[0]>this._lastx+1){
            a=2;
        }
        if(e.move){
            a=0;
            var dv=e.move.speed_angle;
            if(dv<0)dv+=PI2;
            if(dv<PI/4 || dv>PI/4*7){
                a=2;
            }else if(dv>PI/4*3 && dv<PI/4*5){
                a=1;
            }
        }
        if(a==this._last_anime){
            this._last_anime_frame++;
            if(this._last_anime_frame>4){
                this._last_anime_frame=0;
                this._last_anime_id++;
                if(this._last_anime_id==3)this._last_anime_id=0;
                if(this._last_anime_id==7)this._last_anime_id=4;
            }
        }else{
            this._last_anime_frame=0;
            this._last_anime_id=a?3:0;
            this.render.scale[0]=(a==1)?-1:1;
        }
        this.update=1;
        renderApply2DTemplate(this.render,"fairy"+this._tx+this._ty,this._last_anime_id);

        this._lastx=this.pos[0];
        this._lasty=this.pos[1];
        this._last_anime=a;
    }
};