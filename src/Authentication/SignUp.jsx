// SignUp.jsx
import Lottie from "lottie-react";
import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import registerAnime from "../assets/register.json";
import { AuthContext } from "../Provider/AuthProvider";

const SignUp = () => {
  const { createNewUser, loginWithGoogle, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const registerHandle = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const passCheck = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passCheck.test(password)) {
      Swal.fire("Error", "Password must contain upper & lower case and 6+ chars", "error");
      return;
    }

    try {
      const result = await createNewUser(email, password);

      await updateUser({
        displayName: name,
        photoURL: photoURL,
      });

      Swal.fire("Success!", "Account created successfully", "success");

      navigate("/auth/signin");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleGoogleSignup = () => {
    loginWithGoogle()
      .then(() => {
        Swal.fire("Success!", "Signed up with Google", "success");
        navigate("/");
      })
      .catch(() => Swal.fire("Error", "Google signup failed", "error"));
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse lg:gap-20">

        <div className="flex-1">
          <Lottie animationData={registerAnime}></Lottie>
        </div>

        <div className="flex-1 card bg-base-100 max-w-sm shadow-2xl">
          <form onSubmit={registerHandle} className="card-body">

            <h1 className="text-5xl font-bold mb-10">Join With Us</h1>

            <input name="name" type="text" placeholder="Name" className="input input-bordered" required />
            <input name="photoURL" type="url" placeholder="Photo URL" className="input input-bordered" required />
            <input name="email" type="email" placeholder="Email" className="input input-bordered" required />
            <input name="password" type="password" placeholder="Password" className="input input-bordered" required />

            <button className="btn bg-[#8fbf5b] text-white mt-6">Sign Up</button>

            <div className="divider">OR</div>

            <button
              type="button"
              onClick={handleGoogleSignup}
              className="btn btn-outline border-[#8fbf5b] text-[#8fbf5b]"
            >
              <FcGoogle className="text-xl" /> Continue with Google
            </button>

            <p className="text-center mt-4 text-sm">
              Already have an account?
              <Link to="/auth/signin" className="text-[#8fbf5b] font-bold"> Login </Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default SignUp;
