"use client";

import CustomBtn from "@/components/CustomBtn";
import CunstomInput from "@/components/CustomInput";
import Modal from "@/components/Modal";
import { postSignup } from "@/lib/api/user";
import {
  useEmail,
  useNickname,
  usePassword,
  usePasswordConfirmation,
} from "@/lib/useEmailPassword";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { AxiosError } from "axios";

export default function SignupPage() {
  const emailObj = useEmail();
  const passwordObj = usePassword();
  const nicknameObj = useNickname();
  const passwordConfirmationObj = usePasswordConfirmation();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSignup = async () => {
    try {
      const res = await postSignup(
        emailObj.element,
        nicknameObj.element,
        passwordObj.element
      );
      router.push("/items");
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 422) {
          setIsModalOpen(true);
        }
      }
    }
  };

  const noEvent = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      {isModalOpen && (
        <Modal
          text="사용 중인 이메일입니다."
          btnText="확인"
          onModal={() => {
            setIsModalOpen(false);
          }}
        />
      )}
      <form onSubmit={noEvent}>
        <CunstomInput object={emailObj} />
        <CunstomInput object={nicknameObj} />
        <CunstomInput object={passwordObj} />
        <CunstomInput
          object={passwordConfirmationObj}
          password={passwordObj.element}
        />
        <CustomBtn text="회원가입" onClick={onSignup} />
      </form>
    </div>
  );
}
