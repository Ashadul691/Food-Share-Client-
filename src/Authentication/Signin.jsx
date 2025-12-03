// Signin.jsx
import Lottie from "lottie-react";
import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginAnime from "../assets/login.json";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const Signin = () => {
  const { loginWithEmail, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginWithEmail(email, password)
      .then(() => {
        Swal.fire("Success!", "Logged in successfully", "success");
        navigate(from);
      })
      .catch(() => {
        Swal.fire("Error", "Wrong email or password", "error");
      });
  };

  const handleGoogle = () => {
    loginWithGoogle()
      .then(() => {
        Swal.fire("Success!", "Logged in with Google", "success");
        navigate(from);
      })
      .catch(() => Swal.fire("Error", "Google auth failed", "error"));
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse lg:gap-20">

        <div className="flex-1 text-center lg:text-left w-60 lg:w-[600px]">
          <Lottie animationData={loginAnime}></Lottie>
        </div>

        <div className="flex-1 card bg-base-100 w-full max-w-sm shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <h1 className="text-5xl font-bold mb-10">Login</h1>

            <div className="form-control">
              <label className="label">Email</label>
              <input name="email" type="email" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label">Password</label>
              <input name="password" type="password" className="input input-bordered" required />
            </div>

            <button className="btn bg-[#8fbf5b] text-white mt-6">
              Login
            </button>
          </form>

          <div className="card-body pt-0">
            <div className="divider">OR</div>
            <button
              onClick={handleGoogle}
              className="btn btn-outline border-[#8fbf5b] text-[#8fbf5b]"
            >
              <FcGoogle className="text-xl" /> Login with Google
            </button>

            <p className="text-center mt-4">
              Don't have an account?{" "}
              <Link to="/auth/signup" className="text-[#8fbf5b] font-bold">
                Sign Up here
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signin;
