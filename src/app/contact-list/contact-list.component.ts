import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  // Array para armazenar todos os contatos
  contacts: any[] = [];
  // Array para armazenar os contatos filtrados
  filteredContacts: any[] = [];
  // Termo de busca para filtrar os contatos
  searchTerm: string = '';

  // Construtor da classe, injetando o serviço de contatos
  constructor(private contactService: ContactService) { }

  // Método executado ao iniciar o componente
  ngOnInit(): void {
    // Carrega todos os contatos ao iniciar o componente
    this.loadContacts();
  }

  // Carrega todos os contatos
  loadContacts() {
    this.contactService.getAllContacts()
      .then(response => {
        // Verifica se a resposta contém um array de contatos
        if (Array.isArray(response.data.results)) {
          // Se sim, atribui os contatos ao array 'contacts'
          this.contacts = response.data.results;
          // Aplica o filtro
          this.applyFilter(); 
        } else {
          // Se não, adiciona o contato único ao array 'contacts'
          this.contacts.push(response.data.results);
          // Aplica o filtro
          this.applyFilter(); 
        }
      });
  }

  // Exclui um contato com o ID fornecido
  deleteContact(id: number) {
    this.contactService.deleteContact(id)
      .then(response => {
        // Recarrega os contatos após a exclusão
        this.loadContacts();
      });
  }

  // Método para atualizar a lista de contatos quando o termo de busca é alterado
  filterList() {
    this.applyFilter();
  }

  // Aplica o filtro aos contatos com base no termo de busca
  applyFilter() {
    const searchTrimmed = this.searchTerm.trim().replace(/\s/g, '').replace(/-/g, '');
    if (searchTrimmed !== '') {
      this.filteredContacts = this.contacts.filter(contact =>
        contact.nome.toLowerCase().includes(this.searchTerm.trim().toLowerCase()) || 
        contact.contato.replace(/\s/g, '').replace(/-/g, '').toLowerCase().includes(searchTrimmed.toLowerCase())
      );
    } else {
      this.filteredContacts = this.contacts;
    }
  }

  // Verifica se existem contatos
  hasContacts(): boolean {
    return this.contacts.length > 0;
  }
}
