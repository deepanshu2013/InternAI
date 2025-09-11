
  // Grab the canvas
  const canvas = document.getElementById("bgCanvas");

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    3000
  );

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,    // transparent background
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Particle Geometry
  const geometry = new THREE.BufferGeometry();
  const vertices = [];

  const particleCount = 1500;
  for (let i = 0; i < particleCount; i++) {
    vertices.push(
      (Math.random() - 0.5) * 2000,
      (Math.random() - 0.5) * 2000,
      (Math.random() - 0.5) * 2000
    );
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  // Particle Material
  const material = new THREE.PointsMaterial({
    color: 0xffffff,  // subtle white
    size: 2,
    transparent: true,
    opacity: 0.6
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Camera position
  camera.position.z = 1000;

  // Animate function
  function animate() {
    requestAnimationFrame(animate);

    // Subtle rotation for realism
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0007;

    renderer.render(scene, camera);
  }
  animate();

  // Responsive
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

