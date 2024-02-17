import { PresentationChartBarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <PresentationChartBarIcon className="h-11 w-11" />
      <p className="text-[44px]">Brian</p>
    </div>
  );
}
