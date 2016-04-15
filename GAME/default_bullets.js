/**
 * Created by Exbo on 2015/11/21.
 */

var BULLET={};

function stgCreate2DBulletTemplateA1(sTemplateName,sTextureName,vX,vY,vW,vH,iColorX,iColorY,oRotate,iCenter,oHitBox,oMisc){
    BULLET[sTemplateName]={
        tex:sTextureName,
        data:[vX,vY,vW,vH,iColorX,iColorY,oRotate],
        c:iCenter,
        hit:oHitBox,
        misc:oMisc
    };
}

var _hit_box_tiny=new StgHitDef();
_hit_box_tiny.range=1;
var _hit_box_small=new StgHitDef();
_hit_box_small.range=2;
var _hit_box_medium=new StgHitDef();
_hit_box_medium.range=4;
var _hit_box_large=new StgHitDef();
_hit_box_large.range=14;
var _hit_box_laser={};

var PIUP=90*PI180;

function bullet00Assignment(){
    stgCreateImageTexture("bullet","bullet00.png");
    stgCreate2DBulletTemplateA1("sKWD","bullet",0,0,16,16,16,0,PIUP,1,_hit_box_small,{move_rotate:1});
    stgCreate2DBulletTemplateA1("sBD","bullet",0,16,16,16,16,0,PIUP,1,_hit_box_small,{move_rotate:1});
    stgCreate2DBulletTemplateA1("sZYD","bullet",0,32,16,16,16,0,PIUP,1,_hit_box_small,{move_rotate:1});
    stgCreate2DBulletTemplateA1("sFZMD","bullet",0,48,16,16,16,0,PIUP,1,_hit_box_small,{move_rotate:1});
    stgCreate2DBulletTemplateA1("sXD","bullet",0,64,16,16,16,0,PIUP,1,_hit_box_small,{self_rotate:0.1});
    stgCreate2DBulletTemplateA1("sLD","bullet",0,80,16,16,16,0,PIUP,1,_hit_box_small,{move_rotate:1});
    stgCreate2DBulletTemplateA1("sZD","bullet",0,96,16,16,16,0,PIUP,1,_hit_box_small,{move_rotate:1});
    stgCreate2DBulletTemplateA1("sXY","bullet",0,112,16,16,16,0,PIUP,1,_hit_box_small,null);
    stgCreate2DBulletTemplateA1("sXHY","bullet",0,128,16,16,16,0,PIUP,1,_hit_box_small,null);
    stgCreate2DBulletTemplateA1("sMD","bullet",0,144,16,16,16,0,PIUP,1,_hit_box_small,{move_rotate:1});

    stgCreate2DBulletTemplateA1("mXD","bullet",0,160,32,32,32,0,PIUP,1,_hit_box_medium,{self_rotate:0.1});
    stgCreate2DBulletTemplateA1("mZY","bullet",0,192,32,32,32,0,PIUP,1,_hit_box_medium,null);
    stgCreate2DBulletTemplateA1("mHDD","bullet",0,224,32,32,32,0,PIUP,1,_hit_box_medium,{move_rotate:1});
    stgCreate2DBulletTemplateA1("mDD","bullet",0,256,32,32,32,0,PIUP,1,_hit_box_medium,{move_rotate:1});
    stgCreate2DBulletTemplateA1("mMD","bullet",0,288,32,32,32,0,PIUP,1,_hit_box_medium,{move_rotate:1});

    stgCreate2DBulletTemplateA1("tDD","bullet",0,320,8,8,8,0,PIUP,1,_hit_box_tiny,null);
    stgCreate2DBulletTemplateA1("tQD","bullet",128,320,16,16,16,0,PIUP,1,_hit_box_small,{move_rotate:1});

    stgCreate2DBulletTemplateA1("mLD","bullet",0,336,32,32,32,0,PIUP,1,_hit_box_small,{move_rotate:1});
    stgCreate2DBulletTemplateA1("mLD2","bullet",0,368,32,32,32,0,PIUP,1,_hit_box_small,{move_rotate:1});

    stgCreate2DBulletTemplateA1("lDY","bullet",0,448,64,64,64,0,PIUP,1,_hit_box_large,{move_rotate:1});

    stgCreate2DBulletTemplateA1("plMainShot","siki_body",0,144,16,16,16,0,0,1,_hit_box_large,{move_rotate:1});
    stgCreate2DBulletTemplateA1("plMainShot2","siki_body",192,144,64,16,0,0,0,1,_hit_box_large,{move_rotate:1,alpha:150});
    stgCreate2DBulletTemplateA1("plMainShot3","siki_body",0,144+32,64,16,0,0,0,1,_hit_box_large,{move_rotate:1,alpha:150});

    stgAddShader("sprite_shader",default_2d_shader);
    stg_bullet_parser=render01BltParser;
}

function render01BltParser(object,name){
    object.render=new StgRender("sprite_shader");
    object.color=object.color||0;
    _renderApply2DTemplate(object.render,BULLET[name],object.color);
    object.hitdef={};
    miscApplyAttr(object.hitdef,BULLET[name].hit);
    object.hitdef.pos=[0,0,0];
    object.hitdef.rpos=[0,0,0];
    if(BULLET[name].misc) {
        miscApplyAttr(object,BULLET[name].misc)
    }
}