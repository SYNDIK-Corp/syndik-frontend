import { useRef } from 'react';

export function useHorizontalRail<T extends HTMLElement>(gap: number) {
  const railRef = useRef<T>(null);

  const scrollByCard = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;

    const card = rail.firstElementChild as HTMLElement | null;
    const step = card ? card.getBoundingClientRect().width + gap : rail.clientWidth * 0.8;
    const max = rail.scrollWidth - rail.clientWidth;
    const target = Math.max(0, Math.min(max, rail.scrollLeft + direction * step));
    rail.scrollTo({ left: target, behavior: 'smooth' });
  };

  return { railRef, scrollByCard };
}
