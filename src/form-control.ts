import isEmail from 'validator/lib/isEmail';

interface FormParameters {
  form: HTMLFormElement;
  username: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  password2: HTMLInputElement;
  errorSpan: HTMLSpanElement;
}

interface FormMethods {
  createErrorMessage(currentElement: HTMLInputElement, errorMsg: string): void;
  processHandler(): void;
  validateFields(): void;
}

export class FormValidator implements FormParameters, FormMethods {
  form: HTMLFormElement;
  username: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  password2: HTMLInputElement;
  errorSpan: HTMLSpanElement;

  SHOW_ERROR_MESSAGE = 'show-error-message';

  constructor() {
    this.form = document.querySelector('.form') as HTMLFormElement;
    this.username = document.querySelector('.username') as HTMLInputElement;
    this.email = document.querySelector('.email') as HTMLInputElement;
    this.password = document.querySelector('.password') as HTMLInputElement;
    this.password2 = document.querySelector('.password2') as HTMLInputElement;
    this.errorSpan = document.querySelector(
      '.error-message',
    ) as HTMLSpanElement;
  }
  changePreventDefault(): void {
    throw new Error('Method not implemented.');
  }
  createErrorMessage(currentElement: HTMLInputElement, errorMsg: string): void {
    const parentTag = currentElement.parentElement;
    if (parentTag) parentTag.classList.add(this.SHOW_ERROR_MESSAGE);
    const span = parentTag?.querySelector('.error-message') as HTMLSpanElement;
    span.innerText = errorMsg;
  }

  processHandler(): void {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.clearErrorMessages();
      this.validateFields();
    });
  }

  validateFields(): void {
    if (this.username.value.length < 3 || this.username.value.length > 50) {
      const errorUsername = 'Usuario inválido';
      this.createErrorMessage(this.username, errorUsername);
    }

    if (!isEmail(this.email.value)) {
      const errorEmail = 'Email inválido';
      this.createErrorMessage(this.email, errorEmail);
    }

    if (this.password.value !== this.password2.value) {
      const errorPassword = 'Os campos de senha são diferentes';
      this.createErrorMessage(this.password, errorPassword);
      this.createErrorMessage(this.password2, errorPassword);
    } else if (!this.password.value) {
      const errorPassword = 'Senha inválida';
      this.createErrorMessage(this.password, errorPassword);
    }
  }

  clearErrorMessages(): void {
    document
      .querySelectorAll('.' + this.SHOW_ERROR_MESSAGE)
      .forEach((item) => item.classList.remove(this.SHOW_ERROR_MESSAGE));
  }
}

const formValidator = new FormValidator();
formValidator.processHandler();
