"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

export async function logout() {
  (await cookies()).delete("token");
  const locale = await getLocale();
  redirect(`/${locale}/login`);
}
