import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComprarBoletosPage } from './comprar-boletos.page';

describe('ComprarBoletosPage', () => {
  let component: ComprarBoletosPage;
  let fixture: ComponentFixture<ComprarBoletosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ComprarBoletosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
