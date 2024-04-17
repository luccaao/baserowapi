import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // URL da API e token de autenticação
  private apiUrl = 'https://api.baserow.io/api/database/rows/table/282745/';
  private authToken = 'HShcPbnnSu4sFniGkqMYWI9QQ19I5HNH';

  constructor() { }

  // Obtém todos os contatos
  getAllContacts() {
    return axios.get(this.apiUrl + "?user_field_names=true", {
      headers: {
        Authorization: `Token ${this.authToken}`
      }
    });
  }

  // Obtém um contato específico pelo ID
  getContact(contactId: number) {
    return axios.get(`${this.apiUrl}${contactId}/?user_field_names=true`, {
      headers: {
        Authorization: `Token ${this.authToken}`
      }
    });
  }

  // Adiciona um novo contato
  addContact(contact: any) {
    return axios.post(this.apiUrl+'?user_field_names=true', {
      "nome": contact.name,
      "contato": contact.phone
    }, {
      headers: {
        Authorization: `Token ${this.authToken}`,
        "Content-Type": "application/json"
      }
    });
  }

  // Atualiza um contato existente pelo ID
  updateContact(contactId: number, contact: any) {
    return axios.patch(`${this.apiUrl}${contactId}/?user_field_names=true`, {
      "nome": contact.name,
      "contato": contact.phone
    }, {
      headers: {
        Authorization: `Token ${this.authToken}`,
        "Content-Type": "application/json"
      }
    });
  }

  // Exclui um contato pelo ID
  deleteContact(contactId: number) {
    return axios.delete(`${this.apiUrl}${contactId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${this.authToken}`
      }
    });
  }
}
