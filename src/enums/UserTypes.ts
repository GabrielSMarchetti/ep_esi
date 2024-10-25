export enum UserTypes {
    STUDENT = "student",
    PROFESSOR = "professor",
    STAFF = "staff"
}

export function validateUserType(type: string): boolean {
    return Object.values(UserTypes).includes(type as UserTypes);
}