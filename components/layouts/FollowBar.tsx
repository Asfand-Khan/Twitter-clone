import React from "react";

const FollowBar = () => {
  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h3 className="text-white text-xl font-semibold capitalize">
          Who to follow
        </h3>
        <div className="flex flex-col gap-6 mt-4">{/* Todo User list */}</div>
      </div>
    </div>
  );
};

export default FollowBar;
