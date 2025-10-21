export const DiscountBanner = () => {
  return (
    <div className="w-full h-[34px] bg-black flex flex-col items-center justify-center text-sm text-white">
      <p>
        Sign up and get 20% off your first order.{" "}
        <button className="underline underline-offset-2 font-medium">
          Sign up
        </button>
      </p>
    </div>
  );
};
