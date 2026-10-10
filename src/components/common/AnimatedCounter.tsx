import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

export default function AnimatedCounter({ value, className, duration = 1.4 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const shouldReduceMotion = useReducedMotion();

  // Extract prefix, numeric part, and suffix
  const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  const prefix = match ? match[1] : '';
  const targetNumber = match ? parseFloat(match[2]) : null;
  const suffix = match ? match[3] : '';
  const isDecimal = match && match[2].includes('.');

  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!isInView || targetNumber === null || shouldReduceMotion) {
      if (targetNumber !== null) setCurrentValue(targetNumber);
      return;
    }

    let startTimestamp: number | null = null;
    const startValue = 0;
    const endValue = targetNumber;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const computed = startValue + (endValue - startValue) * easedProgress;
      
      setCurrentValue(isDecimal ? parseFloat(computed.toFixed(1)) : Math.round(computed));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [isInView, targetNumber, duration, isDecimal, shouldReduceMotion]);

  if (targetNumber === null || shouldReduceMotion) {
    return <span ref={ref} className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {prefix}{currentValue}{suffix}
    </span>
  );
}
