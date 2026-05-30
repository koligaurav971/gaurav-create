import { socialLinks } from "@/types";
import { Instagram, MessageCircle, Youtube } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/10 bg-card/50 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-display text-sm font-bold shadow-glow">
              G
            </div>
            <span className="font-display text-sm font-semibold text-foreground">
              Gaurav.Create
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.instagram_link"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.youtube_link"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href={socialLinks.discord}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.discord_link"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Discord"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            &copy; {year}. Built with love using{" "}
            <a
              href="https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=gaurav-create"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
