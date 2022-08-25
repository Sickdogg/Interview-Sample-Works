//步驟一.建立場景-->代表3D世界
const scene = new THREE.Scene();

// 步驟二.建立攝影機-->我們從攝影機看世界
//使用 PerspectiveCamera()方法
//(鏡頭視角,寬高比,最近距離,最遠距離)
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
// 攝影機Z軸位置
camera.position.z = 7;

//步驟三.建立渲染器放入body中
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

//步驟四.在畫布上建立立方體
let cube;
//使用TextureLoader()方法建立物件
const loader = new THREE.TextureLoader();
//使用load()載入紋理樣式，成功後執行回調方法
loader.load('metal003.png',texture =>{
    //對回調的物件增加指定屬性
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2,2);

    //建立Mesh()需要的兩個參數(Box,Mater)
    const geometry = new THREE.BoxGeometry(2.4,2.4,2.4);
    const material = new THREE.MeshLambertMaterial({map:texture});

    //使用Mesh()建立cube
    //放入場景
    cube = new THREE.Mesh(geometry,material);
    scene.add(cube);

    const light = new THREE.AmbientLight('rgb(255,255,255)');
    scene.add(light);

    const spotLight = new THREE.SpotLight('rgb(255,255,255)');
    spotLight.position.set(100,1000,1000);
    spotLight.castShadow = true;
    scene.add(spotLight);
    //最後執行自定義方法
    draw();
});
function draw(){
    //增加x軸跟Y軸數值
    cube.rotation.x +=0.01;
    cube.rotation.y +=0.01;

    //執行渲染器放入場景跟攝影機
    renderer.render(scene,camera);

    requestAnimationFrame(draw);
}

    

// const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5;

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// let cube;

// const loader = new THREE.TextureLoader();

// loader.load('metal003.png', texture => {
// 	texture.wrapS = THREE.RepeatWrapping;
// 	texture.wrapT = THREE.RepeatWrapping;
// 	texture.repeat.set(2, 2);

// 	const geometry = new THREE.BoxGeometry(2.4,2.4,2.4);
// 	const material = new THREE.MeshLambertMaterial( { map: texture } );
// 	cube = new THREE.Mesh(geometry, material);
// 	scene.add(cube);

// 	draw();
// });

// const light = new THREE.AmbientLight('rgb(255,255,255)'); // soft white light
// scene.add(light);

// const spotLight = new THREE.SpotLight('rgb(255,255,255)');
// spotLight.position.set( 100, 1000, 1000 );
// spotLight.castShadow = true;
// scene.add(spotLight);

// function draw() {
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render(scene, camera);

// 	requestAnimationFrame(draw);
// }
