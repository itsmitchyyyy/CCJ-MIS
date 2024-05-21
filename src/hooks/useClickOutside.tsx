import { useEffect, useRef, useState } from 'react';

const useClickOutside = (isVisible: boolean) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isClickOutside, setIsClickOutside] = useState<boolean>(isVisible);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsClickOutside(true);
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isClickOutside]);

  return { ref, isClickOutside, setIsClickOutside };
};

export { useClickOutside };
