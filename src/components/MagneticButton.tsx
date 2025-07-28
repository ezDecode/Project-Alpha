import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// --- TYPE DEFINITIONS ---
type BaseProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'stroke' | 'fill';
};
type ButtonSpecificProps = {
  href?: never;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorSpecificProps = {
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;
type MagneticButtonProps = BaseProps & (ButtonSpecificProps | AnchorSpecificProps);

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  variant = 'stroke',
  href,
  onClick,
  ...props
}) => {
  const buttonRef = useRef<HTMLElement | null>(null);
  const flairRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    // GSAP logic remains the same...
    const button = buttonRef.current;
    const flair = flairRef.current;
    if (!button || !flair) return;
    const xSet = gsap.quickSetter(flair, 'xPercent');
    const ySet = gsap.quickSetter(flair, 'yPercent');
    const getXY = (e: MouseEvent) => {
      const { left, top, width, height } = button.getBoundingClientRect();
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
      gsap.to(flair, { scale: 1, duration: 0.4, ease: 'power2.out' });
    };
    const handleMouseLeave = (e: MouseEvent) => {
      const { x, y } = getXY(e);
      gsap.killTweensOf(flair);
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
      gsap.to(flair, { xPercent: x, yPercent: y, duration: 0.4, ease: 'power2' });
    };
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mousemove', handleMouseMove);
    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const baseStyles: React.CSSProperties = { /* Styles remain the same... */ };
  const Component = href ? 'a' : 'button';

  return (
    <Component
      ref={buttonRef as React.Ref<any>}
      href={href}
      onClick={onClick as React.MouseEventHandler<HTMLElement>}
      className={`magnetic-button magnetic-button--${variant} ${className}`}
      style={baseStyles}
      // FIX: Type assertion on the spread props to resolve the TypeScript error.
      {...props as any}
    >
      <span ref={flairRef} /* ...flair span content... */>
        <span style={{ /* ...inner flair style... */ }} />
      </span>
      <span className="magnetic-button__label" style={{ /* ...label style... */ }}>
        {children}
      </span>
    </Component>
  );
};

export default MagneticButton;