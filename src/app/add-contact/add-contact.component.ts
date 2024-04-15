import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  contact: any = {
    name: '',
    phone: ''
  };

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
  }

  addContact() {
    this.contactService.addContact(this.contact)
      .then(response => {
        console.log('Contato adicionado com sucesso:', response.data);
        // Limpar o formulário após adicionar
        this.contact = { name: '', phone: '' };
      })
      .catch(error => {
        console.error('Erro ao adicionar contato:', error);
      });
  }
}
