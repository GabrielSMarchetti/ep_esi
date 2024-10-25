export enum UserTypes {
    STUDENT = "student",
    MENTOR = "mentor",
    COORDINATOR = "coordinator"
}

export function validateUserType(type: string): boolean {
    return Object.values(UserTypes).includes(type as UserTypes);
}