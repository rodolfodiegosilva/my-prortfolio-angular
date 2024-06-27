import {
  Component,
  OnInit,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLanguage } from '../language.selectors';
import { environment } from '../../environments/environment'; // Importar o ambiente

interface Repository {
  name: string;
  stars: number;
  forks: number;
  openIssues: number;
  html_url: string;
  description: string;
  updated_at: string;
}

interface Activity {
  type: string;
  repo: { name: string };
  payload: any;
  created_at: string;
}

@Component({
  selector: 'app-github-dashboard',
  templateUrl: './github-dashboard.component.html',
  styleUrls: ['./github-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class GithubDashboardComponent implements OnInit {
  repositories: Repository[] = [];
  activities: Activity[] = [];
  allRepositories: Repository[] = [];
  username: string = 'rodolfodiegosilva'; // Substitua pelo seu nome de usuário do GitHub
  language$: Observable<string>;

  // Utilizar o token do ambiente
  private readonly GITHUB_TOKEN = environment.githubToken;

  constructor(
    private http: HttpClient,
    private store: Store,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {
    this.language$ = this.store.select(selectLanguage);
  }

  ngOnInit(): void {
    this.language$.subscribe((language) => {
      this.translate.use(language);
      this.getRepositories(); // Carregar repositórios quando o idioma mudar
      this.getActivities(); // Carregar atividades
      this.cdr.detectChanges(); // Forçar detecção de mudanças
    });

    // Listener para ajustes de tela
    this.adjustRepositories(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    const target = event.target as Window;
    this.adjustRepositories(target.innerWidth);
  }

  getRepositories(): void {
    const headers = new HttpHeaders().set(
      'Authorization',
      `token ${this.GITHUB_TOKEN}`
    );
    this.http
      .get<Repository[]>(
        `https://api.github.com/users/${this.username}/repos`,
        { headers }
      )
      .subscribe(
        (data: any) => {
          // Ordenar os repositórios por data de atualização
          this.allRepositories = data
            .sort(
              (a: any, b: any) =>
                new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime()
            )
            .map((repo: any) => ({
              name: repo.name,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              openIssues: repo.open_issues_count,
              html_url: repo.html_url,
              description: repo.description,
              updated_at: repo.updated_at, // Adicionar data de atualização
            }));

          // Ajustar o número de repositórios exibidos com base na largura da tela
          this.adjustRepositories(window.innerWidth);
        },
        (error) => {
          console.error('Error fetching repositories', error);
        }
      );
  }

  getActivities(): void {
    const headers = new HttpHeaders().set(
      'Authorization',
      `token ${this.GITHUB_TOKEN}`
    );
    this.http
      .get<Activity[]>(`https://api.github.com/users/${this.username}/events`, {
        headers,
      })
      .subscribe(
        (data: Activity[]) => {
          // Filtrar eventos relevantes e remover repetições
          const uniqueActivities = new Map<string, Activity>();
          data.forEach((event: Activity) => {
            if (
              event.type === 'PushEvent' ||
              event.type === 'PullRequestEvent'
            ) {
              uniqueActivities.set(event.repo.name + event.created_at, event);
            }
          });
          // Ordenar por data e pegar os 5 mais recentes
          this.activities = Array.from(uniqueActivities.values())
            .sort(
              (a: Activity, b: Activity) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .slice(0, 5);
        },
        (error) => {
          console.error('Error fetching activities', error);
        }
      );
  }

  adjustRepositories(width: number): void {
    if (width < 768) {
      // Modo responsivo: mostrar apenas os 6 repositórios mais recentes
      this.repositories = this.allRepositories.slice(0, 6);
    } else {
      // Mostrar os 12 repositórios mais recentes
      this.repositories = this.allRepositories.slice(0, 15);
    }
  }
}
