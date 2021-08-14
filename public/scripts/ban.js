
// 基本的な定義
const MAXCOL=7;
const MAXROW=6;
const KURO="●";
const SIRO="○";
const NASI="・";
const SEP="|";
const MAXTURN=42;
const MAXPIECE=4;

const BANID="ban";
const LOGID="log";

var ban = new Array(MAXCOL*MAXROW);
var turn = 0;
var active=KURO;
var finish=false;



// 描画
function paint() {
    var banValue="";
    for(var i=0 ;i<MAXROW;i++){
        for(var j=0;j<MAXCOL;j++){
            banValue+=ban[i*MAXCOL+j];
            if(j<MAXCOL-1){banValue+=SEP;}
        }
        banValue+="<br>";
    }
    document.getElementById(BANID).innerHTML=banValue;
}

// 盤を初期化する
function banInit() {
    for(var i=0 ;i<MAXROW;i++){
        for(var j=0;j<MAXCOL;j++){
            ban[i*MAXCOL+j]=NASI;
        }
    }
    turn=0;
    finish=false;
    if(active==KURO){active=SIRO;}
    else{active=KURO;}

    paint();
}

// 駒を配置する
function setBan(address,piece){
    ban[address]=piece;
}

// 配置場所を返す（その列に置けない場合は-1)
function getAddress(col){
    var address=-1;
    // 一番下を探す
    var row=MAXROW-1;
    while(ban[row*MAXCOL+col]!=NASI && row>=0){
        row--;
    }

    // 見つかった場合
    if(row>=0){
        address=row*MAXCOL+col;
    }

    return address;
}

// 次のターンへ進める
function next(){
    turn++;
    if(active==KURO){active=SIRO;}
    else{active=KURO;}

    outLog(active+"さんのターンです。");
}

// 駒を配置して次のターン
function put(col){
    var address = getAddress(col);
    if(finish==true){
        outLog(active+"さんの勝利です");
    }
    else{
        if(address!=-1){
            setBan(address,active);

            finish=checkFinish(active);
            if(finish==true){
                outLog(active+"さんの勝利です");
            }
            else{   
                next();
            }
            paint();
        }
        else{
            outLog(col+"列には置けません。");
        }
    }
}

// 勝利チェック
function checkFinish(piece){
    var win=false;
    var count=0;

    // 右方向チェック
    for(var i =0;i<MAXROW;i++){
        for(var j=0;j<MAXCOL-(MAXPIECE-1);j++){
            while(ban[i*MAXCOL+j+count]==piece){
                count++;
                if(count==MAXPIECE){
                    outLog("右チェック：row="+i+"col="+j);
                    win=true;
                    return win;
                }
            }
            count=0;
        }
    }
    // 下方向チェック
    for(var i =0;i<MAXROW-(MAXPIECE-1);i++){
        for(var j=0;j<MAXCOL;j++){
            while(ban[(i+count)*MAXCOL+j]==piece && count<MAXPIECE){
                count++;
                if(count==MAXPIECE){
                    outLog("下チェック：row="+i+"col="+j);
                    win=true;
                    return win;
                }
            }
            count=0;
        }
    }
    // 右下斜め
    for(var i =0;i<MAXROW-(MAXPIECE-1);i++){
        for(var j=0;j<MAXCOL-(MAXPIECE-1);j++){
            while(ban[(i+count)*MAXCOL+j+count]==piece && count<MAXPIECE){
                count++;
                if(count==MAXPIECE){
                    outLog("右下チェック：row="+i+"col="+j);
                    win=true;
                    return win;
                }
            }
            count=0;
        }
    }
    // 左下斜め
    for(var i = 0;i<MAXROW-(MAXPIECE-1);i++){
        for(var j=(MAXPIECE-1);j<MAXCOL;j++){
            while(ban[(i+count)*MAXCOL+j-count]==piece && count<MAXPIECE){
                count++;
                if(count==MAXPIECE){
                    outLog("左下チェック：row="+i+"col="+j);
                    win=true;
                    return win;
                }
            }
            count=0;
        }
    }


}

// ログ出力
function outLog(str){
    var logstr = document.getElementById(LOGID).innerHTML;
    document.getElementById(LOGID).innerHTML=str+"\r\n"+logstr;
}

banInit();
outLog(active+"さんのターンです。");
