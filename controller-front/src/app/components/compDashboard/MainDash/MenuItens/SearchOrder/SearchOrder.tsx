"use client";
import React, { useEffect, useState } from "react";
import styles from "./SearchOrder.module.css";
import { Button, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import OrderObj from "@/app/models/OrderObj";
import { useClientStore } from "@/app/state/ClientState/ClientState";

export default function SearchOrder() {
  const selectOrder = true;
  const [itemsOrders, setItemsOrders] = useState<OrderObj[]>([]);
  const [filterText, setFilterText] = useState("");
  const clientSave = useClientStore((state) => state.client);
  const [totals, setTotals] = useState(0);

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
    const calculateTotals = () => {
      let newTotal = 0;
      const filteredOrdersItems = itemsOrders.filter((itemOrder) =>
        itemOrder.strClientVend
          .toLowerCase()
          .match(new RegExp(filterText.toLowerCase()))
      );

      filteredOrdersItems.forEach((item) => {
        newTotal += item.priceVend;
      });
      setTotals(newTotal);
    };

    calculateTotals();
  }, [itemsOrders, filterText]);

  const filteredOrdersItems = itemsOrders.filter((itemOrder) =>
    itemOrder.strClientVend
      .toLowerCase()
      .match(new RegExp(filterText.toLowerCase()))
  );

  return (
    <div className={styles.divScreen}>
      <div className={styles.searchOrder}>
        {selectOrder && (
          <div className={styles.divSearch}>
            <div className={styles.divOrderSearch}>
              <div className={styles.divFilter}>
                <h3>Selecione o Pedido: </h3>
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
                        <p className={styles.h4Text}>
                          {itemOrder.strClientVend}
                        </p>
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
                <div className={styles.divTotals}>
                  <h2 className={styles.h3Order}>
                    Total Vendas R$:
                    <p className={styles.pText}>{totals}</p>
                  </h2>
                </div>
              </div>
            </div>
            <div className={styles.divTransparent}></div>
          </div>
        )}
      </div>
    </div>
  );
}
