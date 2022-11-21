import { useRef, useEffect } from 'react';

export function useHorizontalScroll(dependancyState: any) {
  const elRef = useRef<HTMLDivElement>();
  useEffect(() => {
    const el = elRef.current;
    console.log('얍얍', el);
    if (el) {
      const onWheel = (e: any) => {
        // console.log('안녕하세요');
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollBy(e.deltaY, 0);
      };
      el.addEventListener('wheel', onWheel);
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, [dependancyState]);
  return elRef;
}
