import Image from 'next/image';

function Logo() {
  return (
    <div>
      <h1 className="sr-only">schedule management</h1>
      <Image width={120} height={120} src="/svgs/avatar.svg" alt="avatar" />
    </div>
  );
}

export default Logo;
