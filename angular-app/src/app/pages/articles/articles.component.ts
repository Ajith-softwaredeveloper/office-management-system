import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-articles',
  template: `
    <div class="page-header">
      <div>
        <div class="page-title">Company Announcements</div>
        <div class="page-sub">Internal policies, news, and company updates</div>
      </div>
      <button class="btn btn-primary" (click)="openModal()" *ngIf="isAdmin">+ Post Article</button>
    </div>

    <div class="articles-grid">
      <div class="article-card" *ngFor="let a of articles" [class.pinned]="a.pinned">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
          <span class="article-category">{{ a.category }}</span>
          <span *ngIf="a.pinned" style="font-size:16px" title="Pinned">📌</span>
        </div>
        <div class="article-title">{{ a.title }}</div>
        <div class="article-content">{{ a.content | slice:0:150 }}{{ a.content.length > 150 ? '...' : '' }}</div>
        <div class="article-meta">
          <span>✍️ {{ a.authorName || 'Admin' }}</span>
          <span>📅 {{ a.createdAt | date:'mediumDate' }}</span>
          <div style="flex:1"></div>
          <div style="display:flex;gap:6px" *ngIf="isAdmin">
            <button class="btn btn-secondary btn-icon" (click)="editArticle(a)" style="font-size:12px">✏️</button>
            <button class="btn btn-danger btn-icon" (click)="delete(a._id)" style="font-size:12px">🗑️</button>
          </div>
        </div>
      </div>
    </div>

    <div *ngIf="articles.length === 0" class="card">
      <div class="empty-state">
        <div class="empty-state-icon">📢</div>
        <div class="empty-state-text">No announcements yet. Post the first one!</div>
      </div>
    </div>

    <div class="modal-overlay" *ngIf="modal" (click)="closeModal($event)">
      <div class="modal" style="max-width:600px">
        <div class="modal-header">
          <div class="modal-title">{{ editing ? 'Edit Article' : 'New Announcement' }}</div>
          <button class="btn-close" (click)="modal=false">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Title *</label>
            <input class="form-input" [(ngModel)]="form.title" placeholder="Article title...">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Category</label>
              <select class="form-select" [(ngModel)]="form.category">
                <option>Announcement</option><option>Policy</option><option>News</option>
                <option>Training</option><option>Other</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Author Name</label>
              <input class="form-input" [(ngModel)]="form.authorName" placeholder="HR Team">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Content *</label>
            <textarea class="form-input" [(ngModel)]="form.content" rows="5" placeholder="Write the article content here..." style="resize:vertical"></textarea>
          </div>
          <div class="form-group">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" [(ngModel)]="form.pinned" style="width:16px;height:16px">
              <span class="form-label" style="margin:0">📌 Pin this article to the top</span>
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" (click)="modal=false">Cancel</button>
          <button class="btn btn-primary" (click)="save()" [disabled]="!form.title || !form.content">
            {{ editing ? 'Save Changes' : 'Publish' }}
          </button>
        </div>
      </div>
    </div>
  `
})
export class ArticlesComponent implements OnInit {
  articles: any[] = [];
  modal = false;
  editing: any = null;
  form: any = { title:'', content:'', category:'Announcement', authorName:'', pinned:false };

  get isAdmin() { return true; }

  constructor(private api: ApiService, private auth: AuthService) {}
  ngOnInit() { this.load(); }

  load() { this.api.getArticles().subscribe((r: any) => this.articles = r); }

  openModal() {
    this.editing = null;
    this.form = { title:'', content:'', category:'Announcement', authorName: this.auth.currentUserValue?.name || '', pinned:false };
    this.modal = true;
  }

  editArticle(a: any) { this.editing = a; this.form = { ...a }; this.modal = true; }
  closeModal(e: any) { if (e.target === e.currentTarget) this.modal = false; }

  save() {
    const req = this.editing
      ? this.api.updateArticle(this.editing._id, this.form)
      : this.api.createArticle(this.form);
    req.subscribe(() => { this.modal = false; this.load(); });
  }

  delete(id: string) {
    if (confirm('Delete this article?')) {
      this.api.deleteArticle(id).subscribe(() => this.load());
    }
  }
}
