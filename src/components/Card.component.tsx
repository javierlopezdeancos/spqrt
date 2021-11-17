import react, { useState } from 'react';
import { Member  } from '../members/member.model';
import './Card.component.css';
import Dialog from './Dialog.component';

export interface ICardProps {
  member: Member;
}

export function Card(props: ICardProps) {
  const [open, setOpen ] = useState<boolean>(false);

  const { member } = props;

  const openEditDialog = () => {
    setOpen(true);
  }

  const closeEditDialog = () => {
    setOpen(false);
  }

  return (
    <>
    <article className="spqrt-card">
        <span className="spqrt-card-shield">{member.shield}</span>
      <span className="spqrt-card-name">{member.name}</span>
      <span className="spqrt-card-title" onClick={openEditDialog}>{member.title}</span>
    </article>
     <Dialog
        open={open}
        onClose={closeEditDialog}
        closeButton={true}
      >
      <p>Greetings, one and all!</p>
      </Dialog>
    </>
  );
}
