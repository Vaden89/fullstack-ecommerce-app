import { logoutAction } from "@/action/auth";
import { auth } from "@/app/(auth)/auth";
import { CircleUserRound } from "lucide-react";

export const ProfileButton = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <details className="relative">
      <summary
        className="list-none cursor-pointer flex items-center"
        aria-label="View User Profile"
      >
        <CircleUserRound strokeWidth={2.5} className="w-6 h-6" />
      </summary>

      <div className="w-max h-[160px] bg-white absolute right-0 mt-2 p-4 rounded-lg shadow flex flex-col justify-between z-50">
        <div className="w-fit flex items-center gap-2">
          <img
            src="/images/avater.jpeg"
            alt="User Avatar"
            className="w-14 h-14 rounded-full mb-2"
          />
          <div>
            <p className="text-sm font-medium">
              {user?.firstname} {user?.lastname}
            </p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-center">
          <button className="text-sm text-gray-500">Account Settings</button>
          <hr />
          <button onClick={logoutAction} className="text-sm text-red-500">
            Logout
          </button>
        </div>
      </div>
    </details>
  );
};
