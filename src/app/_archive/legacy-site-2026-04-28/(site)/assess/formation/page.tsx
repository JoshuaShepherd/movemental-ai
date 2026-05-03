import { permanentRedirect } from "next/navigation";

/** Legacy URL — single live assessment lives at `/assess`. */
export default function AssessFormationRedirectPage() {
  permanentRedirect("/assess");
}
