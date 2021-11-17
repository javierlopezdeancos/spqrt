import { Title } from '../members/member.model';
import Levels from './levels.model';

const getLevel = (t: Title): number => {
  let o = -1 as number;

  for (let i = 0; i < Levels.length; i++) {
    const l = Levels[i];

    if (l.includes(t)) {
        o = i;
    }
  }

  return o;
}

export default getLevel;
