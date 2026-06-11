import { SmartPhoneIcon, LaptopIcon, GameConsoleIcon, DesktopIcon } from "../../../utils/icons.js";
import CategoryCard from "../shared/CategoryCard.jsx";


export default function Categories() {
    return (
        <div className="flex flex-col justify-center items-center p-10 w-full">
            <h1 className="text-4xl font-extralight">Categorias de reparacion</h1>
            <p className="text-gray-600">Soluciones integrales para todo tu ecosistema digital</p>
            <div className="flex gap-5 p-10">
                <CategoryCard icons={<SmartPhoneIcon height="60"/>} text="Smartphone"/>
                <CategoryCard icons={<LaptopIcon height="60"/>} text="Laptop"/>
                <CategoryCard icons={<DesktopIcon height="60"/>} text="Desktop"/>
                <CategoryCard icons={<GameConsoleIcon height="60"/>} text="Consola"/>
            </div>
        </div>
    )
}
