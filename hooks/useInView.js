import { useEffect, useState, useRef } from "react";

export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    observer.observe(node);

    return () => {
      try {
        if (node) observer.unobserve(node);
      } catch (e) {
      }
    };
  }, [ref, options]);

  return [ref, inView];
}

export default useInView;
