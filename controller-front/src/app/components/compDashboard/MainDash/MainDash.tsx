"use client";
import React, { useEffect, useState } from "react";
import styles from "./MainDash.module.css";
import Image from "next/image";
import CadProd from "./MenuItens/CadProd/CadProd";
import InventProd from "./MenuItens/InventProd/InventProd";
import Order from "./MenuItens/Order/Order";
import SearchOrder from "./MenuItens/SearchOrder/SearchOrder";
import SemMenu from "./MenuItens/SemMenu/SemMenu";
import { useMenuStore } from "@/app/state/MenuState/MenuState";
import { useMenuOptionStore } from "@/app/state/MenuOption/MenuOption";
import { useUserStore } from "@/app/state/UserState/UserState";
import { Button } from "@mui/material";
import { useClientStore } from "@/app/state/ClientState/ClientState";
import { useCadProductStore } from "@/app/state/CadProduct/CadProduct";

export default function MainDash() {
  const menu = useMenuOptionStore((state) => state.menuOptionComp);
  const alterMenuOption = useMenuOptionStore((state) => state.alter);
  const clientSave = useClientStore((state) => state.client);
  const alterClientInsc = useClientStore((state) => state.alter);
  const showMenu = useMenuStore((state) => state.menuComp);
  const alterMenu = useMenuStore((state) => state.alter);
  const showUser = useUserStore((state) => state.userComp);
  const alterUser = useUserStore((state) => state.alter);
  const [quantProducts, setQuantProducts] = useState(0);
  const alterSelectOrder = useCadProductStore(
    (state) => state.alterSelectOrder
  );
  const altercadProduct = useCadProductStore((state) => state.alter);
  const [newNumber, setNewNumber] = useState(0);

  let client = {
    registration: clientSave.registration,
    email: clientSave.email,
    password: clientSave.password,
    type: clientSave.type,
    themeSelect: clientSave.themeSelect,
  };

  useEffect(() => {
    altercadProduct(false);
    alterSelectOrder(false);
  }, [menu]);

  useEffect(() => {
    fetch(
      `http://192.168.66.48:4000/api/client/getClient?newRegistration=${client.registration}`,
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
          client = data;
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
      });

    fetch(
      `http://192.168.66.48:4000/api/product/getProducts?registrationClient=${client.registration}`,
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
          setQuantProducts(data.length);
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
      });

    const clientRestore = localStorage.getItem("clientRestore");
    let clientInsc = {
      registration: "",
      email: "",
      password: "",
      type: "",
      themeSelect: 0,
    };

    if (clientRestore !== null) {
      clientInsc = JSON.parse(clientRestore);

      if (clientInsc !== null) {
        alterClientInsc(clientInsc);
      }
    }

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
          setNewNumber(data.length);
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }, [showUser]);

  function logOut() {
    window.location.href = "../../";
  }

  return (
    <div className={styles.mainDash}>
      {showUser && (
        <div className={styles.divUser}>
          <div className={styles.divOptions}>
            <h1>Empresa</h1>
            <div className={styles.divInfos}>
              <h4 className={styles.h4Text}>
                CNPJ or CPF: <p>{client?.registration}</p>
              </h4>
              <h4 className={styles.h4Text}>
                Quantidade Vendas: <p>{newNumber}</p>
              </h4>
              <h4 className={styles.h4Text}>
                Quantidade Produtos: <p>{quantProducts}</p>
              </h4>
            </div>
            <div className={styles.divUserBt}>
              <Button
                variant="contained"
                className={styles.btDefaulCancel}
                onClick={logOut}
              >
                Sair
              </Button>
            </div>
          </div>
          <div
            className={styles.divTransparentUser}
            onClick={() => {
              alterUser(false);
            }}
          ></div>
        </div>
      )}
      ;
      {showMenu && (
        <div className={styles.divMenuShow}>
          <div className={styles.divMenu}>
            <div className={styles.divItem}>
              <h3 className={styles.h3TitleMenu}>Home</h3>
              <div
                className={styles.itemMenu}
                onClick={() => {
                  alterMenuOption(0);
                }}
              >
                <Image
                  src="/assets/cad.png"
                  alt="menu"
                  width={34}
                  height={34}
                  className={styles.imgMenu}
                />
                <h3 className={styles.h3ItemMenu}>Tela Inicial</h3>
              </div>
            </div>
            <div className={styles.divItem}>
              <h3 className={styles.h3TitleMenu}>Produto</h3>
              <div
                className={styles.itemMenu}
                onClick={() => {
                  alterMenuOption(1);
                }}
              >
                <Image
                  src="/assets/cad.png"
                  alt="menu"
                  width={34}
                  height={34}
                  className={styles.imgMenu}
                />
                <h3 className={styles.h3ItemMenu}>Cadastro</h3>
              </div>
            </div>
            <div className={styles.divItem}>
              <h3 className={styles.h3TitleMenu}>Estoque</h3>
              <div
                className={styles.itemMenu}
                onClick={() => {
                  alterMenuOption(2);
                }}
              >
                <Image
                  src="/assets/invent.png"
                  alt="menu"
                  width={34}
                  height={34}
                  className={styles.imgMenu}
                />
                <h3 className={styles.h3ItemMenu}>Inventário</h3>
              </div>
            </div>
            <div className={styles.divItem}>
              <h3 className={styles.h3TitleMenu}>Pedido</h3>
              <div
                className={styles.itemMenu}
                onClick={() => {
                  alterMenuOption(3);
                }}
              >
                <Image
                  src="/assets/ped.png"
                  alt="menu"
                  width={34}
                  height={34}
                  className={styles.imgMenu}
                />
                <h3 className={styles.h3ItemMenu}>Digitação</h3>
              </div>
              <div
                className={styles.itemMenu}
                onClick={() => {
                  alterMenuOption(4);
                }}
              >
                <Image
                  src="/assets/cons.png"
                  alt="menu"
                  width={34}
                  height={34}
                  className={styles.imgMenu}
                />
                <h3 className={styles.h3ItemMenu}>Consulta</h3>
              </div>
            </div>
          </div>
          <div
            className={styles.divTransparent}
            onClick={() => {
              alterMenu(false);
            }}
          ></div>
        </div>
      )}
      <div className={styles.divScreen}>
        {menu == 0 && <SemMenu />}
        {menu == 1 && <CadProd />}
        {menu == 2 && <InventProd />}
        {menu == 3 && <Order />}
        {menu == 4 && <SearchOrder />}
      </div>
    </div>
  );
}
