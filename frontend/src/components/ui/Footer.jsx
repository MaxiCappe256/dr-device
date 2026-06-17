import { GithubAltIcon, WhatsappIcon } from "../../utils/icons.js";

export default function Footer() {
    const columns = [
        {
            title: "SOBRE NOSOTROS",
            links: [
                { id: 1, name: "Facundo Grieco", github: "https://github.com/facyndev" },
                { id: 2, name: "Maximiliano Cappelletti", github: "https://github.com/MaxiCappe256" },
                { id: 3, name: "Felipe Vincenti", github: "https://github.com/Felipeevincenti" },
                { id: 4, name: "Ezequiel Hansen", github: "https://github.com/Ezequiel-Hansen" }
            ]
        }
    ];

    return (
        <footer className="border-t border-gray-200 bg-white px-6 py-10 md:px-8">
            {/* Contenedor principal: 
              - Centrado total en móviles (`items-center text-center`)
              - Alineación a los extremos en pantallas grandes (`lg:flex-row lg:justify-between lg:items-start lg:text-left`)
            */}
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 justify-between items-center lg:items-start text-center lg:text-left">

                {/* Brand column */}
                <div className="flex flex-col gap-4 max-w-xs items-center lg:items-start">
                    <div className="flex items-center gap-2 text-primary font-bold text-lg">
                        {/* Tablet/device icon */}
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
                        Dr. Device
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        La plataforma de soluciones inteligente para la reparación de tus dispositivos.
                    </p>
                    {/* Centrado de los botones de redes en móvil */}
                    <div className="flex gap-2 mt-1 justify-center lg:justify-start">
                        {/* Globe */}
                        <a href="https://github.com/MaxiCappe256/dr-device" target="_blank" rel="noopener noreferrer" aria-label="Sitio web" className="size-9 rounded-full border border-gray-200 bg-blue-50 flex items-center justify-center text-primary hover:bg-blue-100 transition-colors">
                            <GithubAltIcon height="25" width="25"/>
                        </a>

                        {/* Phone */}
                        <a href="" aria-label="Teléfono" className="size-9 rounded-full border border-gray-200 bg-blue-50 flex items-center justify-center text-primary hover:bg-blue-100 transition-colors">
                            <WhatsappIcon height="25" width="25"/>
                        </a>
                    </div>
                </div>

                {/* Link columns (Lista Vertical Estricta pero Centrada) */}
                <div className="w-full sm:w-auto flex flex-col items-center lg:items-start">
                    {columns.map((col) => (
                        <div key={col.title} className="flex flex-col gap-3 items-center lg:items-start">
                            <span className="text-xs font-bold tracking-widest text-gray-800 uppercase">
                                {col.title}
                            </span>
                            {/* `items-center lg:items-start` asegura que los nombres se alineen al eje central en celulares */}
                            <ul className="flex flex-col gap-2 items-center lg:items-start">
                                {col.links.map((link) => (
                                    <li key={link.id}>
                                        <a
                                            href={link.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-gray-500 hover:text-primary transition-colors block"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom border (Derechos reservados centrados o alineados) */}
            <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center lg:text-left">
                    © {new Date().getFullYear()} Dr. Device. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}