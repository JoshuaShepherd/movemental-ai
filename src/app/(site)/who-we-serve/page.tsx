import { permanentRedirect } from "next/navigation";

/**
 * `/who-we-serve` was a standalone overview; audience entry points now live on
 * the home page (`/#audiences`) and segment routes. Permanent redirect keeps
 * bookmarks and external links from 404ing.
 */
export default function WhoWeServeArchiveRedirect() {
  permanentRedirect("/#audiences");
}
