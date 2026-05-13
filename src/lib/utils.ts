/* ================================================================
 * utils.ts — Helpers utilitários do projeto
 * ================================================================ */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn() — Combine class names com merge inteligente do Tailwind.
 *
 * Aceita:
 *  - strings: cn("flex", "items-center")
 *  - condicionais: cn("base", isActive && "active")
 *  - objetos: cn({ "active": isActive, "disabled": !canClick })
 *  - arrays: cn(["flex", "p-4"])
 *  - undefined/null: ignorados silenciosamente
 *
 * Magia adicional (via tailwind-merge):
 *  - cn("px-2 py-1", "p-4")       → "p-4"
 *  - cn("text-red-500", "text-blue-500") → "text-blue-500"
 *  - cn("bg-purple-500", className) → sobrescreve quando className conflita
 *
 * Uso típico em componentes:
 *
 *   function Button({ className, ...props }) {
 *     return (
 *       <button
 *         className={cn(
 *           "px-4 py-2 rounded-md bg-accent",
 *           className
 *         )}
 *         {...props}
 *       />
 *     );
 *   }
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}