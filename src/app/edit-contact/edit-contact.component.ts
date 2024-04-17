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
  // Definição de propriedades
  contact: any = {
    name: '',
    phone: ''
  };
  id?: number; // Opcional, pode ser indefinido

  // Construtor da classe, injetando os serviços necessários
  constructor(private route: ActivatedRoute, private contactService: ContactService, private router: Router) { }

  // Método executado ao iniciar o componente
  ngOnInit(): void {
    // Obtém o ID do contato da rota
    this.id = this.route.snapshot.params['id'];
    // Carrega os detalhes do contato com o ID correspondente
    this.loadContact(this.id!); // O operador '!' indica que 'id' não é nulo
  }

  // Carrega os detalhes do contato com base no ID
  loadContact(id: number) {
    this.contactService.getContact(id)
      .then(response => {
        // Atribui os detalhes do contato retornado à propriedade 'contact'
        this.contact = response.data;
      })
      .catch(error => {
        console.error('Erro ao carregar contato:', error);
      });
  }

  // Atualiza as informações do contato
  updateContact() {
    this.contactService.updateContact(this.id!, this.contact)
      .then(response => {
        // Após a atualização bem-sucedida, redireciona de volta à lista de contatos
        this.router.navigate(['/']);
        console.log('Contato atualizado com sucesso:', response.data);
      })
      .catch(error => {
        console.error('Erro ao atualizar contato:', error);
      });
  }
}
