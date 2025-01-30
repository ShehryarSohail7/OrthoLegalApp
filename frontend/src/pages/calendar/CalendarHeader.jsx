import logo from "../../assets/OrthoLegal-Logo-COL2-01 (5).jpg";
import { useNavigate } from "react-router-dom";

export function CalendarHeader() {
  const navigate = useNavigate();
  return (
    <header className="bg-[#000051] p-4">
      <div className="mx-auto flex justify-center items-center">
        <img
          src={logo}
          alt="Ortholegal Logo"
          className="logo2"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
    </header>
  );
}
