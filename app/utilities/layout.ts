import { PageProps } from "fresh";
import { State } from "@/utils.ts";
import type { AuthProviderId } from "@/models/AuthProvider.ts";

/**
 * LayoutProps - Clean interface for Fresh layout components.
 * Focuses on the essential data you actually need from layout props.
 * 
 * Example usage:
 * ```tsx
 * export default function Layout(props: LayoutProps) {
 *   const { Component, state: { translationData, availableAuthProviders } } = props;
 *   return (
 *     <>
 *       <Header translationData={translationData} availableProviders={availableAuthProviders} />
 *       <Component />
 *     </>
 *   );
 * }
 * ```
 * 
 * EXAMPLE:
 * 
 * // Layout: props {
//   Component: [Function (anonymous)],
//   config: { root: "../..", basePath: "", mode: "production" },
//   data: null,
//   error: null,
//   info: {
//     localAddr: { transport: "tcp", hostname: "localhost", port: 8080 },
//     remoteAddr: { transport: "tcp", hostname: "localhost", port: 1234 }
//   },
//   isPartial: false,
//   params: [Object: null prototype] { locale: "es" },
//   req: Request {
//     bodyUsed: false,
//     headers: Headers {
//       accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/
//       "accept-encoding": "gzip, deflate, br, zstd",
//       "accept-language": "es-CO,es;q=0.9,en-US;q=0.8,en;q=0.7",
//       "cache-control": "max-age=0",
//       connection: "keep-alive",
//       host: "localhost:5173",
//       referer: "http://localhost:5173/es/home",
//       "sec-ch-ua": '"Not;A=Brand";v="99", "Brave";v="139", "Chromium";v="139"',
//       "sec-ch-ua-mobile": "?0",
//       "sec-ch-ua-platform": '"Linux"',
//       "sec-fetch-dest": "document",
//       "sec-fetch-mode": "navigate",
//       "sec-fetch-site": "same-origin",
//       "sec-gpc": "1",
//       "upgrade-insecure-requests": "1",
//       "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36"
//     },
//     method: "GET",
//     redirect: "follow",
//     url: "http://localhost:5173/es/home"
//   },
//   state: {
//     path: "/home",
//     locale: "es",
//     translationData: {
//       common: {
//         home: {
//           title: "Bienvenido a Slash & Dice",
//           subtitle: "Un espacio sencillo y lúdico — próximamente.",
//           cta: "Comenzar",
//           notice: "Esta es una página temporal de marcador de posición."
//         },
//         errors: { "404": [Object], "500": [Object] }
//       },
//       error: {
//         title: "Algo salió mal",
//         message: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.",
//         backHome: "Volver al Inicio"
//       }
//     }
//   },
//   url: URL {
//     href: "http://localhost:5173/es/home",
//     origin: "http://localhost:5173",
//     protocol: "http:",
//     username: "",
//     password: "",
//     host: "localhost:5173",
//     hostname: "localhost",
//     port: "5173",
//     pathname: "/es/home",
//     hash: "",
//     search: ""
//   },
//   route: "/:locale/home"
// }

export interface LayoutProps<TData = unknown> {
  /** The child component to render */
  Component: PageProps<TData, State>["Component"];
  /** Translation data for the current locale */
  translationData?: Record<string, unknown>;
  /** Current locale from URL params */
  locale?: string;
  /** Current route path from state */
  currentPath?: string;
  /** State object containing app state */
  state: State;
  /** Available auth providers based on server configuration */
  availableAuthProviders?: AuthProviderId[];
}
