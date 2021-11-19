
import { Title } from './member.model';

const getMembersTitles = (): string[] => {
  const tkeys = Object.keys(Title) as string[];
  // @ts-expect-error
  return tkeys.map((key: string): Title => Title[key]);
}

export default getMembersTitles;

