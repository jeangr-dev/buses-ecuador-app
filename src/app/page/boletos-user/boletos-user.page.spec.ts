import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoletosUserPage } from './boletos-user.page';

describe('BoletosUserPage', () => {
  let component: BoletosUserPage;
  let fixture: ComponentFixture<BoletosUserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BoletosUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
