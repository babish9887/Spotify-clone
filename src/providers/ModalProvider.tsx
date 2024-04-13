"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/app/components/AuthModal";
import UploadModal from "@/app/components/UploadModal";
import { ProductWithPrice } from "@/types/types";
import Modal from "@/app/components/Modal";
import DeleteModal from "@/app/components/DeleteModal";

interface ModalProviderProps {
  products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({
  products
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal /> 
      <DeleteModal />
      {/* <Modal isOpen={true}  onChange={()=>{}} title={"test"} description={"description"}>
            Test Children
      </Modal> */}
    </>
  );
}

export default ModalProvider;