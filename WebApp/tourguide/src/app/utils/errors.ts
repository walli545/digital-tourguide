import { MatSnackBar } from '@angular/material/snack-bar';

export const displayError = (
  error: Error,
  snackBarMessage: string,
  snackBar: MatSnackBar
): void => {
  console.error(error);
  snackBar.open(snackBarMessage, undefined, {
    duration: 3000,
  });
};
