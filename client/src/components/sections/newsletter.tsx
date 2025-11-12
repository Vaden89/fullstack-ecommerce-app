import { Mail } from "lucide-react";
import { TextInputField } from "../common/form";
import { CustomButton } from "../common/button";

export const NewsLetterSection = () => {
  return (
    <section className="p-4 sm:px-20 relative z-10">
      <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-4 bg-black text-white p-6 rounded-3xl">
        <span className="text-[32px] font-bold leading-[35px] mt-3">
          STAY UPTO DATE ABOUT <br /> OUR LATEST OFFERS
        </span>

        <div className="sm:flex sm:flex-col ">
          <TextInputField
            placeholder="Enter your email"
            id="email"
            label=""
            name="email"
            className="w-full bg-white rounded-full"
            icon={Mail}
            iconPosition="left"
          />

          <CustomButton className="w-full mt-2 bg-white text-black font-medium rounded-full">
            Subscribe to Newsletter
          </CustomButton>
        </div>
      </div>
    </section>
  );
};
