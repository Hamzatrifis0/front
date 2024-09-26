import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true, 
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, MessagesModule, MessageModule, CommonModule, ToastModule],
})
export class ContactComponent {
  contactForm: FormGroup;
  successMessage: string | null = null;
  
  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(300)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      
      this.successMessage = "Demande de contact envoyée avec succès";
      this.showMessage("Demande de contact envoyée avec succès","success","Message Envoyé");
      this.contactForm.reset(); 
    }
  }

  // Afficher un message
  showMessage(message: string, severity: string, summary: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: message,
      life: 3000 
    });
  }
}
