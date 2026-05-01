import { BookPlanForm } from "@/components/books/book-plan-form";
import { serverApi } from "@/lib/server-api";
import { BookPlan } from "@/types";

interface BookPlanPageProps {
  params: Promise<{ bookId: string }>;
}

export default async function BookPlanPage({ params }: BookPlanPageProps) {
  const { bookId } = await params;
  const { data: plan, error } = await serverApi.get<{ bookPlan: BookPlan }>(
    `/api/books/${bookId}/plan`,
  );

  if (error) {
    return <p className="text-fog text-sm">{error}</p>;
  }

  return (
    <BookPlanForm
      key={plan?.bookPlan?.id}
      bookId={bookId}
      existingPlan={plan?.bookPlan}
    />
  );
}
