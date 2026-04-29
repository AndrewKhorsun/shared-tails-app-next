import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  redirect(token ? `/${locale}/books` : `/${locale}/login`);
}
