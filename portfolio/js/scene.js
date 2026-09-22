import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { orbitCards } from './data.js';

const wrap = document.querySelector('.scene-wrap');
const canvas = document.getElementById('scene-canvas');
const fallback = document.getElementById('sceneFallback');
const fallbackGrid = document.getElementById('fallbackGrid');

let activeId = null;
const listeners = [];

export function onNodeSelect(fn) {
  listeners.push(fn);
}

function emitSelect(id) {
  listeners.forEach((fn) => fn(id));
}

export function setActiveNode(id) {
  activeId = id;
  document.querySelectorAll('.node-label').forEach((el) => {
    el.classList.toggle('active', el.dataset.id === id);
  });
}

function supportsWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

function fibonacciSphere(count, radius) {
  const points = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    points.push(new THREE.Vector3(x * radius, y * radius * 0.85, z * radius));
  }
  return points;
}

function buildFallback() {
  wrap.style.display = 'none';
  fallback.hidden = false;
  fallback.style.height = '40vh';
  orbitCards.forEach((c) => {
    const btn = document.createElement('button');
    btn.className = 'glass';
    btn.textContent = c.label;
    btn.style.cssText = 'border-radius:12px;padding:.8rem .6rem;font-family:JetBrains Mono,monospace;font-size:.68rem;color:var(--ink);';
    btn.addEventListener('click', () => emitSelect(c.id));
    fallbackGrid.appendChild(btn);
  });
}

export function initScene() {
  if (!supportsWebGL()) {
    buildFallback();
    return;
  }

  const isMobile = () => window.innerWidth < 768;
  const radius = isMobile() ? 3.1 : 3.8;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, wrap.clientWidth / wrap.clientHeight, 0.1, 100);
  camera.position.set(0, 0.6, 8);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(wrap.clientWidth, wrap.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile() ? 1.4 : 2));

  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(wrap.clientWidth, wrap.clientHeight);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0';
  labelRenderer.domElement.style.left = '0';
  labelRenderer.domElement.style.pointerEvents = 'none';
  wrap.appendChild(labelRenderer.domElement);

  // Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  const dirLight = new THREE.DirectionalLight(0x6ee7f9, 0.6);
  dirLight.position.set(4, 4, 4);
  scene.add(dirLight);
  const pointLight = new THREE.PointLight(0xa78bfa, 8, 5);
  scene.add(pointLight);

  // Core wireframe icosahedron
  const coreGeo = new THREE.IcosahedronGeometry(1.15, 1);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x0c1020, wireframe: true, emissive: 0x6ee7f9, emissiveIntensity: 0.35,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  scene.add(core);

  const innerMat = new THREE.MeshBasicMaterial({ color: 0x05060b, transparent: true, opacity: 0.55 });
  const inner = new THREE.Mesh(coreGeo, innerMat);
  inner.scale.setScalar(0.985);
  scene.add(inner);

  // Nodes
  const positions = fibonacciSphere(orbitCards.length, radius);
  const nodeGroup = new THREE.Group();
  scene.add(nodeGroup);

  const nodes = orbitCards.map((card, i) => {
    const basePos = positions[i];
    const group = new THREE.Group();
    group.position.copy(basePos);

    const sphereGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const sphereMat = new THREE.MeshStandardMaterial({ color: 0x3a4270 });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.userData = { id: card.id };
    group.add(sphere);

    const labelEl = document.createElement('button');
    labelEl.className = 'node-label';
    labelEl.dataset.id = card.id;
    labelEl.textContent = card.label;
    labelEl.addEventListener('click', () => emitSelect(card.id));
    const label = new CSS2DObject(labelEl);
    label.position.set(0, 0, 0);
    group.add(label);

    const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), basePos]);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x2a3358, transparent: true, opacity: 0.35 });
    const line = new THREE.Line(lineGeo, lineMat);
    scene.add(line);

    nodeGroup.add(group);
    return { id: card.id, group, sphere, sphereMat, line, lineMat, basePos, index: i };
  });

  // Raycasting for click/hover on spheres
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let hoveredId = null;

  function updatePointer(e) {
    const rect = canvas.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    pointer.x = ((cx - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((cy - rect.top) / rect.height) * 2 + 1;
  }

  canvas.addEventListener('pointermove', (e) => {
    updatePointer(e);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(nodes.map((n) => n.sphere));
    hoveredId = hits.length ? hits[0].object.userData.id : null;
    canvas.style.cursor = hoveredId ? 'pointer' : 'grab';
  });

  canvas.addEventListener('click', (e) => {
    updatePointer(e);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(nodes.map((n) => n.sphere));
    if (hits.length) emitSelect(hits[0].object.userData.id);
  });

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enablePan = false;
  controls.enableZoom = true;
  controls.minDistance = 4.5;
  controls.maxDistance = 11;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;
  controls.rotateSpeed = 0.5;
  controls.dampingFactor = 0.08;
  controls.enableDamping = true;

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    const delta = clock.getDelta();

    core.rotation.y += delta * 0.15;
    core.rotation.x += delta * 0.05;

    nodes.forEach((n) => {
      const offset = Math.sin(t * 0.6 + n.index * 1.7) * 0.12;
      n.group.position.set(n.basePos.x, n.basePos.y + offset, n.basePos.z);

      const isActive = n.id === activeId;
      const isHover = n.id === hoveredId;
      const targetScale = isActive ? 1.5 : isHover ? 1.25 : 1;
      n.sphere.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
      n.sphereMat.color.set(isActive ? 0x6ee7f9 : isHover ? 0xa78bfa : 0x3a4270);
      n.sphereMat.emissive.set(isActive ? 0x6ee7f9 : 0x000000);
      n.sphereMat.emissiveIntensity = isActive ? 0.8 : 0;

      n.lineMat.color.set(isActive ? 0x6ee7f9 : 0x2a3358);
      n.lineMat.opacity = isActive ? 0.9 : 0.35;
      const posAttr = n.line.geometry.attributes.position;
      posAttr.setXYZ(1, n.group.position.x, n.group.position.y, n.group.position.z);
      posAttr.needsUpdate = true;
    });

    controls.update();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  }
  animate();

  function handleResize() {
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    labelRenderer.setSize(w, h);
  }
  window.addEventListener('resize', handleResize);

  onNodeSelect((id) => setActiveNode(id));
}
