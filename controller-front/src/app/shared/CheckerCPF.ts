export default function checkerCpf(textCpf: string) {
  let charCpf = textCpf.replace(/\D/g, "");
  let cpf = Array.from(charCpf).map(Number);

  let soma = 0;
  let i = 10;
  for (var c = 0; c < 9; c++) {
    soma = soma + cpf[c] * i;
    i = i - 1;
  }

  var div = (soma * 10) % 11;

  if (div == cpf[9]) {
    soma = 0;
    div = 0;
    i = 11;
    for (var c = 0; c < 10; c++) {
      soma = soma + cpf[c] * i;
      i = i - 1;
    }
    div = (soma * 10) % 11;
    if (div == cpf[10]) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
