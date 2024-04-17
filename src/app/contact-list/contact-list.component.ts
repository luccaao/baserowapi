import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: any[] = [];
  filteredContacts: any[] = [];
  searchTerm: string = '';

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getAllContacts()
      .then(response => {
        if (Array.isArray(response.data.results)) {
          this.contacts = response.data.results;
          this.applyFilter(); 
        } else {
          this.contacts.push(response.data.results);
          this.applyFilter(); 
        }
      })
      
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id)
      .then(response => {
        this.loadContacts();
      })
      
  }

 

  filterList() {
    this.applyFilter();
  }

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
  

  
  hasContacts(): boolean {
    return this.contacts.length > 0;
  }
}
