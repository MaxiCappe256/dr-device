import { SmartPhoneIcon, LaptopIcon, GameConsoleIcon, DesktopIcon } from "../../../utils/icons.js";
import CategoryCard from "../shared/CategoryCard.jsx";

export default function Categories() {
    return (
        <div className="flex flex-col justify-center items-center px-4 py-12 md:p-12 gap-3 w-full bg-surface-bright mb-10">
            <h1 className="text-3xl md:text-4xl font-extralight text-center">Categorías de reparación</h1>
            <p className="text-gray-600 text-center text-sm md:text-base">
                Soluciones integrales para todo tu ecosistema digital
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-10 w-full max-w-5xl px-2">
                <CategoryCard 
                    icons={<SmartPhoneIcon height="40" style={{color:'var(--color-primary)'}}/>} 
                    text="Smartphone"
                />
                <CategoryCard 
                    icons={<LaptopIcon height="40" style={{color:'var(--color-primary)'}}/>} 
                    text="Laptop"
                />
                <CategoryCard 
                    icons={<DesktopIcon height="40" style={{color:'var(--color-primary)'}}/>} 
                    text="Desktop"
                />
                <CategoryCard 
                    icons={<GameConsoleIcon height="40" style={{color:'var(--color-primary)'}}/>} 
                    text="Consola"
                />
            </div>
        </div>
    );
}