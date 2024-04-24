interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
    kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
    backgroundMaterial: string;
    kind: "background"
}

interface CourseCommon extends CoursePartBase {
    description?: string;
}

interface CourseExtra extends CourseCommon {
    requirements: string[];
    kind: string;
}

export type CoursePart = CoursePartBasic | CourseCommon | CourseExtra | CoursePartGroup | CoursePartBackground