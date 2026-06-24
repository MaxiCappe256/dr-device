import { CheckIcon, SecurityIcon, NavigateOutlineIcon } from "../../../utils/icons.js";
import CardExplain from "../shared/CardExplain.jsx";
import imgAssert from "../../../assets/explainPhoto.png";

export default function Explain() {
  const steps = [
    {
      id: 1,
      label: "Registrá tu dispositivo",
      description: "Indicá el modelo y la falla de tu equipo en nuestra plataforma inteligente.",
    },
    {
      id: 2,
      label: "Recibí diagnóstico y presupuesto",
      description: "Técnicos verificados analizan tu caso y te envían propuestas transparentes.",
    },
    {
      id: 3,
      label: "Aprobá y listo",
      description: "Aceptá la mejor opción, realizá el pago seguro y retirá tu equipo garantizado.",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-12 md:gap-20 px-4 max-w-7xl mx-auto py-10">
      
      <div className="flex flex-col items-center gap-3 w-full">
        <h1 className="text-3xl md:text-4xl font-extralight text-center">¿Cómo funciona?</h1>
        <p className="text-gray-500 text-center">Tu dispositivo reparado en {steps.length} pasos</p>
        
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start w-full mt-8 gap-8 md:gap-4 px-4 md:px-8">
          {steps.map((step, i) => (
            <div key={step.id} className="flex flex-col md:flex-row items-center w-full md:w-auto">
              
              <div className="flex flex-col items-center max-w-xs text-center">
                <div className="rounded-full size-16 flex justify-center items-center bg-primary text-white font-semibold text-xl shrink-0">
                  {step.id}
                </div>
                <span className="font-semibold text-lg md:text-xl mt-4 px-2">{step.label}</span>
                <span className="text-base md:text-lg text-tertiary mt-2 px-4">{step.description}</span>
              </div>

              {i !== steps.length - 1 && (
                <div className="hidden md:block h-px bg-primary flex-grow mx-4 mt-8 min-w-[50px] lg:min-w-[100px]" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center w-full justify-between mt-10">
        
        <div className="flex flex-col gap-6 items-center lg:items-start w-full lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-extralight text-center lg:text-left w-full">
            ¿Por qué elegir Dr.Device?
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <CardExplain 
              icon={<CheckIcon style={{ color: "green" }} />} 
              title={"Técnicos verificados"} 
              description={"Riguroso proceso de validación técnica y antecedentes."} 
              color="bg-green-200" 
              className="col-span-1" 
            />
            <CardExplain 
              icon={<SecurityIcon style={{ color: "red" }} />} 
              title={"Garantía de reparación"} 
              description={"Todas las reparaciones incluyen garantía certificada de 6 meses"} 
              color="bg-red-200" 
              className="col-span-1" 
            />
            <CardExplain 
              icon={<NavigateOutlineIcon style={{ color: "blue" }} />} 
              title={"Seguimiento en tiempo real"} 
              description={"Notificación del estado de reparación al instante"} 
              color="bg-blue-200" 
              className="col-span-1 sm:col-span-2" 
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 max-w-[600px] lg:max-w-none hidden md:block">
          <img 
            src={imgAssert} 
            alt="Dr. Device en acción"
            className="rounded-2xl w-full h-[350px] lg:h-[450px] object-cover shadow-md" 
          />
        </div>

      </div>
    </div>
  );
}