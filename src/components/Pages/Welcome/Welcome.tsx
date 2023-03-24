import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <>
      <div>Let's build your new habit</div>
      <button>
        <Link to="/form">Start here</Link>
      </button>
    </>
  );
};

export default Welcome;
