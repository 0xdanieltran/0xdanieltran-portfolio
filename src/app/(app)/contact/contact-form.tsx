"use client"

import { useState } from "react"

type FormState = "idle" | "loading" | "success" | "error"

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState("loading")

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        setState("error")
        return
      }

      setState("success")
      form.reset()
    } catch {
      setState("error")
    }
  }

  return (
    <>
      {state === "success" && (
        <div className="px-4 pb-2">
          <p className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 font-mono text-xs text-emerald-300">
            Inquiry sent successfully. I will get back to you soon.
          </p>
        </div>
      )}

      {state === "error" && (
        <div className="px-4 pb-2">
          <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 font-mono text-xs text-red-300">
            Unable to send your inquiry right now. Please try again or email me
            directly.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="screen-line-top space-y-3 p-4">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden
        />
        <Field label="Name" name="name" type="text" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Company" name="company" type="text" />
        <Field label="Budget (optional)" name="budget" type="text" />
        <Field label="Timeline (optional)" name="timeline" type="text" />

        <label className="block space-y-1">
          <span className="font-mono text-xs text-muted-foreground">
            Project Details
          </span>
          <textarea
            name="message"
            required
            rows={6}
            placeholder="What are you building, and what support do you need?"
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </label>

        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {state === "loading" ? "Sending..." : "Send Inquiry"}
        </button>
      </form>
    </>
  )
}

function Field({
  label,
  name,
  type,
  required = false,
}: {
  label: string
  name: string
  type: string
  required?: boolean
}) {
  return (
    <label className="block space-y-1">
      <span className="font-mono text-xs text-muted-foreground">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      />
    </label>
  )
}
