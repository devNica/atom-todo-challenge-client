import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar'
import { AppNotificationComponent } from "../../features/notifications/notification.component";


@Injectable({ providedIn: 'root' })
export class NotificationService {

    constructor(private snackBar: MatSnackBar) { }


    show(message: string, type: 'error' | 'success' | 'warning' = 'error'): void {
        this.snackBar.openFromComponent(AppNotificationComponent, {
            data: { message, type },
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar']
        })
    }

}