import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function findLatestDate(dates: string[]) {
    dates.reduce((latest, current) => {
        return new Date(current) > new Date(latest) ? current : latest;
    });
}
