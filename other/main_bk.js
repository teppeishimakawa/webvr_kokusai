

    var ua = navigator.userAgent;
    if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0) {
        var sp = true;
    }else if(ua.indexOf('iPad') > 0 || ua.indexOf('android') > 0){
        var sp = true;
    }


var flg;
var width = window.innerWidth*0.7;
var height = window.innerHeight*0.3;
var controls;



  //scene
  var scene = new THREE.Scene();

  //mesh 半径、経度・緯度分割数
  var geometry = new THREE.SphereGeometry(60);
  //x軸マイナスにして、球の裏側に映像表示
    geometry.scale( -1, 1, 1 );

  var material = new THREE.MeshBasicMaterial( {
       map: new THREE.TextureLoader().load('./test.jpg')
  } );

  mesh = new THREE.Mesh( geometry, material );
  mesh.position.set(0,0,0);
  //mesh.rotation.z=8* Math.PI/180;
  scene.add(mesh);

  //camera

  var camera = new THREE.PerspectiveCamera(70, width / height, 1, 100);
  camera.position.set(0,0,0.1);
  camera.lookAt(new THREE.Vector3(0,0,0));


  /*helper
  var axis = new THREE.AxisHelper(100);
  axis.position.set(0,0,0);
  scene.add(axis);*/

  //render
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width,height);
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('stage').appendChild(renderer.domElement);

if(sp){
 controls=new THREE.DeviceOrientationControls(camera, renderer.domElement);
}else{
 controls=new THREE.OrbitControls(camera, renderer.domElement);
}
  function rend(){
    requestAnimationFrame(rend);
    //画面リサイズ対応
    window.addEventListener( 'resize', onWindowResize, false );
    mesh.rotation.y += 0.02 * Math.PI/180;

　  controls.update();
    //gcontrols.update();
    renderer.render(scene,camera);
   }



  rend();

  function onWindowResize()
    {
    //camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(width,height);
    }





