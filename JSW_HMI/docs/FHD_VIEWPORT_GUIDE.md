# FHD (1920 × 1080) Viewport & Scaling Guide

## 1. Challenge: Native TIA Canvas vs Modern Monitors
Siemens Comfort Panels (e.g., TP1200) author screens at a fixed native canvas size:
- **Native Canvas**: **`1276 × 673 px`**
- **Target Plant Monitors**: **`1920 × 1080 px` (Full HD 16:9)**

If rendered directly without viewport normalization:
- Screens appear tucked into the top-left quadrant of the screen.
- Over 60% of the screen real estate is lost to black borders.
- Small buttons are difficult for operators wearing gloves to press on industrial touch displays.

---

## 2. Solution: The `HMIViewport` Container

The system uses `<HMIViewport>` (`C:\Users\SDS\Desktop\JSW_HMI\hmi-ui\src\components\HMIViewport.jsx`) to wrap all screen components.

### Mathematical Scaling Logic
$$\text{Scale Factor} = \min\left(\frac{W_{\text{display}}}{W_{\text{native}}}, \frac{H_{\text{display}}}{H_{\text{native}}}\right)$$

For a standard 1080p display:
$$\text{Scale}_X = \frac{1920}{1276} \approx 1.5047$$
$$\text{Scale}_Y = \frac{1080}{673} \approx 1.6047$$
$$\text{Uniform Scale} = \min(1.5047, 1.6047) = \mathbf{1.5047\times}$$

---

## 3. Key Benefits

| Feature | Behavior |
|---|---|
| **Zero Aspect Distortion** | Circles stay round, vehicle models do not stretch. |
| **Touch Hitbox Expansion** | 60×60px buttons expand to **90×90px** on 1080p touchscreens. |
| **Vector Sharpness** | All SVGs and modern fonts render at native physical resolution. |
| **Hardware Acceleration** | CSS `transform: scale()` utilizes GPU compositing for 60 FPS fluidity. |

---

## 4. Usage Example in Screen JSX

```jsx
import React from 'react';
import HMIViewport from '../components/HMIViewport';

export default function Station160Layout() {
  return (
    <HMIViewport nativeWidth={1276} nativeHeight={673}>
      <div className="station-root">
        {/* All native 1276x673 coordinates are preserved exactly here */}
        <button style={{ left: 2, top: 2, width: 90, height: 60 }}>Back</button>
      </div>
    </HMIViewport>
  );
}
```
