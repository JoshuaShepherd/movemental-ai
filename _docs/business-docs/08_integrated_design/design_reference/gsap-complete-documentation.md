# GSAP (GreenSock Animation Platform) Complete Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Installation & Setup](#installation--setup)
3. [Core API Methods](#core-api-methods)
4. [Timelines](#timelines)
5. [Plugins](#plugins)
6. [Easing Functions](#easing-functions)
7. [React/Next.js Integration](#reactnextjs-integration)
8. [Best Practices](#best-practices)
9. [Performance Optimization](#performance-optimization)

---

## Introduction

GSAP (GreenSock Animation Platform) is a professional-grade JavaScript animation library that provides high-performance, timeline-based animations. It's the industry standard for complex web animations.

### Why GSAP?
- **Performance**: Hardware-accelerated animations, optimized rendering
- **Control**: Precise timeline control, sequencing, and coordination
- **Compatibility**: Works across all browsers, including older ones
- **Features**: ScrollTrigger, Morphing, Physics, and more
- **Flexibility**: Animate any property of any object

---

## Installation & Setup

### NPM Installation
```bash
npm install gsap
```

### CDN Installation
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
```

### React/Next.js Setup
```javascript
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)
```

---

## Core API Methods

### gsap.to()
Animates properties **TO** target values.

```javascript
gsap.to(element, {
  x: 100,           // Move 100px right
  y: 50,            // Move 50px down
  opacity: 1,       // Fade to fully opaque
  rotation: 360,     // Rotate 360 degrees
  scale: 1.5,       // Scale to 150%
  duration: 1,      // 1 second
  ease: "power2.out" // Easing function
})
```

**Common Properties:**
- `x`, `y` - Transform translate
- `rotation`, `rotationX`, `rotationY`, `rotationZ` - Rotation
- `scale`, `scaleX`, `scaleY` - Scaling
- `opacity` - Transparency (0-1)
- `backgroundColor`, `color` - Colors
- `width`, `height` - Dimensions
- `duration` - Animation duration in seconds
- `delay` - Delay before animation starts
- `ease` - Easing function
- `repeat` - Number of times to repeat (-1 for infinite)
- `yoyo` - Boolean, reverse animation on repeat
- `paused` - Boolean, start paused
- `onComplete` - Callback when animation completes
- `onStart` - Callback when animation starts
- `onUpdate` - Callback on each frame

### gsap.from()
Animates properties **FROM** starting values to current values.

```javascript
gsap.from(element, {
  x: -100,          // Start 100px left
  opacity: 0,       // Start invisible
  duration: 1,
  ease: "power2.out"
})
```

### gsap.fromTo()
Animates properties **FROM** starting values **TO** target values.

```javascript
gsap.fromTo(element, 
  { x: -100, opacity: 0 },  // FROM
  { x: 0, opacity: 1, duration: 1 }  // TO
)
```

### gsap.set()
Immediately sets properties without animation.

```javascript
gsap.set(element, {
  x: 100,
  opacity: 0.5
})
```

### gsap.killTweensOf()
Stops all animations on target elements.

```javascript
gsap.killTweensOf(element)
```

### gsap.utils
Utility functions for common operations.

```javascript
// Select elements
gsap.utils.toArray('.item')  // Convert NodeList to Array
gsap.utils.selector('.item') // Create selector function

// Random values
gsap.utils.random(-100, 100)  // Random number between -100 and 100
gsap.utils.mapRange(0, 100, 0, 1, 50)  // Map 50 from range 0-100 to 0-1

// Snap values
gsap.utils.snap(10, 23)  // Snap 23 to nearest 10 = 20
```

---

## Timelines

Timelines allow you to sequence multiple animations and control them as a group.

### Creating a Timeline

```javascript
const tl = gsap.timeline({
  defaults: { duration: 1, ease: "power2.out" },
  paused: true,  // Start paused
  repeat: -1,    // Infinite repeat
  yoyo: true     // Reverse on repeat
})

// Add animations to timeline
tl.to(element1, { x: 100 })
  .to(element2, { y: 50 }, "<")      // Start at same time as previous (overlap)
  .to(element3, { opacity: 0 }, ">")  // Start after previous completes
  .to(element4, { scale: 1.5 }, "-=0.5")  // Start 0.5s before previous ends
  .to(element5, { rotation: 360 }, "+=0.5")  // Start 0.5s after previous ends

// Control timeline
tl.play()
tl.pause()
tl.reverse()
tl.restart()
tl.seek(1.5)  // Jump to 1.5 seconds
tl.progress(0.5)  // Set progress to 50%
```

### Timeline Position Parameters

- `">"` - Start after previous animation ends
- `"<"` - Start at same time as previous (overlap)
- `"-=0.5"` - Start 0.5s before previous ends
- `"+=0.5"` - Start 0.5s after previous ends
- `"label"` - Start at a label
- `"label+=0.5"` - Start 0.5s after label

### Timeline Labels

```javascript
const tl = gsap.timeline()

tl.to(element1, { x: 100 })
  .addLabel("middle")
  .to(element2, { y: 50 })
  .to(element3, { opacity: 0 }, "middle")  // Start at "middle" label
```

---

## Plugins

### ScrollTrigger

ScrollTrigger creates scroll-based animations.

#### Installation
```javascript
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
```

#### Basic Usage

```javascript
gsap.to(element, {
  scrollTrigger: {
    trigger: element,        // Element that triggers animation
    start: "top 80%",        // When to start (trigger top hits 80% of viewport)
    end: "top 20%",          // When to end
    scrub: true,             // Smoothly scrubs animation with scroll
    toggleActions: "play none none reverse",  // onEnter, onLeave, onEnterBack, onLeaveBack
    markers: true,           // Debug markers (remove in production)
    pin: true,              // Pin element during scroll
    pinSpacing: true,       // Add spacing for pinned element
  },
  x: 100,
  opacity: 1
})
```

#### ScrollTrigger Options

**Trigger & Timing:**
- `trigger` - Element that triggers the animation
- `start` - When animation starts (e.g., "top 80%", "bottom center")
- `end` - When animation ends
- `scrub` - Boolean or number (smooth scrubbing, number = delay)
- `toggleActions` - "play none none reverse" (onEnter onLeave onEnterBack onLeaveBack)

**Pinning:**
- `pin` - Boolean, pin element during scroll
- `pinSpacing` - Boolean, add spacing for pinned element
- `pinSpacer` - Element to use as spacer

**Callbacks:**
- `onEnter` - When scrolling down and entering start
- `onLeave` - When scrolling down and leaving end
- `onEnterBack` - When scrolling up and entering end
- `onLeaveBack` - When scrolling up and leaving start
- `onUpdate` - Called on every scroll update
- `onToggle` - Called when entering/leaving
- `onRefresh` - Called when ScrollTrigger refreshes

**Advanced:**
- `markers` - Boolean, show debug markers
- `invalidateOnRefresh` - Boolean, invalidate on refresh
- `anticipatePin` - Number, anticipate pinning
- `fastScrollEnd` - Boolean, snap to end on fast scroll

#### ScrollTrigger Examples

**Parallax Effect:**
```javascript
gsap.to('.parallax-bg', {
  yPercent: -50,
  ease: 'none',
  scrollTrigger: {
    trigger: '.parallax-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
})
```

**Horizontal Scroll:**
```javascript
gsap.to('.horizontal-container', {
  x: () => -(document.querySelector('.horizontal-container').scrollWidth - window.innerWidth),
  ease: 'none',
  scrollTrigger: {
    trigger: '.horizontal-wrapper',
    start: 'top top',
    end: () => `+=${document.querySelector('.horizontal-container').scrollWidth}`,
    scrub: true,
    pin: true
  }
})
```

**Staggered Animations:**
```javascript
gsap.from('.item', {
  scrollTrigger: {
    trigger: '.container',
    start: 'top 80%'
  },
  y: 50,
  opacity: 0,
  stagger: 0.1  // 0.1s delay between each item
})
```

### SplitText (Premium Plugin)

Splits text into individual characters, words, or lines for animation.

```javascript
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(SplitText)

const split = new SplitText('.text', { type: 'chars' })

gsap.from(split.chars, {
  y: 50,
  opacity: 0,
  stagger: 0.02,
  duration: 0.5
})
```

### Draggable (Premium Plugin)

Makes elements draggable.

```javascript
import { Draggable } from 'gsap/Draggable'
gsap.registerPlugin(Draggable)

Draggable.create('.box', {
  bounds: '.container',
  inertia: true,
  onDrag: function() {
    // Callback during drag
  }
})
```

### MorphSVG (Premium Plugin)

Morphs SVG paths.

```javascript
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
gsap.registerPlugin(MorphSVGPlugin)

gsap.to('.path', {
  morphSVG: '.target-path',
  duration: 1
})
```

---

## Easing Functions

GSAP provides many easing functions for different animation feels.

### Built-in Eases

**Power:**
- `power1.in`, `power1.out`, `power1.inOut`
- `power2.in`, `power2.out`, `power2.inOut`
- `power3.in`, `power3.out`, `power3.inOut`
- `power4.in`, `power4.out`, `power4.inOut`

**Elastic:**
- `elastic.in`, `elastic.out`, `elastic.inOut`
- `elastic.out(1, 0.3)` - Custom elastic (amplitude, period)

**Back:**
- `back.in`, `back.out`, `back.inOut`
- `back.out(1.7)` - Custom back (overshoot)

**Bounce:**
- `bounce.in`, `bounce.out`, `bounce.inOut`

**Circ:**
- `circ.in`, `circ.out`, `circ.inOut`

**Expo:**
- `expo.in`, `expo.out`, `expo.inOut`

**Sine:**
- `sine.in`, `sine.out`, `sine.inOut`

**Custom Bezier:**
```javascript
gsap.to(element, {
  x: 100,
  ease: "bezier(0.25, 0.1, 0.25, 1)"
})
```

**Custom Ease (Premium):**
```javascript
import { CustomEase } from 'gsap/CustomEase'
gsap.registerPlugin(CustomEase)

CustomEase.create("custom", "M0,0 C0.5,0 0.5,1 1,1")
```

---

## React/Next.js Integration

### useGSAP Hook

The `@gsap/react` package provides a `useGSAP` hook that handles cleanup automatically.

```bash
npm install @gsap/react
```

```javascript
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Component() {
  const container = useRef(null)
  const title = useRef(null)

  useGSAP(() => {
    // This runs on mount and cleanup runs on unmount
    gsap.from(title.current, {
      y: 50,
      opacity: 0,
      duration: 1
    })

    gsap.to('.item', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%'
      },
      y: 0,
      opacity: 1,
      stagger: 0.1
    })
  }, { scope: container })  // Scope to container ref

  return (
    <div ref={container}>
      <h1 ref={title}>Title</h1>
      <div className="item">Item 1</div>
      <div className="item">Item 2</div>
    </div>
  )
}
```

### useGSAP Options

```javascript
useGSAP(() => {
  // Animation code
}, {
  scope: containerRef,  // Scope selector queries to this element
  dependencies: [data],  // Re-run when dependencies change
  revertOnUpdate: true   // Revert animations on update
})
```

### Manual Cleanup

```javascript
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Component() {
  const element = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // All animations here
      gsap.to('.item', { x: 100 })
    }, element)  // Scope to element

    return () => ctx.revert()  // Cleanup on unmount
  }, [])

  return <div ref={element}>...</div>
}
```

---

## Best Practices

### 1. Use Refs, Not Selectors in React

```javascript
// ❌ Bad - queries DOM on every render
useEffect(() => {
  gsap.to('.item', { x: 100 })
}, [])

// ✅ Good - uses refs
const itemRef = useRef(null)
useEffect(() => {
  gsap.to(itemRef.current, { x: 100 })
}, [])
```

### 2. Scope Animations with gsap.context()

```javascript
const ctx = gsap.context(() => {
  gsap.to('.item', { x: 100 })  // Scoped to container
}, containerRef)

return () => ctx.revert()  // Cleanup
```

### 3. Use will-change for Performance

```css
.animated-element {
  will-change: transform, opacity;
}
```

### 4. Animate transform and opacity (GPU-accelerated)

```javascript
// ✅ Good - GPU accelerated
gsap.to(element, { x: 100, opacity: 0.5 })

// ❌ Avoid - causes layout reflow
gsap.to(element, { width: 200, height: 200 })
```

### 5. Use ScrollTrigger Responsibly

```javascript
// Clean up ScrollTrigger instances
ScrollTrigger.getAll().forEach(trigger => trigger.kill())
```

### 6. Batch DOM Reads/Writes

```javascript
// GSAP automatically batches, but be aware of layout thrashing
gsap.to('.item1', { x: 100 })
gsap.to('.item2', { y: 50 })  // These are batched
```

---

## Performance Optimization

### 1. Use force3D

```javascript
gsap.to(element, {
  x: 100,
  force3D: true  // Forces GPU acceleration
})
```

### 2. Use will-change CSS

```css
.animated {
  will-change: transform;
}
```

### 3. Limit Simultaneous Animations

```javascript
// Use timelines to sequence instead of many simultaneous animations
const tl = gsap.timeline()
tl.to('.item1', { x: 100 })
  .to('.item2', { y: 50 })
```

### 4. Use lazy: true for ScrollTrigger

```javascript
gsap.to(element, {
  scrollTrigger: {
    trigger: element,
    start: 'top 80%',
    lazy: true  // Only create when needed
  }
})
```

### 5. Kill Unused Animations

```javascript
// Kill all animations on element
gsap.killTweensOf(element)

// Kill specific properties
gsap.killTweensOf(element, 'x')
```

---

## Common Patterns

### Staggered Animations

```javascript
gsap.from('.item', {
  y: 50,
  opacity: 0,
  stagger: {
    amount: 1,      // Total stagger duration
    from: 'start',  // 'start', 'end', 'center', or index
    ease: 'power2.out'
  }
})
```

### Split Text Animation

```javascript
const split = new SplitText('.text', { type: 'chars,words' })

gsap.from(split.chars, {
  y: 50,
  opacity: 0,
  stagger: 0.02,
  scrollTrigger: {
    trigger: '.text',
    start: 'top 80%'
  }
})
```

### Parallax Scrolling

```javascript
gsap.to('.parallax', {
  yPercent: -50,
  ease: 'none',
  scrollTrigger: {
    trigger: '.section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
})
```

### Scroll-Triggered Reveal

```javascript
gsap.utils.toArray('.reveal').forEach(element => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%'
    },
    y: 50,
    opacity: 0,
    duration: 1
  })
})
```

### Hover Animations

```javascript
const hoverAnimation = gsap.to('.button', {
  scale: 1.1,
  duration: 0.3,
  paused: true,
  ease: 'power2.out'
})

document.querySelector('.button').addEventListener('mouseenter', () => {
  hoverAnimation.play()
})

document.querySelector('.button').addEventListener('mouseleave', () => {
  hoverAnimation.reverse()
})
```

### Page Transitions

```javascript
const pageTransition = gsap.timeline({ paused: true })

pageTransition
  .to('.overlay', { x: '100%', duration: 0.5, ease: 'power2.inOut' })
  .from('.new-content', { opacity: 0, y: 50, duration: 0.5 }, '-=0.3')
  .to('.overlay', { x: '200%', duration: 0.5, ease: 'power2.inOut' })

pageTransition.play()
```

---

## Resources

- **Official Documentation**: https://greensock.com/docs/
- **GSAP Learning Center**: https://greensock.com/learning/
- **CodePen Examples**: https://codepen.io/collection/DYpzYq
- **GreenSock Forums**: https://greensock.com/forums/

---

*This documentation covers the core GSAP API. For the most up-to-date information, always refer to the official GSAP documentation at greensock.com/docs*


