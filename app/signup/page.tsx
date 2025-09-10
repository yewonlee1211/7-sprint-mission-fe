"use client";

import CustomBtn from "@/components/CustomBtn";
import CunstomInput from "@/components/CustomInput";
import {
  useEmail,
  useNickname,
  usePassword,
  usePasswordConfirmation,
} from "@/lib/useEmailPassword";

export default function SignupPage() {
  const emailObj = useEmail();
  const passwordObj = usePassword();
  const nicknameObj = useNickname();
  const passwordConfirmationObj = usePasswordConfirmation();
  return (
    <div>
      <form>
        <CunstomInput object={emailObj} />
        <CunstomInput object={nicknameObj} />
        <CunstomInput object={passwordObj} />
        <CunstomInput
          object={passwordConfirmationObj}
          password={passwordObj.element}
        />
        <CustomBtn text="회원가입" />
      </form>
    </div>
  );
}
