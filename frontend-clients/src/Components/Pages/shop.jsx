import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSellers } from "../Slice/sellersSlice";

const Shop = () => {
	const dispatch = useDispatch();
	const sellers = useSelector((state) => state.sellers.sellers || []);
	const status = useSelector((state) => state.sellers.status);

	useEffect(() => {
		dispatch(fetchAllSellers());
	}, [dispatch]);

	return (
		<div className="container">
			<h2 style={{ marginBottom: 12 }}>Shops</h2>

			{status === "loading" && <div className="nav-loading">Loading sellers...</div>}

			<div className="shop-grid">
				{sellers.map((s) => (
					<Link to={`/shop/${s._id}`} className="shop-card" key={s._id}>
						<div className="shop-avatar-wrap">
							{s.image ? (
								<img src={s.image} alt={s.name} className="shop-avatar" />
							) : (
								<div className="shop-avatar placeholder">{s.name?.charAt(0).toUpperCase()}</div>
							)}
						</div>

						<div className="shop-info">
							<div className="shop-name">{s.name}</div>
							<div className="shop-meta">
								<span className="shop-category">{s.category}</span>
								<span className={"shop-status " + (s.status === "active" ? "active" : "inactive")}>{s.status}</span>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Shop;

