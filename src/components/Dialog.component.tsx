import React from 'react'
import { createPortal } from 'react-dom'
import './Dialog.component.css'

export interface IDialogProps {
  onClose: () => void;
  open?: boolean;
  closeButton?: boolean;
  children?: any;
}

export function Dialog(props: IDialogProps) {
  const { children, onClose, open = false, closeButton = true } = props;

  return open
    ? createPortal(
        <div className="spqrt-dialog-overlay">
          <aside className="spqrt-dialog">
            {closeButton && (
              <button onClick={onClose} className="spqrt-close">
                &times;
              </button>
            )}
            {children}
          </aside>
        </div>,
        document.body,
      )
    : null
}

export default Dialog
