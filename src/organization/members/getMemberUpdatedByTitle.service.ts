import { Member } from './member.model';
import getMembersTitles from './getMembersTitles.service';
import { Title, Shield } from './member.model';

const getMemberUpdatedByTitle = (t: string, m: Member): Member | false => {
  const titles = getMembersTitles();

  if (titles.includes(t)) {
    for (const key in Title) {
      if (Object.prototype.hasOwnProperty.call(Title, key)) {
        // @ts-expect-error
        if (Title[key] === t) {
          m.title = t;
          // @ts-expect-error
          m.shield = Shield[key];
        }
      }
    }

    return m
  }

  return false
}

export default getMemberUpdatedByTitle;
