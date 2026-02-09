import Link from "next/link";

import { navbarConfig } from "@/constants/nav";
import { useAuthStore } from "@/stores/auth";

import ModifiedBtn from "../global/btn";
import { Spinner } from "../ui/spinner";

export function AuthButton() {
  const { user, checkingAuth } = useAuthStore();

  if (checkingAuth)
    return (
      <ModifiedBtn
        label={navbarConfig.button[0].label}
        className="cursor-pointer rounded-xs px-4 py-4"
      >
        <Spinner />
      </ModifiedBtn>
    );

  if (!user)
    return (
      <Link href="/auth">
        <ModifiedBtn
          label={navbarConfig.button[0].label}
          className="cursor-pointer rounded-xs px-4 py-4"
        >
          {navbarConfig.button[0].label}
        </ModifiedBtn>
      </Link>
    );

  return (
    <Link href="/home">
      <ModifiedBtn
        label={navbarConfig.button[1].label}
        className="cursor-pointer rounded-xs px-4 py-4"
      >
        {navbarConfig.button[1].label}
      </ModifiedBtn>
    </Link>
  );
}
