import CustomBtn from "@/components/CustomBtn";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <CustomBtn text="로그인" />
      <CustomBtn text="구경하러 가기" />
    </div>
  );
}
