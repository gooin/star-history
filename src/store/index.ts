import { createPinia, defineStore } from "pinia";
import storage from "../helpers/storage";
import { ChartMode, ThemeMode } from "../../types/chart";
import { ThemeNames } from "../helpers/theme";

export const piniaInstance = createPinia();

interface AppState {
  isFetching: boolean;
  token: string;
  repos: string[];
  chartMode: ChartMode;
  themeMode: ThemeMode;
}

const useAppStore = defineStore("appStore", {
  state: (): AppState => {
    const { accessTokenCache } = storage.get(["accessTokenCache"]);
    const hash = window.location.hash.slice(1);
    const params = hash.split("&").filter((i) => Boolean(i));
    const repos: string[] = [];
    let chartMode: ChartMode = "Date";
    let themeMode = ThemeNames[0];

    for (const value of params) {
      if (value === "Date" || value === "Timeline") {
        chartMode = value;
        continue;
      }
      if (ThemeNames.includes(value as ThemeMode)) {
        themeMode = value as ThemeMode;
        continue;
      }
      if (!repos.includes(value)) {
        repos.push(value);
      }
    }

    return {
      isFetching: false,
      token: accessTokenCache || "",
      repos: repos,
      themeMode: themeMode,
      chartMode: chartMode,
    };
  },
  actions: {
    addRepo(repo: string) {
      if (!this.repos.includes(repo)) {
        this.repos.push(repo);
      }
      this.repos = [...this.repos];
    },
    delRepo(repo: string) {
      if (this.repos.includes(repo)) {
        this.repos.splice(this.repos.indexOf(repo), 1);
      }
      this.repos = [...this.repos];
    },
    setRepos(repos: string[]) {
      this.repos = repos;
    },
    setToken(token: string) {
      this.token = token;
    },
    setIsFetching(isFetching: boolean) {
      this.isFetching = isFetching;
    },
    setChartMode(chartMode: ChartMode) {
      this.chartMode = chartMode;
    },
    setThemeMode(themeMode: ThemeMode) {
      this.themeMode = themeMode;
    },
  },
});

export default useAppStore;
