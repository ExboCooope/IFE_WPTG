/**
 * Created by Exbo on 2015/11/21.
 */
function stgCreateShotA1(x,y,speed,angle,bulletname,delay,color){
    color=color||0;
    delay=delay||0;
    var a=new StgBullet();
    a.move.pos[0]=x;
    a.move.pos[1]=y;
    a.move.speed=speed;
    a.move.speed_angle=angle*PI180;
    a.invincible=delay;
    a.layer=stg_const.LAYER_BULLET;
    if(stg_target.side==stg_const.SIDE_PLAYER){
        a.layer=stg_const.LAYER_PLAYER;
    }
    a.color=color;
    stg_bullet_parser(a,bulletname);
    stgAddObject(a);
    return a;
}

function stgCreateShotA2(x,y,speed,angle,bulletname,delay,color,acc,maxspeed){
    var a=stgCreateShotA1(x,y,speed,angle,bulletname,delay,color);
    a.move.max_speed=maxspeed;
    a.move.acceleration=acc;
    return a;
}

function stgCreateShotW1(x,y,speed,angle,bulletname,delay,color,n,speed_add,angle_add,delay_add){
    var blt=[];
    var time=0;
    var ShowW1Controller={
        f:0,
        script:function(){
            while(this.f>=time) {
                blt.push(stgCreateShotA1(x,y,speed,angle,bulletname,delay,color));
                speed+=speed_add;
                angle+=angle_add;
                time+=delay_add;
                n--;
                if(n<=0){
                    if(delay_add)stgDeleteSelf();
                    return;
                }
            }
            this.f++;
        }
    }

    if(delay_add==0){
        ShowW1Controller.script();
    }else{
        stgAddObject(ShowW1Controller);
    }
    return blt;
}


function StgBullet(){
    this.type=stg_const.OBJ_BULLET;
    this.move=new StgMove();
    this.damage=1;
    this.penetrate=1;
    this.invincible=0;
}
