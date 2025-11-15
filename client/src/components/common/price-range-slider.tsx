import { Slider } from "../ui/slider";

export const PriceRangeSlider = () => (
  <Slider onValueChange={(val) => console.log(val)} defaultValue={[0, 100]} />
);
