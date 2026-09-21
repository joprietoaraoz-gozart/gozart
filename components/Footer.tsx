import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-10 text-center border-t border-sand/60">
      <Logo className="h-8 w-auto mx-auto mb-3 text-charcoal" />
      <p className="font-sans text-xs text-stone">
        Reproducciones de arte curadas y enmarcadas — CABA, Argentina
      </p>
    </footer>
  );
}
