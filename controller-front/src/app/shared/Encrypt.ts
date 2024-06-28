const KEY = 'mysecretkey';

export function encrypt(password: string) {
  let result = '';
  for (let i = 0; i < password.length; i++) {
    result += String.fromCharCode(password.charCodeAt(i) ^ KEY.charCodeAt(i % KEY.length));
  }
  return result;
}

export function decrypt(encrypted: string) {
  return encrypt(encrypted);
}
