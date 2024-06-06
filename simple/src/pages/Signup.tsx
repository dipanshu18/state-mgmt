import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Signup() {
  const { signupData, setSignupData, handleSignup } = useAuth();

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Create an account now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSignup} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                onChange={(e) =>
                  setSignupData({ ...signupData, username: e.target.value })
                }
                value={signupData.username}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                value={signupData.email}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                value={signupData.password}
                className="input input-bordered"
                required
              />
              <label className="label">
                <Link to="/login" className="label-text-alt ">
                  Already have an account?{" "}
                  <span className="link link-hover">Login</span>
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
