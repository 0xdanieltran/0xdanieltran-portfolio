import { EmailParams, MailerSend, Recipient, Sender } from "mailersend"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const name = String(formData.get("name") || "").trim()
    const email = String(formData.get("email") || "").trim()
    const company = String(formData.get("company") || "").trim()
    const budget = String(formData.get("budget") || "").trim()
    const timeline = String(formData.get("timeline") || "").trim()
    const message = String(formData.get("message") || "").trim()
    const website = String(formData.get("website") || "").trim() // honeypot

    if (website) {
      return NextResponse.json({ ok: true })
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Invalid input" },
        { status: 400 }
      )
    }

    const apiKey = process.env.MAILERSEND_API_KEY
    const fromEmail = process.env.MAILERSEND_FROM_EMAIL
    const fromName = process.env.MAILERSEND_FROM_NAME || "Portfolio Contact"
    const toEmail = process.env.MAILERSEND_TO_EMAIL

    if (!apiKey || !fromEmail || !toEmail) {
      return NextResponse.json(
        { ok: false, error: "Missing email configuration" },
        { status: 500 }
      )
    }

    const textContent = [
      "New portfolio inquiry",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "N/A"}`,
      `Budget: ${budget || "N/A"}`,
      `Timeline: ${timeline || "N/A"}`,
      "",
      "Message:",
      message,
    ].join("\n")

    const htmlContent = `
      <h2>New portfolio inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company || "N/A")}</p>
      <p><strong>Budget:</strong> ${escapeHtml(budget || "N/A")}</p>
      <p><strong>Timeline:</strong> ${escapeHtml(timeline || "N/A")}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    `

    const mailerSend = new MailerSend({ apiKey })
    const sentFrom = new Sender(fromEmail, fromName)
    const recipients = [new Recipient(toEmail, "Daniel Tran")]

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(new Sender(email, name))
      .setSubject(`New inquiry from ${name}`)
      .setHtml(htmlContent)
      .setText(textContent)

    await mailerSend.email.send(emailParams)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { ok: false, error: "Failed to send email" },
      { status: 500 }
    )
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
