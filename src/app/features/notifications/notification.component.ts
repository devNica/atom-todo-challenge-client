import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MatIconModule } from '@angular/material/icon'
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar'


@Component({
    selector: 'app-notification-cmp',
    standalone: true,
    imports: [
        CommonModule, MatIconModule
    ],
    styleUrls: ['./notification.component.scss'],
    templateUrl: './notification.component.html'
})
export class AppNotificationComponent {


    constructor(
        @Inject(MAT_SNACK_BAR_DATA) public data: {
            message: string, type: 'error' | 'success' | 'warning'
        }
    ){}

    getIcon(type: string): string {
        switch(type){
            case 'success': return 'check_circle'
            case 'warnign': return 'warning'
            case 'error':
            default: return 'error'
        }
    }
}