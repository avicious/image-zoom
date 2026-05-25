# Image Zoom

A lightweight, performant React component for viewing images with smooth zooming and constrained dragging. This component ensures the image stays within the viewport boundaries even when scaled, providing a seamless "magnifier" experience.

## Live Demo

**Check out the live version of this project here:** [avicious.github.io/image-zoom/](https://avicious.github.io/image-zoom/)

## Features
* **Boundary Constraints:** Advanced logic prevents the image from being dragged out of the viewable area, eliminating "empty space" around the zoomed image.
* **Scale-Adjusted Dragging:** The drag sensitivity automatically adjusts based on the zoom level, keeping the movement 1:1 with your mouse cursor.
* **Smooth Transitions:** Built-in CSS transitions provide a fluid feel when zooming in/out or snapping back to center.
* **State-Driven UI:** Automatically switches cursor types (**grab** vs **grabbing**) and disables dragging when at 1x scale to prevent accidental shifts.
* **Responsive & Fluid:** Designed to live inside any parent container with `overflow: hidden`, adapting to various aspect ratios via `object-fit`.

## How it Works

The component manages the image's state through two primary variables: **scale** and **position**. 

To solve the "off-view" issue, it calculates a dynamic **bounding box** whenever you move the mouse. The boundary is determined by how much "extra" image exists outside the container at the current scale.

$$\text{limit} = \frac{\text{Container Size} \times (\text{Scale} - 1)}{2 \times \text{Scale}}$$

When dragging, the component "clamps" the new coordinates between $-\text{limit}$ and $+\text{limit}$, ensuring the edge of the image never crosses the edge of the container.

## Installation & Usage

You will need **Lucide React** for the UI icons. Install it via your preferred package manager:

```bash
npm install lucide-react
# or
yarn add lucide-react
```

1. **Copy the component** into your project (e.g., `src/components/ImageZoom.jsx`).
2. **Import and use it** in your main application:

```jsx
import ImageZoom from "./components/ImageZoom";

function App() {
  return (
    <div>
      <ImageZoom imageUrl={IMAGE} />
    </div>
  );
}
```
