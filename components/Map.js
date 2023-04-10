import React, { useMemo } from 'react'
import s from "./Map.module.css"

export default function Map() {
    const center = useMemo(() => ({lat: 44, lng: -80}), []);
    return (
        <div className={s.container}>
        </div>
    )
}