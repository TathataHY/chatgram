import { AvatarProps } from "@/types";
import Image from "next/image";

function Avatar({ avatarId, setAvatarId }: AvatarProps) {
  return (
    <div
      onClick={() => setAvatarId((Math.random() * 1000).toFixed())}
      className="avatar cursor-pointer mx-auto mb-5 tooltip"
      data-tip="Click to change your avatar"
    >
      <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        <Image
          src={`https://robohash.org/${avatarId}.png`}
          alt={"Avatar"}
          width={256}
          height={256}
        />
      </div>
    </div>
  );
}

export default Avatar;
