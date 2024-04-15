import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://api.baserow.io/api/database/rows/table/282745/';
  private authToken = 'HShcPbnnSu4sFniGkqMYWI9QQ19I5HNH';

  constructor() { }

  getAllContacts() {
    return axios.get(this.apiUrl + "?user_field_names=true", {
      headers: {
        Authorization: `Token ${this.authToken}`
      }
    });
  }

  getContact(contactId: number) {
    return axios.get(`${this.apiUrl}${contactId}/?user_field_names=true`, {
      headers: {
        Authorization: `Token ${this.authToken}`
      }
    });
  }

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

  deleteContact(contactId: number) {
    return axios.delete(`${this.apiUrl}${contactId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${this.authToken}`
      }
    });
  }
}

