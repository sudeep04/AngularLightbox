export interface IAnimatorCallback {
    start:(func: () => void) => void;
    done:(func: () => void) => void;
}