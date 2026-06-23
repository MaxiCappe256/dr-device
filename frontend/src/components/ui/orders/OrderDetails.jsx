import React from 'react'

import { ToolKitIcon, UserIcon } from "../../../utils/icons.js";

export default function OrderDetails({ description, techFullName, categoryName, orderDates }) {
    return (
        <div className="flex flex-col w-full h-full justify-between items-start gap-5">
            <div className="space-y-6">
                <label className="uppercase text-md text-tertiary/60 font-semibold mb-2">
                    Descripción del servicio
                </label>
                <p className="text-lg">{description}</p>
            </div>

            <div className="flex gap-3 w-full">

                {techFullName &&
                    <div className="py-3 px-5 rounded-lg bg-surface-tint/10 w-full">
                        <label className="uppercase text-sm text-tertiary/60 font-semibold">
                            Técnico asignado
                        </label>
                        <div className="flex items-center gap-2">
                            <div className="rounded-full bg-surface-tint/20 p-2 w-fit">
                                <UserIcon
                                    className="text-surface-tint"
                                    height="20"
                                />
                            </div>
                            <p className="text-md">
                                {techFullName ? techFullName : "Sin técnico asignado"}
                            </p>
                        </div>
                    </div>}
                <div className="py-3 px-5 rounded-lg bg-surface-tint/10 w-full">
                    <label className="uppercase text-sm text-tertiary/60 font-semibold mb-2">
                        Categoria
                    </label>
                    <div className="flex items-center gap-2">
                        <div className="rounded-full bg-surface-tint/20 p-2 w-fit">
                            <ToolKitIcon
                                className="text-surface-tint"
                                height="20"
                            />
                        </div>
                        <p className="text-md">
                            {categoryName ? categoryName : "Sin categoria"}
                        </p>
                    </div>
                </div>
            </div>

            {orderDates &&
                <div className="flex flex-col gap-2 p-4 rounded-lg border border-gray-100 w-full">
                    <label className="uppercase text-sm text-tertiary/60 font-semibold">
                        Linea de tiempo de la orden
                    </label>
                    <div className="flex flex-col gap-2 ml-4 pl-6 border-l-3 border-gray-100">
                        {
                            orderDates &&
                            orderDates.map(({ type, label, date }) => (
                                <div key={type}>
                                    <div className="relative">
                                        <h4 className="font-semibold">{label}</h4>
                                        <div
                                            className={`
                                    size-3 rounded-full border border-white absolute -left-8 top-1.5
                                    ${{
                                                    created: "bg-on-background",
                                                    updated: "bg-primary-container",
                                                    finished: "bg-surface-tint",
                                                    canceled: "bg-on-surface-variant",
                                                }[type]}
                                  `}
                                        ></div>
                                    </div>
                                    <span className="font-semibold text-tertiary/40">
                                        {new Date(date).toLocaleDateString("es-AR")}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>}
        </div>
    )
}
