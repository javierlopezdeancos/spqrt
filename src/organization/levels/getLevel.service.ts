import Levels from './levels.model';

const getLevel = (t: string): number => {
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
