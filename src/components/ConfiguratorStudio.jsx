import React, { useState, useEffect } from 'react';
import { Sliders, Check, ShoppingBag, Share2, Ruler, Box, Play, Pause, RotateCw, Eye, Sun } from 'lucide-react';
import Instagram from './InstagramIcon';
import { CONFIGURABLE_MODELS, MATERIALS, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/furnitureData';

// 3D Perspective Projection Engine
function project3D(x, y, z, rotYDeg, rotXDeg = 20, center = { x: 250, y: 200 }, focalLength = 480) {
  const radY = (rotYDeg * Math.PI) / 180;
  const radX = (rotXDeg * Math.PI) / 180;

  // 1. Rotate around Y axis (Turntable spin)
  const x1 = x * Math.cos(radY) + z * Math.sin(radY);
  const z1 = -x * Math.sin(radY) + z * Math.cos(radY);
  const y1 = y;

  // 2. Rotate around X axis (Camera tilt)
  const y2 = y1 * Math.cos(radX) - z1 * Math.sin(radX);
  const z2 = y1 * Math.sin(radX) + z1 * Math.cos(radX);
  const x2 = x1;

  // 3. Perspective scale & screen coordinates
  const scale = focalLength / (focalLength + z2 + 250);
  const px = center.x + x2 * scale;
  const py = center.y - y2 * scale;

  return { x: px, y: py, z: z2, scale, rawX: x2, rawY: y2 };
}

// Compute normal lighting shading for 3D faces
function getShading(p1, p2, p3, lightDir = { x: -0.6, y: 1.0, z: 0.7 }) {
  const ux = p2.x - p1.x, uy = p2.y - p1.y, uz = p2.z - p1.z;
  const vx = p3.x - p1.x, vy = p3.y - p1.y, vz = p3.z - p1.z;
  const nx = uy * vz - uz * vy;
  const ny = uz * vx - ux * vz;
  const nz = ux * vy - uy * vx;
  const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
  const normX = nx / len, normY = ny / len, normZ = nz / len;

  const lLen = Math.sqrt(lightDir.x ** 2 + lightDir.y ** 2 + lightDir.z ** 2);
  const dot = (normX * lightDir.x + normY * lightDir.y + normZ * lightDir.z) / lLen;
  return Math.max(0.3, Math.min(1.0, 0.65 + dot * 0.45));
}

// Convert hex/color to shaded version
function adjustColorBrightness(hexOrColor, factor) {
  if (!hexOrColor || !hexOrColor.startsWith('#')) return hexOrColor;
  let hex = hexOrColor.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const num = parseInt(hex, 16);
  let r = Math.min(255, Math.max(0, Math.round((num >> 16) * factor)));
  let g = Math.min(255, Math.max(0, Math.round(((num >> 8) & 0x00FF) * factor)));
  let b = Math.min(255, Math.max(0, Math.round((num & 0x0000FF) * factor)));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export default function ConfiguratorStudio({ onAddToCart, currency, formatPrice }) {
  const [selectedModel, setSelectedModel] = useState(CONFIGURABLE_MODELS[0]);
  const [primaryMaterial, setPrimaryMaterial] = useState(
    MATERIALS.find(m => m.id === CONFIGURABLE_MODELS[0].defaultMaterial) || MATERIALS[0]
  );
  const [secondaryMaterial, setSecondaryMaterial] = useState(
    MATERIALS.find(m => m.id === CONFIGURABLE_MODELS[0].secondaryMaterial) || MATERIALS[1]
  );
  const [dimensions, setDimensions] = useState({
    length: CONFIGURABLE_MODELS[0].dimensions.length.default,
    width: CONFIGURABLE_MODELS[0].dimensions.width.default,
    height: CONFIGURABLE_MODELS[0].dimensions.height.default,
  });

  const [activeTab, setActiveTab] = useState('materials'); // 'materials', 'dimensions'
  const [viewMode, setViewMode] = useState('3d'); // '3d', 'photo'
  const [rotationAngle, setRotationAngle] = useState(35); // 3D rotation angle (-180 to 180)
  const [tiltAngle, setTiltAngle] = useState(22); // 3D vertical tilt angle
  const [autoSpin, setAutoSpin] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [copiedCode, setCopiedCode] = useState(false);
  const [lightPreset, setLightPreset] = useState('warm'); // 'warm', 'studio', 'dramatic'

  // Auto 360 degree turntable loop
  useEffect(() => {
    let animationFrame;
    if (autoSpin && viewMode === '3d') {
      const spinLoop = () => {
        setRotationAngle(prev => (prev + 0.8) % 360);
        animationFrame = requestAnimationFrame(spinLoop);
      };
      animationFrame = requestAnimationFrame(spinLoop);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [autoSpin, viewMode]);

  // Mouse & Touch 360 Drag-to-Rotate Handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX || (e.touches && e.touches[0].clientX) || 0,
      y: e.clientY || (e.touches && e.touches[0].clientY) || 0,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const currentY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const deltaX = currentX - dragStart.x;
    const deltaY = currentY - dragStart.y;
    
    setRotationAngle(prev => (prev + deltaX * 0.7) % 360);
    setTiltAngle(prev => Math.max(5, Math.min(65, prev - deltaY * 0.3)));
    
    setDragStart({ x: currentX, y: currentY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Switch furniture model and sync default materials & dimensions
  const handleModelChange = (model) => {
    setSelectedModel(model);
    setPrimaryMaterial(MATERIALS.find(m => m.id === model.defaultMaterial) || MATERIALS[0]);
    setSecondaryMaterial(MATERIALS.find(m => m.id === model.secondaryMaterial) || MATERIALS[1]);
    setDimensions({
      length: model.dimensions.length.default,
      width: model.dimensions.width.default,
      height: model.dimensions.height.default,
    });
  };

  // Dynamic price estimation
  const calculatePrice = () => {
    const base = selectedModel.basePrice;
    const lenRatio = dimensions.length / selectedModel.dimensions.length.default;
    const widRatio = dimensions.width / selectedModel.dimensions.width.default;
    const matMult = (primaryMaterial.priceMultiplier + secondaryMaterial.priceMultiplier) / 2;
    return Math.round(base * lenRatio * widRatio * matMult);
  };

  const currentPrice = calculatePrice();

  const calculatedWeight = Math.round(
    (dimensions.length * dimensions.width * dimensions.height * 0.00035) * primaryMaterial.priceMultiplier
  );

  const handleAddToCart = () => {
    const customItem = {
      id: `custom-${selectedModel.id}-${Date.now()}`,
      name: `${selectedModel.name} (Bespoke Custom)`,
      category: selectedModel.category,
      price: currentPrice,
      image: selectedModel.images[0],
      dimensions: `${dimensions.length} L × ${dimensions.width} W × ${dimensions.height} H cm`,
      primaryMaterial: primaryMaterial.name,
      secondaryMaterial: secondaryMaterial.name,
      customBuild: true,
      leadTime: `${selectedModel.craftTimeWeeks} Weeks Craft Time`,
    };
    onAddToCart(customItem);
  };

  const handleCopySpecCode = () => {
    const specText = `COUNT KUSTOM ATELIER SPEC: ${selectedModel.name} | ${primaryMaterial.name} + ${secondaryMaterial.name} | ${dimensions.length}x${dimensions.width}x${dimensions.height} cm | Est: ${formatPrice(currentPrice, currency)}`;
    navigator.clipboard.writeText(specText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  // Dimensional Scaling Factor for 3D Geometry
  const scaleL = dimensions.length / selectedModel.dimensions.length.default;
  const scaleW = dimensions.width / selectedModel.dimensions.width.default;
  const scaleH = dimensions.height / selectedModel.dimensions.height.default;

  // Base Bounding Dimensions for 3D CAD mesh (in virtual units)
  const baseL = 160 * Math.max(0.7, Math.min(1.35, scaleL));
  const baseW = 85 * Math.max(0.7, Math.min(1.35, scaleW));
  const baseH = 75 * Math.max(0.7, Math.min(1.35, scaleH));

  // Build 3D Polygons & Geometry Mesh dynamically for the selected model
  const render3DFurnitureMesh = () => {
    const faces = [];
    const lightDir = lightPreset === 'dramatic'
      ? { x: -0.9, y: 1.2, z: 0.3 }
      : lightPreset === 'studio'
      ? { x: 0, y: 1.5, z: 1.0 }
      : { x: -0.5, y: 1.0, z: 0.8 };

    const primColor = primaryMaterial.color;
    const secColor = secondaryMaterial.color;

    // Helper to generate a 3D Box / Cuboid face set
    const addBox3D = (xMin, xMax, yMin, yMax, zMin, zMax, colorHex, patternId = null, opacity = 1) => {
      const vertices = [
        { x: xMin, y: yMin, z: zMin }, // 0
        { x: xMax, y: yMin, z: zMin }, // 1
        { x: xMax, y: yMax, z: zMin }, // 2
        { x: xMin, y: yMax, z: zMin }, // 3
        { x: xMin, y: yMin, z: zMax }, // 4
        { x: xMax, y: yMin, z: zMax }, // 5
        { x: xMax, y: yMax, z: zMax }, // 6
        { x: xMin, y: yMax, z: zMax }, // 7
      ];

      const proj = vertices.map(v => project3D(v.x, v.y, v.z, rotationAngle, tiltAngle));

      const boxFaces = [
        { name: 'front', idx: [4, 5, 6, 7], rawPts: [vertices[4], vertices[5], vertices[6]] },
        { name: 'back', idx: [1, 0, 3, 2], rawPts: [vertices[1], vertices[0], vertices[3]] },
        { name: 'top', idx: [3, 2, 6, 7], rawPts: [vertices[3], vertices[2], vertices[6]] },
        { name: 'bottom', idx: [4, 5, 1, 0], rawPts: [vertices[4], vertices[5], vertices[1]] },
        { name: 'left', idx: [0, 4, 7, 3], rawPts: [vertices[0], vertices[4], vertices[7]] },
        { name: 'right', idx: [5, 1, 2, 6], rawPts: [vertices[5], vertices[1], vertices[2]] },
      ];

      boxFaces.forEach(f => {
        const pts = f.idx.map(i => proj[i]);
        const shade = getShading(f.rawPts[0], f.rawPts[1], f.rawPts[2], lightDir);
        const avgZ = pts.reduce((sum, p) => sum + p.z, 0) / pts.length;
        const shadedColor = adjustColorBrightness(colorHex, shade);

        faces.push({
          pts,
          fill: patternId ? `url(#${patternId})` : shadedColor,
          baseColor: shadedColor,
          shade,
          avgZ,
          opacity,
          stroke: adjustColorBrightness(colorHex, shade * 0.7),
          strokeWidth: 0.75,
        });
      });
    };

    // Category 1: DINING / LIVE-EDGE TABLE
    if (selectedModel.category === 'Dining' || selectedModel.category === 'Live-Edge' || selectedModel.category === 'Tables') {
      const topElevation = baseH;
      const slabThickness = 14;

      // 1. Table Top Slab Box
      addBox3D(-baseL / 2, baseL / 2, topElevation - slabThickness, topElevation, -baseW / 2, baseW / 2, primColor, 'woodGrain');

      // 2. Table Legs (Hairpin Steel vs Monolithic Pedestals)
      if (secondaryMaterial.id === 'hairpin-metal') {
        const legOffsets = [
          { x: -baseL / 2 + 20, z: -baseW / 2 + 18 },
          { x: baseL / 2 - 20, z: -baseW / 2 + 18 },
          { x: -baseL / 2 + 20, z: baseW / 2 - 18 },
          { x: baseL / 2 - 20, z: baseW / 2 - 18 },
        ];

        legOffsets.forEach(pos => {
          const topPoint = project3D(pos.x, topElevation - slabThickness, pos.z, rotationAngle, tiltAngle);
          const bottomPoint = project3D(pos.x * 0.9, 0, pos.z * 0.9, rotationAngle, tiltAngle);
          const midPoint = project3D(pos.x * 1.05, (topElevation - slabThickness) * 0.5, pos.z * 1.05, rotationAngle, tiltAngle);

          faces.push({
            type: 'hairpinLeg',
            pts: [topPoint, midPoint, bottomPoint],
            avgZ: (topPoint.z + bottomPoint.z) / 2,
            color: secColor,
          });
        });
      } else {
        // Monolithic Block / Stone Pedestals
        const pedWidth = 24;
        const pedDepth = baseW * 0.75;
        const leftPedX = -baseL * 0.3;
        const rightPedX = baseL * 0.3;

        addBox3D(leftPedX - pedWidth / 2, leftPedX + pedWidth / 2, 0, topElevation - slabThickness, -pedDepth / 2, pedDepth / 2, secColor, 'baseGrain');
        addBox3D(rightPedX - pedWidth / 2, rightPedX + pedWidth / 2, 0, topElevation - slabThickness, -pedDepth / 2, pedDepth / 2, secColor, 'baseGrain');
      }

    } else if (selectedModel.category === 'Seating') {
      // Category 2: ARMCHAIR SEATING
      const seatH = 35 * Math.max(0.7, scaleH);
      const cushionH = 22;
      const backH = 80 * Math.max(0.7, scaleH);
      const chairW = baseW * 1.1;
      const chairL = baseW * 1.05;

      // 4 Tapered Wooden Legs
      const legInset = 16;
      addBox3D(-chairL / 2 + legInset, -chairL / 2 + legInset + 10, 0, seatH, -chairW / 2 + legInset, -chairW / 2 + legInset + 10, secColor, 'baseGrain');
      addBox3D(chairL / 2 - legInset - 10, chairL / 2 - legInset, 0, seatH, -chairW / 2 + legInset, -chairW / 2 + legInset + 10, secColor, 'baseGrain');
      addBox3D(-chairL / 2 + legInset, -chairL / 2 + legInset + 10, 0, seatH, chairW / 2 - legInset - 10, chairW / 2 - legInset, secColor, 'baseGrain');
      addBox3D(chairL / 2 - legInset - 10, chairL / 2 - legInset, 0, seatH, chairW / 2 - legInset - 10, chairW / 2 - legInset, secColor, 'baseGrain');

      // Seat Cushion
      addBox3D(-chairL / 2, chairL / 2, seatH, seatH + cushionH, -chairW / 2, chairW / 2, primColor, 'linenFabric');

      // Backrest Cushion
      addBox3D(-chairL / 2, chairL / 2, seatH + cushionH, backH, -chairW / 2, -chairW / 2 + 20, primColor, 'linenFabric');

      // Wooden Side Armrest Rails
      addBox3D(-chairL / 2 - 8, -chairL / 2 + 4, seatH, seatH + 30, -chairW / 2, chairW / 2, secColor, 'baseGrain');
      addBox3D(chairL / 2 - 4, chairL / 2 + 8, seatH, seatH + 30, -chairW / 2, chairW / 2, secColor, 'baseGrain');

    } else {
      // Category 3: STORAGE CREDENZA / CONSOLE
      const credH = baseH * 0.9;
      const legH = 20;

      // Monolithic Console Body Box
      addBox3D(-baseL / 2, baseL / 2, legH, credH, -baseW / 2, baseW / 2, primColor, 'woodGrain');

      // Monolithic Block Base Supports
      addBox3D(-baseL * 0.4, -baseL * 0.2, 0, legH, -baseW * 0.4, baseW * 0.4, secColor, 'baseGrain');
      addBox3D(baseL * 0.2, baseL * 0.4, 0, legH, -baseW * 0.4, baseW * 0.4, secColor, 'baseGrain');
    }

    // Sort faces Painter's algorithm (furthest average Z rendered first)
    faces.sort((a, b) => a.avgZ - b.avgZ);
    return faces;
  };

  const meshFaces = viewMode === '3d' ? render3DFurnitureMesh() : [];

  return (
    <section id="configurator" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F1EA] border-b border-[#E6DFD5] relative selection:bg-[#EAE4DA]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#FAF8F5] border border-[#D8CEBE] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#4A453E]">
            <Sliders className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Interactive Bespoke Studio Lab</span>
          </div>
          <h2 className="font-serif-lim text-4xl sm:text-5xl text-[#1C1B18] font-light tracking-tight">
            Configure Your Custom Piece
          </h2>
          <p className="text-sm sm:text-base text-[#6E6659]">
            Rotate 360° in 3D perspective. Customize tactile wood grain textures, champagne metal accents & millimeter dimensions.
          </p>
        </div>

        {/* Main Configurator Box Grid */}
        <div className="bg-[#FAF8F5] rounded-3xl border border-[#E0D7C9] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Canvas Visualizer (7 Cols) */}
          <div className="lg:col-span-7 bg-[#F0EAE1] p-6 sm:p-8 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-[#E0D7C9]">
            
            {/* Top Toolbar */}
            <div className="flex items-center justify-between z-10 gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest bg-[#1C1B18] text-[#FAF8F5] px-3 py-1 rounded-full">
                  LIVE 3D VECTOR ENGINE
                </span>
                <span className="text-xs text-[#7C7569] font-medium hidden sm:inline truncate max-w-[180px]">
                  {selectedModel.name}
                </span>
              </div>

              {/* View Mode & Orbit Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setAutoSpin(!autoSpin)}
                  className={`px-3 py-1 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1 ${
                    autoSpin
                      ? 'bg-[#D4AF37] text-[#1C1B18] border-[#1C1B18] shadow-sm'
                      : 'bg-white/80 text-[#4A453E] border-[#D8CEBE] hover:bg-white'
                  }`}
                  title="Toggle 360° Auto Turntable"
                >
                  {autoSpin ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{autoSpin ? 'Spinning' : '360° Orbit'}</span>
                </button>

                <div className="flex items-center gap-1 bg-[#EAE4DA] p-1 rounded-xl border border-[#D8CEBE]">
                  <button
                    onClick={() => setViewMode('3d')}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 ${
                      viewMode === '3d'
                        ? 'bg-[#1C1B18] text-[#FAF8F5] shadow-sm'
                        : 'text-[#4A453E] hover:text-[#1C1B18]'
                    }`}
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>3D CAD</span>
                  </button>
                  <button
                    onClick={() => setViewMode('photo')}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 ${
                      viewMode === 'photo'
                        ? 'bg-[#1C1B18] text-[#FAF8F5] shadow-sm'
                        : 'text-[#4A453E] hover:text-[#1C1B18]'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Photo View</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Central Interactive Render Canvas */}
            <div 
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchMove={handleMouseMove}
              onTouchEnd={handleMouseUp}
              className={`my-6 relative flex items-center justify-center min-h-[400px] sm:min-h-[460px] bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6] to-[#E5DDCF] rounded-2xl border border-[#E0D7C9] overflow-hidden shadow-inner p-4 ${
                viewMode === '3d' ? 'cursor-grab active:cursor-grabbing select-none' : ''
              }`}
            >
              
              {viewMode === '3d' ? (
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  
                  {/* SVG 3D Model Rendering Stage */}
                  <div className="w-full max-w-lg h-72 sm:h-80 flex items-center justify-center pointer-events-none">
                    <svg viewBox="0 0 500 400" className="w-full h-full drop-shadow-2xl overflow-visible">
                      
                      {/* Rich Texture Definitions */}
                      <defs>
                        {/* Organic Wood Grain Pattern */}
                        <pattern id="woodGrain" width="60" height="60" patternUnits="userSpaceOnUse">
                          <rect width="60" height="60" fill={primaryMaterial.color} />
                          <path d="M0 15 Q30 5 60 15 M0 35 Q30 45 60 35 M0 50 Q30 40 60 50" fill="none" stroke="rgba(0,0,0,0.14)" strokeWidth="1.5" />
                          <path d="M15 0 Q20 30 15 60 M45 0 Q40 30 45 60" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                        </pattern>

                        {/* Secondary Frame Texture Pattern */}
                        <pattern id="baseGrain" width="40" height="40" patternUnits="userSpaceOnUse">
                          <rect width="40" height="40" fill={secondaryMaterial.color} />
                          <line x1="0" y1="0" x2="40" y2="40" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
                          <circle cx="20" cy="20" r="2" fill="rgba(0,0,0,0.08)" />
                        </pattern>

                        {/* Raw Belgian Linen Fabric Pattern */}
                        <pattern id="linenFabric" width="20" height="20" patternUnits="userSpaceOnUse">
                          <rect width="20" height="20" fill={primaryMaterial.color} />
                          <line x1="0" y1="5" x2="20" y2="5" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                          <line x1="0" y1="15" x2="20" y2="15" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                          <line x1="5" y1="0" x2="5" y2="20" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                          <line x1="15" y1="0" x2="15" y2="20" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                        </pattern>

                        {/* Specular Highlight Sheen Gradient */}
                        <linearGradient id="sheenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                          <stop offset="40%" stopColor="rgba(255,255,255,0.05)" />
                          <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
                        </linearGradient>
                      </defs>

                      {/* Studio Floor Grid Lines */}
                      <g stroke="rgba(28, 27, 24, 0.08)" strokeWidth="1">
                        <ellipse cx="250" cy="340" rx={190 * scaleL} ry={45 * scaleW} fill="none" />
                        <ellipse cx="250" cy="340" rx={130 * scaleL} ry={30 * scaleW} fill="none" strokeDasharray="4 4" />
                        <line x1="80" y1="340" x2="420" y2="340" />
                        <line x1="250" y1="280" x2="250" y2="380" />
                      </g>
                      
                      {/* Ambient Contact Shadow */}
                      <ellipse 
                        cx="250" 
                        cy="340" 
                        rx={160 * scaleL} 
                        ry={38 * scaleW} 
                        fill="rgba(28, 27, 24, 0.28)" 
                        filter="blur(12px)" 
                      />

                      {/* Render Sorted 3D Mesh Polygons */}
                      {meshFaces.map((face, index) => {
                        if (face.type === 'hairpinLeg') {
                          return (
                            <g key={`leg-${index}`}>
                              <path
                                d={`M ${face.pts[0].x} ${face.pts[0].y} Q ${face.pts[1].x} ${face.pts[1].y} ${face.pts[2].x} ${face.pts[2].y}`}
                                fill="none"
                                stroke={face.color}
                                strokeWidth="6"
                                strokeLinecap="round"
                              />
                              <path
                                d={`M ${face.pts[0].x} ${face.pts[0].y} Q ${face.pts[1].x} ${face.pts[1].y} ${face.pts[2].x} ${face.pts[2].y}`}
                                fill="none"
                                stroke="rgba(255,255,255,0.3)"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </g>
                          );
                        }

                        const dPath = `M ${face.pts.map(p => `${p.x},${p.y}`).join(' L ')} Z`;
                        return (
                          <g key={`face-${index}`}>
                            <path
                              d={dPath}
                              fill={face.fill}
                              stroke={face.stroke}
                              strokeWidth={face.strokeWidth}
                              opacity={face.opacity}
                            />
                            {/* Specular Sheen Overlay */}
                            <path
                              d={dPath}
                              fill="url(#sheenGradient)"
                              opacity="0.25"
                            />
                          </g>
                        );
                      })}

                      {/* CAD Dimension Guidelines */}
                      <g stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 3">
                        <line x1="80" y1="375" x2="420" y2="375" />
                        <line x1="80" y1="365" x2="80" y2="385" />
                        <line x1="420" y1="365" x2="420" y2="385" />
                        <text x="250" y="392" fill="#1C1B18" fontSize="11" fontWeight="bold" textAnchor="middle">
                          LENGTH: {dimensions.length} cm
                        </text>
                      </g>
                    </svg>
                  </div>

                  {/* Drag Helper Overlay */}
                  <div className="absolute bottom-16 inset-x-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[10px] uppercase font-bold tracking-widest bg-black/70 text-[#D4AF37] px-3.5 py-1 rounded-full backdrop-blur shadow-md">
                      👈 Click & Drag to Rotate 360° 👉
                    </span>
                  </div>

                  {/* Preset Camera View Buttons */}
                  <div className="mt-2 flex items-center gap-2 bg-white/95 backdrop-blur px-4 py-2 rounded-full border border-stone-200 shadow-sm z-10 text-xs">
                    <RotateCw className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="font-bold text-[#1C1B18] uppercase text-[10px]">Angles:</span>
                    <button 
                      onClick={() => { setRotationAngle(0); setTiltAngle(15); }}
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold transition ${rotationAngle === 0 ? 'bg-[#1C1B18] text-white' : 'bg-[#EAE4DA] text-[#1C1B18]'}`}
                    >
                      Front (0°)
                    </button>
                    <button 
                      onClick={() => { setRotationAngle(45); setTiltAngle(25); }}
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold transition ${rotationAngle === 45 ? 'bg-[#1C1B18] text-white' : 'bg-[#EAE4DA] text-[#1C1B18]'}`}
                    >
                      3/4 Iso (45°)
                    </button>
                    <button 
                      onClick={() => { setRotationAngle(90); setTiltAngle(20); }}
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold transition ${rotationAngle === 90 ? 'bg-[#1C1B18] text-white' : 'bg-[#EAE4DA] text-[#1C1B18]'}`}
                    >
                      Side (90°)
                    </button>
                  </div>

                </div>
              ) : (
                /* PHOTO MODE */
                <div className="relative w-full h-full flex items-center justify-center p-2">
                  <div 
                    className="p-2 rounded-2xl shadow-xl transition-all border-4 bg-white max-w-md"
                    style={{ borderColor: secondaryMaterial.color }}
                  >
                    <img
                      src={selectedModel.images[0]}
                      alt={selectedModel.name}
                      className="w-full max-h-[350px] object-cover rounded-xl"
                    />
                  </div>
                </div>
              )}

              {/* Active Material Spec Overlay */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3.5 py-2 rounded-xl shadow-md border border-stone-200 text-left text-xs space-y-1.5 z-10">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full border border-stone-300 shadow-inner" style={{ backgroundColor: primaryMaterial.color }}></span>
                  <span className="font-semibold text-[#1C1B18] text-[11px]">Primary: {primaryMaterial.name}</span>
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-stone-200">
                  <span className="w-3.5 h-3.5 rounded-full border border-stone-300 shadow-inner" style={{ backgroundColor: secondaryMaterial.color }}></span>
                  <span className="font-semibold text-[#1C1B18] text-[11px]">Base Frame: {secondaryMaterial.name}</span>
                </div>
              </div>

              {/* Light Atmosphere Switcher */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2.5 py-1 rounded-xl shadow-md border border-stone-200 z-10 flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-[#D4AF37]" />
                <button
                  onClick={() => setLightPreset('warm')}
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${lightPreset === 'warm' ? 'bg-[#1C1B18] text-white' : 'text-stone-600'}`}
                >
                  Warm
                </button>
                <button
                  onClick={() => setLightPreset('studio')}
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${lightPreset === 'studio' ? 'bg-[#1C1B18] text-white' : 'text-stone-600'}`}
                >
                  Studio
                </button>
                <button
                  onClick={() => setLightPreset('dramatic')}
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${lightPreset === 'dramatic' ? 'bg-[#1C1B18] text-white' : 'text-stone-600'}`}
                >
                  Dramatic
                </button>
              </div>

              {/* Dimension Leader Pill */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#1C1B18]/90 text-[#FAF8F5] backdrop-blur px-4 py-2.5 rounded-xl text-xs flex items-center justify-between border border-stone-700 z-10 shadow-lg">
                <div className="flex items-center gap-3">
                  <Ruler className="w-4 h-4 text-[#D4AF37]" />
                  <span>
                    <strong className="text-white">{dimensions.length}</strong> L × <strong className="text-white">{dimensions.width}</strong> W × <strong className="text-white">{dimensions.height}</strong> H cm
                  </span>
                </div>
                <span className="text-[11px] text-[#D8CEBE] hidden sm:inline">
                  ~{calculatedWeight} kg Est. Weight
                </span>
              </div>

            </div>

            {/* Bottom Footer */}
            <div className="pt-3 border-t border-[#E0D7C9] flex flex-wrap items-center justify-between gap-4 text-xs text-[#5C5549]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Craftsmanship Lead Time: <strong>{selectedModel.craftTimeWeeks} Weeks</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#1C1B18]" />
                <span>DM configuration code to </span>
                <a 
                  href={INSTAGRAM_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-bold text-[#1C1B18] hover:text-[#D4AF37] underline"
                >
                  {INSTAGRAM_HANDLE}
                </a>
              </div>
            </div>

          </div>

          {/* Right Controls Panel (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between text-left space-y-8">
            
            <div>
              {/* Select Base Model */}
              <div className="space-y-2 mb-6">
                <label className="text-[11px] font-bold tracking-widest uppercase text-[#7C7569]">
                  Select Base Architecture
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CONFIGURABLE_MODELS.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => handleModelChange(model)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-medium text-left border transition-all ${
                        selectedModel.id === model.id
                          ? 'bg-[#1C1B18] text-[#FAF8F5] border-[#1C1B18] shadow-md'
                          : 'bg-[#FAF8F5] text-[#4A453E] border-[#E0D7C9] hover:bg-[#EAE4DA]'
                      }`}
                    >
                      <div className="truncate font-semibold">{model.name}</div>
                      <div className="text-[10px] opacity-75 truncate">{model.category}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-Tabs */}
              <div className="flex border-b border-[#E0D7C9] mb-6 space-x-6">
                <button
                  onClick={() => setActiveTab('materials')}
                  className={`pb-2 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all ${
                    activeTab === 'materials'
                      ? 'border-[#1C1B18] text-[#1C1B18]'
                      : 'border-transparent text-[#7C7569] hover:text-[#1C1B18]'
                  }`}
                >
                  01 / Materials & Finishes
                </button>
                <button
                  onClick={() => setActiveTab('dimensions')}
                  className={`pb-2 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all ${
                    activeTab === 'dimensions'
                      ? 'border-[#1C1B18] text-[#1C1B18]'
                      : 'border-transparent text-[#7C7569] hover:text-[#1C1B18]'
                  }`}
                >
                  02 / Proportions & Dimensions
                </button>
              </div>

              {/* TAB 1: MATERIALS */}
              {activeTab === 'materials' && (
                <div className="space-y-6">
                  {/* Primary Material */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#1C1B18] uppercase tracking-wider">Primary Surface Material</span>
                      <span className="text-[#6E6659] font-medium">{primaryMaterial.name}</span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {MATERIALS.map((mat) => (
                        <button
                          key={mat.id}
                          onClick={() => setPrimaryMaterial(mat)}
                          className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all text-center ${
                            primaryMaterial.id === mat.id
                              ? 'ring-2 ring-[#1C1B18] border-transparent bg-[#FAF8F5] font-bold'
                              : 'border-[#E0D7C9] hover:border-stone-400 bg-white/50'
                          }`}
                        >
                          <span
                            className="w-6 h-6 rounded-full border border-stone-300 shadow-inner"
                            style={{ backgroundColor: mat.color }}
                          ></span>
                          <span className="text-[10px] text-[#1C1B18] line-clamp-1">{mat.name}</span>
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-[#7C7569] italic font-light pt-1">
                      "{primaryMaterial.description}"
                    </p>
                  </div>

                  {/* Secondary Base Material */}
                  <div className="space-y-3 pt-4 border-t border-[#E0D7C9]">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#1C1B18] uppercase tracking-wider">Secondary Frame / Base Accent</span>
                      <span className="text-[#6E6659] font-medium">{secondaryMaterial.name}</span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {MATERIALS.map((mat) => (
                        <button
                          key={mat.id}
                          onClick={() => setSecondaryMaterial(mat)}
                          className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all text-center ${
                            secondaryMaterial.id === mat.id
                              ? 'ring-2 ring-[#D4AF37] border-[#1C1B18] bg-[#FAF8F5] font-bold shadow-sm'
                              : 'border-[#E0D7C9] hover:border-stone-400 bg-white/50'
                          }`}
                        >
                          <span
                            className="w-6 h-6 rounded-full border border-stone-300 shadow-inner"
                            style={{ backgroundColor: mat.color }}
                          ></span>
                          <span className="text-[10px] text-[#1C1B18] line-clamp-1">{mat.name}</span>
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-[#7C7569] italic font-light pt-1">
                      Base legs & frame finish: "{secondaryMaterial.name}"
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: DIMENSIONS */}
              {activeTab === 'dimensions' && (
                <div className="space-y-6">
                  {/* Length Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-[#1C1B18] uppercase tracking-wider">Length (L)</span>
                      <span className="text-[#1C1B18] font-bold">{dimensions.length} cm</span>
                    </div>
                    <input
                      type="range"
                      min={selectedModel.dimensions.length.min}
                      max={selectedModel.dimensions.length.max}
                      step={selectedModel.dimensions.length.step}
                      value={dimensions.length}
                      onChange={(e) => setDimensions({ ...dimensions, length: Number(e.target.value) })}
                      className="w-full accent-[#1C1B18] cursor-pointer h-2 bg-stone-200 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-[#7C7569]">
                      <span>{selectedModel.dimensions.length.min} cm</span>
                      <span>Default: {selectedModel.dimensions.length.default} cm</span>
                      <span>{selectedModel.dimensions.length.max} cm</span>
                    </div>
                  </div>

                  {/* Width Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-[#1C1B18] uppercase tracking-wider">Width / Depth (W)</span>
                      <span className="text-[#1C1B18] font-bold">{dimensions.width} cm</span>
                    </div>
                    <input
                      type="range"
                      min={selectedModel.dimensions.width.min}
                      max={selectedModel.dimensions.width.max}
                      step={selectedModel.dimensions.width.step}
                      value={dimensions.width}
                      onChange={(e) => setDimensions({ ...dimensions, width: Number(e.target.value) })}
                      className="w-full accent-[#1C1B18] cursor-pointer h-2 bg-stone-200 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-[#7C7569]">
                      <span>{selectedModel.dimensions.width.min} cm</span>
                      <span>Default: {selectedModel.dimensions.width.default} cm</span>
                      <span>{selectedModel.dimensions.width.max} cm</span>
                    </div>
                  </div>

                  {/* Height Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-[#1C1B18] uppercase tracking-wider">Height (H)</span>
                      <span className="text-[#1C1B18] font-bold">{dimensions.height} cm</span>
                    </div>
                    <input
                      type="range"
                      min={selectedModel.dimensions.height.min}
                      max={selectedModel.dimensions.height.max}
                      step={selectedModel.dimensions.height.step}
                      value={dimensions.height}
                      onChange={(e) => setDimensions({ ...dimensions, height: Number(e.target.value) })}
                      className="w-full accent-[#1C1B18] cursor-pointer h-2 bg-stone-200 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-[#7C7569]">
                      <span>{selectedModel.dimensions.height.min} cm</span>
                      <span>Standard: {selectedModel.dimensions.height.default} cm</span>
                      <span>{selectedModel.dimensions.height.max} cm</span>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Price & Action Footer */}
            <div className="pt-6 border-t border-[#E0D7C9] space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#7C7569]">
                    Estimated Custom Build Quote
                  </span>
                  <div className="font-serif-lim text-3xl font-semibold text-[#1C1B18]">
                    {formatPrice(currentPrice, currency)}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-semibold uppercase">
                    Free White-Glove Shipping
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="bg-[#1C1B18] text-[#FAF8F5] py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#38352F] transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                  <span>Add Custom Build to Inquiry</span>
                </button>

                <button
                  onClick={handleCopySpecCode}
                  className="bg-[#EAE4DA] text-[#1C1B18] py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#DCD4C7] transition-all flex items-center justify-center gap-2 border border-[#D8CEBE]"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Copied Spec to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>Copy Spec Code for IG DM</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
