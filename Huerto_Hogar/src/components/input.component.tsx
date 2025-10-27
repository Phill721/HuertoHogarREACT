import type { ChangeEvent } from "react";
interface PropsTextBox{
    id: string;
    label:string;
    name:string;
    type:string;
    value:string;
    placeholder?:string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    'data-testid'?:string
}

export function TextBox({ id, label, name, type, value, placeholder, onChange }: PropsTextBox){
    return(
        <>
        <div className="mb-3">
                            <label htmlFor={name} className="form-label">{label}</label>
                            <input
                                type={type}
                                className="form-control"
                                id={id}
                                placeholder={placeholder}
                                value={value}
                                onChange={onChange}
                            />
                        </div>
        </>
    )
}

interface PropsTextField{
    id:string;
    label:string;
    name:string;
    rows:number;
    placeholder?:string
    value:string;
    onChange:(e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextField({ id, label, name, rows, placeholder, value, onChange }: PropsTextField){
    return(
        <>
            <div className="mb-3">
                <label htmlFor={name} className="form-label">
                    {label}
                </label>
                <textarea
                    className="form-control"
                    id={id}
                    rows={rows}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </>
    )
}

interface PropsButton{
    id:string;
    className:string;
    type:"button" | "submit" | "reset"
    name:string;
}

export function Button({ id, className, type, name }: PropsButton){
    return(
        <>
            {/* Botón */}
            <div className="d-grid">
                <button
                    type={type}
                    id={id}
                    className={className}
                    style={{ backgroundColor: "#2E8B57", color: "white" }}
                >
                    {name}
                </button>
            </div>
        </>
    )
}