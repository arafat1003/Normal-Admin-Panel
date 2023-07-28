import { useDispatch, useSelector } from "react-redux";
import { SET_LOGIN, isloggedInn } from "../../redux/features/authSlicer";
import { useNavigate } from "react-router-dom";
import { loginStatus } from "../../configuration/authconfiguration";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Redirectpath = async (path) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectUser = async () => {
      try {
        const isLoggedInn = await loginStatus();
        console.log(isLoggedInn);
        console.log(loginStatus);
        dispatch(SET_LOGIN(isLoggedInn));
        const islog = useSelector(isloggedInn);
        console.log(islog);
        if (!isLoggedInn) {
          toast.info("your session is finished just login again");
          navigate(path);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };

    redirectUser();
  }, [dispatch, path, navigate]);
};

export default Redirectpath;
