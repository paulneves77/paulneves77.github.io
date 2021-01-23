import 'aframe';
import 'aframe-extras';
import 'aframe-forcegraph-component';

import Kapsule from 'kapsule';

//

export default Kapsule({

  props: {
    width: { default: window.innerWidth, triggerUpdate: false, onChange(width, state) { if(state.container) state.container.style.width = width }},
    height: { default: window.innerHeight, triggerUpdate: false, onChange(height, state) { if(state.container) state.container.style.height = height }},
    jsonUrl: {},
    graphData: { default: { nodes: [], links: [] }},
    numDimensions: { default: 3 },
    dagMode: {},
    dagLevelDistance: {},
    dagNodeFilter: { default: () => true },
    onDagError: { default: undefined },
    backgroundColor: { default: '#002' },
    showNavInfo: { default: true },
    nodeRelSize: { default: 4 }, // volume per val unit
    nodeId: { default: 'id' },
    nodeLabel: { default: 'name' },
    nodeDesc: { default: 'desc' },
    onNodeCenterHover: {},
    nodeVal: { default: 'val' },
    nodeResolution: { default: 8 }, // how many slice segments in the sphere's circumference
    nodeVisibility: { default: true },
    nodeColor: { default: 'color' },
    nodeAutoColorBy: {},
    nodeOpacity: { default: 0.75 },
    nodeThreeObject: {},
    nodeThreeObjectExtend: { default: false },
    linkSource: { default: 'source' },
    linkTarget: { default: 'target' },
    linkLabel: { default: 'name' },
    linkDesc: { default: 'desc' },
    onLinkCenterHover: {},
    linkHoverPrecision: { default: 2 },
    linkVisibility: { default: true },
    linkColor: { default: 'color' },
    linkAutoColorBy: {},
    linkOpacity: { default: 0.2 },
    linkWidth: { default: 0 },
    linkResolution: { default: 6 }, // how many radial segments in each line cylinder's geometry
    linkCurvature: { default: 0 },
    linkCurveRotation: { default: 0 },
    linkMaterial: {},
    linkThreeObject: {},
    linkThreeObjectExtend: { default: false },
    linkPositionUpdate: {},
    linkDirectionalArrowLength: { default: 0 },
    linkDirectionalArrowColor: {},
    linkDirectionalArrowRelPos: { default: 0.5 }, // value between 0<>1 indicating the relative pos along the (exposed) line
    linkDirectionalArrowResolution: { default: 8 }, // how many slice segments in the arrow's conic circumference
    linkDirectionalParticles: { default: 0 }, // animate photons travelling in the link direction
    linkDirectionalParticleSpeed: { default: 0.01 }, // in link length ratio per frame
    linkDirectionalParticleWidth: { default: 0.5 },
    linkDirectionalParticleColor: {},
    linkDirectionalParticleResolution: { default: 4 }, // how many slice segments in the particle sphere's circumference
    forceEngine: { default: 'd3' }, // d3 or ngraph
    d3AlphaMin: { default: 0 },
    d3AlphaDecay: { default: 0.0228 },
    d3VelocityDecay: { default: 0.4 },
    ngraphPhysics: {},
    warmupTicks: { default: 0 }, // how many times to tick the force engine at init before starting to render
    cooldownTicks: {},
    cooldownTime: { default: 15000 }, // ms
    onEngineTick: {},
    onEngineStop: {}
  },

  methods: {
    // pass-through methods
    ...Object.assign({}, ...[
      'getGraphBbox',
      'emitParticle',
      'd3Force',
      'd3ReheatSimulation',
      'refresh'
    ].map(method => ({
      [method]: function (state, ...args) {
        const aframeComp = state.forcegraph.components.forcegraph;
        const returnVal = aframeComp[method](...args);

        return returnVal === aframeComp
          ? this // chain based on this object, not the inner aframe component
          : returnVal;
      }
    }))),
    _destructor: function() {
      this.graphData({ nodes: [], links: [] });
    }
  },

  init(domNode, state) {
    // Wipe DOM
    domNode.innerHTML = '';

    state.container = document.createElement('div');
    domNode.appendChild(state.container);
    state.container.style.position = 'relative';
    state.container.style.width = state.width;
    state.container.style.height = state.height;

    // Add nav info section
    state.container.appendChild(state.navInfo = document.createElement('div'));
    state.navInfo.className = 'graph-nav-info';
    state.navInfo.textContent = 'Mouse drag: look, gamepad/arrow/wasd keys: move';

    // Create scene
    const scene = document.createElement('a-scene');
    scene.setAttribute('embedded', '');
    //scene.setAttribute('stats', null);

    scene.appendChild(state.sky = document.createElement('a-sky'));
    state.sky.setAttribute('radius', 5000);

    // Add camera and cursor
    let cameraG;
    scene.appendChild(cameraG = document.createElement('a-entity'));
    cameraG.setAttribute('position', '0 0 300');
    cameraG.setAttribute('movement-controls', 'fly: true; speed: 7');

    let camera;
    cameraG.appendChild(camera = document.createElement('a-entity'));
    camera.setAttribute('camera', '');
    camera.setAttribute('position', '0 0.001 0');
    camera.setAttribute('look-controls', 'reverseMouseDrag: false; pointerLockEnabled: true');

    let cursor;
    camera.appendChild(cursor = document.createElement('a-cursor'));
    cursor.setAttribute('color', 'lavender');
    cursor.setAttribute('opacity', 0.5);
    cursor.setAttribute('raycaster', 'objects: ----none----'); // disable cursor raycaster

    // Add forcegraph entity
    scene.appendChild(state.forcegraph = document.createElement('a-entity'));
    state.forcegraph.setAttribute('forcegraph', null);

    // attach scene
    state.container.appendChild(scene);
  },

  update(state, changedProps) {
    changedProps.hasOwnProperty('backgroundColor') && state.sky.setAttribute('color', state.backgroundColor);
    changedProps.hasOwnProperty('showNavInfo') && (state.navInfo.style.display = state.showNavInfo ? null : 'none');

    const passThroughProps = [
      'jsonUrl',
      'numDimensions',
      'dagMode',
      'dagLevelDistance',
      'dagNodeFilter',
      'onDagError',
      'nodeRelSize',
      'nodeId',
      'nodeLabel',
      'nodeDesc',
      'onNodeCenterHover',
      'nodeVal',
      'nodeResolution',
      'nodeVisibility',
      'nodeColor',
      'nodeAutoColorBy',
      'nodeOpacity',
      'nodeThreeObject',
      'nodeThreeObjectExtend',
      'linkSource',
      'linkTarget',
      'linkLabel',
      'linkDesc',
      'onLinkCenterHover',
      'linkHoverPrecision',
      'linkVisibility',
      'linkColor',
      'linkAutoColorBy',
      'linkOpacity',
      'linkWidth',
      'linkResolution',
      'linkCurvature',
      'linkCurveRotation',
      'linkMaterial',
      'linkThreeObject',
      'linkThreeObjectExtend',
      'linkPositionUpdate',
      'linkDirectionalArrowLength',
      'linkDirectionalArrowColor',
      'linkDirectionalArrowRelPos',
      'linkDirectionalArrowResolution',
      'linkDirectionalParticles',
      'linkDirectionalParticleSpeed',
      'linkDirectionalParticleWidth',
      'linkDirectionalParticleColor',
      'linkDirectionalParticleResolution',
      'forceEngine',
      'd3AlphaMin',
      'd3AlphaDecay',
      'd3VelocityDecay',
      'ngraphPhysics',
      'warmupTicks',
      'cooldownTicks',
      'cooldownTime',
      'onEngineTick',
      'onEngineStop'
    ];

    const newProps = Object.assign({},
      ...Object.entries(state)
        .filter(([prop, val]) => changedProps.hasOwnProperty(prop) && passThroughProps.indexOf(prop) != -1 && val !== undefined && val !== null)
        .map(([key, val]) => ({ [key]: val })),
      ...Object.entries(state.graphData)
        .map(([key, val]) => ({ [key]: val })) // pass nodes & links as separate props
    );

    state.forcegraph.setAttribute('forcegraph', newProps);
  }
});
