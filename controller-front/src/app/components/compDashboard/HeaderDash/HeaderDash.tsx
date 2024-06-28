"use client";
import React, { useEffect, useState } from "react";
import styles from "./HeaderDash.module.css";
import Image from "next/image";
import { useMenuStore } from "@/app/state/MenuState/MenuState";
import { useMenuOptionStore } from "@/app/state/MenuOption/MenuOption";
import { useUserStore } from "@/app/state/UserState/UserState";

export default function HeaderDash() {
  const [titleMenu, setTitleMenu] = useState("Sem Menu");
  const menu = useMenuOptionStore((state) => state.menuOptionComp);
  const showMenu = useMenuStore((state) => state.menuComp);
  const alterMenu = useMenuStore((state) => state.alter);
  const showUser = useUserStore((state) => state.userComp);
  const alterUser = useUserStore((state) => state.alter);

  useEffect(() => {
    if (menu == 0) {
      setTitleMenu("Tela Inicial");
    } else if (menu == 1) {
      setTitleMenu("Cadastro Produto");
    } else if (menu == 2) {
      setTitleMenu("Inventário Produto");
    } else if (menu == 3) {
      setTitleMenu("Digitação de Pedido");
    } else if (menu == 4) {
      setTitleMenu("Manutenção de Pedido");
    } else if (menu == 5) {
      setTitleMenu("Consulta de Pedido");
    }
  });

  return (
    <div className={styles.headerDash}>
      <div
        className={styles.divImg}
        onClick={() => {
          alterMenu(!showMenu);
        }}
      >
        <Image
          src="/assets/menu.png"
          alt="menu"
          width={44}
          height={44}
          className={styles.imgMenu}
        />
      </div>
      <div>
        <h3>{titleMenu}</h3>
      </div>
      <div
        className={styles.divUser}
        onClick={() => {
          alterUser(!showUser);
        }}
      >
        <Image
          src="/assets/user.png"
          alt="menu"
          width={44}
          height={44}
          className={styles.imgUser}
        />
      </div>
    </div>
  );
}
