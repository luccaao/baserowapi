import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'contact-list'},

  { path: 'add-contact',  component: AddContactComponent },
  
  { path: 'contact-list',  component: ContactListComponent  },

  { path: 'edit-contact/:id', component: EditContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
