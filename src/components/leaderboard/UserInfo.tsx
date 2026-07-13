import Link from 'next/link';

interface UserInfoProps {
  name: string;
  initials: string;
}

export function UserInfo({ name, initials }: UserInfoProps) {
  return (
    <Link href={`/profil/${encodeURIComponent(name)}`} className="flex items-center gap-3 no-underline text-inherit hover:text-green transition-all">
      <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center font-bold text-[0.75rem] text-green">
        {initials}
      </div>
      <span className="font-semibold">{name}</span>
    </Link>
  );
}
