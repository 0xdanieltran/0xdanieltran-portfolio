import { formatIncompletePhoneNumber } from "@/lib/libphonenumber"

export function decodeEmail(email: string) {
  // return atob(email) ?? email
  return email
}

export function decodePhoneNumber(phone: string) {
  // return atob(phone) ?? phone
  return phone
}

export function formatPhoneNumber(phone: string) {
  return formatIncompletePhoneNumber(phone)
}
