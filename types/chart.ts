import { ThemeModeType } from "../src/helpers/theme";

export type ChartMode = "Date" | "Timeline";
export type ThemeMode = ThemeModeType;

export interface RepoStarData {
  repo: string;
  starRecords: {
    date: string;
    count: number;
  }[];
}

export interface RepoData {
  repo: string;
  starRecords: {
    date: string;
    count: number;
  }[];
  logoUrl: string;
}
