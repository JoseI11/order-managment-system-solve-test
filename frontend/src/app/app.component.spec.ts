// src/app/app.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent], // si es standalone; si NO lo es, declara en declarations
    }).compileComponents();
  });

  it('should create the app', () => {
    const f = TestBed.createComponent(AppComponent);
    const app = f.componentInstance;
    expect(app).toBeTruthy();
  });

  // Si quieres testear el título, ajusta el selector a tu template real.
  // it('should render title', () => {
  //   const f = TestBed.createComponent(AppComponent);
  //   f.detectChanges();
  //   const el: HTMLElement = f.nativeElement;
  //   expect(el.querySelector('h1')?.textContent?.trim()).toContain('Hello, frontend'); // solo si existe
  // });
});
