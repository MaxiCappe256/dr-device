import { useFormContext } from 'react-hook-form';
import { ArrowRightIcon } from '../../utils/icons';
import { usePublicRoles } from '../../hooks/usePublicRoles';
import Button from '../ui/shared/Button';
import Error from '../ui/shared/Error';

export default function RegisterSummaryForm({ onBack, extra }) {
    const { getValues } = useFormContext()
    const values = getValues()
    const roles = usePublicRoles();
    const titleRole = roles.find(role => role.id === values.role_id).label

    return (
        <>
            <div className="rounded-2xl border border-surface-container-highest p-6">
                <h2 className="mb-4 text-2xl font-semibold text-primary">
                    Confirmá tus datos
                </h2>
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
