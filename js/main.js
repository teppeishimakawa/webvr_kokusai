
var material,material2;
var src1='./testSmall.jpg';
var src2='./test.jpg';
var mesh,mesh2;
var width = window.innerWidth*0.9;
var height = window.innerHeight*0.3;


//sp or pc
var ua = navigator.userAgent;
 if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)
{var sp = true;}
 else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0)
{var sp = true;}



//webGL非対応端末にはDetector.jsでエラー表示。
  if (!Detector.webgl)
  {
 var warning = Detector.getWebGLErrorMessage();
 document.getElementById('stage').appendChild(warning);
  }else
//render
  {
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width,height);
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('stage').appendChild(renderer.domElement);
  }


  //scene, groupはmesh切り替え用
  var scene =new THREE.Scene();
  var group =new THREE.Group();


  //geometry 半径、経度・緯度分割数, x軸マイナスにして、球の裏側に映像表示
  var geometry = new THREE.SphereGeometry(900,60,40);
      geometry.scale( -1, 1, 1 );
　var geometry2 = new THREE.SphereGeometry(1000,60,40);
      geometry2.scale( -1, 1, 1 );

//loadmanager
  var manager = new THREE.LoadingManager();
  manager.onProgress = function ( item, loaded, total )
   {
    console.log( item, loaded, total );
    //proxy準備できたらloading→proxy切り替え。黒味ちら見え対応でsetTimeout
    if(loaded/total == 0.5 )
      {
       setTimeout(function()
       {
       document.getElementById("loader").style.display="none";
       document.getElementById("stage").style.display="block"
       },500);
      }
    //proxy→本線切り替えとproxy用mesh remove
    if(loaded/total == 1)
      {
       group.add(mesh2);
       group.remove(mesh);
      }
   };

  //material,texture
   material = new THREE.MeshBasicMaterial({
   map: new THREE.TextureLoader(manager).load(src1,function(texture){
   texture.minFilter=THREE.LinearFilter;
　 texture.mapping=THREE.UVMapping;
   })
   });

   material2 = new THREE.MeshBasicMaterial({
   map: new THREE.TextureLoader(manager).load(src2,function(texture){
   texture.minFilter=THREE.LinearFilter;
　 texture.mapping=THREE.UVMapping;
   })
   });

  //mesh
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0,0,0);
  mesh.rotation.y = 130 * Math.PI/180;
  //mesh.rotation.z=8* Math.PI/180;
  group.add(mesh);
  scene.add(group);

  mesh2 = new THREE.Mesh(geometry, material2);
  mesh2.position.set(0,0,0);
  mesh2.rotation.y = 130 * Math.PI/180;
  //camera
  var camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
      camera.position.set(0,0,0.1);

  //control
  if(!sp)
  {
  var controls = new THREE.OrbitControls( camera,stage);
  controls.panSpeed=0.1;
  controls.rotateSpeed=0.01;
  controls.enableDamping=true;
  controls.dampingFactor=0.1;
  }

  if(sp)
  {
  var gcontrols=new THREE.DeviceOrientationControls(camera);
  }
  /*helper
  var axis = new THREE.AxisHelper(100);
  axis.position.set(0,0,0);
  scene.add(axis);*/




  function rend(){
    requestAnimationFrame(rend);
    //画面リサイズ対応

    if(mesh){
    mesh.rotation.y += 0.015 * Math.PI/180;
    }
    if(!sp){
    controls.update();
    mesh2.rotation.y += 0.015 * Math.PI/180;
    }
    if(sp){
    gcontrols.update();
    mesh2.rotation.y += 0.015 * Math.PI/180;
    }
    renderer.render(scene,camera);
   }

  rend();



window.onresize=function(){
  const width = window.innerWidth*0.90;
  const height = window.innerHeight*0.3;

  // レンダラーのサイズを調整する
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // カメラのアスペクト比を正す
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
    }







