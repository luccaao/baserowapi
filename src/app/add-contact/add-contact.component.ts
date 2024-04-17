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
  // Declaração do formulário reativo
  formulario!: FormGroup;

  // Construtor da classe, injetando os serviços necessários
  constructor(
    private contactService: ContactService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  // Método executado ao iniciar o componente
  ngOnInit(): void {
    // Inicialização do formulário reativo com validações
    this.formulario = this.formBuilder.group({
      name: [
        '', // Valor inicial
        Validators.compose([ // Validações para o campo 'name'
          Validators.required, // Campo obrigatório
          Validators.pattern(/(.|\s)*\S(.|\s)*/), // Deve conter pelo menos um caractere não vazio
          Validators.minLength(3), // Tamanho mínimo de 3 caracteres
        ]),
      ],
      phone: [
        '', // Valor inicial
        Validators.compose([ // Validações para o campo 'phone'
          Validators.required, // Campo obrigatório
          Validators.minLength(9), // Tamanho mínimo de 9 caracteres
          Validators.maxLength(16), // Tamanho máximo de 16 caracteres
          Validators.pattern('[- +()0-9]+'), // Deve conter apenas números, espaços, hífens e parênteses
        ]),
      ],
    });
  }

  // Adiciona um novo contato
  addContact() {
    // Verifica se o formulário é inválido
    if (this.formulario.invalid) {
      return; // Retorna sem fazer nada se o formulário for inválido
    }
    // Chama o serviço para adicionar o contato com os valores do formulário
    this.contactService.addContact(this.formulario.value).then((response) => {
      // Após a adição bem-sucedida, redireciona de volta à lista de contatos
      this.router.navigate(['/']);
      // Reseta o formulário para o estado inicial
      this.formulario.reset();
    });
  }

  // Cancela a adição do contato e redireciona de volta à lista de contatos
  cancelar() {
    this.router.navigate(['/']);
  }

  // Função para habilitar ou desabilitar o botão de adicionar contato com base na validade do formulário
  habilitarBotao(): string {
    if (this.formulario.valid) {
      return 'botao'; // Retorna a classe 'botao' se o formulário for válido
    } else {
      return 'botao__desabilitado'; // Retorna a classe 'botao__desabilitado' se o formulário for inválido
    }
  }
}
