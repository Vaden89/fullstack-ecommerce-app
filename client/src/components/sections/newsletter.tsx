import { Mail } from "lucide-react";
import { TextInputField } from "../common/form";
import { CustomButton } from "../common/button";

export const NewsLetterSection = () => {
  return (
    <section className="p-4 relative z-10">
      <div className="w-full flex flex-col gap-4 bg-black text-white p-6 rounded-3xl">
        <span className="text-[32px] font-bold leading-[35px] mt-3">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </span>

        <TextInputField
          placeholder="Enter your email"
          id="email"
          label=""
          name="email"
          className="w-full bg-white"
          icon={Mail}
          iconPosition="left"
        />

        <CustomButton className="bg-white text-black font-medium rounded-full">
          Subscribe to Newsletter
        </CustomButton>
      </div>
    </section>
  );
};
