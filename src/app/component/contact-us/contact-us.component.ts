import {Component, HostListener, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactForm: FormGroup;
  disabledSubmitButton = true;
  optionsSelect: Array<any>;
  selected: any;

  @HostListener('input') onInput(): void {

    if (this.contactForm.valid) {
      this.disabledSubmitButton = false;
      console.log('Valid Form');
    }else{
      console.log('Invalid Form');
    }
  }

  constructor(fb: FormBuilder) {

    this.contactForm = fb.group({
      contactFormName: ['', Validators.required],
      contactFormEmail: ['', Validators.compose([Validators.required, Validators.email])],
      contactFormSubjects: ['', Validators.required],
      contactFormMessage: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    this.optionsSelect = [
      {value: 'Feedback', label: 'Feedback'},
      {value: 'Report a bug', label: 'Report a bug'},
      {value: 'Feature request', label: 'Feature request'},
      {value: 'Other stuff', label: 'Other stuff'},
    ];
  }



  get name(): AbstractControl  {
    return this.contactForm.get('contactFormName') as AbstractControl;
  }

  get email(): AbstractControl {
    return this.contactForm.get('contactFormEmail') as AbstractControl;
  }

  get subjects(): AbstractControl {
    return this.contactForm.get('contactFormSubjects') as AbstractControl;
  }

  get message(): AbstractControl {
    return this.contactForm.get('contactFormMessage') as AbstractControl;
  }

  get copy(): AbstractControl {
    return this.contactForm.get('contactFormCopy') as AbstractControl;
  }

  onSubmit(): void {
    console.log('Form data : ', this.contactForm.value);
    this.contactForm.reset();
    this.disabledSubmitButton = true;
    this.flip();
  }

  flip(): void {
    $('.card-container').toggleClass('submitted');
  }

}
