import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Level } from './levels/Level.component';
import useOrganization from './organization.context';
import getMembers from './members/getMembers.service';
import getMembersGroupedByLevel from './members/getMembersGroupedByLevel.service';
import getMembersTitles from './members/getMembersTitles.service';
import { Member } from './members/member.model';
import AddButton from '../components/AddButton.component';
import Dialog from '../components/Dialog.component';
import getMemberUpdatedByTitle from './members/getMemberUpdatedByTitle.service';
import './OrganizationChart.component.css';

export function OrganizationChart() {
  const { membersGroupedByLevel, addMember, setMembersGroupedByLevel, updateMember, removeMember } = useOrganization();
  const titles = useMemo(() => getMembersTitles(), []);
  const [name, setName] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!membersGroupedByLevel) {
      const ms = getMembers();
      const gms = getMembersGroupedByLevel(ms);

      setMembersGroupedByLevel(gms);
    }
  }, [membersGroupedByLevel, setMembersGroupedByLevel]);

  const openAddDialog = () => {
    setOpen(true);
  }

  const closeAddDialog = () => {
    setOpen(false);
  }

  const changeMemberName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  }

  const changeMemberTitle = (t: string): void => {
    setTitle(t);
  }

  const update = (m: Member) => {
    updateMember(m);
  }

  const remove = (m: Member) => {
    removeMember(m);
  }

  const add = () => {
    closeAddDialog();

   const newMember ={
      id: uuidv4(),
      name,
      title,
      shield: '📯',
      startDate: new Date(),
    };

    const newMemberUpdatedByTitle = getMemberUpdatedByTitle(title, newMember);

    if (newMemberUpdatedByTitle) {
      addMember(newMemberUpdatedByTitle);
    }

    setTitle('');
    setName('');
  }

  const titleIsChecked = useCallback((t: string) => title === t, [title]);


  return (
    <div className="spqrt-organization-chart">
      {!membersGroupedByLevel ? <p>Loading members ... </p> : <Level members={[...membersGroupedByLevel]} titles={titles} onChange={update} onRemove={remove} />}
      <AddButton onClick={openAddDialog} />
       <Dialog
        open={open}
        onClose={closeAddDialog}
        closeButton={true}
      >
        <header className="spqrt-organization-chart-add-header">
          <h3>Add a new Member</h3>
        </header>
        <section className="spqrt-organization-chart-add-main">
          <input className="spqrt-organization-chart-add-input" type="text" placeholder="Enter your member name" value={name} onChange={changeMemberName} />
          <div className="spqrt-organization-chart-add-titles">
            {titles.map((title: string, t:number): JSX.Element => {
              return (
                <div className="spqrt-organization-chart-add-title"  key={`spqrt-organization-chart-add-title-${t}`}>
                  <input className="spqrt-organization-chart-add-title-radio" type="radio" id={`spqrt-organization-chart-add-title-${t}`} name="add-title-member" value={title} checked={titleIsChecked(title)} onClick={() => changeMemberTitle(title) }/>
                  <label className="spqrt-organization-chart-add-title-label" htmlFor={`spqrt-organization-chart-add-title-${t}`}>{title}</label>
                </div>
              )
            })}
          </div>
        </section>
        <footer className="spqrt-organization-chart-add-footer">
          <button className="spqrt-organization-chart-add-button-cancel" onClick={closeAddDialog}>👎</button>
          <button className="spqrt-organization-chart-add-button-add" onClick={add}>👍</button>
        </footer>
      </Dialog>
    </div>
  );
}
