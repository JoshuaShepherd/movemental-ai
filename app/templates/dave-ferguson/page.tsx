import { redirect } from "next/navigation";

/**
 * Redirects to the static Dave Ferguson HTML template.
 * Shareable URL: /templates/dave-ferguson → /templates/dave-ferguson/
 * Template is not linked in main nav; share this URL when needed.
 */
export default function DaveFergusonTemplatePage() {
  redirect("/templates/dave-ferguson/");
}
