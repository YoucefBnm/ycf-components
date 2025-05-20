export type StaggerT = "start" | "middle" | "end";
export interface SetStaggerProps {
  index: number;
  itemsLength: number;
  stagger?: number;
}
export const setStagger = ({
  index,
  itemsLength,
  stagger,
}: SetStaggerProps) => ({
  start: index * (stagger || 0.02),
  middle: Math.abs(index - Math.floor(itemsLength / 2)) * (stagger || 0.02),
  end: (itemsLength - index) * (stagger || 0.02),
});
