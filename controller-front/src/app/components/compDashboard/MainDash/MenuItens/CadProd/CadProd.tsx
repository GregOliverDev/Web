"use client";
import React, { useEffect, useState } from "react";
import styles from "./CadProd.module.css";
import { Button, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNewCadStore } from "@/app/state/NewCad/NewCad";
import Product from "@/app/models/Product";
import MessageTheme from "../MessageTheme/MessageTheme";
import { useClientStore } from "@/app/state/ClientState/ClientState";

export default function CadProd() {
  const newCad = useNewCadStore((state) => state.newCad);
  const alterNewCad = useNewCadStore((state) => state.alter);
  const alterTypeCad = useNewCadStore((state) => state.alterType);
  const typeCad = useNewCadStore((state) => state.typeCad);
  const clientSave = useClientStore((state) => state.client);
  const [textNull, setTextNull] = useState(false);
  const [sucessMessage, setSucessMessage] = useState(false);
  const [error, setError] = useState({ title: "", message: "" });
  const [sucess, setSucess] = useState({ title: "", message: "" });
  const [items, setItems] = useState<Product[]>([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    fetch(
      `http://192.168.66.48:4000/api/product/getProducts?registrationClient=${clientSave.registration}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          setItems(data);
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }, [newCad, deleteProduct]);

  function createProduct(type: string) {
    const textName = document.getElementById("textName");
    const textPrice = document.getElementById("textPrice");
    const textStock = document.getElementById("textStock");
    const textUrl = document.getElementById("textUrl");

    if (textName instanceof HTMLInputElement && textName.value.trim() !== "") {
      if (
        textPrice instanceof HTMLInputElement &&
        textPrice.value.trim() !== ""
      ) {
        if (
          textStock instanceof HTMLInputElement &&
          textStock.value.trim() !== ""
        ) {
          const newName = textName.value;
          const newPrice = textPrice.value;
          const newStock = textStock.value;
          let newUrl =
            textUrl instanceof HTMLInputElement ? textUrl.value.trim() : null;
          newUrl = newUrl !== "" ? newUrl : null;

          if (type === "Adicionar") {
            const productData = {
              name: newName,
              price: newPrice,
              stock: newStock,
              urlImg: newUrl,
              registrationClient: clientSave.registration,
            };

            fetch("http://192.168.66.48:4000/api/product/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(productData),
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
                const contentType = response.headers.get("content-type");
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
          } else {
            const productData = {
              _id: type,
              name: newName,
              price: newPrice,
              stock: newStock,
              urlImg: newUrl,
              registrationClient: clientSave.registration,
            };

            fetch("http://192.168.66.48:4000/api/product/update", {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(productData),
            })
              .then((response) => {
                const statusResponse = response.status;
                if (statusResponse === 200) {
                  setSucess({
                    title: "Sucesso",
                    message: "Atualização realizada com êxito",
                  });
                  setSucessMessage(true);
                  setTimeout(() => {
                    setSucessMessage(false);
                  }, 4000);
                }
                const contentType = response.headers.get("content-type");
                if (
                  contentType &&
                  contentType.indexOf("application/json") !== -1
                ) {
                  return response.json();
                } else {
                  return response.text();
                }
              })
              .then((data) => {
                console.log(data);
              })
              .catch((error) => {
                console.error("Erro:", error);
              });
          }
          alterNewCad(!newCad);
        } else {
          textStock?.focus();
          setError({
            title: "Quantidade inválida",
            message: "Preencha o campo Estoque Atual corretamente",
          });
          setTextNull(true);
          setTimeout(() => {
            setTextNull(false);
          }, 3000);
        }
      } else {
        textPrice?.focus();
        setError({
          title: "Preço inválido",
          message: "Preencha o campo Preço corretamente",
        });
        setTextNull(true);
        setTimeout(() => {
          setTextNull(false);
        }, 3000);
      }
    } else {
      textName?.focus();
      setError({
        title: "Nome inválido",
        message: "Preencha o campo Nome corretamente",
      });
      setTextNull(true);
      setTimeout(() => {
        setTextNull(false);
      }, 3000);
    }
  }

  function deleteProduct(idProduct: string) {
    fetch(`http://192.168.66.48:4000/api/product/delete/${idProduct}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          setSucess({
            title: "Sucesso",
            message: "Produto excluído com êxito",
          });
          setSucessMessage(true);
          setTimeout(() => {
            setSucessMessage(false);
          }, 4000);
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().match(new RegExp(filterText.toLowerCase()))
  );

  function isValidUrl(url: any) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }

  return (
    <div className={styles.cadProd}>
      {newCad && (
        <div className={styles.divCad}>
          <div className={styles.divNewCad}>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 310,
              }}
              className={styles.paperSearch}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Nome "
                inputProps={{ "aria-label": "Nome " }}
                id="textName"
              />
            </Paper>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 310,
              }}
              className={styles.paperSearch}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Preço "
                inputProps={{ "aria-label": "Preço ", step: "0.01" }}
                id="textPrice"
                type="number"
              />
            </Paper>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 310,
              }}
              className={styles.paperSearch}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Estoque Atual "
                inputProps={{ "aria-label": "Estoque Atual ", step: "1" }}
                id="textStock"
                type="number"
              />
            </Paper>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 310,
              }}
              className={styles.paperSearch}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Url Imagem "
                inputProps={{ "aria-label": "Url Imagem " }}
                id="textUrl"
              />
            </Paper>
            <Button
              variant="contained"
              className={styles.btDefaul}
              onClick={() => {
                createProduct(typeCad);
              }}
            >
              Salvar Cadastro
            </Button>
          </div>
          <div
            className={styles.divTransparentUser}
            onClick={() => {
              alterNewCad(false);
            }}
          ></div>
        </div>
      )}
      <div className={styles.divSearch}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 310,
          }}
          className={styles.paperSearch}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Informe Algo"
            inputProps={{ "aria-label": "Informe Algo" }}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            className={styles.iconSearch}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        <Button
          variant="contained"
          className={styles.btDefaul}
          onClick={() => {
            alterNewCad(!newCad);
            alterTypeCad("Adicionar");
          }}
        >
          Novo Produto
        </Button>
      </div>
      <div className={styles.divProducts}>
        {filteredItems.map((item) => (
          <div key={item._id} className={styles.divProduct}>
            <div className={styles.divInfosProduct}>
              <div className={styles.imgProducts}>
                <img
                  src={
                    isValidUrl(item.urlImg)
                      ? item.urlImg
                      : "/assets/NotFound.png"
                  }
                  alt={item.name}
                  className={styles.imgProduct}
                  onError={(e) =>
                    (e.currentTarget.src = "/assets/NotFound.png")
                  }
                />
              </div>
              <div className={styles.divInfos}>
                <div className={styles.divDesc}>
                  <h3 className={styles.h3Product}>
                    Nome Produto:{" "}
                    <p className={styles.descProduct}>{item.name}</p>
                  </h3>
                </div>
                <div className={styles.divQuantValue}>
                  <h3 className={styles.h3Product}>
                    Estoque Atual: <p className={styles.h4Text}>{item.stock}</p>
                  </h3>
                  <h3 className={styles.h3Product}>
                    Valor de Venda:{" "}
                    <p className={styles.h4Text}>{item.price.toFixed(2)}</p>
                  </h3>
                </div>
              </div>
            </div>
            <div className={styles.btAlterProduct}>
              <Button
                variant="contained"
                className={styles.btDefaul}
                onClick={() => {
                  alterNewCad(!newCad);
                  alterTypeCad(item._id);
                }}
              >
                Alterar Produto
              </Button>
              <Button
                variant="contained"
                className={styles.btDefaulCancel}
                onClick={() => {
                  deleteProduct(item._id);
                }}
              >
                Excluir Produto
              </Button>
            </div>
          </div>
        ))}
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
