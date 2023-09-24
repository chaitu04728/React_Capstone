import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const ProceedLogin = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await fetch(`http://localhost:8000/user/${username}`);
        const userData = await response.json();

        if (Object.keys(userData).length === 0) {
          toast.error('Please Enter a valid username');
        } else {
          if (userData.password === password) {
            toast.success('Login successful');
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('userrole', userData.role);
            navigate('/');
            window.location.reload();
          } else {
            toast.error('Please Enter valid credentials');
          }
        }
      } catch (err) {
        toast.error('Login Failed due to: ' + err.message);
      }
    }
  }

  const validate = () => {
    let result = true;
    if (!username) {
      result = false;
      toast.warning('Please Enter Username');
    }
    if (!password) {
      result = false;
      toast.warning('Please Enter Password');
    }
    return result;
  }

  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
        <form onSubmit={ProceedLogin} className="container">
          <div className="card">
            <div className="card-header">
              <h2>User Login</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>User Name <span className="errmsg">*</span></label>
                <input
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password <span className="errmsg">*</span></label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="card-footer">
              {sessionStorage.getItem('username') ? (
                <>
                  <button type="submit" className="btn btn-primary">Login</button> |
                  <Link className="btn btn-success" to={'/register'}>New User</Link> |
                  <button className="btn btn-warning" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <button type="submit" className="btn btn-primary">Login</button> |
                  <Link className="btn btn-success" to={'/register'}>New User</Link>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
