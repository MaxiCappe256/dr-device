import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router';
import { CheckIcon, ToolIcon, UserIcon, ArrowRightIcon } from "../../../utils/icons.js";
import { useFormContext, useFormState, useWatch } from 'react-hook-form';
import { usePublicRoles } from '../../../hooks/usePublicRoles.js';
import Button from '../shared/Button.jsx';
import Error from '../shared/Error.jsx';

export default function RegisterRoleForm({ onBack, onNext }) {
    const {
        register,
        control,
        setValue,
    } = useFormContext();
    const { errors } = useFormState({
        control,
        name: ['role_id']
    });
    const roles = usePublicRoles();

    const [searchParams, setSearchParams] = useSearchParams();
    const role = searchParams.get('role')
    const selectedRole = useWatch({ control, name: 'role_id' });
    const labelRefs = useRef({});
    const getRoleIcon = (title) => (title === "technician" ? ToolIcon : UserIcon);
    const roleField = register('role_id', {
        required: "Seleccioná un rol para continuar"
    });

    useEffect(() => {
        const roleId = roles.find(data => data.title === role)?.id ?? null;

        if (roleId) {
            setValue('role_id', roleId, { shouldValidate: true });
        }
    }, [role, setValue, roles])

    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {roles.map((mock) => {
                    const isSelected = selectedRole === mock.id;
        
                    const RoleIcon = getRoleIcon(mock.title);

                    return (
                        <label
                            key={mock.id}
                            htmlFor={mock.id}
                            ref={(element) => {
                                labelRefs.current[mock.id] = element;
                            }}
                            className={`relative flex cursor-pointer flex-col items-center rounded-xl border p-6 text-center transition-colors select-none ${isSelected
                                ? "border-primary bg-surface-container shadow-sm"
                                : "border-surface-container-highest bg-surface-container-lowest hover:border-primary/40"
                                } focus:outline-none`}
                        >
                            <input
                                id={mock.id}
                                type="radio"
                                value={mock.id}
                                className="sr-only"
                                checked={isSelected}
                                name={roleField.name}
                                ref={roleField.ref}
                                onBlur={roleField.onBlur}
                                onChange={(event) => {
                                    roleField.onChange(event);
                                    labelRefs.current[mock.id]?.focus();
                                    if(role) {
                                        setSearchParams({ role: mock.title })
                                    }
                                }}
                            />

                            {isSelected && (
                                <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-on-primary">
                                    <CheckIcon height="16" />
                                </span>
                            )}

                            <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-surface-container-high text-primary">
                                <RoleIcon height="28" />
                            </span>

                            <h3 className="mb-2 text-2xl font-semibold text-primary">
                                {mock.label}
                            </h3>

                            <p className="max-w-52 text-lg font-medium leading-7 text-tertiary">
                                {mock.description}
                            </p>
                        </label>
                    );
                })}
            </div>
            {errors.role_id && <Error message={errors.role_id.message}/>}
            <div className="w-full flex items-center gap-2 mt-8">
                <Button variant="outline" type="button" onClick={onBack} iconLeft={<ArrowRightIcon height="24" className='rotate-180' />}>
                    Volver
                </Button>
                <Button variant="primary" type="button" onClick={onNext} iconRight={<ArrowRightIcon height="24" />}>
                    Siguiente
                </Button>
            </div>
        </>
    )
}
