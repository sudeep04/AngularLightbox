import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatIconModule, MatToolbarModule, MatListModule, MatSidenavModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Create AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [
                RouterTestingModule,
                BrowserAnimationsModule,
                MatIconModule,
                MatToolbarModule,
                MatListModule,
                MatSidenavModule
            ]
        });
    });

    it('should work', () => {
        const fixture = TestBed.createComponent(AppComponent);
        expect(fixture.componentInstance instanceof AppComponent).toBe(
            true,
            'should create AppComponent'
        );
    });
});
