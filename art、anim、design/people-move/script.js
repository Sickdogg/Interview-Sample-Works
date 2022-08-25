const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

//繪製黑色底圖
ctx.fillStyle = 'rgb(0,0,0)';
ctx.fillRect(0,0,width,height);
//將畫布的原點放到整個圖片的中心
ctx.translate(width/2, height/2);

// 角度公式找到正三角形的頂點的高
function degToRad(degrees) {
    return degrees * Math.PI / 180;
  };
  
  function rand(min, max) {
    return Math.floor(Math.random() * (max-min+1)) + (min);
  }
  //設定初始值250
  var length = 250;
  //三角形的原點
  var moveOffset = 20;
  
  //畫漸層

//   for(var i = 0; i < length; i++) {
//     ctx.fillStyle = 'rgba(' + (255-length) + ', 0, ' + (255-length) + ', 0.9)';
//     //開始繪製
//     ctx.beginPath();
//     //指定繪製原點
//     ctx.moveTo(moveOffset, moveOffset);
//     //畫一條從原點開始的兩點直線(X軸增加但是Y軸不變)
//     ctx.lineTo(moveOffset+length, moveOffset);
//     //使用公式(底/2*tan(角度公式))得到正三角形的高(Y軸座標)
//     var triHeight = length/2 * Math.tan(degToRad(60));
//     //畫一條直線到的頂點座標(原點+底/2,原點+高)
//     ctx.lineTo(moveOffset+(length/2), moveOffset+triHeight);
//     //最後畫回來原點形成三角形
//     ctx.lineTo(moveOffset, moveOffset);
//     //繪圖
//     ctx.fill();
//     // 每一次操作會減少
//     //影響的東西有: 三角形的大小、顏色
//     length--;
//     //原點座標改變
//     moveOffset += 0.7;
//     //改變角度
//     ctx.rotate(degToRad(5));
//   }

  //建立圖片來源跟監聽
 
//   //往前走路
//   const img =new Image();
//   img.src = "walk-right.png";
//   img.onload = draw;

//   //建立圖片位置跟圖片序號
//   //sprite:1~5控制圖片顯示的位置
//   let sprite = 0;
//   //為顯示圖片移動的X座標
//   let posX =0;

//   //draw方法
//   function draw(){
//     ctx.fillRect(-(width/2), -(height/2), width, height);
//     //drawImage(圖，裁X,裁Y,裁長，裁寬,顯示X,顯示Y,顯示比例,顯示比例)
//     ctx.drawImage(img, (sprite*102), 0, 102, 148, 0+posX,-74, 102, 148);

//     //posX代表圖片的座標所以%13代表每+13換下一張圖片
//     if (posX % 13 === 0) {
//         if (sprite === 5) {
//           sprite = 0;
//         } else {
//           sprite++;
//         }
//       }
//     //偵測posX是否到達右邊邊緣
//       if(posX > width/2) {
//         //得到最左邊的位置
//         newStartPos = -((width/2) + 102);
//         posX = Math.ceil(newStartPos / 13) * 13;
//         console.log(posX);
//       } else {
//         posX += 2;
//       }
//       window.requestAnimationFrame(draw);
//   }

//往後走
  const img2 =new Image();
  img2.src = "walk-right.png";
  img2.onload = draw2;

  //建立圖片位置跟圖片序號
  //sprite:1~5控制圖片顯示的位置
  let sprite2 = 5;
  //為顯示圖片移動的X座標
  let posX2 =0;
  //draw方法
  function draw2(){
    ctx.fillRect(-(width/2), -(height/2), width, height);
    //drawImage(圖，裁X,裁Y,裁長，裁寬,顯示X,顯示Y,顯示比例,顯示比例)
    ctx.drawImage(img2, (sprite2*102), 0, 102, 148, 0-posX2,80, 102, 148);

    //posX代表圖片的座標所以%13代表每+13換下一張圖片
    if (posX2 % 13 === 0) {
        if (sprite2 === 0) {
          sprite2 = 5;
        } else {
          sprite2--;
        }
      }
    //偵測posX是否到達右邊邊緣
      if(posX2-102 > width/2) {
        //得到最左邊的位置
        newStartPos2 = -((width/2) + 102);
        posX2 = Math.ceil(newStartPos2 / 13) * 13;
        console.log(posX2);
      } else {
        posX2 += 2;
      }
      window.requestAnimationFrame(draw2);
  }
