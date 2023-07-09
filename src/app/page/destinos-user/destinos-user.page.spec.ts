import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinosUserPage } from './destinos-user.page';

describe('DestinosUserPage', () => {
  let component: DestinosUserPage;
  let fixture: ComponentFixture<DestinosUserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DestinosUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
