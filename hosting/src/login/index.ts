import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../sdks/firebase"
import { registerUser } from "./helpers/register";

// Recupera todos os elementos relevantes da pagina de login e armazena no objeto elements
const elements = {
    buttons: {
        forgotPassword: document.getElementById('forgot_password__button'),
        login: document.getElementById('login_button'),
        register: document.getElementById('register__button')
    },
    inputs: {
        email: document.getElementById('email') as HTMLInputElement,
        password: document.getElementById('senha') as HTMLInputElement
    }
};

// Evento que eh executado quando o estado de autenticacao do usuario muda
// De nao autenticado para autenticado e vice e versa
onAuthStateChanged(auth, user => {
    if (user) // O usuario esta autenticado
        window.location.href = 'main.html'; // Redireciona para o app
});

elements.buttons.register.addEventListener('click', () => {
    const email: string = elements.inputs.email.value; // Recupera o texto dentro do campo de e-mail
    const password: string = elements.inputs.password.value; // Recupera o texto dentro do campo de senha

    if (!email)
        return window.alert('Favor informar o e-mail');

    if (!password)
        return window.alert('Favor informar a senha.');

    const name: string = window.prompt('Informe seu nome de usuário:');

    registerUser(email, password, name); // Aciona a funcao auxiliar de registro de usuario
});