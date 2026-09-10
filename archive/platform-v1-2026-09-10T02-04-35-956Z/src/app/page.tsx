/** Agent-first home — permanent redirect consolidates link equity on `/agent`. */
import { permanentRedirect } from "next/navigation";

export default function RootPage() {
  permanentRedirect("/agent");
}
