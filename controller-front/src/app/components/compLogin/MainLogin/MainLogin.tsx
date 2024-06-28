"use client";
import React, { useState, useEffect } from "react";
import styles from "./MainLogin.module.css";
import { Button } from "@mui/material";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import { customTheme } from "../CustomTheme/InputTheme";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import MaskedInput from "react-text-mask";
import MessageTheme from "../MessageTheme/MessageTheme";
import checkerCpf from "@/app/shared/CheckerCPF";
import { encrypt } from "@/app/shared/Encrypt";

const CPF_MASK = [
  /\d/,
  /\d/,
  /\d/,
  ".",
  /\d/,
  /\d/,
  /\d/,
  ".",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
];

const CNPJ_MASK = [
  /\d/,
  /\d/,
  ".",
  /\d/,
  /\d/,
  /\d/,
  ".",
  /\d/,
  /\d/,
  /\d/,
  "/",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
];

function MyMaskedInput() {
  const outerTheme = useTheme();
  const [value, setValue] = useState("");
  const [mask, setMask] = useState(CNPJ_MASK);

  useEffect(() => {
    const digitCount = value.length;
    setMask(digitCount <= 14 ? CPF_MASK : CNPJ_MASK);
  }, [value]);

  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <MaskedInput
        mask={mask}
        guide={false}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        render={(ref, props) => (
          <TextField
            {...props}
            inputRef={ref}
            label="CPF ou CNPJ"
            variant="standard"
            className={styles.textField}
            id="textRegistration"
            InputLabelProps={{
              className: styles.whiteLabel,
            }}
          />
        )}
      />
    </ThemeProvider>
  );
}

export default function MainLogin() {
  const outerTheme = useTheme();
  const [textNull, setTextNull] = useState(false);
  const [sucessMessage, setSucessMessage] = useState(false);
  const [error, setError] = useState({ title: "", message: "" });
  const [sucess, setSucess] = useState({ title: "", message: "" });

  function methodsClient(method: string) {
    return async () => {
      const textRegistration = document.getElementById("textRegistration");
      const textEmail = document.getElementById("textEmail");
      const textPass = document.getElementById("textPass");

      if (
        textRegistration instanceof HTMLInputElement &&
        textRegistration.value.trim() !== "" &&
        (textRegistration.value.trim().length === 14 ||
          textRegistration.value.trim().length === 18) &&
        checkerCpf(textRegistration.value)
      ) {
        const newRegistration = textRegistration.value;
        setError({ title: "", message: "" });
        if (
          textEmail instanceof HTMLInputElement &&
          textEmail.value.trim() !== "" &&
          textEmail.value.includes("@")
        ) {
          const newEmail = textEmail.value;
          setError({ title: "", message: "" });
          if (
            textPass instanceof HTMLInputElement &&
            textPass.value.trim() !== "" &&
            textPass.value.length >= 8
          ) {
            let newPass = textPass.value;
            setError({ title: "", message: "" });
            setTextNull(false);

            let newType = "CPF";
            if (newRegistration.length === 18) {
              newType = "CNPJ";
            }
            newPass = encrypt(newPass);

            const clientData = {
              registration: newRegistration,
              email: newEmail,
              password: newPass,
              type: newType,
              themeSelect: 1,
            };

            fetch(
              `http://192.168.66.48:4000/api/client/getClient?newRegistration=${newRegistration}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
              .then((response) => response.json())
              .then((data) => {
                if (data.error) {
                  console.error(data.error);
                } else {
                  if (data.length > 0) {
                    if (method == "register") {
                      setError({
                        title: "Usuário Existente",
                        message: "Usuário ja Cadastrado com esse CPF / CNPJ",
                      });
                      setTextNull(true);
                      setTimeout(() => {
                        setTextNull(false);
                      }, 6000);
                    } else if (method == "enter") {
                      let user = data[0];

                      let checkerPass = user.password;

                      console.log(checkerPass, newPass);

                      if (checkerPass == newPass) {
                        if (user.email == newEmail) {
                          const clientLogin = {
                            registration: user.registration,
                          };
                          localStorage.setItem(
                            "clientRestore",
                            JSON.stringify(clientLogin)
                          );

                          window.location.href = "/pages/DashBoard";
                        } else {
                          setError({
                            title: "Email não Vinculado",
                            message:
                              "Campo email não condiz com o email do usuário",
                          });
                          setTextNull(true);
                          setTimeout(() => {
                            setTextNull(false);
                          }, 3000);
                        }
                      } else {
                        setError({
                          title: "Senha Incorreta",
                          message:
                            "Campo senha não condiz com a senha do usuário",
                        });
                        setTextNull(true);
                        setTimeout(() => {
                          setTextNull(false);
                        }, 3000);
                      }
                    }
                  } else {
                    if (method == "register") {
                      fetch("http://192.168.66.48:4000/api/client/create", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(clientData),
                      })
                        .then((response) => {
                          const statusResponse = response.status;
                          if (statusResponse === 200) {
                            setSucess({
                              title: "Sucesso",
                              message: "Cadastro realizado com êxito",
                            });
                            setSucessMessage(true);
                            setTimeout(() => {
                              setSucessMessage(false);
                            }, 4000);
                          }
                          const contentType =
                            response.headers.get("content-type");
                          if (
                            contentType &&
                            contentType.indexOf("application/json") !== -1
                          ) {
                            return response.json();
                          } else {
                            return response.text();
                          }
                        })
                        .then((data) => console.log(data))
                        .catch((error) => {
                          console.error("Erro:", error);
                        });
                    } else if (method == "enter") {
                      setError({
                        title: "Usuário Inexistente",
                        message:
                          "Nenhum usuário encontrado com esse CPF / CNPJ",
                      });
                      setTextNull(true);
                      setTimeout(() => {
                        setTextNull(false);
                      }, 3000);
                    }
                  }
                }
              })
              .catch((error) => {
                console.error("Erro:", error);
              });
          } else {
            textPass?.focus();
            setError({
              title: "Senha inválida",
              message:
                "Preencha o campo senha corretamente (Min: 8 caracteres)",
            });
            setTextNull(true);
            setTimeout(() => {
              setTextNull(false);
            }, 3000);
          }
        } else {
          textEmail?.focus();
          setError({
            title: "Email inválido",
            message: "Preencha o campo email corretamente",
          });
          setTextNull(true);
          setTimeout(() => {
            setTextNull(false);
          }, 3000);
        }
      } else {
        textRegistration?.focus();
        setError({
          title: "Número do documento inválido",
          message: "Preencha o campo CPF / CNPJ corretamente",
        });
        setTextNull(true);
        setTimeout(() => {
          setTextNull(false);
        }, 3000);
      }
    };
  }

  return (
    <div className={styles.divLogin}>
      <div className={styles.divRegister}>
        <div className={styles.divImg}>
          <Image
            src="/assets/favicon.png"
            alt="logo"
            width={34}
            height={34}
            id={styles.logo}
          />
          <h4 className={styles.h4Title}>Controller</h4>
        </div>
        <h2 className={styles.h2Text}>Experimente grátis</h2>
        <p className={styles.pText}>Cadastre-se e comece a usar agora mesmo!</p>

        <MyMaskedInput />

        <ThemeProvider theme={customTheme(outerTheme)}>
          <TextField
            label="Email"
            type="email"
            variant="standard"
            className={styles.textField}
            id="textEmail"
            InputLabelProps={{
              className: styles.whiteLabel,
            }}
          />
        </ThemeProvider>

        <ThemeProvider theme={customTheme(outerTheme)}>
          <TextField
            label="Password"
            type="Password"
            variant="standard"
            className={styles.textField}
            id="textPass"
            InputLabelProps={{
              className: styles.whiteLabel,
            }}
          />
        </ThemeProvider>

        <div className={styles.divBt}>
          <Button
            variant="contained"
            className={styles.btDefaul}
            onClick={methodsClient("register")}
          >
            Cadastrar
          </Button>
          <Button
            variant="contained"
            className={styles.btDefaul}
            onClick={methodsClient("enter")}
          >
            Entrar
          </Button>
        </div>
      </div>
      {textNull && (
        <div className={styles.divMessage}>
          <MessageTheme
            title={error.title}
            message={error.message}
            type={"Error"}
          />
        </div>
      )}
      {sucessMessage && (
        <div className={styles.divMessage}>
          <MessageTheme
            title={sucess.title}
            message={sucess.message}
            type={"Sucess"}
          />
        </div>
      )}
    </div>
  );
}
