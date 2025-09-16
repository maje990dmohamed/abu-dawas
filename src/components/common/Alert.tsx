import { AlertCircle, CheckCircle } from 'lucide-react';

export const Alert = ({ type, message } : any) => {
  const isSuccess = type === 'success';
  
  return (
    <div className={`flex items-center space-x-2 p-4 rounded-lg ${
      isSuccess 
        ? 'bg-green-50 border border-green-200 text-green-800' 
        : 'bg-red-50 border border-red-200 text-red-800'
    }`}>
      {isSuccess ? (
        <CheckCircle className="h-5 w-5 text-green-600" />
      ) : (
        <AlertCircle className="h-5 w-5 text-red-600" />
      )}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};