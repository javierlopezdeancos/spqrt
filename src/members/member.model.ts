export enum Title {
  imperatorAugustus = "Imperator Augustus",
  legatus = "Legatus",
  proefectusCastrorum = "Proefectus Castrorum",
  tribunus = "Tribunus",
  centurio = "Centurio",
  decurio = "Decurio",
  legionnaire = "Legionnaire"
}

export enum Shield {
  imperatorAugustus = "👑",
  legatus = "🚩",
  proefectusCastrorum = "📐",
  tribunus = "📯",
  centurio = "⚔️",
  decurio = "🗡️",
  legionnaire = "🛡️"
}

export type Member = {
    id: string,
    name: string,
    title: Title,
    shield: string,
    startDate: Date,
}

