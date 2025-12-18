// Scroll suave a una sección
// Para botones como “Ver más”, “Sobre nosotros”, “Contacto”.
export function scrollToId(id: string, offset = 0) {
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top,
    behavior: "smooth",
  });
}

// uso -> scrollToId("contact");

// Throttle
// Para limitar funciones ejecutadas al scrollear (animaciones, navbar sticky, etc.)
export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
) {
  let last = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn(...args);
    }
  };
}

// Debounce
// Perfecto para buscadores, validaciones o resize events.
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Detectar si un elemento está en viewport
// Ideal para animaciones al hacer scroll.
export function isInViewport(el: HTMLElement, margin = 0) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 - margin &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) + margin
  );
}

// Copiar texto al portapapeles (CTA clásico de emails o códigos)
export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// Detección simple de OS / Device (para CTAs dinámicos)
// Útil en landing pages con “Descargar para iOS / Android”.
export const detectDevice = () => {
  const ua = navigator.userAgent.toLowerCase();

  return {
    isMobile: /mobile|android|iphone|ipad/.test(ua),
    isIOS: /iphone|ipad/.test(ua),
    isAndroid: /android/.test(ua),
    isDesktop: !/mobile|android|iphone|ipad/.test(ua),
  };
};

//   Format number con separadores bonitos

//   Para counters, métricas, testimonios con cifras.

export const formatNumber = (n: number) =>
  new Intl.NumberFormat("en-US").format(n);
