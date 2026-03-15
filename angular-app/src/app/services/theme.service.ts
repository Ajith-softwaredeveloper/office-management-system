import { Injectable } from '@angular/core';

export type ThemeColor = 'purple' | 'blue' | 'green' | 'rose' | 'orange';
export type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private colorKey = 'oms_theme_color';
  private modeKey = 'oms_theme_mode';

  colors = [
    { id: 'purple', label: 'Violet', hex: '#6366F1' },
    { id: 'blue',   label: 'Blue',   hex: '#2563EB' },
    { id: 'green',  label: 'Green',  hex: '#059669' },
    { id: 'rose',   label: 'Rose',   hex: '#E11D48' },
    { id: 'orange', label: 'Orange', hex: '#EA580C' },
  ];

  get currentColor(): ThemeColor {
    return (localStorage.getItem(this.colorKey) as ThemeColor) || 'purple';
  }

  get currentMode(): ThemeMode {
    return (localStorage.getItem(this.modeKey) as ThemeMode) || 'light';
  }

  setColor(color: ThemeColor) {
    // Remove all color classes
    this.colors.forEach(c => document.body.classList.remove(`theme-${c.id}`));
    if (color !== 'purple') document.body.classList.add(`theme-${color}`);
    localStorage.setItem(this.colorKey, color);
  }

  setMode(mode: ThemeMode) {
    if (mode === 'dark') {
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
    }
    localStorage.setItem(this.modeKey, mode);
  }

  apply() {
    this.setColor(this.currentColor);
    this.setMode(this.currentMode);
  }
}
