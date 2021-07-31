import { FormControl, ValidationErrors } from '@angular/forms';

export class nospace {

    // whitespace validation
    static nospace(control: FormControl) : ValidationErrors {
        
        // check if string only contains whitespace
        if ((control.value != null) && (control.value.trim().length === 0)) {

            // invalid, return error object
            return { 'nospace': true };
        }
        else {
            // valid, return null
            return null;
        }
    }
}
