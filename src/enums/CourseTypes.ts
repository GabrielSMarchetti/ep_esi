export enum CourseTypes {
    MASTER = "mestrado",
    DOCTORATE = "doutorado"
}

export function validateCourseType(type: string): boolean {
    return Object.values(CourseTypes).includes(type as CourseTypes);
}