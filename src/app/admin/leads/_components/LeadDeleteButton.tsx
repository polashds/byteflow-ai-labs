"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteLead } from "@/lib/admin-actions";

/** Two-step delete (Delete → Confirm / Cancel), same pattern as the blog admin. */
export default function LeadDeleteButton({ id, name }: { id: number; name: string }) {
  const [confirm, setConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  if (!confirm) {
    return (
      <button
        onClick={() => setConfirm(true)}
        aria-label={`Delete lead ${name}`}
        className="font-body text-[10px] tracking-[0.15em] uppercase text-brand-muted hover:text-red-400 transition-colors"
      >
        Delete
      </button>
    );
  }

  return (
    <span className="flex items-center gap-2 whitespace-nowrap">
      <button
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            await deleteLead(id);
            router.refresh();
          })
        }
        className="font-body text-[10px] tracking-[0.15em] uppercase text-red-400 hover:text-red-300 transition-colors disabled:opacity-40"
      >
        {isPending ? "…" : "Confirm"}
      </button>
      <button
        disabled={isPending}
        onClick={() => setConfirm(false)}
        className="font-body text-[10px] tracking-[0.15em] uppercase text-brand-muted hover:text-brand-text transition-colors"
      >
        Cancel
      </button>
    </span>
  );
}
