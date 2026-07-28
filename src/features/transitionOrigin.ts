export type TransitionOrigin = {
  x: number;
  y: number;
  radius: number;
};

let origin: TransitionOrigin = { x: 0, y: 0, radius: 0 };

export function setTransitionOrigin(next: TransitionOrigin): void {
  origin = next;
}

export function getTransitionOrigin(): TransitionOrigin {
  return origin;
}
