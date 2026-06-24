import { GithubAltIcon, WhatsappIcon } from "../../../utils/icons.js";
import Logo from "./Logo";

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
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 justify-between items-center lg:items-start text-center lg:text-left">
                <div className="flex flex-col gap-4 max-w-xs items-center lg:items-start">
                    <Logo iconClassName="size-6" textClassName="text-lg text-primary" />
                    <p className="text-sm text-gray-500 leading-relaxed">
                        La plataforma de soluciones inteligente para la reparación de tus dispositivos.
                    </p>
                    <div className="flex gap-2 mt-1 justify-center lg:justify-start">
                        <a href="https://github.com/MaxiCappe256/dr-device" target="_blank" rel="noopener noreferrer" aria-label="Sitio web" className="size-9 rounded-full border border-gray-200 bg-blue-50 flex items-center justify-center text-primary hover:bg-blue-100 transition-colors">
                            <GithubAltIcon height="25" width="25"/>
                        </a>
                        <a href="" aria-label="Teléfono" className="size-9 rounded-full border border-gray-200 bg-blue-50 flex items-center justify-center text-primary hover:bg-blue-100 transition-colors">
                            <WhatsappIcon height="22" width="22"/>
                        </a>
                    </div>
                </div>
                <div className="w-full sm:w-auto flex flex-col items-center lg:items-start">
                    {columns.map((col) => (
                        <div key={col.title} className="flex flex-col gap-3 items-center lg:items-start">
                            <span className="text-xs font-bold tracking-widest text-gray-800 uppercase">
                                {col.title}
                            </span>
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

            <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center lg:text-left">
                    © {new Date().getFullYear()} Dr. Device. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}