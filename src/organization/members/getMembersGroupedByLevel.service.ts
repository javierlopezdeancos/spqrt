import { Member } from './member.model';
import getLevel from '../levels/getLevel.service';

const getMembersGroupedByLevel = (ms: Member[]): Member[][] => {
  const members = [] as Member[][];

  for (const member of [...ms]) {
    const l = getLevel(member.title as string);

    if (l >= 0) {
      if (!members[l]) {
        if (member) {
          members[l] = [];
          members[l].push(member);
        }
      } else {
        members[l].push(member);
      }
    }
  }

  return members;
}

export default getMembersGroupedByLevel;
