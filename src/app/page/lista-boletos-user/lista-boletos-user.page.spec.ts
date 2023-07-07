import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaBoletosUserPage } from './lista-boletos-user.page';

describe('ListaBoletosUserPage', () => {
  let component: ListaBoletosUserPage;
  let fixture: ComponentFixture<ListaBoletosUserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaBoletosUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
