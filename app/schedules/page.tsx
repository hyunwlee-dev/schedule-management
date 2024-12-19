import Link from 'next/link';

async function ScheduleManagementPage() {
  return (
    <main>
      <Link className="block" href={`/schedule-management/${'24-12-18'}`}>
        24-12-18
      </Link>
      <Link className="block" href={`/schedule-management/${'24-12-19'}`}>
        24-12-19
      </Link>
      <Link className="block" href={`/schedule-management/${'24-12-20'}`}>
        24-12-20
      </Link>
      <Link className="block" href={`/schedule-management/${'24-12-21'}`}>
        24-12-21
      </Link>
      <Link className="block" href={`/schedule-management/${'24-12-22'}`}>
        24-12-22
      </Link>
      <Link className="block" href={`/schedule-management/${'24-12-23'}`}>
        24-12-23
      </Link>
      <Link className="block" href={`/schedule-management/${'24-12-24'}`}>
        24-12-24
      </Link>
      <Link className="block" href={`/schedule-management/${'24-12-25'}`}>
        24-12-25
      </Link>
      <Link className="block" href={`/schedule-management/${'24-12-26'}`}>
        24-12-26
      </Link>
    </main>
  );
}

export default ScheduleManagementPage;
