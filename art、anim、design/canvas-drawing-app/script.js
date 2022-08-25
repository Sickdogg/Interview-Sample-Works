//得到畫布元素
//獲得將畫布寬高套用到網頁寬高
//打開畫布2D
const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight-85;
const ctx = canvas.getContext('2d');

//建立黑色的畫布底層(寬高使用網頁寬高)
ctx.fillStyle = 'rgb(0,0,0)';
ctx.fillRect(0,0,width,height);

//獲得控制元素
const colorPicker = document.querySelector('input[type="color"]');
const sizePicker = document.querySelector('input[type="range"]');
const output = document.querySelector('.output');
const clearBtn = document.querySelector('button');

//建立一個圓需要的數值
function degToRad(degrees) {
  return degrees * Math.PI / 180;
};

//對大小選擇器添加輸入監聽(文字會隨著選擇更動)
sizePicker.addEventListener('input', () => output.textContent = sizePicker.value);

//建立變量處存滑鼠所在的X軸Y軸跟點擊狀態
let curX;
let curY;
let pressed = false;

//在滑鼠移動時抓取目標位置
document.addEventListener('mousemove', e => {
  curX = (window.Event) ? e.pageX : e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);

  curY = (window.Event) ? e.pageY : e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
});

//設定點擊狀態的改變
canvas.addEventListener('mousedown', () => pressed = true);
canvas.addEventListener('mouseup', () => pressed = false);

//設定清除按鈕的行為
clearBtn.addEventListener('click', () => {
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillRect(0,0,width,height);
});

//自定義畫圖的行為(重複執行它)
function draw() {
  if (pressed) {
    ctx.fillStyle = colorPicker.value;
    ctx.beginPath();
    ctx.arc(curX, curY-85, sizePicker.value, degToRad(0), degToRad(360), false);
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

draw();
