import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonDashbordComponent } from './person-dashbord.component';

describe('PersonDashbordComponent', () => {
  let component: PersonDashbordComponent;
  let fixture: ComponentFixture<PersonDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonDashbordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
