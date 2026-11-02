import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    private router = inject(Router);

    get isDetailPage(): boolean {
        return this.router.url.startsWith('/survey-details');
    }
}
