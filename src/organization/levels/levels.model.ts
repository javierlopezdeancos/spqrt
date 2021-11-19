import { Title } from '../members/member.model';

export type Level = string[][];

const Levels = [
  [Title.imperatorAugustus],
  [Title.proefectusCastrorum, Title.legatus],
  [Title.tribunus],
  [Title.centurio],
  [Title.decurio],
  [Title.legionnaire],
] as string[][];

export default Levels;
