import React, { useRef } from 'react';
import useOutsideNotifier from '../hooks/useOutsideNotfier.hook';

export interface IOutsideProps {
  children?: any;
  onClickOutside: () => void;
}

export function OutsideNotifier(props: IOutsideProps) {
  const wrapperRef = useRef(null);
  useOutsideNotifier(wrapperRef, props.onClickOutside);
  return <div ref={wrapperRef}>{props.children}</div>;
}

export default OutsideNotifier;
