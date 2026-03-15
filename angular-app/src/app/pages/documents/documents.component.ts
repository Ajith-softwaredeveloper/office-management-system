import { Component } from '@angular/core';

@Component({
  selector: 'app-documents',
  template: `
    <div class="page-header">
      <div>
        <div class="page-title">Documents</div>
        <div class="page-sub">Central storage for company files and assets</div>
      </div>
      <button class="btn btn-primary">↑ Upload File</button>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="search-bar">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="Search documents...">
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Size</th>
            <th>Modified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div style="display:flex; align-items:center; gap:12px;">
                <div style="font-size:24px;">📄</div>
                <div>
                  <div class="fw-600">Company_Handbook_2024.pdf</div>
                  <div class="text-muted text-sm">Policy updates and guidelines</div>
                </div>
              </div>
            </td>
            <td>PDF</td>
            <td>4.2 MB</td>
            <td class="text-muted">2 days ago</td>
            <td>
              <button class="btn btn-secondary btn-icon">⬇️</button>
            </td>
          </tr>
          <tr>
            <td>
              <div style="display:flex; align-items:center; gap:12px;">
                <div style="font-size:24px;">📊</div>
                <div>
                  <div class="fw-600">Q4_Performance_Report.xlsx</div>
                  <div class="text-muted text-sm">Financial projections</div>
                </div>
              </div>
            </td>
            <td>XLSX</td>
            <td>1.8 MB</td>
            <td class="text-muted">Yesterday</td>
            <td>
              <button class="btn btn-secondary btn-icon">⬇️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class DocumentsComponent {}
