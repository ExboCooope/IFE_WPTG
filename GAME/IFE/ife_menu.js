/**
 * Created by Exbo on 2016/4/13.
 */

function ifeGenerateMenu(){
    var that=ife;

    that.main_menu=new MenuHolderA1([100,100],[0,50],ife_loader);
    that.setting=new MenuHolderA1([100,100],[0,50],that.main_menu);
    that.game_select_menu=new MenuHolderA1([100,100],[0,50],that.main_menu);

    that.item_start=new TextMenuItem("开始游戏",1,1,null,1);
    that.item_benchmark=new TextMenuItem("性能测试",1,1,null,1);
    that.item_settings=new TextMenuItem("设置",1,1,that.setting,1);
    that.item_help=new TextMenuItem("操作说明",1,1,that.setting,1);
    that.item_playreplay=new TextMenuItem("回放",1,0,null,1);
    that.item_savereplay=new TextMenuItem("保存回放",1,0,null,0);

    for(var i in stg_level_templates){
        if(stg_level_templates.hasOwnProperty(i)) {
            (function () {
                var j = i;
                that["item_level_" + i] = new TextMenuItem(i, 1, 1, {init: function () {
                    ife.startGame(j,"siki");
                }}, 1);
                that.game_select_menu.pushItem(that["item_level_" + i]);
            })();
        }
    }
    that.game_select_back=new TextMenuItem("返回",1,1,that.main_menu,1);
    that.game_select_menu.pushItem(that.game_select_back);

    that.main_menu.pushItems(that.item_start,that.item_benchmark,that.item_settings,that.item_help,that.item_playreplay,that.item_savereplay);
    that.main_menu.setColor("#88F","#880");

    that.item_benchmark.on_select={
        init:function(){ife.startGame("ife_pressure_test","siki");}
    };

   // that.item_start.on_select={
   //     init:function(){ife.startGame("ife_stage_1","siki");}
   // };
    that.item_start.on_select=that.game_select_menu;

    that.item_playreplay.on_select={
        init:function(){replayStartLevel(0);}
    };

    that.item_savereplay.on_select={
        init:function(){
            downloadFile("test.rpy",packReplay());
            stgDeleteSelf();
        }
    };



    that.setting_vsync=new TextMenuItem("垂直同步",1,1,{init:function(){
        stg_refresher_type=1-stg_refresher_type;
        that.setting_refresh();
        stgDeleteSelf();
    }},0);
    that.setting_wgl=new TextMenuItem("渲染方式(需刷新)",1,1,{init:function(){
        var p=stgLoadData("render_type");
        if(!p)p=0;
        stgSaveData("render_type",1-p);
        that.setting_refresh();
        stgDeleteSelf();
    }},0);
    that.setting_rs=new TextMenuItem("画布大小",1,1,{init:function(){
        ife.fixed=!ife.fixed;
        that.setting_refresh();
        stgDeleteSelf();
    }},0);
    that.setting_return=new TextMenuItem("返回",1,1,that.main_menu,1);

    that.setting_refresh=function(){
        that.setting_vsync.mtext="垂直同步："+(stg_refresher_type?"关闭":"开启");
        var p=stgLoadData("render_type");
        that.setting_wgl.mtext="渲染方式(需刷新)："+(p?"Canvas2D":"WebGL");
        that.setting_rs.mtext="画布大小："+(ife.fixed?"固定":"全屏");
    };
    that.setting_refresh();
    that.setting.pushItems( that.setting_vsync, that.setting_wgl,that.setting_rs,that.setting_return);
    that.setting.setColor("#88F","#880");



    that.item_help.on_select={
        init:function(){
            that.helpcontext=[];
            that.helpcontext.push(new RenderText(100,100,"操作说明："));
            that.helpcontext.push(new RenderText(100,120,"鼠标点击移动"));
            that.helpcontext.push(new RenderText(100,140,"方向键 直接控制"));
            that.helpcontext.push(new RenderText(100,160,"左Shift 低速"));
            that.helpcontext.push(new RenderText(100,180,"Z 射击/确认"));
            that.helpcontext.push(new RenderText(100,200,"X 切换Link显示/取消/返回上一级菜单"));
            that.helpcontext.push(new RenderText(100,220,"ESC 暂停"));
            var q=new ButtonHolder("返回",1,1,
                {init:function(){
                    for(var i=0;i<that.helpcontext.length;i++){
                        stgDeleteObject(that.helpcontext[i]);
                    }
                    stgAddObject(that.main_menu);
                    stgDeleteObject(that.item_help.on_select);
                }},0,1);
            q.pos=[100,260];
            stgAddObject(q);
            that.helpcontext.push(q);

        },
        script:function(){
            if(stg_system_input[stg_const.KEY_SPELL]){
                stgDeleteSelf();
                for(var i=0;i<that.helpcontext.length;i++){
                    stgDeleteObject(that.helpcontext[i]);
                }
                stgAddObject(that.main_menu);
            }
        }

    }


}