import { BookPlanForm } from "@/components/books/book-plan-form";
import { serverApi } from "@/lib/server-api";
import { BookPlan } from "@/types";
import { notFound } from "next/dist/client/components/navigation";

interface BookPageProps {
  params: Promise<{ bookId: string }>;
}

export default async function BookPlanPage({ params }: BookPageProps) {
  const { bookId } = await params;
  const { data: plan, error } = await serverApi.get<{ bookPlan: BookPlan }>(
    `/api/books/${bookId}/plan`,
  );
  console.log("plan", plan, error);
  if (error) {
    return <p className="text-fog text-sm">{error}</p>;
  }

  if (!plan) {
    notFound();
  }

  return <BookPlanForm key={plan.bookPlan.id} bookId={bookId} existingPlan={plan.bookPlan} />;
}
