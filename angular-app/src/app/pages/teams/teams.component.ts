import { Component } from '@angular/core';

@Component({
  selector: 'app-teams',
  template: `
    <div class="page-header">
      <div>
        <div class="page-title">Teams</div>
        <div class="page-sub">Collaborate within company departments</div>
      </div>
      <button class="btn btn-primary">+ Add Team</button>
    </div>

    <div class="articles-grid">
      <div class="article-card">
        <div class="article-category">Engineering</div>
        <div class="article-title">Core Development Team</div>
        <div class="article-content">Responsible for full-stack development and architecture of the OMS Portal.</div>
        <div class="article-meta">
          <span>👥 15 Members</span>
          <span>📍 Remote / On-site</span>
        </div>
        <div style="margin-top:16px; display:flex; gap:-8px;">
          <div class="avatar" style="background:#6366F1; border:2px solid var(--surface)">A</div>
          <div class="avatar" style="background:#10B981; border:2px solid var(--surface); margin-left:-8px;">M</div>
          <div class="avatar" style="background:#F59E0B; border:2px solid var(--surface); margin-left:-8px;">D</div>
          <div class="avatar" style="background:var(--border); color:var(--text-3); font-size:10px; margin-left:-8px;">+12</div>
        </div>
      </div>

      <div class="article-card">
        <div class="article-category">Creative</div>
        <div class="article-title">Design & UX Team</div>
        <div class="article-content">Creating beautiful and intuitive user interfaces with modern animations.</div>
        <div class="article-meta">
          <span>👥 6 Members</span>
          <span>📍 On-site</span>
        </div>
        <div style="margin-top:16px; display:flex;">
          <div class="avatar" style="background:#E11D48; border:2px solid var(--surface)">K</div>
          <div class="avatar" style="background:#3B82F6; border:2px solid var(--surface); margin-left:-8px;">L</div>
        </div>
      </div>
    </div>
  `
})
export class TeamsComponent {}
