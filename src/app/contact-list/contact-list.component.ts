import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: any[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getAllContacts()
      .then(response => {
        console.log('Contatos carregados com sucesso:', response.data.results);
        
        
        if (Array.isArray(response.data.results)) {
          
          this.contacts = response.data.results;
        } else {
          
          this.contacts.push(response.data.results);
          console.log('Contatos carregados com sucesso:', response.data.results);
          
        }
      })
      .catch(error => {
        console.error('Erro ao carregar contatos:', error);
      });
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id)
      .then(response => {
        this.loadContacts();
      })
      .catch(error => {
        console.error('Erro ao excluir contato:', error);
      });
  }

  //funcao para caso o usuario nao tenha nenhum contato
  hasContacts(): boolean {
    return this.contacts.length > 0;
  }
}
