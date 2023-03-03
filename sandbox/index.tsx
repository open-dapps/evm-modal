import { useModalWindowController } from "@opendapps/modal-window"
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

import { EvmModal } from "../package/dist/components"
import { ModalKeys } from "../package/dist/misc"
import "./index.scss"

import { Buffer } from "buffer";

(window as any).Buffer = Buffer

function App () {
  const controller = useModalWindowController()

  useEffect(() => {
    controller.connectModalWindow(ModalKeys.EvmModal);

    return () => {
      controller.disconnectModalWindow(ModalKeys.EvmModal);
    }
  }, []);

  return <>
    <h1>React evm modal component @opendapps/evm-modal</h1>

    <button onClick={ () => {
      controller.openModal(ModalKeys.EvmModal);
    } }>
      Open modal window
    </button>

    <EvmModal configuration={{
      walletConnectRPCs: [],
      walletLinks: {}
    }} />
  </>;
}

const root = ReactDOM.createRoot(document.querySelector("#app-root")!);
root.render(<App />);
