import { Link } from "react-router"
import Button from "../shared/Button.jsx"
import imageHeader from "../../../assets/headerImg.jpg"
import { ArrowRightIcon } from "../../../utils/icons.js" 

export default function Hero() {
    return (
        <header className="flex w-11/12 mx-auto justify-between h-[calc(100vh-90px)] items-center overflow-hidden max-lg:justify-center max-lg:text-center">
            <div className="flex flex-col space-y-8 w-1/2 max-lg:w-full">
                <h1 className="text-6xl font-extralight">Tus dispositivos en <strong className="text-primary">manos expertas</strong></h1>
                <p className="text-gray-600 text-xl">Conectamos usuarios con técnicos especializados para reparaciones rápidas y garantizadas. El software definitivo para la gestión técnica moderna.</p>
                <div className="flex space-x-3 w-1/2 max-lg:flex-col max-lg:space-y-3 max-lg:w-full">
                    <Button variant="primary" iconRight={<ArrowRightIcon height="24"/>} ><Link to="/orders">
                        Solicitar reparacion
                    </Link>
                    </Button>
                    <Button variant="outline" >Ver servicios</Button>
                </div>
            </div>
            <img src={imageHeader} alt="Dr. Device tecnico reparando" className="w-1/2 rounded-2xl object-cover h-full max-h-full max-lg:hidden"/>
        </header>
    )
}
