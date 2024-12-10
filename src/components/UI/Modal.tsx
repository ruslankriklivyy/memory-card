import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  children: ReactNode;
  closeModal: () => void;
}

export function Modal({ closeModal, children }: ModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        onClick={closeModal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={"modal-overlay"}
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
        exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ transform: "translate(-50%, -50%)" }}
        className={"modal"}
      >
        <div className={"modal-content"}>{children}</div>

        <div className={"modal-actions"}>
          <button className={"modal-actions__btn"} onClick={() => closeModal()}>
            Ok
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
