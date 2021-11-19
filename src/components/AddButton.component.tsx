import * as React from 'react';
import './AddButton.component.css';

export interface IAddButtonProps {
  onClick?: () => void;
}

export default function AddButton (props: IAddButtonProps) {
  return (
    <aside className="spqrt-add-button" onClick={props.onClick} ><span>👍</span></aside>
  );
}
