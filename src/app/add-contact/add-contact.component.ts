import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent implements OnInit {
  

  formulario!: FormGroup;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
          Validators.minLength(3),
        ]),
      ],
      phone: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(16),
          Validators.pattern('[- +()0-9]+'),
        ]),
      ],
    });
  }

  addContact() {
    if (this.formulario.invalid) {
      return;
    }
    this.contactService.addContact(this.formulario.value).then((response) => {
      
      this.router.navigate(['/']);
      
      this.formulario.reset();
    });
  }

  cancelar() {
    this.router.navigate(['/']);
  }

  habilitarBotao(): string {
    if (this.formulario.valid) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }
}
