import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { THEME } from "../constants/css";
import { whileSpaceValidatory } from "../constants/index";
import { IRootState } from "../interfaces/api";
import { doSignUp } from "../redux/actions/auth";
import { useFormik } from "formik";
import { ErrorMessage } from "../components/error/error-message";
import { InLineLoader } from "../components/loader/inline-loader";
import * as Yup from "yup";

export const SignUp = () => {
  const signUpUser = useSelector<IRootState, any>(
    (s) => s?.auth?.userSignUp
  );
  const isLoading = useSelector<IRootState, boolean>((s) => s?.api?.isLoading);
  const navigate = useNavigate();
  const [errorMessage, setErrorMEssage] = useState("");
  useEffect(() => {
    console.log(signUpUser);
    
    if (signUpUser) {
      navigate("/login", { replace: true });
    }
  }, [signUpUser]);

  const dispatch = useDispatch();

  const signUpForm = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (value) => {
      value.userName = value?.userName?.trim();
      value.password = value?.password?.trim();
      value.firstName = value?.firstName?.trim();
      value.lastName = value?.lastName?.trim();
      value.email = value?.email?.trim();
      value.password = value?.password?.trim();
      value.confirmPassword = value?.confirmPassword?.trim();
      (dispatch(doSignUp(value)) as any)?.catch((err: any) => {
        setErrorMEssage("Something went wrong!");
      });
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string()
        .required("Please enter first name")
        .test(whileSpaceValidatory("First name")),
      lastName: Yup.string()
        .required("Please enter last name")
        .test(whileSpaceValidatory("Last name")),
      email: Yup.string()
        .required("Please enter email")
        .test(whileSpaceValidatory("Email"))
        .email("Please enter valid Email"),
      userName: Yup.string()
        .required("Please enter username")
        .test(whileSpaceValidatory("User name")),
      password: Yup.string()
        .required("Please enter password")
        .test(whileSpaceValidatory("Password")),
      confirmPassword: Yup.string()
        .required("Please enter confirm password")
        .test(whileSpaceValidatory("Confirm password")),
      // .test(confirmWithValidator(signUpForm.values.password)),
    }),
  });

  return (
    <div className={`flex flex-col align-middle h-screen p-5 justify-center`}>
      <div className="flex flex-row justify-center">
        <div className={`border-2 rounded-full p-6 px-9 ${THEME.borderColor}`}>
          <i className="fa fa-bolt fa-4x"></i>
        </div>
      </div>
      <div className="flex justify-center text-3xl mt-5 mb-3">My Cut</div>
      <form
        onChange={() => setErrorMEssage("")}
        className="flex flex-row justify-center"
        onSubmit={signUpForm.handleSubmit}
      >
        <div className="flex flex-col align-middle">
          <div className="w-fit">
            <input
              className={`${THEME.transparentControl}`}
              type="text"
              name="firstName"
              id="iFirstName"
              placeholder="First name"
              onChange={signUpForm.handleChange}
              onBlur={signUpForm.handleBlur}
              value={signUpForm.values.firstName}
            />
          </div>
          <ErrorMessage form={signUpForm} control={"firstName"} />
          <div className="w-fit">
            <input
              className={`${THEME.transparentControl}`}
              type="text"
              name="lastName"
              id="iLastName"
              placeholder="Last name"
              onChange={signUpForm.handleChange}
              onBlur={signUpForm.handleBlur}
              value={signUpForm.values.lastName}
            />
          </div>
          <ErrorMessage form={signUpForm} control={"lastName"} />
          <div className="w-fit">
            <input
              className={`${THEME.transparentControl}`}
              type="text"
              name="userName"
              id="iUsername"
              placeholder="User name"
              onChange={signUpForm.handleChange}
              onBlur={signUpForm.handleBlur}
              value={signUpForm.values.userName}
            />
          </div>
          <ErrorMessage form={signUpForm} control={"userName"} />
          <div className="w-fit">
            <input
              className={`${THEME.transparentControl}`}
              type="email"
              name="email"
              id="iEmail"
              placeholder="Email"
              onChange={signUpForm.handleChange}
              onBlur={signUpForm.handleBlur}
              value={signUpForm.values.email}
            />
          </div>
          <ErrorMessage form={signUpForm} control={"email"} />
          <div>
            <input
              className={`${THEME.transparentControl}`}
              type="password"
              name="password"
              id="iPassword"
              placeholder="Password"
              onChange={signUpForm.handleChange}
              onBlur={signUpForm.handleBlur}
              value={signUpForm.values.password}
            />
          </div>
          <ErrorMessage form={signUpForm} control={"password"} />
          <div>
            <input
              className={`${THEME.transparentControl}`}
              type="password"
              name="confirmPassword"
              id="iConfirmPassword"
              placeholder="Confirm password"
              onChange={signUpForm.handleChange}
              onBlur={signUpForm.handleBlur}
              value={signUpForm.values.confirmPassword}
            />
          </div>
          <ErrorMessage form={signUpForm} control={"confirmPassword"} />
          <button type="submit" className={`${THEME.btnPrimarySquarish}`}>
            <InLineLoader show={isLoading} />
            Sign Up
          </button>
          <ErrorMessage control={errorMessage} />
          <div>
            Have an Account?
            <span className="cursor-pointer text-blue-500">
              <Link to={'/login'}>Login</Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
