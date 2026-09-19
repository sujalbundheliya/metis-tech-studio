/**
 * The Metis "M", traced from LOGO.jpg into a real vector.
 *
 * Contour-traced from the alpha channel of logo-mark.png and simplified with
 * Douglas-Peucker to 28 points — the mark is entirely straight edges, so this
 * is exact rather than an approximation. Normalised into a 0–100 viewBox.
 *
 * A vector (rather than the PNG) is what lets the mark draw itself on, scale
 * to any size, and take the brand gradient as a live fill.
 */
export const MARK_PATH = "M0.39 7.83 L48.92 44.81 L50.1 44.42 L98.83 10.37 L99.61 9.98 L100.0 10.57 L100.0 17.61 L100.0 32.88 L99.22 33.86 L91.19 39.33 L90.8 38.94 L90.61 29.75 L90.02 28.77 L50.49 57.93 L48.73 57.34 L17.81 33.66 L10.57 27.98 L9.78 27.59 L9.39 27.98 L9.98 76.91 L10.76 77.1 L32.49 59.69 L33.66 59.69 L41.29 65.56 L23.87 79.26 L7.24 92.17 L0.0 91.98 L0.0 8.22 Z";
export const MARK_VIEWBOX = "0 0 100 100";
