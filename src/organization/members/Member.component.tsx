import React, { useState, useCallback } from 'react';
import { Member  } from './member.model';
import './Member.component.css';
import Dialog from '../../components/Dialog.component';
import getMemberUpdatedByTitle from './getMemberUpdatedByTitle.service';
import OutsideNotifier from '../../components/OutsideNotifier.component';

export interface ICardProps {
  member: Member;
  titles: string[];
  onChange?: (member: Member) => void;
  onRemove?: (member: Member) => void;
}

export function Card(props: ICardProps) {
  const { member, titles, onChange, onRemove } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [isEditingName, setIsEditingName ] = useState<boolean>(false);
  const [name, setName ] = useState<string>(member.name);

  const openEditDialog = () => {
    setOpen(true);
  }

  const closeEditDialog = () => {
    setOpen(false);
  }

  const titleIsChecked = useCallback((title: string) => member.title === title, [member.title]);

  const activeEditMode = () => {
    setIsEditingName(true);
  }

  const changeTitle = (title: string): void => {
    const memberWithTitleUpdated = getMemberUpdatedByTitle(title, member);

    memberWithTitleUpdated && onChange && onChange(memberWithTitleUpdated);
    closeEditDialog();
  }

  const removeMember = (member: Member): void => {
    onRemove && onRemove(member);
  }

  const editName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  }

  const changeName = (): void => {
    const memberWithNameUpdated = {
      ...member,
      name,
    }

    memberWithNameUpdated && onChange && onChange(memberWithNameUpdated);
  }

  return (
    <>
      <article className="spqrt-card">
        {
          !isEditingName &&  <span className="spqrt-card-remove" onClick={() => removeMember(member)}>👎</span>
        }
        {
          isEditingName
            ? <OutsideNotifier onClickOutside={changeName} >
                <input className="spqrt-card-title-input" type="text" defaultValue={name} onChange={editName} />
              </OutsideNotifier>
            : <span className="spqrt-card-name" onClick={activeEditMode}>{name}</span>
        }
        <span className="spqrt-card-title" onClick={openEditDialog}>{member.shield} {member.title}</span>
      </article>
      <Dialog
        open={open}
        onClose={closeEditDialog}
        closeButton={true}
      >
        <header className="spqrt-card-edit-header">
          <h3>Change the solider range</h3>
        </header>
        <section className="spqrt-card-edit-main">
          <div className="spqrt-card-edit-titles">
            {titles.map((title: string, t:number): JSX.Element => {
              return (
                <div className="spqrt-card-edit-title"  key={`spqrt-card-edit-title-${t}`}>
                  <input className="spqrt-card-edit-title-radio" type="radio" id={`spqrt-card-edit-titles-${t}`} name="cardTitle" value={title} checked={titleIsChecked(title)} onClick={() => changeTitle(title) }/>
                  <label className="spqrt-card-edit-title-label" htmlFor={`spqrt-card-edit-titles-${t}`}>{title}</label>
                </div>
              )
            })}
          </div>
        </section>
      </Dialog>
    </>
  );
}
