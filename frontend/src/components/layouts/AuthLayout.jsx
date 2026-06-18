import { Outlet, useLocation } from "react-router";

export default function AuthLayout() {
  const { pathname } = useLocation();
  const isLogin = pathname !== "/auth/register";

  return (
    <main
      className={`min-h-screen bg-surface-container-lowest text-on-surface flex flex-row max-lg:flex-col`}
    >
      <aside
        className={`auth-brand-panel ${isLogin ? "translate-x-0" : "translate-x-[185%]"} transition-all relative hidden min-h-screen overflow-hidden px-15 py-17 text-on-primary lg:flex lg:flex-col w-[35%]`}
      >
        <header className="flex items-center gap-5">
          <div className="flex items-center justify-center rounded-[4px] border-3 border-on-primary">
            <svg
              aria-hidden="true"
              className="size-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            >
              <path d="M8 6V4h8v2" />
              <path d="M4 6h16v14H4z" />
              <path d="M12 10v6" />
              <path d="M9 13h6" />
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-[-0.02em]">
            Dr. Device
          </span>
        </header>

        <section className="flex flex-1 flex-col justify-center">
          <h1 className="max-w-[620px] text-[40px] leading-[1.25] font-bold tracking-[-0.02em]">
            Optimiza el mantenimiento de tu equipamiento electrónico.
          </h1>

          <div className="mt-9 grid max-w-[560px] gap-8">
            <article className="flex gap-5 rounded-[8px] border border-white/20 bg-white/10 p-5.5 backdrop-blur-sm">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-[8px] bg-white/20">
                <svg
                  aria-hidden="true"
                  className="size-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.4"
                >
                  <path d="M4 14a8 8 0 0 1 15.5-2" />
                  <path d="M4 14h5" />
                  <path d="m14 13 4-4" />
                  <path d="M20 14a8 8 0 0 1-.7 3.3" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl leading-7 font-bold">
                  Gestión eficiente
                </h2>
                <p className="mt-3 text-[22px] leading-8 text-on-primary/80">
                  Control centralizado de inventario y reparaciones en tiempo
                  real para centros tecnológicos.
                </p>
              </div>
            </article>

            <article className="flex gap-5 rounded-[8px] border border-white/20 bg-white/10 p-5.5 backdrop-blur-sm">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-[8px] bg-white/20">
                <svg
                  aria-hidden="true"
                  className="size-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.4"
                >
                  <path d="m12 3 8 3v6c0 5-3.4 7.9-8 9-4.6-1.1-8-4-8-9V6z" />
                  <path d="m9 12 2 2 4-5" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl leading-7 font-bold">
                  Técnicos verificados
                </h2>
                <p className="mt-3 text-[22px] leading-8 text-on-primary/80">
                  Acceso a una red exclusiva de profesionales certificados con
                  garantía de servicio técnico especializado.
                </p>
              </div>
            </article>
          </div>
        </section>
      </aside>

      <section
        className={`flex min-h-screen ${isLogin ? "lg:translate-x-0" : "lg:-translate-x-[54%]"} transition-all items-center justify-center  px-6 py-10 sm:px-10 lg:px-15 w-[65%] mx-auto`}
      >
        <div className="w-full max-w-[560px]">
          <Outlet />
        </div>
      </section>
    </main>
  );
}
