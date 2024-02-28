import {
  NavigateFunction,
  useNavigate,
  useLocation,
  Location,
} from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const location = useLocation();
  return { navigate, location };
};
