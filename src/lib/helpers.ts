import type { PhotoFile } from "../types/types";

export const isPhotoFile = (value: any): value is PhotoFile => {
    return value && typeof value === "object" && "file" in value;
};