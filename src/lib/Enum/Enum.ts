//@ts-ignore
export enum GenderEnum {
  Male = 1,
  Female = 0,
}

export const toArrayGender = (): GenderEnum[] => {
  return [GenderEnum.Male, GenderEnum.Female];
};
