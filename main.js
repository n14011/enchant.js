enchant();							// enchantライブラリ呼び出し
var game,stages;					// GameCore,SceneGroupオブジェクト

var gs = {fps:30};					// Gameのfps
gs.canvas = {height:320,width:320};	// Windowの高さ，幅
gs.assets = {};						// アセット格納オブジェクト
// 全アセットのパスを配列で返す game.preload(gs.assets.loadAssets)
gs.assets.loadAssets = function(){
  var keyname = "path";
  var assetsPathList = [];
  for (var obj in this){
    if (this[obj].hasOwnProperty(keyname))
      assetsPathList.push(this[obj][keyname]);
  }
  return assetsPathList;
}

// 拡張Core
var eCore = enchant.Class.create(enchant.nineleap.Core,{
  initialize:function(color){	// コンストラクタ
    enchant.nineleap.Core.call(this,gs.canvas.width,gs.canvas.height);
    this.fps = gs.fps;
    this.rootScene.backgroundColor = color || "white";
    // アセットの読み込み
    var gassets = gs.assets.loadAssets();
    if(gassets.length !== 0) this.preload(gassets);
  }
});



//	==================================================
//	Template create 2014-07-26
//	==================================================

gs.assets.pig ={
  height:32
    ,width:32
    ,path:"assets/chara2.png"
    ,frame:[1]
};
var Pig = Class.create(Sprite,{
  initialize:function(){
    var asset = gs.assets.pig;
    Sprite.call(this,asset.width,asset.height);
    this.image = game.assets[asset.path];
    this.frame = asset.frame;
    this.speed = 3;
    this.moveTo(
      (gs.canvas.width - this.width)/2
      ,(gs.canvas.height - this.height)/2
      );
  },
    onenterframe:function(){
      if(game.input.right){
        this.scaleX = -1;
        if(this.x < gs.canvas.width - this.width) this.x+=this.speed;
      }
      if(game.input.left){
        this.scaleX = 1;
        if(this.x > 0)this.x-=this.speed;
      }
      if(game.input.up){
        if(this.y > 0)this.y-=this.speed;
      }
      if(game.input.down){
        if(this.y < gs.canvas.height - this.height) this.y+=this.speed;
      }
    }
});
gs.assets.map={
  height:16
    ,width:16
    ,path:"assets/map0.png"
};
var myMap = Class.create(Map,{
  initialize:function(){
    var asset = gs.assets.map;
    Map.call(this,asset.width,asset.height);
    this.image = game.assets[asset.path];
    this.loadData(this.map());
    stages.addChild(this);
  },
map:function(){
  return([

    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

    ]);
}
});




window.onload = function(){
  game   = new eCore("mintcream");
  stages = game.rootScene;

  game.onload = function(){
    map =new myMap();
    player = new Pig();
    stages.addChild(player);
    // stages.addChild(new Label("template for enchant js"));
    //    stages.on("touchend",function(){
    //     game.end();
    //  });
  };

  game.start();
};
