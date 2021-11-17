import React, { useEffect } from 'react';
import { Level } from './Level.component';
import useOrganization from '../organization/org.context';
import getMembers from '../members/getMembers.service';
import getMembersGroupedByLevel from '../members/getMembersGroupedByLevel.service';

export function OrganizationChart() {
  const { membersGroupedByLevel, setMembersGroupedByLevel } = useOrganization();

  useEffect(() => {
    if (!membersGroupedByLevel) {
      const ms = getMembers();
      const gms = getMembersGroupedByLevel(ms);

      setMembersGroupedByLevel(gms);
    }
  }, [membersGroupedByLevel, setMembersGroupedByLevel]);

  return (
    <div className="spqrt-organization-chart">
      { !membersGroupedByLevel ? <p>Loading members ... </p> : <Level members={membersGroupedByLevel} /> }
    </div>
  );
}
