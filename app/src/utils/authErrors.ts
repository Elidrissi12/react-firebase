export function mapFirebaseAuthError(code?: string) {
  switch (code) {
    case 'auth/invalid-email':
      return 'Email invalide.';
    case 'auth/user-not-found':
      return "Aucun compte avec cet email.";
    case 'auth/wrong-password':
      return 'Mot de passe incorrect.';
    case 'auth/email-already-in-use':
      return 'Email déjà utilisé.';
    case 'auth/weak-password':
      return 'Mot de passe trop faible (min 6).';
    case 'auth/network-request-failed':
      return 'Problème réseau. Vérifie ta connexion.';
    case 'auth/operation-not-allowed':
      return 'La connexion par email/mot de passe n’est pas activée dans Firebase.';
    case 'auth/invalid-credential':
      return 'Identifiants invalides. Vérifie ton email et ton mot de passe.';
    default:
      return 'Erreur de connexion. Réessaie.';
  }
}

