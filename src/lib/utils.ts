import { type ClassValue, clsx } from "clsx"
import { Currency } from "lucide-react"
import { twMerge } from "tailwind-merge"
import {formatDistanceToNowStrict} from "date-fns"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function FormatMoney(amount:number){
  return new Intl.NumberFormat("en-IN",{
    style:'currency',
    currency:'INR'
  }).format(amount)
}

export function relativeDate(from:Date){
  return formatDistanceToNowStrict(from,{addSuffix:true})
}