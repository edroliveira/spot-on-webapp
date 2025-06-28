import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyFeedPanelComponent } from './daily-feed-panel.component';

describe('DailyFeedPanelComponent', () => {
  let component: DailyFeedPanelComponent;
  let fixture: ComponentFixture<DailyFeedPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyFeedPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyFeedPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
