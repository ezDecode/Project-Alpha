import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// --- TYPE DEFINITIONS ---

// Define the base properties common to both button and anchor variants
type BaseProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'stroke' | 'fill'; // 'fill' is assumed to be the alternative to 'stroke'
};

// Define properties specific to when the component is a <button>
type ButtonSpecificProps = {
  href?: never; // 'href' is not allowed on the button variant
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// Define properties specific to when the component is an <a>
type AnchorSpecificProps = {
  href: string; // 'href' is required for the anchor variant
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

// Create a discriminated union type for all possible component props
type MagneticButtonProps = BaseProps & (ButtonSpecificProps | AnchorSpecificProps);


/**
 * A magnetic button component that can render as a <button> or an <a> tag.
 * It features a GSAP-powered flair effect that follows the mouse position.
 */
const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  variant = 'stroke',
  href,
  onClick,
  ...props
}) => {
  // Use a generic HTMLElement for the ref. The methods used (getBoundingClientRect, addEventListener)
  // are common to both <button> and <a> elements, making this a safe and simple approach.
  const buttonRef = useRef<HTMLElement | null>(null);
  const flairRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const flair = flairRef.current;

    // Type guard to ensure the refs are connected before adding listeners
    if (!button || !flair) return;

    // Use GSAP quickSetters for optimal performance when updating styles
    const xSet = gsap.quickSetter(flair, 'xPercent');
    const ySet = gsap.quickSetter(flair, 'yPercent');

    // Calculates the mouse position as a percentage relative to the button's bounds
    const getXY = (e: MouseEvent) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      // gsap.utils.pipe allows chaining functions.
      // mapRange converts the pixel coordinate to a percentage, and clamp ensures it's between 0-100.
      const xTransformer = gsap.utils.pipe(
        gsap.utils.mapRange(0, width, 0, 100),
        gsap.utils.clamp(0, 100)
      );
      const yTransformer = gsap.utils.pipe(
        gsap.utils.mapRange(0, height, 0, 100),
        gsap.utils.clamp(0, 100)
      );
      return {
        x: xTransformer(e.clientX - left),
        y: yTransformer(e.clientY - top),
      };
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const { x, y } = getXY(e);
      xSet(x);
      ySet(y);
      gsap.to(flair, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const { x, y } = getXY(e);
      gsap.killTweensOf(flair); // Prevent conflicts with other animations
      // Animate the flair out in the direction the mouse left from
      gsap.to(flair, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { x, y } = getXY(e);
      gsap.to(flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.4,
        ease: 'power2',
      });
    };

    // Add native event listeners for smooth tracking
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mousemove', handleMouseMove);

    // Cleanup function to remove listeners when the component unmounts
    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty dependency array ensures this effect runs only once after mount

  const baseStyles: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.9375rem 1.5rem',
    borderRadius: '6.25rem',
    fontFamily: 'PolySans, system-ui, sans-serif',
    fontWeight: 400,
    fontSize: '1.2rem',
    letterSpacing: '-0.01em',
    lineHeight: '1.04545',
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: variant === 'stroke' ? 'transparent' : 'white',
    color: variant === 'stroke' ? 'white' : 'black',
    overflow: 'hidden',
    transition: 'color 50ms cubic-bezier(0.76, 0, 0.24, 1)',
  };

  // The component to render is determined by the presence of the 'href' prop
  const Component = href ? 'a' : 'button';

  return (
    <Component
      // The `ref` and `onClick` props need type assertions because TypeScript cannot infer
      // the dynamic component's specific element type (`HTMLButtonElement` or `HTMLAnchorElement`).
      // This is a standard and safe practice for polymorphic components.
      ref={buttonRef as React.Ref<any>}
      href={href}
      onClick={onClick as React.MouseEventHandler<HTMLElement>}
      className={`magnetic-button magnetic-button--${variant} ${className}`}
      style={baseStyles}
      {...props}
    >
      <span
        ref={flairRef}
        className="magnetic-button__flair"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          transform: 'scale(0)',
          transformOrigin: '0 0', // Position is controlled by GSAP setters
          willChange: 'transform',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '170%',
            aspectRatio: '1/1',
            backgroundColor:
              variant === 'stroke' ? 'white' : 'rgba(0, 0, 0, 0.1)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            display: 'block',
          }}
        />
      </span>
      <span
        className="magnetic-button__label"
        style={{
          position: 'relative',
          textAlign: 'center',
          transition: 'color 0.15s cubic-bezier(0.76, 0, 0.24, 1)',
        }}
      >
        {children}
      </span>
    </Component>
  );
};

export default MagneticButton;