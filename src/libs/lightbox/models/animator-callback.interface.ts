export interface AnimatorCallback {
    start: (func: () => void) => void;
    done: (func: () => void) => void;
}
