import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaquinBoardComponent } from './taquin-board.component';

describe('TaquinBoardComponent', () => {
  let component: TaquinBoardComponent;
  let fixture: ComponentFixture<TaquinBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaquinBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaquinBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
