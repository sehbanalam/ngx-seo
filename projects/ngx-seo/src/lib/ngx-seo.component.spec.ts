import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSeoComponent } from './ngx-seo.component';

describe('NgxSeoComponent', () => {
  let component: NgxSeoComponent;
  let fixture: ComponentFixture<NgxSeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSeoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxSeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
