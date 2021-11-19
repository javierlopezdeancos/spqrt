import * as React from 'react';
import { Member } from '../members/member.model'
import { Card } from '../members/Member.component';
import './Level.component.css';


export interface ILevelProps {
  members: Member[][];
  titles: string[];
  onChange?: (member: Member) => void;
  onRemove?: (member: Member) => void;
}

export function Level (props: ILevelProps) {
  return (
    <section className="spqrt-levels">
      {props.members.map((membersGroup: Member[], l: number) => {
        if (membersGroup.length > 0) {
          return (
            <div className="spqrt-level" key={`spqrt-level-${l}`}>
              {membersGroup.map((member: Member) => <Card key={member.id} member={member} titles={props.titles} onChange={props?.onChange} onRemove={props?.onRemove} />)}
            </div>
          )
        }

        return null;
      })}
    </section>
  );
}
