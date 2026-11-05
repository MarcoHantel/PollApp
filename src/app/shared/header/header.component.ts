import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SurveyCreateService } from '../../service/survey-create.service.service';

@Component({
    selector: 'app-header',
    imports: [RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    surveyCreateService = inject(SurveyCreateService);
    private router = inject(Router);
    get isDetailPage(): boolean {
        return this.router.url.startsWith('/survey-details');
    }

}
