
var material,material2;
var src1='./testSmall.jpg';
var src2='./test.jpg';
var mesh,mesh2;

//mesh切り替え用
var group=new THREE.Group();

//loadmanager
var manager = new THREE.LoadingManager();
manager.onProgress = function ( item, loaded, total )
   {
    console.log( item, loaded, total );
    //proxy準備できたらloading→proxy切り替え
    if(loaded/total == 0.5)
      {
       document.getElementById("loader").style.display="none";
       document.getElementById("stage").style.display="block";
      }
    //proxy→本線切り替えとproxy用mesh remove
    if(loaded/total == 1)
      {
       group.add(mesh2);
       group.remove(mesh);
      }
   };

             material = new THREE.MeshBasicMaterial( {
             map: new THREE.TextureLoader(manager).load(src1,function(texture){
             texture.minFilter=THREE.LinearFilter;
　           texture.mapping=THREE.UVMapping;
              })
              });

             material2 = new THREE.MeshBasicMaterial( {
             map: new THREE.TextureLoader(manager).load(src2,function(texture){
             texture.minFilter=THREE.LinearFilter;
　           texture.mapping=THREE.UVMapping;
              })
              });



    var ua = navigator.userAgent;
    if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0) {
        var sp = true;
    }else if(ua.indexOf('iPad') > 0 || ua.indexOf('android') > 0){
        var sp = true;
    }


var width = window.innerWidth*0.9;
var height = window.innerHeight*0.3;

  //render
  //webGL非対応端末にはDetector.jsでエラー表示。
if (!Detector.webgl)
  {
 var warning = Detector.getWebGLErrorMessage();
document.getElementById('stage').appendChild(warning);
  }else
  {
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width,height);
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('stage').appendChild(renderer.domElement);
  }
  //scene
  var scene = new THREE.Scene();

  //mesh 半径、経度・緯度分割数
  var geometry = new THREE.SphereGeometry(900,60,40);
  //x軸マイナスにして、球の裏側に映像表示
    geometry.scale( -1, 1, 1 );


　 var geometry2 = new THREE.SphereGeometry(1000,60,40);
   mesh2 = new THREE.Mesh( geometry, material2 );
   geometry2.scale( -1, 1, 1 );




  mesh = new THREE.Mesh( geometry, material );
  mesh.position.set(0,0,0);
  //mesh.rotation.z=8* Math.PI/180;
  group.add(mesh);
  scene.add(group);

  //camera
  var camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);


//control
  var controls = new THREE.OrbitControls( camera,renderer.domElement );

  camera.position.set(0,0,0.1);
  //controls.enableDamping=true;
  controls.panSpeed=0.1;
  controls.rotateSpeed=0.01;
  controls.enableDamping=true;
  controls.dampingFactor=0.1;

  if(sp){
  var gcontrols=new THREE.DeviceOrientationControls(camera);
  }
  /*helper
  var axis = new THREE.AxisHelper(100);
  axis.position.set(0,0,0);
  scene.add(axis);*/





  function rend(){
    requestAnimationFrame(rend);
    //画面リサイズ対応
    mesh.rotation.y += 0.015 * Math.PI/180;
    if(mesh2){
    mesh2.rotation.y += 0.015 * Math.PI/180;
    }
    controls.update();

    if(sp){
    gcontrols.update();
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







