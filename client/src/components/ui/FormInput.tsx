import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label: string;
    id: string;
    textarea?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ label, id, textarea, className = "", ...props }) => {
    const baseStyles = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm transition-all duration-200 outline-none focus:bg-white focus:border-[#FF0066] focus:ring-2 focus:ring-[#FF0066]/10";

    return (
        <div className="w-full">
            <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>

            {textarea ? (
                <textarea
                    id={id}
                    className={`${baseStyles} resize-none ${className}`}
                    {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                />
            ) : (
                <input
                    id={id}
                    className={`${baseStyles} ${className}`}
                    {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
                />
            )}
        </div>
    );
};

export default FormInput;