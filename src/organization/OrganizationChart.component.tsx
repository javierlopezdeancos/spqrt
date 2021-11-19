import React, { useEffect, useMemo } from 'react';
import { Level } from './levels/Level.component';
import useOrganization from './organization.context';
import getMembers from './members/getMembers.service';
import getMembersGroupedByLevel from './members/getMembersGroupedByLevel.service';
import getMembersTitles from './members/getMembersTitles.service';
import { Member } from './members/member.model';

export function OrganizationChart() {
  const { membersGroupedByLevel, setMembersGroupedByLevel, updateMember, removeMember } = useOrganization();
  const titles = useMemo(() => getMembersTitles(), []);

  useEffect(() => {
    if (!membersGroupedByLevel) {
      const ms = getMembers();
      const gms = getMembersGroupedByLevel(ms);

      setMembersGroupedByLevel(gms);
    }
  }, [membersGroupedByLevel, setMembersGroupedByLevel]);

  const update = (member: Member) => {
    updateMember(member);
  }

  const remove = (member: Member) => {
    removeMember(member);
  }

  return (
    <div className="spqrt-organization-chart">
      {!membersGroupedByLevel ? <p>Loading members ... </p> : <Level members={[...membersGroupedByLevel]} titles={titles} onChange={update} onRemove={remove} /> }
    </div>
  );
}
