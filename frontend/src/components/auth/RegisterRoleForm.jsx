import React, { useRef, useState } from 'react'
import { CheckIcon, ToolIcon, UserIcon, ArrowRightIcon } from "../../utils/icons.js";
import { useFormContext } from 'react-hook-form';
import Button from '../ui/Button.jsx';

export default function RegisterRoleForm({ onBack, onNext }) {
    const mockData = [
        {
            "id": "a1b2c3d4-0001-0001-0001-000000000001",
            "title": "user",
            "label": "Cliente",
            "description": "Crea solicitudes de reparación para tus dispositivos",
            "createdAt": "2026-06-02T12:11:11.918Z",
            "updatedAt": "2026-06-02T12:11:11.918Z",
            "permissions": [
                {
                    "id": "f7b8c9d0-0008-0008-0008-000000000001"
                },
                {
                    "id": "f7b8c9d0-0008-0008-0008-000000000002"
                },
                {
                    "id": "f7b8c9d0-0008-0008-0008-000000000003"
                }
            ]
        },
        {
            "id": "a1b2c3d4-0001-0001-0001-000000000002",
            "title": "technician",
            "label": "Técnico",
            "description": "Propone soluciones a los dispositivos de los usuarios",
            "createdAt": "2026-06-02T12:11:11.922Z",
            "updatedAt": "2026-06-02T12:11:11.922Z",
            "permissions": [
                {
                    "id": "f7b8c9d0-0008-0008-0008-000000000002"
                },
                {
                    "id": "f7b8c9d0-0008-0008-0008-000000000004"
                },
                {
                    "id": "f7b8c9d0-0008-0008-0008-000000000005"
                },
                {
                    "id": "f7b8c9d0-0008-0008-0008-000000000006"
                }
            ]
        }]

    const { register } = useFormContext();

    const [selectedRole, setSelectedRole] = useState(null);
    const labelRefs = useRef({});
    const getRoleIcon = (title) => (title === "technician" ? ToolIcon : UserIcon);
    const roleField = register('role_id', { required: true });

    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {mockData.map((mock) => {
                    const isSelected = selectedRole === mock.id;
                    const RoleIcon = getRoleIcon(mock.title);

                    return (
                        <label
                            key={mock.id}
                            htmlFor={mock.id}
                            ref={(element) => {
                                labelRefs.current[mock.id] = element;
                            }}
                            tabIndex={-1}
                            className={`relative flex cursor-pointer flex-col items-center rounded-2xl border p-6 text-center transition-colors ${isSelected
                                ? "border-primary bg-surface-container shadow-sm"
                                : "border-surface-container-highest bg-surface-container-lowest hover:border-primary/40"
                                } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background`}
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
                                    setSelectedRole(mock.id);
                                    labelRefs.current[mock.id]?.focus();
                                }}
                            />

                            {isSelected && (
                                <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-on-primary">
                                    <CheckIcon height="16" />
                                </span>
                            )}

                            <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-container-high text-primary">
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
            <div className="w-full flex items-center gap-2">
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