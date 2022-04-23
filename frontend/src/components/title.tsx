import React from "react";
import { Link } from "react-router-dom";
import { User } from "../classes/user.dto";

const Title = ({ user }: { user: User }) => {
  return (
    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          {!user.is_loged_in && (
            <h1 className="fw-light">Pozdravljeni na moji spletni strani!</h1>
          )}
          {user.is_loged_in && (
            <h1 className="fw-light">
              Pozdravljeni/-a, {user.first_name} {user.last_name}!
            </h1>
          )}
          <p className="lead text-muted">
            To je spletna stran, ki smo jo naredili na projektnem tednu 2022.
          </p>
          <p>
            {!user.is_loged_in && (
              <Link to="/login" className="btn btn-primary my-2">
                Prijavi se
              </Link>
            )}
            {!user.is_loged_in && (
              <Link to="/register" className="btn btn-secondary my-2">
                Ustvari si račun
              </Link>
            )}
            {user.is_loged_in && (
              <Link to="/create-post" className="btn btn-primary my-2">
                Naredi objavo
              </Link>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Title;
