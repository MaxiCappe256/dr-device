import { useCreateOffer } from "../../hooks/useOffers"
import { useForm } from "react-hook-form";
import { PriceIcon, OfferIcon } from "../../utils/icons";
import Button from "../ui/shared/Button";
import Input from "../ui/shared/Input";
import Error from "../ui/shared/Error";

function OfferForm({ orderId, onSuccess }) {
    const createOffer = useCreateOffer();
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = (data) => {
        createOffer.mutateAsync({
            order_id: orderId,
            description: data.description,
            price: Number(data.price)
        }, {
            onSuccess: () => onSuccess?.(),
        })
    }

    return (
        <form className="flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="description" className="text-lg font-medium text-tertiary">
                Descripción
            </label>
            <Input
                id="description"
                type="textarea"
                name="description"
                {...register("description", {
                    required: "La descripción de la oferta es obligatoria.",
                    minLength: {
                        value: 50,
                        message: "Debe contener al menos 50 caracteres."
                    },
                    maxLength: {
                        value: 1200,
                        message: "Debe contener un máximo de 1200 caracteres."
                    }
                })}
                placeholder="Te puedo ofrecer..."
            />
            {errors.description && <Error message={errors.description.message} />}
            <label htmlFor="price" className="text-lg font-medium text-tertiary">
                Precio
            </label>
            <Input
                id="price"
                name="price"
                type="number"
                {...register("price", {
                    required: "El precio es obligatorio.",
                    valueAsNumber: true
                })}
                icon={<PriceIcon height="24" />}
                placeholder="2300"
            />
            {errors.price && <Error message={errors.price.message} />}
            <Button
                variant="primary"
                loading={createOffer.isPending}
                iconRight={<OfferIcon height="24" />}
            >
                Ofertar
            </Button>
        </form>
    )
}

export default OfferForm