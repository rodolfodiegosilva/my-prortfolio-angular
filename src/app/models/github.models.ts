export interface Repository {
  name: string;
  stars: number;
  forks: number;
  openIssues: number;
  html_url: string;
  description: string;
  updated_at: string;
}

export interface Activity {
  type: string;
  repo: { name: string };
  payload: any;
  created_at: string;
}
