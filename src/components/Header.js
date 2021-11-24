import React from 'react';

export default function Header(props) {
	return (
		<header className="block row center">
			<div>
				<a href="#/">
					<h1>Vitl Suppliment Cart</h1>
				</a>
			</div>
			<div>
				<h3><a href="#/cart">
					Cart{' '}
					{props.countCartItems ? (
						<button className="badge">{props.countCartItems}</button>
					) : (
						''
					)}
				</a></h3>{' '}
			</div>
		</header>
	);
}
