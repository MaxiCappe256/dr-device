import CreateOrderForm from "../../components/ui/orders/CreateOrderForm";

export default function CreateOrder() {
  return (
    <section className="mx-auto my-10 flex w-full max-w-5xl flex-col gap-8">
      <div className="space-y-3 px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Nueva solicitud
        </p>
        <h1 className="text-3xl font-bold text-on-background mx-auto">
          Crear orden
        </h1>
        <p className="max-w-2xl text-lg leading-7 text-tertiary">
          Contanos qué equipo necesitás reparar y describí el problema para que
          podamos encontrar un técnico adecuado.
        </p>
      </div>

      <CreateOrderForm />

    </section>
  );
}
