import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../../sdks/firebase";
import { db } from "../../sdks/firebase";

/**
 * Funcao auxiliar para registro de usuarios
 * @param email E-mail do usario
 * @param password Senha do usuario
 * @param name Nome do usuario
 */
export async function registerUser(email: string, password: string, name: string) {
    try {
        const credentials = await createUserWithEmailAndPassword(auth, email, password); // Cria as credenciais para o usuario

        // Cria os dados no banco de dados
        await setDoc(doc(db, 'users', credentials.user.uid), {
            name,
            email
        });
    } catch (error) {
        console.error(error);
    }
}