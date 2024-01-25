import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../store/hooks";

type WithGuardProps = {
  children: React.ReactNode;
};

const WithGuard = ({ children }: WithGuardProps): React.ReactNode => {
  const { success } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!success) {
      navigate("/login");
    }
  }, [success]);

  return children;
};

export default WithGuard;
