# 3D Models Directory

This directory is for storing 3D model files that can be loaded in the property viewer.

## Supported Formats:
- **GLTF (.gltf/.glb)** - Recommended format, smaller file sizes
- **FBX (.fbx)** - Common 3D format from various modeling software
- **USDZ (.usdz)** - Apple's format for AR viewing

## How to Use:

1. **Add your 3D model files to this directory**
2. **Update the PropertyDetail component** to use specific models:

```jsx
// Example usage in PropertyDetail.jsx
<ThreeDViewer 
  property={property} 
  modelPath="/models/modern_house.gltf" 
  modelType="gltf" 
/>
```

## Recommended Sources for 3D House Models:

### Free Sources:
- **Sketchfab** (https://sketchfab.com/) - Search for "house" or "building"
  - Filter by: Free, Downloadable, GLTF format
- **Poly Haven** (https://polyhaven.com/) - High-quality assets
- **Free3D** (https://free3d.com/) - Various house models
- **TurboSquid Free** (https://www.turbosquid.com/Search/3D-Models/free/house)

### Professional Sources:
- **GrabCAD** (https://grabcad.com/) - Engineering and architectural models
- **CGTrader** (https://www.cgtrader.com/) - Professional 3D models
- **TurboSquid** (https://www.turbosquid.com/) - High-quality models
- **Sketchfab Store** (https://sketchfab.com/store) - Premium models

## Model Optimization Tips:

1. **File Size**: Keep models under 10MB for web performance
2. **Polygon Count**: Aim for 10k-50k polygons for good performance
3. **Textures**: Use compressed textures (JPG for diffuse, PNG for alpha)
4. **Format**: GLTF/GLB is preferred for web usage

## Example Model Integration:

```jsx
// For different property types, you can use different models:
const getModelPath = (propertyType) => {
  switch(propertyType) {
    case 'Villa': return { path: '/models/villa.gltf', type: 'gltf' };
    case 'Apartment': return { path: '/models/apartment.gltf', type: 'gltf' };
    case 'House': return { path: '/models/house.fbx', type: 'fbx' };
    default: return null; // Will use procedural model
  }
};
```

## Current Status:
- ✅ 3D Viewer framework implemented with React Three Fiber
- ✅ Support for FBX and GLTF model loading
- ✅ Fallback to procedural models when no file is specified
- 🔄 **Add your .gltf, .fbx, or .usdz model files here to replace procedural models**

Place your 3D model files in this directory and update the ThreeDViewer component calls to use them!
