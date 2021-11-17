import * as React from 'react';
import { Member } from '../members/member.model'
import { Card } from './Card.component';
import './Level.component.css';

export interface ILevelProps {
  members: Member[][];
}

export function Level (props: ILevelProps) {
  return (
    <section className="spqrt-levels">
      {props.members.map((membersGroup: Member[]) => {
        return (
          <div className="spqrt-level">
            {membersGroup.map((member: Member) => <Card key={member.id} member={member} />)}
          </div>
        )
      })}
    </section>
  );
}
