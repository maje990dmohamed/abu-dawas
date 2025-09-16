import { toGregorian } from 'hijri-converter';

export const hijriConverter = (hijriDate: string): string => {
    
  const [day, month, year] = hijriDate.split("/").map(Number);
  
  const gregorian = toGregorian( year, month, day );    
  
  const formatted = `${gregorian.gy}-${String(gregorian.gm).padStart(2, '0')}-${String(gregorian.gd).padStart(2, '0')}`;
  
  return formatted;
};
