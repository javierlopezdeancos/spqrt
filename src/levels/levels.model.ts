import { Title } from '../members/member.model';

export type Level = Title[][];

const Levels = [
  [Title.imperatorAugustus],
  [Title.proefectusCastrorum, Title.legatus],
  [Title.tribunus],
  [Title.centurio],
  [Title.decurio],
  [Title.legionnaire],
];

export default Levels;
