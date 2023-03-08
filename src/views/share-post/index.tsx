import { PostList } from "components/share-post";
import { FC } from "react";

export const SharePostView: FC = () => {
  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col w-full">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mt-10 mb-8">
          PostList
        </h1>
        {/* CONTENT GOES HERE */}
        <div className="text-center"></div>
        <PostList />
      </div>
    </div>
  );
};
