"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./InventProd.module.css";
import { Button, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelectProductStore } from "@/app/state/SelectProductState/SelectProductState";
import Product from "@/app/models/Product";
import { useClientStore } from "@/app/state/ClientState/ClientState";
import MessageTheme from "../MessageTheme/MessageTheme";

export default function InventProd() {
  const showProducts = useSelectProductStore((state) => state.showProducts);
  const alterShowProducts = useSelectProductStore((state) => state.alter);
  const clientSave = useClientStore((state) => state.client);
  const [textNull, setTextNull] = useState(false);
  const [sucessMessage, setSucessMessage] = useState(false);
  const [error, setError] = useState({ title: "", message: "" });
  const [sucess, setSucess] = useState({ title: "", message: "" });
  const [items, setItems] = useState<Product[]>([]);
  const [filterText, setFilterText] = useState("");
  const [product, setProduct] = useState<Product | null>();
  const quantNew = useRef<HTMLInputElement>();

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
  }, [showProducts]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().match(new RegExp(filterText.toLowerCase()))
  );

  function Inventory() {
    const quantNew = document.getElementById("quantNew");
    const dataCurrent: string = new Date().toDateString();

    if (quantNew instanceof HTMLInputElement && quantNew.value.trim() !== "") {
      if (product?.name != null) {
        const inventoryData = {
          data: dataCurrent,
          idProduct: product._id,
          quant: quantNew.value,
          registrationClient: clientSave.registration,
        };

        fetch("http://192.168.66.48:4000/api/inventory/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inventoryData),
        })
          .then((response) => {
            const statusResponse = response.status;
            if (statusResponse === 200) {
              setSucess({
                title: "Sucesso",
                message: "Inventário realizado com êxito",
              });
              setSucessMessage(true);
              setTimeout(() => {
                setSucessMessage(false);
              }, 4000);
            }
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
              return response.json();
            } else {
              return response.text();
            }
          })
          .then((data) => console.log(data))
          .catch((error) => {
            console.error("Erro:", error);
          });

        const productData = {
          _id: product._id,
          stock: quantNew.value,
        };

        fetch("http://192.168.66.48:4000/api/product/updateStock", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        })
          .then((response) => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
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

        Cancel();
      } else {
        setError({
          title: "Produto não Selecionado",
          message: "Selecione o produto que deseja alterar o estoque",
        });
        setTextNull(true);
        setTimeout(() => {
          setTextNull(false);
        }, 3000);
      }
    } else {
      setError({
        title: "Quantidade inválida",
        message: "Preencha o campo Nova Quantidade corretamente",
      });
      setTextNull(true);
      setTimeout(() => {
        setTextNull(false);
      }, 3000);
    }
  }

  function Cancel() {
    setProduct(null);
    if (quantNew.current) {
      quantNew.current.value = "";
    }
  }

  return (
    <div className={styles.inventProd}>
      {showProducts && (
        <div className={styles.divSearch}>
          <div className={styles.divProducts}>
            <div className={styles.divFilter}>
              <h3>Selecione o produto: </h3>
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
            </div>
            <div className={styles.productsFilter}>
              {filteredItems.map((item) => (
                <div key={item._id} className={styles.products}>
                  <div className={styles.divDesc}>
                    <h3 className={styles.h3Product}>
                      Nome Produto:
                      <p className={styles.descProduct}>{item.name}</p>
                    </h3>
                  </div>

                  <h3 className={styles.h3Product}>
                    Estoque Atual: <p className={styles.h4Text}>{item.stock}</p>
                  </h3>
                  <h3 className={styles.h3Product}>
                    Valor de Venda:
                    <p className={styles.h4Text}>{item.price.toFixed(2)}</p>
                  </h3>

                  <div className={styles.btAlterProduct}>
                    <Button
                      variant="contained"
                      className={styles.btDefaul}
                      onClick={() => {
                        alterShowProducts(false);
                        setProduct(item);
                      }}
                    >
                      Selecionar Produto
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className={styles.divTransparent}
            onClick={() => {
              alterShowProducts(false);
            }}
          ></div>
        </div>
      )}

      <div className={styles.divInvent}>
        <div className={styles.divStart}>
          <div className={styles.divSearchBt}>
            <Button
              variant="contained"
              className={styles.btDefaul}
              onClick={() => {
                alterShowProducts(!showProducts);
              }}
            >
              Selecione o produto
            </Button>
          </div>
        </div>
        <div className={styles.divProduct}>
          <div className={styles.divProdSelect}>
            <h2 className={styles.h3text}>
              Nome Produto:{" "}
              <p className={styles.ptext} id="nameProduct">
                {product?.name}
              </p>
            </h2>
            <h3 className={styles.h3text}>
              Estoque Atual:{" "}
              <p className={styles.ptext} id="stockProduct">
                {product?.stock}
              </p>
            </h3>
            <h3 className={styles.h3text}>
              Valor de Venda:
              <p className={styles.ptext} id="priceProduct">
                {product?.price}
              </p>
            </h3>
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
                placeholder="Nova Quantidade"
                inputProps={{ "aria-label": "Nova Quantidade" }}
                id="quantNew"
                inputRef={quantNew}
              />
            </Paper>
          </div>
        </div>
        <div className={styles.divBt}>
          <div className={styles.divBts}>
            <Button
              variant="contained"
              className={styles.btDefaul}
              onClick={() => Inventory()}
            >
              Gravar
            </Button>
            <Button
              variant="contained"
              className={styles.btDefaulCancel}
              onClick={() => Cancel()}
            >
              Cancelar
            </Button>
          </div>
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
