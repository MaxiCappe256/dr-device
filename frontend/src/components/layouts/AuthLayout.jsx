import { Outlet, useLocation } from "react-router";
import Logo from "../ui/shared/Logo";
import { ShieldIcon, SpeedIcon } from '../../utils/icons';

export default function AuthLayout() {
  const { pathname } = useLocation();
  const isLogin = pathname !== "/auth/register";

  return (
    <main
      className={`min-h-screen bg-surface-container-lowest text-on-surface flex flex-row max-lg:flex-col`}
    >
      <aside
        className={`auth-brand-panel ${isLogin ? "translate-x-0" : "translate-x-[185%]"} transition-all relative hidden min-h-screen overflow-hidden px-15 py-17 text-on-primary lg:flex lg:flex-col lg:w-[35%]`}
      >
        <header className="flex items-center gap-5">
          <Logo to="/" iconClassName="size-6 brightness-0 invert" textClassName="max-md:text-xs" />
        </header>

        <section className="flex flex-1 flex-col justify-center">
          <h1 className="max-w-[620px] text-[40px] leading-[1.25] font-bold tracking-[-0.02em]">
            Optimiza el mantenimiento de tu equipamiento electrónico.
          </h1>

          <div className="mt-9 grid max-w-[560px] gap-8">
            <article className="flex gap-5 rounded-lg border border-white/20 bg-white/10 p-5.5 backdrop-blur-sm">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-white/20">
                <SpeedIcon height="24px" />
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

            <article className="flex gap-5 rounded-lg border border-white/20 bg-white/10 p-5.5 backdrop-blur-sm">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-white/20">
                <ShieldIcon height="24px" />
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
        className={`flex min-h-screen ${isLogin ? "lg:translate-x-0" : "lg:-translate-x-[54%]"} transition-all items-center justify-center px-6 py-10 sm:px-10 lg:px-15 w-[65%] max-lg:w-[90vw] mx-auto`}
      >
        <div className="w-140 max-lg:w-full">
          <Outlet />
        </div>
      </section>
    </main>
  );
}
