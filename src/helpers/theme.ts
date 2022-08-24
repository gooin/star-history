import { XYChartOptions } from "../../packages/xy-chart";
import { ThemeMode } from "../../types/chart";

export const AllThemes = {
  //ThemeName: ["backgroundColor", "strokeColor", "and more? "],
  Light: ["white", "black"],
  GithubDark: ["#484f58", "#c9d1d9"],
  GithubDarkDimmed: ["#22272A", "#adbac7"],
};
export const ThemeNames = Object.keys(AllThemes) as [ThemeModeType];

export type ThemeModeType = keyof typeof AllThemes;

export const getThemeOptions = (
  theme: ThemeMode
): Pick<XYChartOptions, "backgroundColor" | "strokeColor"> => {
  const selectedTheme = AllThemes[theme];
  return {
    backgroundColor: selectedTheme[0],
    strokeColor: selectedTheme[1],
  };
};
