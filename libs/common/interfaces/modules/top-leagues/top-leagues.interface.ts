export interface ITopLeagues {
  name: string;
  nameKo: string;
  order: number;
  isActive: boolean;
  imageUrl: string | null;
  description?: string | null;
  leagueIds?: string[];
}
