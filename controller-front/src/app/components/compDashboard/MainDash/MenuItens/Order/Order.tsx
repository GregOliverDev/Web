"use client";
import React, { useEffect, useState } from "react";
import styles from "./Order.module.css";
import { Button, IconButton, InputBase, Paper } from "@mui/material";
import Product from "@/app/models/Product";
import { useClientStore } from "@/app/state/ClientState/ClientState";
import { useSelectProductStore } from "@/app/state/SelectProductState/SelectProductState";
import SearchIcon from "@mui/icons-material/Search";
import OrderProd from "@/app/models/OrderProd";
import { useVendProdStore } from "@/app/state/VendProd/VendProd";
import MessageTheme from "../MessageTheme/MessageTheme";
import { useCadProductStore } from "@/app/state/CadProduct/CadProduct";
import OrderObj from "@/app/models/OrderObj";

export default function Order() {
  const [items, setItems] = useState<Product[]>([]);
  const [itemsOrder, setItemsOrder] = useState<OrderProd[]>([]);
  const [itemsOrders, setItemsOrders] = useState<OrderObj[]>([]);
  const [filterText, setFilterText] = useState("");
  const [textNull, setTextNull] = useState(false);
  const [sucessMessage, setSucessMessage] = useState(false);
  const [error, setError] = useState({ title: "", message: "" });
  const [sucess, setSucess] = useState({ title: "", message: "" });
  const showProducts = useSelectProductStore((state) => state.showProducts);
  const alterShowProducts = useSelectProductStore((state) => state.alter);
  const vendProd = useVendProdStore((state) => state.vendProd);
  const altervendProd = useVendProdStore((state) => state.alter);
  const clientSave = useClientStore((state) => state.client);
  const [product, setProduct] = useState<Product | null>();
  const [totals, setTotals] = useState(0);
  const [valueDesc, setValueDesc] = useState(0);
  const cadProduct = useCadProductStore((state) => state.cadProduct);
  const altercadProduct = useCadProductStore((state) => state.alter);
  const newCad = useCadProductStore((state) => state.newCad);
  const selectOrder = useCadProductStore((state) => state.selectOrder);
  const alterSelectOrder = useCadProductStore(
    (state) => state.alterSelectOrder
  );
  const [newNumber, setNewNumber] = useState(0);

  useEffect(() => {
    fetch(
      `http://192.168.66.48:4000/api/order/getOrders?registrationClient=${clientSave.registration}`,
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
          setItemsOrders(data);
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }, [selectOrder]);

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

  useEffect(() => {
    const calculateTotals = () => {
      let newTotal = 0;
      itemsOrder.forEach((item) => {
        newTotal += item.price * item.quant;
      });
      if (newTotal >= valueDesc) {
        setTotals(newTotal - valueDesc);
      } else {
        setError({
          title: "Valor Inválido",
          message: "Valor de desconto maior que o valor do pedido",
        });
        setTextNull(true);
        setTimeout(() => {
          setTextNull(false);
        }, 3000);
      }
    };

    calculateTotals();
  }, [itemsOrder, valueDesc]);

  useEffect(() => {
    fetch(
      `http://192.168.66.48:4000/api/order/getOrders?registrationClient=${clientSave.registration}`,
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
          setNewNumber(data.length + 1);
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }, [createOrder]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().match(new RegExp(filterText.toLowerCase()))
  );

  const filteredOrdersItems = itemsOrders.filter((itemOrder) =>
    itemOrder.strClientVend
      .toLowerCase()
      .match(new RegExp(filterText.toLowerCase()))
  );

  function createOrder() {
    const clientVend = document.getElementById(
      "clientVend"
    ) as HTMLInputElement | null;
    if (
      clientVend instanceof HTMLInputElement &&
      clientVend.value.trim() !== ""
    ) {
      if (itemsOrder.length >= 1) {
        if (newCad) {
          const newOrderData: OrderObj = {
            _id: "",
            numberOrder: newNumber,
            registrationClient: clientSave.registration,
            strClientVend: clientVend.value,
            priceVend: totals,
            priceDesc: valueDesc,
            products: itemsOrder,
          };

          fetch("http://192.168.66.48:4000/api/order/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newOrderData),
          })
            .then((response) => {
              const statusResponse = response.status;
              if (statusResponse === 200) {
                setSucess({
                  title: "Sucesso",
                  message: "Digitação realizada com êxito",
                });
                setSucessMessage(true);
                setTimeout(() => {
                  setSucessMessage(false);
                }, 4000);
                cancel();
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
        }
      } else {
        setError({
          title: "Produto Inválido",
          message: "Selecione pelo menos um produto",
        });
        setTextNull(true);
        setTimeout(() => {
          setTextNull(false);
        }, 3000);
      }
    } else {
      setError({
        title: "Cliente Inválido",
        message: "Preencha o campo Cliente corretamente",
      });
      setTextNull(true);
      setTimeout(() => {
        setTextNull(false);
      }, 3000);
    }
  }

  function digQuant() {
    const digQuantValue = document.getElementById("digQuant");

    if (
      digQuantValue instanceof HTMLInputElement &&
      digQuantValue.value.trim() !== ""
    ) {
      if (product?.stock != null) {
        if (product.stock >= Number(digQuantValue.value)) {
          const orderProduct: OrderProd = {
            idProduct: product?._id,
            product: product?.name,
            quant: Number(digQuantValue.value),
            price: product?.price,
          };
          setItemsOrder((prevItems) => [...prevItems, orderProduct]);
          altervendProd(false);
        } else {
          setError({
            title: "Quantidade Maior",
            message: "Quantidade da Venda digitada maior que o estoque atual",
          });
          setTextNull(true);
          setTimeout(() => {
            setTextNull(false);
          }, 3000);
        }
      }
    } else {
      setError({
        title: "Quantidade inválida",
        message: "Preencha o campo Quantidade da Venda corretamente",
      });
      setTextNull(true);
      setTimeout(() => {
        setTextNull(false);
      }, 3000);
    }
  }

  function delOrderProd(index: number) {
    setItemsOrder((prevItems) => prevItems.filter((_, i) => i !== index));
  }

  const handleInputChange = (
    itemProduct: OrderProd,
    index: any,
    event: any
  ) => {
    const value = Number(event.target.value);
    const item = items.find((item) => item._id === itemProduct.idProduct);

    if (item?.stock != null) {
      console.log(item.stock);
      if (value <= item.stock) {
        const newItemsOrder = [...itemsOrder];
        newItemsOrder[index].quant = value;
        setItemsOrder(newItemsOrder);
      } else {
        setError({
          title: "Quantidade Maior",
          message:
            "Quantidade digitada maior que o estoque atual: " + item.stock,
        });
        setTextNull(true);
        setTimeout(() => {
          setTextNull(false);
        }, 3000);
      }
    }
  };

  const handleValueDescChange = (event: any) => {
    const value =
      event.target.value.trim() !== "" ? Number(event.target.value) : 0;
    setValueDesc(value);
  };

  function validProduct(product: string) {
    let listItems = 0;
    itemsOrder.forEach((item) => {
      if (item.idProduct == product) {
        setError({
          title: "Produto Inválido",
          message: "Produto selecionado ja se encontra no pedido",
        });
        setTextNull(true);
        setTimeout(() => {
          setTextNull(false);
        }, 3000);
        listItems++;
      }
    });
    if (listItems == 0) {
      alterShowProducts(false);
      altervendProd(true);
    }
  }

  function cancel() {
    setItems([]);
    setItemsOrder([]);
    setProduct(null);
    setTotals(0);
    setValueDesc(0);
    altercadProduct(false);
    const valueDesc = document.getElementById(
      "valueDesc"
    ) as HTMLInputElement | null;
    if (valueDesc) {
      valueDesc.value = "";
    }
    const clientVend = document.getElementById(
      "clientVend"
    ) as HTMLInputElement | null;
    if (clientVend) {
      clientVend.value = "";
    }
  }

  return (
    <div className={styles.order}>
      {selectOrder && (
        <div className={styles.divSearch}>
          <div className={styles.divOrderSearch}>
            <div className={styles.divFilter}>
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
                className={styles.btDefaulCancel}
                onClick={() => {
                  alterSelectOrder(false);
                  altercadProduct(false);
                }}
              >
                Voltar
              </Button>
            </div>
            <div className={styles.ordersFilter}>
              {filteredOrdersItems.map((itemOrder) => (
                <div key={itemOrder._id} className={styles.orders}>
                  <div className={styles.divDesc}>
                    <h3 className={styles.h3Order}>
                      Número do Pedido:
                      <p className={styles.descOrder}>
                        {itemOrder.numberOrder}
                      </p>
                    </h3>
                    <h3 className={styles.h3Order}>
                      Cliente:
                      <p className={styles.h4Text}>{itemOrder.strClientVend}</p>
                    </h3>
                    <h3 className={styles.h3Order}>
                      Valor Total:
                      <p className={styles.h4Text}>{itemOrder.priceVend}</p>
                    </h3>
                    <h3 className={styles.h3Order}>
                      Valor Desconto:
                      <p className={styles.h4Text}>{itemOrder.priceDesc}</p>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.divTransparent}></div>
        </div>
      )}
      {showProducts && (
        <div className={styles.divSearch}>
          <div className={styles.divProductsSearch}>
            <div className={styles.divFilter}>
              <div className={styles.divFilterInfo}>
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
              <Button
                variant="contained"
                className={styles.btDefaulCancel}
                onClick={() => {
                  alterShowProducts(false);
                }}
              >
                Voltar
              </Button>
            </div>
            <div className={styles.productsFilter}>
              {filteredItems.map((item) => (
                <div key={item._id} className={styles.products}>
                  <div className={styles.divDesc}>
                    <h3 className={styles.h3Product}>
                      Nome Produto:
                      <p className={styles.descProduct}>{item.name}</p>
                    </h3>
                    <h3 className={styles.h3Product}>
                      Valor de Venda:
                      <p className={styles.h4Text}>{item.price.toFixed(2)}</p>
                    </h3>
                  </div>
                  <div className={styles.btAlterProduct}>
                    <Button
                      variant="contained"
                      className={styles.btDefaul}
                      onClick={() => {
                        validProduct(item._id);
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
      {vendProd && product != null && (
        <div className={styles.divProd}>
          <div className={styles.divVendProd}>
            <h3 className={styles.h3Product}>
              Nome Produto:
              <p className={styles.descProduct}>{product.name}</p>
            </h3>
            <h3 className={styles.h3Product}>
              Preço:
              <p className={styles.descProduct}>{product.price.toFixed(2)}</p>
            </h3>
            <h3 className={styles.h3Product}>
              Estoque Atual:
              <p className={styles.descProduct}>{product.stock}</p>
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
                placeholder="Quantidade da venda:"
                inputProps={{ "aria-label": "Quantidade da venda:" }}
                id="digQuant"
              />
            </Paper>
            <div className={styles.divBts}>
              <Button
                variant="contained"
                className={styles.btDefaul}
                onClick={() => {
                  digQuant();
                }}
              >
                Gravar
              </Button>
              <Button
                variant="contained"
                className={styles.btDefaulCancel}
                onClick={() => {
                  altervendProd(false);
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
          <div className={styles.divTransparent}></div>
        </div>
      )}
      <div className={styles.selectOrder}>
        <Button
          variant="contained"
          className={styles.btDefaul}
          disabled={cadProduct}
          onClick={() => {
            altercadProduct(true);
            alterSelectOrder(true);
          }}
        >
          Consultar Pedidos
        </Button>
      </div>
      <div className={styles.newOrder}>
        <div className={styles.divVend}>
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
              placeholder="Nome Cliente: "
              inputProps={{ "aria-label": "Nome Cliente: " }}
              id="clientVend"
              onChange={() => {
                altercadProduct(true);
              }}
            />
          </Paper>
          <Button
            variant="contained"
            className={styles.btDefaul}
            onClick={() => {
              alterShowProducts(true);
              altercadProduct(true);
            }}
          >
            Adicionar produto
          </Button>
        </div>
        <div className={styles.divProducts}>
          <div className={styles.orderProd}>
            {itemsOrder.map((item, index) => (
              <div key={index} className={styles.products}>
                <div className={styles.divDesc}>
                  <h2 className={styles.h3text}>
                    Nome Produto: <p className={styles.ptext}>{item.product}</p>
                  </h2>
                </div>
                <div className={styles.divPrice}>
                  <h3 className={styles.h3text}>
                    Preço R$:
                    <p className={styles.ptext}>{item.price}</p>
                  </h3>
                </div>
                <div className={styles.divQuant}>
                  <h3 className={styles.h3text}>
                    Quantidade:
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
                        placeholder="Quantidade da venda:"
                        inputProps={{ "aria-label": "Quantidade da venda:" }}
                        id="digQuant"
                        value={item.quant}
                        onChange={(e) => handleInputChange(item, index, e)}
                      />
                    </Paper>
                  </h3>
                </div>
                <div className={styles.divValueTot}>
                  <h3 className={styles.h3text}>
                    Total R$:
                    <p className={styles.ptext}>{item.price * item.quant}</p>
                  </h3>
                </div>
                <div className={styles.divBtsProducts}>
                  <Button
                    variant="contained"
                    className={styles.btDefaulCancel}
                    onClick={() => delOrderProd(index)}
                  >
                    Excluir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.divTotals}>
          <div className={styles.divValues}>
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
                placeholder="Desconto: "
                inputProps={{ "aria-label": "Desconto: " }}
                id="valueDesc"
                onChange={handleValueDescChange}
              />
            </Paper>
            <h2 className={styles.h2Text}>Total R$: {totals.toFixed(2)}</h2>
          </div>
          <div className={styles.divBts}>
            <Button
              variant="contained"
              className={styles.btDefaul}
              onClick={() => {
                createOrder();
              }}
            >
              Gravar
            </Button>
            <Button
              variant="contained"
              className={styles.btDefaulCancel}
              onClick={() => {
                cancel();
              }}
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
