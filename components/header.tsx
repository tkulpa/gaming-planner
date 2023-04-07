import { signOut, useSession } from 'next-auth/react';
import Image from "next/image";
import { MdLogout } from 'react-icons/md';

type HeaderProps = {
};

const Header = ({ }: HeaderProps) => {
  const { data: session } = useSession()
  return (<div style={{ display: 'flex', justifyContent: 'flex-end', padding: 8, marginBottom: 32 }}>
    {!!session?.user && <p style={{ display: 'flex', alignItems: 'center' }}>
      {!!session?.user?.image && <Image
        src={session?.user?.image}
        alt="User Avatar"
        width={24}
        height={24}
        priority
        style={{ borderRadius: '50%' }}
      />}
      <span style={{ marginLeft: 8, marginRight: 8 }}>{session?.user?.name}</span>
      <MdLogout onClick={() => signOut()} />
    </p>}
  </div>);
}

export default Header;