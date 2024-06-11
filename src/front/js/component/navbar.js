import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css";

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate();
	const token = localStorage.getItem("token")

	const handleLogOut = () => {
		actions.signOut();
		navigate('/')
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-light navbar-custom">
			<div className="container-fluid mx-2">
				<div className="d-flex gap-3">
					<Link to="/">

					</Link>
				</div>
				{token ?
					<>
						<Link to="/" className="text-decoration-none">
							<div className="btn btn-outline me-2" onClick={handleLogOut}>Cerrar sesión</div>
						</Link>
					</>
					: (
						<div>
							<div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
								<div className="offcanvas-body">
									<ul className="navbar-nav justify-content-end flex-grow-1 pe-3 mt-3">
										<li className="nav-item mb-2" data-bs-toggle="offcanvas">
											<Link to="/login" className="btn btn-outline me-2 ">Iniciar sesión
											</Link>
										</li>
										<li className="nav-item mb-3" data-bs-toggle="offcanvas">
											<Link to="/signup" className="btn btn-outline ">Registrarse
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					)
				}
			</div>
		</nav>
	);
};
