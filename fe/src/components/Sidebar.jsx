import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="min-h-screen w-[260px] bg-[#6B4B3E] p-5">
      <img src="/logo.png" alt="UPTD" className="mb-[30px] w-full" />

      <Link
        to="/dashboard"
        className="mb-3 block rounded-[20px] bg-[#8B6A55] p-3 text-center font-bold text-white no-underline transition-colors hover:bg-[#A77C63]"
      >
        HOME
      </Link>
      <Link
        to="/pegawai"
        className="mb-3 block rounded-[20px] bg-[#8B6A55] p-3 text-center font-bold text-white no-underline transition-colors hover:bg-[#A77C63]"
      >
        PEGAWAI
      </Link>
      <Link
        to="/client"
        className="block rounded-[20px] bg-[#8B6A55] p-3 text-center font-bold text-white no-underline transition-colors hover:bg-[#A77C63]"
      >
        KLIEN
      </Link>
    </div>
  );
}

export default Sidebar;
