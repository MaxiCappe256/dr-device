import { useState } from "react";

const faqs = [
  {
    question: "¿Cuanto tiempo tarda una reparacion promedio?",
    answer:
      "Depende de la gravedad del daño pero nuestros tecnicos se comprometen al 100% para que la reperacion sea lo mas rapida posible. En cualquier caso el tecnico puede cominicar con el cliente por nuestos sistema de mensajeria",
  },
  {
    question: "¿Los repuestos son originales?",
    answer:
      "Si, los repuestos son originales para garantizar una reparacion efectiva, en caso de que no se consigan o sea muy costoso para el cliente el tecnico tiene que notificar esto.",
  },
  {
    question: "¿Que cubren los 6 meses de garantia?",
    answer:
      "La garantia cubre si los clientes no manipularon las zonas dañadas del dispositivo.",
  },
  {
    question: "¿Cómo contacto al soporte técnico?",
    answer:
      "Podés escribirnos por nuestros canales de mensajeria que tiene la pagina o usar el chat en vivo disponible de lunes a viernes de 9 a 18 hs.",
  },
];

function AccordionItem({ question, answer, isOpen, onClick }) {
  return (
    <div
      className={`bg-white border rounded-xl overflow-hidden transition-shadow ${
        isOpen ? "shadow-md border-gray-200" : "border-gray-200 hover:shadow-sm"
      }`}
    >
      <button
        className="w-full flex justify-between items-center px-5 py-[18px] text-left gap-3"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-900 leading-snug">
          {question}
        </span>
        <span
          className={`shrink-0 w-[22px] h-[22px] rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen ? "bg-gray-100 rotate-45" : "bg-gray-100"
          }`}
        >
          <svg
            viewBox="0 0 12 12"
            fill="none"
            className="w-3 h-3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 1v10M1 6h10"
              strokeWidth="1.8"
              strokeLinecap="round"
              stroke= "var(--color-primary)"
            />
          </svg>
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-60 pb-[18px]" : "max-h-0"
        }`}
      >
        <p className="px-5 text-md text-gray-500 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="flex flex-col justify-center items-center px-4 py-12 md:p-12 gap-3 w-full bg-surface-bright mb-10">
      <h1 className="text-4xl font-extralight mb-5">Preguntas Frecuentes</h1>

      <div className="flex flex-col gap-2 w-full max-w-2xl">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === i}
            onClick={() => toggle(i)}
          />
        ))}
      </div>
    </div>
  );
}