import { useFormContext } from 'react-hook-form';
import { ArrowRightIcon, EditIcon } from '../../utils/icons';
import { usePublicRoles } from '../../hooks/usePublicRoles';
import Button from '../ui/shared/Button';
import Error from '../ui/shared/Error';

export default function RegisterSummaryForm({ onBack, onGoToStep, extra }) {
    const { getValues } = useFormContext()
    const values = getValues()
    const roles = usePublicRoles();
    const titleRole = roles.find(role => role.id === values.role_id).label

    return (
        <>
            <div className="rounded-xl border border-surface-container-highest p-6">
                <div className="flex items-center justify-between gap-2 mb-4">
                    <h2 className="text-2xl font-semibold text-primary">
                        Confirmá tus datos
                    </h2>
                    <EditIcon
                        height='32'
                        onClick={() => onGoToStep(0)}
                        className='text-tertiary hover:cursor-pointer hover:text-primary transition-colors'
                    />
                </div>
                <dl className="space-y-2 text-tertiary">
                    <div>
                        <dt className="font-semibold">Nombre completo</dt>
                        <dd>{values.full_name}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold">Teléfono</dt>
                        <dd>{values.phone}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold">Correo electrónico</dt>
                        <dd>{values.email}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold">Rol seleccionado</dt>
                        <dd>{titleRole}</dd>
                    </div>
                </dl>
            </div>
            {extra.error && <Error message={extra.error.message} />}
            <div className="w-full flex items-center gap-2 mt-8">
                <Button variant="outline" type="button" onClick={onBack} iconLeft={<ArrowRightIcon height="24" className="rotate-180" />}>
                    Volver
                </Button>
                <Button variant="primary" type="submit" loading={extra.loading}>
                    Crear cuenta
                </Button>
            </div>
        </>
    )
}
