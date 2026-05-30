"use client";

import { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";
import { Button } from "./ui/button";

const STORAGE_KEY = "naivapes_adult_confirmed";

export function AgeGate({ text }: { text: string }) {
  const [status, setStatus] = useState<"checking" | "allowed" | "blocked" | "prompt">("checking");

  useEffect(() => {
    setStatus(localStorage.getItem(STORAGE_KEY) === "true" ? "allowed" : "prompt");
  }, []);

  if (status === "checking" || status === "allowed") {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-zinc-950/95 px-4 backdrop-blur-xl">
      <div className="w-full max-w-lg rounded-lg border border-white/15 bg-zinc-900 p-6 shadow-2xl shadow-emerald-950/40">
        <div className="mb-5 flex items-center gap-3 text-emerald-200">
          <ShieldAlert className="size-6" aria-hidden />
          <p className="text-sm font-semibold uppercase tracking-[0.24em]">Adult verification</p>
        </div>
        {status === "blocked" ? (
          <>
            <h1 className="text-2xl font-semibold text-white">Access restricted</h1>
            <p className="mt-3 text-zinc-300">
              This platform is only available to adults aged 18 and above. You cannot continue.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-white">NaiVapes is adult-only</h1>
            <p className="mt-3 text-zinc-300">{text}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button
                onClick={() => {
                  localStorage.setItem(STORAGE_KEY, "true");
                  setStatus("allowed");
                }}
              >
                I am 18 or older
              </Button>
              <Button variant="secondary" onClick={() => setStatus("blocked")}>
                I am under 18
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
