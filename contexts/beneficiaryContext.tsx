import { storeDataObject } from "@/lib/async-storage";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  PropsWithChildren,
} from "react";

type BeneficiaryContextInterface = {
  beneficiaries: Beneficiary[];
  addBeneficiary: (value: Beneficiary) => void;
  setBeneficiaries: (value: Beneficiary[]) => void;
};

const BeneficiaryContext = createContext<BeneficiaryContextInterface>({
  beneficiaries: [],
  addBeneficiary: () => {},
  setBeneficiaries: () => {},
});

export const useBeneficiaries = () => useContext(BeneficiaryContext);

export const BeneficiaryProvider = ({ children }: PropsWithChildren) => {
  const [beneficiaries, setBeneficiaries] = useState<Array<Beneficiary>>([]);

  const addBeneficiary = (beneficiary: Beneficiary) => {
    const newBeneficiary = {
      id: Date.now(),
      firstname: beneficiary.firstname,
      lastname: beneficiary.lastname,
      iban: beneficiary.iban,
    };
    setBeneficiaries((prevBeneficiaries) => [
      ...prevBeneficiaries,
      newBeneficiary,
    ]);
  };

  useEffect(() => {
    storeDataObject(beneficiaries, "beneficiaries");
  }, [beneficiaries]);

  return (
    <BeneficiaryContext.Provider
      value={{ beneficiaries, addBeneficiary, setBeneficiaries }}
    >
      {children}
    </BeneficiaryContext.Provider>
  );
};
