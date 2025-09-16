import { AlertCircle } from 'lucide-react';

export const InputField = ({
  label,
  type,
  value,
  onChange,
  error,
  disabled,
  placeholder,
  icon: Icon,
  endIcon: EndIcon,
  onEndIconClick, 
  req
}: any) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} : 
        {req ? <span className=' text-red-500'> *</span> : ""}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {/* خليتها right بدل left */}
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className={`block w-full ${Icon ? 'pr-10' : 'pr-3'} ${EndIcon ? 'pl-10' : 'pl-3'} py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent transition-all duration-200 ${error
              ? 'border-red-300 bg-red-50 focus:ring-red-500'
              : 'border-gray-300 bg-white hover:border-gray-400'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
        {EndIcon && (
          <button
            type="button"
            onClick={onEndIconClick}
            disabled={disabled}
            className="absolute inset-y-0 left-0 pl-3 flex items-center hover:text-gray-600 transition-colors"
          >
            {/* خليتها left بدل right */}
            <EndIcon className="h-5 w-5 text-gray-400" />
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center space-x-1 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};