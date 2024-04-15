import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  contact: any = {
    name: '',
    phone: ''
  
  };
  id?: number;

  constructor(private route: ActivatedRoute, private contactService: ContactService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadContact(this.id!);
  }

  loadContact(id: number) {
    this.contactService.getContact(id)
      .then(response => {
        this.contact = response.data;
      })
      .catch(error => {
        console.error('Erro ao carregar contato:', error);
      });
  }



  updateContact() {
    this.contactService.updateContact(this.id!, this.contact)
      .then(response => {
        this.router.navigate(['/']);
        console.log('Contato atualizado com sucesso:', response.data);

      })
      .catch(error => {
        console.error('Erro ao atualizar contato:', error);
      });
  }
}
