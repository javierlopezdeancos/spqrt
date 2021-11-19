import { useEffect, RefObject } from 'react';

export default function useOutsideNotifier(ref: RefObject<HTMLElement>, onClickOutside: () => void) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (event?.target && ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
}
